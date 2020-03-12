# -*- coding: utf-8 -*- 

# import pandas as pd
import os
from methods.return_file_list import files_list

"""
    这里的函数中的column_name_str指的是csv中的列名字符串

"""

def is_column_exist(column_name_str,column_name):  #判断列名是否存在
    fields = column_name_str.split(',')
    if column_name in fields:
        return True
    else:
        return False

def column_position(column_name_str,column_name):  #返回列名所在的列序号
    fields = column_name_str.split(',')
    if is_column_exist(column_name_str,column_name):
        position = fields.index(column_name)
        return position

def column_value(line_str , column_name_str , column_name):
    fields = line_str.split(',')
    pos = column_position(column_name_str,column_name)
    col_value = fields[pos]
    return col_value 


# a="ssssss,sasc,dvrvfdv,vrtbrtbdfv"   
# print(column_position(a,"vrtbrtbdfv"))
# b="1,2,3,4"
# print(column_value(b,a,"sasc"))

# def csv_merge(files_dir):
#     filelist = files_list(files_dir,"csv")

# print(column_position("Flow ID, Source IP, Source Port, Destination IP, Destination Port, Protocol, Timestamp, Flow Duration, Total Fwd Packets, Total Backward Packets,Total Length of Fwd Packets, Total Length of Bwd Packets, Fwd Packet Length Max, Fwd Packet Length Min, Fwd Packet Length Mean, Fwd Packet Length Std,Bwd Packet Length Max, Bwd Packet Length Min, Bwd Packet Length Mean, Bwd Packet Length Std,Flow Bytes/s, Flow Packets/s, Flow IAT Mean, Flow IAT Std, Flow IAT Max, Flow IAT Min,Fwd IAT Total, Fwd IAT Mean, Fwd IAT Std, Fwd IAT Max, Fwd IAT Min,Bwd IAT Total, Bwd IAT Mean, Bwd IAT Std, Bwd IAT Max, Bwd IAT Min,Fwd PSH Flags, Bwd PSH Flags, Fwd URG Flags, Bwd URG Flags, Fwd Header Length, Bwd Header Length,Fwd Packets/s, Bwd Packets/s, Min Packet Length, Max Packet Length, Packet Length Mean, Packet Length Std, Packet Length Variance,FIN Flag Count, SYN Flag Count, RST Flag Count, PSH Flag Count, ACK Flag Count, URG Flag Count, CWE Flag Count, ECE Flag Count, Down/Up Ratio, Average Packet Size, Avg Fwd Segment Size, Avg Bwd Segment Size, Fwd Header Length,Fwd Avg Bytes/Bulk, Fwd Avg Packets/Bulk, Fwd Avg Bulk Rate, Bwd Avg Bytes/Bulk, Bwd Avg Packets/Bulk,Bwd Avg Bulk Rate,Subflow Fwd Packets, Subflow Fwd Bytes, Subflow Bwd Packets, Subflow Bwd Bytes,Init_Win_bytes_forward, Init_Win_bytes_backward, act_data_pkt_fwd, min_seg_size_forward,Active Mean, Active Std, Active Max, Active Min,Idle Mean, Idle Std, Idle Max, Idle Min, Label"," Label"))
    

        

