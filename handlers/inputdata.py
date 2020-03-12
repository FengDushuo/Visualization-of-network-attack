import tornado.web
import tornado.escape
import methods.readdb as mrd
from handlers.base import BaseHandler

class InputdataHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #username = self.get_argument("user")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("inputdata.html", user = user_infos[0])

class InputdatatimestampHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #username = self.get_argument("user")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("inputdata_timestamp.html", user = user_infos[0])

# class OtherotherHandler(BaseHandler):
#     @tornado.web.authenticated
#     def get(self):
#         #username = self.get_argument("user")
#         username = tornado.escape.json_decode(self.current_user)
#         user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
#         self.render("attackshow_otherother.html", user = user_infos[0])

# class TimestampipHandler(BaseHandler):
#     @tornado.web.authenticated
#     def get(self):
#         #username = self.get_argument("user")
#         username = tornado.escape.json_decode(self.current_user)
#         user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
#         self.render("attackshow_timestampip.html", user = user_infos[0])

class InputdataipsHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #username = self.get_argument("user")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("inputdata_ips.html", user = user_infos[0])

# class AttacktypeHandler(BaseHandler):
#     @tornado.web.authenticated
#     def get(self):
#         #username = self.get_argument("user")
#         username = tornado.escape.json_decode(self.current_user)
#         user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
#         self.render("attackshow_attacktype.html", user = user_infos[0])


