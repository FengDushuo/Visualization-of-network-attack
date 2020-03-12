from label_extract import extract_two_labels_quchong
from return_file_list import files_list
from label_extract import extract_three_labels_quchong_nolabel

# files_field = "attacktypes"
# for file_to_read_path in files_list(files_field,'csv'):
#     extract_two_labels_quchong(file_to_read_path,"ips_quchong","Source IP","Destination IP")           

files_field = "attacktypes"
for file_to_read_path in files_list(files_field,'csv'):
    extract_three_labels_quchong_nolabel(file_to_read_path,"ips_quchong_withlabel","Source IP","Destination IP","Label")           
