import base64
import requests
import json
import cv2
import os
import numpy as np

data='./data/army.mp4'

url="https://api.imgbb.com/1/upload"
key="88de50aece5070fd0b57728e5b356eeb"

url_rev="https://techclan-twitter.herokuapp.com/reverse_image?URL="


video=cv2.VideoCapture(data)

frame_list=[]

ret = True
count=0
frames=[]
while ret:
    ret,frame=video.read()
    if(count %1500  == 0): 
        frames.append(frame)#cv2.imwrite("./frames/"+str(count)+".jpg",frame)
    
    count=count+1

print("frames collected !!!")

htmls=[]
print(len(frames))
print("loading frames...")
for frame in frames:
    url = "https://api.imgbb.com/1/upload"
    is_success, im_buf_arr = cv2.imencode(".jpg", frame)
    byte_image = im_buf_arr.tobytes()
    payload = {
        "key": key,
        "image": base64.b64encode(byte_image),   
    }
    res = requests.post(url, payload)
    res_dict = json.loads(res.text)

    print(res_dict['data']['url'])
    res2=requests.get(url_rev+res_dict['data']['url'])
    #print(json.loads(res2.text))
    htmls.append(json.loads(res2.text))
print(htmls)
