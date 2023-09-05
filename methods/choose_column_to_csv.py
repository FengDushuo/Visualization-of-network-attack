import os
from return_file_list import mkdir
from csv_file_function import is_column_exist
from csv_file_function import column_position
from csv_file_function import column_value

input_file = "Bot.csv"
output_field = "files_to_show"

column_name_str = "Flow ID, Source IP, Source Port, Destination IP, Destination Port, Protocol, Timestamp, Flow Duration, Total Fwd Packets, Total Backward Packets,Total Length of Fwd Packets, Total Length of Bwd Packets, Fwd Packet Length Max, Fwd Packet Length Min, Fwd Packet Length Mean, Fwd Packet Length Std,Bwd Packet Length Max, Bwd Packet Length Min, Bwd Packet Length Mean, Bwd Packet Length Std,Flow Bytes/s, Flow Packets/s, Flow IAT Mean, Flow IAT Std, Flow IAT Max, Flow IAT Min,Fwd IAT Total, Fwd IAT Mean, Fwd IAT Std, Fwd IAT Max, Fwd IAT Min,Bwd IAT Total, Bwd IAT Mean, Bwd IAT Std, Bwd IAT Max, Bwd IAT Min,Fwd PSH Flags, Bwd PSH Flags, Fwd URG Flags, Bwd URG Flags, Fwd Header Length, Bwd Header Length,Fwd Packets/s, Bwd Packets/s, Min Packet Length, Max Packet Length, Packet Length Mean, Packet Length Std, Packet Length Variance,FIN Flag Count, SYN Flag Count, RST Flag Count, PSH Flag Count, ACK Flag Count, URG Flag Count, CWE Flag Count, ECE Flag Count, Down/Up Ratio, Average Packet Size, Avg Fwd Segment Size, Avg Bwd Segment Size, Fwd Header Length,Fwd Avg Bytes/Bulk, Fwd Avg Packets/Bulk, Fwd Avg Bulk Rate, Bwd Avg Bytes/Bulk, Bwd Avg Packets/Bulk,Bwd Avg Bulk Rate,Subflow Fwd Packets, Subflow Fwd Bytes, Subflow Bwd Packets, Subflow Bwd Bytes,Init_Win_bytes_forward, Init_Win_bytes_backward, act_data_pkt_fwd, min_seg_size_forward,Active Mean, Active Std, Active Max, Active Min,Idle Mean, Idle Std, Idle Max, Idle Min, Label"
column_name_str = column_name_str.replace(" ","")

Timestamp = "Timestamp"
Flow_Duration = "FlowDuration"

Timestamp_position = column_position(column_name_str,Timestamp)
Flow_Duration_position = column_position(column_name_str,Flow_Duration)

def two_columns(input_file,output_filed,column_name_str,first_column,second_column):
    if is_column_exist(column_name_str,first_column) and is_column_exist(column_name_str,second_column):
        first_column_list  = []
        second_column_list = [] 
        with open(input_file, 'r' , encoding='gb18030') as f:
            lines =  f.readlines()
            first_line = lines[0]
            for line in lines[1:]:
                first_column_val = column_value(line,column_name_str,first_column).rstrip()
                second_column_val = column_value(line,column_name_str,second_column).rstrip()
                first_column_list.append(first_column_val)
                second_column_list.append(second_column_val)
            output_file = output_field+"\\"+first_column+second_column+".csv"
            with open(output_file,"w+") as output_file:
                output_file.write(first_column)
                output_file.write(",")
                output_file.write(second_column)
                output_file.write("\n")
                for i in range(len(first_column_list)):
                    output_file.write(first_column_list[i])
                    output_file.write(",")
                    output_file.write(second_column_list[i])
                    output_file.write("\n")
            output_file.close()
        f.close()
        return output_file
    else:
        return False

two_columns(input_file,output_field,column_name_str,Timestamp,Flow_Duration)



