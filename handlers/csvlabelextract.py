import tornado.web
import tornado.escape
import methods.readdb as mrd
from handlers.base import BaseHandler

class CsvlabelextractHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #username = self.get_argument("user")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("csvlabelextract.html", user = user_infos[0])