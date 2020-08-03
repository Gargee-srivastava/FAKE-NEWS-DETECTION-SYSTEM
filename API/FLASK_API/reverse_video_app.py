import flask
from flask import request, jsonify
import json
import base64
import requests
import json
import cv2
import os
import numpy as np
import urllib.request as urllib2


app = flask.Flask(__name__)

def download_video(url):
    file_name = 'trial_video.mp4' 
    rsp = urllib2.urlopen(url)
    with open(file_name,'wb') as f:
        f.write(rsp.read())

def request_video_analysis(url_of_video):
    download_video(url_of_video)
    data='trial_video.mp4'

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

    # print("frames collected !!!")

    htmls=dict()
    # print(len(frames))
    # print("loading frames...")
    for cnt, frame in enumerate(frames):
        url = "https://api.imgbb.com/1/upload"
        is_success, im_buf_arr = cv2.imencode(".jpg", frame)
        byte_image = im_buf_arr.tobytes()
        payload = {
            "key": key,
            "image": base64.b64encode(byte_image),   
        }
        res = requests.post(url, payload)
        res_dict = json.loads(res.text)

        res2=requests.get(url_rev+res_dict['data']['url'])

        htmls[cnt] = {
            "image_url": res_dict['data']['url'],
            "related_website": json.loads(res2.text)
        }
    
    return htmls
    

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Get links</h1>
<p>News Finder</p>'''



@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

    

@app.route('/api/text', methods=['GET'])
def api_filter():
    query_parameters = request.args
    id = query_parameters.get('id')
    text = id
    dictlist=request_video_analysis(text)
    result_json=json.dumps(dictlist)	
    return result_json
    




if __name__ == "__main__":
	app.run(host="0.0.0.0")

