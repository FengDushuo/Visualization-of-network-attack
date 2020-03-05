import tornado.web
import tornado.escape
import methods.readdb as mrd
from handlers.base import BaseHandler

class CsvdataextractHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #username = self.get_argument("user")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("csvdataextract.html", user = user_infos[0])