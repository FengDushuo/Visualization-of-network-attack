import tornado.escape
import methods.readdb as mrd
from handlers.base import BaseHandler
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.options import define, options, parse_config_file
from tornado.web import Application, RequestHandler
import os
from methods.label_extract import extract_two_labels_quchong,twolabel_timestamp_reset,extract_three_labels_not_quchong_with_timestamp
from methods.csv_to_json import ips_csvtojson
from methods.csv_file_function import column_position,column_value

class Inputdatashow_ipsHandler(BaseHandler):    #继承base.py中的类BaseHandler
    @tornado.web.authenticated
    def get(self):
        #username = self.get_argument("user")
        filename = self.get_query_argument("filename")
        csvopenfilepath = "upload/"+filename
        csvoutputfiled = "ips_quchong"
        csvoutputpath = extract_two_labels_quchong(csvopenfilepath,csvoutputfiled,"Source IP","Destination IP")
        jsonoutputpath = "static/ips_csv_json/"+filename+".json"
        ips_csvtojson(csvoutputpath,jsonoutputpath,"suit")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("inputdatashow_ips.html", user = user_infos[0],jsonoutputpath = jsonoutputpath)
        

    def post(self):
        pass

class Inputdatashow_timestampHandler(BaseHandler):    #继承base.py中的类BaseHandler
    @tornado.web.authenticated
    def get(self):
        
        filename = self.get_query_argument("filename")
        csvopenfilepath = "upload/"+filename
        with open(csvopenfilepath,"r") as csvfile:
            firstline = csvfile.readline()
        firstline = firstline.replace("\n","")
        firstlabels = firstline.split(",")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("inputdatashow_timestamp.html", user = user_infos[0],firstlabels = firstlabels,filename=filename)
        

    def post(self):
        pass

class Inputdatashow_timestamp_onelabelHandler(BaseHandler):    #继承base.py中的类BaseHandler
    @tornado.web.authenticated
    def get(self):
        csvoutputfile = self.get_query_argument("csvoutputfile")
        timestamp_format = self.get_query_argument("timestamp_format")
        chosedlabel = self.get_query_argument("chosedlabel")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("inputdatashow_timestamp_one.html", user = user_infos[0],timestamp_format=timestamp_format,csvoutputfile=csvoutputfile,chosedlabel=chosedlabel)
        

    def post(self):
        timestamplabel = self.get_argument("timestamp",default="Timestamp")
        chosedlabel = self.get_argument("chooselabel",default="Flow Duration")
        filename = self.get_argument("filename",default="1.csv")
        csvopenfilepath = "upload/"+filename
        with open(csvopenfilepath,"r") as csvfile:
            firstline = csvfile.readline()
            secondline = csvfile.readline()
        firstline=firstline.replace(" ","").replace("\n","")
        timestampmodel = column_value(secondline,firstline,timestamplabel)
        timestamp_list = timestampmodel.split(" ")
        if len(timestamp_list[1].split(":"))==2:
            timestamp_format = "%d/%m/%Y %I:%M"
        elif len(timestamp_list[1].split(":"))==3:
            timestamp_format = "%d/%m/%Y %I:%M:%S"
        csvoutputfiled = "static/onelabel_with_timestamp"
        csvoutputfile = twolabel_timestamp_reset(csvopenfilepath,csvoutputfiled,timestamplabel,chosedlabel)
        returndata = {"csvoutputfile":csvoutputfile,"timestamp_format":timestamp_format,"chosedlabel":chosedlabel}
        self.write(returndata)

class Inputdatashow_timestamp_twolabelHandler(BaseHandler):    #继承base.py中的类BaseHandler
    @tornado.web.authenticated
    def get(self):
        csvoutputfile = self.get_query_argument("csvoutputfile")
        timestamp_format = self.get_query_argument("timestamp_format")
        chosedlabel1 = self.get_query_argument("chosedlabel1")
        chosedlabel2 = self.get_query_argument("chosedlabel2")
        username = tornado.escape.json_decode(self.current_user)
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        self.render("inputdatashow_timestamp_two.html", user = user_infos[0],timestamp_format=timestamp_format,csvoutputfile=csvoutputfile,chosedlabel1=chosedlabel1,chosedlabel2=chosedlabel2)
        

    def post(self):
        timestamplabel = self.get_argument("timestamp",default="Timestamp")
        chosedlabel1 = self.get_argument("chooselabel1",default="Total Fwd Packets")
        chosedlabel2 = self.get_argument("chooselabel2",default="Total Backward Packets")
        filename = self.get_argument("filename",default="1.csv")
        csvopenfilepath = "upload/"+filename
        with open(csvopenfilepath,"r") as csvfile:
            firstline = csvfile.readline()
            secondline = csvfile.readline()
        firstline=firstline.replace(" ","").replace("\n","")
        timestampmodel = column_value(secondline,firstline,timestamplabel)
        timestamp_list = timestampmodel.split(" ")
        if len(timestamp_list[1].split(":"))==2:
            timestamp_format = "%d/%m/%Y %I:%M"
        elif len(timestamp_list[1].split(":"))==3:
            timestamp_format = "%d/%m/%Y %I:%M:%S"
        csvoutputfiled = "static/twolabels_with_timestamp"
        print(timestamplabel,chosedlabel1,chosedlabel2)
        csvoutputfile = extract_three_labels_not_quchong_with_timestamp(csvopenfilepath,csvoutputfiled,timestamplabel,chosedlabel1,chosedlabel2)
        returndata = {"csvoutputfile":csvoutputfile,"timestamp_format":timestamp_format,"chosedlabel1":chosedlabel1,"chosedlabel2":chosedlabel2}
        self.write(returndata)
        
