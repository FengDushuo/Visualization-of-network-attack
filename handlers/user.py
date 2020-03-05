import tornado.web
import tornado.escape
import methods.readdb as mrd
from handlers.base import BaseHandler

class UserHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("user.html", user = user_infos[0])