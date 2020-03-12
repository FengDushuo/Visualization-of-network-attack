#!/usr/bin/env python
# coding=utf-8

import os
import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.options
from tornado.options import define, options
from handlers.index import IndexHandler    
from handlers.user import UserHandler
from handlers.forgetpwd import SendEmailHandler
from handlers.modify import ModifyHandler
from handlers.register import RegisterHandler
from handlers.cases import CasesHandler
from handlers.csvfunction import CsvfunctionHandler
from handlers.csvmerge import CsvmergeHandler
from handlers.csvdataextract import CsvdataextractHandler
from handlers.csvlabelextract import CsvlabelextractHandler
from handlers.csvsplit import CsvsplitHandler
from handlers.csvtojson import CsvtojsonHandler
from handlers.attackshow import AttackshowHandler
from handlers.attackshow import AttackipsHandler,AttacktypeHandler,OtherotherHandler,TimestampipHandler,TimestampotherHandler
from handlers.inputdata import InputdataHandler
from handlers.inputdata import InputdataipsHandler,InputdatatimestampHandler
from handlers.inputdata_operate import UploadFileHandler
from handlers.inputdata_show import Inputdatashow_ipsHandler,Inputdatashow_timestampHandler,Inputdatashow_timestamp_onelabelHandler,Inputdatashow_timestamp_twolabelHandler


define("port", default = 8000, help = "run on the given port", type = int)

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/', IndexHandler),          #index既是登录页面也是首页面
            (r'/user', UserHandler),
            (r'/forgetpwd', SendEmailHandler),
            (r'/register',RegisterHandler),
            (r'/modify', ModifyHandler),
            (r"/cases",CasesHandler),
            (r"/csvfunction",CsvfunctionHandler),
            (r"/csvmerge",CsvmergeHandler),
            (r"/csvdataextract",CsvdataextractHandler),
            (r"/csvtojson",CsvtojsonHandler),
            (r"/csvsplit",CsvsplitHandler),
            (r"/csvlabelextract",CsvlabelextractHandler),
            (r"/attackshow",AttackshowHandler),
            (r"/attacktype",AttacktypeHandler),
            (r"/attackips",AttackipsHandler),
            (r"/timestampip",TimestampipHandler),
            (r"/timestampother",TimestampotherHandler),
            (r"/otherother",OtherotherHandler),
            (r"/inputdata",InputdataHandler),
            (r"/inputdata_ips",InputdataipsHandler),
            (r"/upload_file",UploadFileHandler),
            (r"/inputdatashow_ips",Inputdatashow_ipsHandler),
            (r"/inputdata_timestamp",InputdatatimestampHandler),
            (r"/inputdatashow_timestamp",Inputdatashow_timestampHandler),
            (r"/inputdatashow_timestamp_onelabel",Inputdatashow_timestamp_onelabelHandler),
            (r"/inputdatashow_timestamp_twolabel",Inputdatashow_timestamp_twolabelHandler)
        ]

        settings = dict(
        template_path = os.path.join(os.path.dirname(__file__), "templates"),
        static_path = os.path.join(os.path.dirname(__file__), "static"),
        cookie_secret = "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
        xsrf_cookies = False,
        login_url = '/',
        )
        tornado.web.Application.__init__(self, handlers, **settings)


def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)

    print("Development server is running at http://localhost:%s" % options.port)
    print("Quit the server with Control-C")

    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()