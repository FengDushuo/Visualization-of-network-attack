import tornado.escape
import methods.readdb as mrd
from handlers.base import BaseHandler

class IndexHandler(BaseHandler):    #继承base.py中的类BaseHandler
    def get(self):
        self.render("index.html")

    def post(self):
        username = self.get_argument("username",default=None)
        password = self.get_argument("password",default=None)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        return_data = {}
        if user_infos:
            db_pwd = user_infos[0][2]
            if db_pwd == password:
                return_data = {"info":"ok"}
                self.write(return_data)
            else:
                return_data = {"info":"passworderror"}
                self.write(return_data)
        else:
            return_data = {"info":"user_not_exist"}
            self.write(return_data)


