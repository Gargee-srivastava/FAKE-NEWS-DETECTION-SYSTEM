import flask
from flask import request, jsonify
import json
import requests
from model import *
from pylab import *
from PIL import Image, ImageChops, ImageEnhance
import urllib.request
import shutil
import os


app = flask.Flask(__name__)
#app.config["DEBUG"] = True
model=Model()
model.load_weights("version1_1.h5")

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Get links</h1>
<p>Offensive Image</p>'''

def Resiz(img):
    img=np.resize(img,(128,128,3))
    return img/255.0

def convert_to_ela_image(path, quality):
    filename = path
    resaved_filename = 'tempresaved.jpg'
    im = Image.open(filename).convert('RGB')
    im.save(resaved_filename, 'JPEG', quality=quality)
    resaved_im = Image.open(resaved_filename)
    ela_im = ImageChops.difference(im, resaved_im)
    extrema = ela_im.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    if max_diff == 0:
        max_diff = 1
    scale = 255.0 / max_diff
    ela_im = ImageEnhance.Brightness(ela_im).enhance(scale)
    return ela_im


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404



@app.route('/api/text', methods=['GET'])
def api_filter():
    tb._SYMBOLIC_SCOPE.value = True
    query_parameters = request.args
    id = query_parameters.get('id')
    text = id
    print(text)
    r = requests.get(text, stream = True)
    filename = text.split("/")[-1]
    if r.status_code == 200:
        r.raw.decode_content = True
        with open(filename,'wb') as f:
                shutil.copyfileobj(r.raw, f)
        print('Image sucessfully Downloaded: ',filename)
    else:
                print('Image Couldn\'t be retreived')
                return jsonify("error")

    # f1="./"+filename
    # print(f1)

    X=Resiz(convert_to_ela_image(filename,90))   # read the file
    X=np.reshape(X,(-1,128,128,3))
    pred=model.predict(X)
    # getting prediction 
    Class=["Original","Morphed"]
    os.remove(filename)
        # print(])
    # urllib.request.urlretrieve(text,"00000001.jpg")
    # result_json=json.dumps(dictlist)
    # result_json       
    return jsonify(Class[np.argmax(pred[0])])
    # return jsonify("original")
    # return "<h1>404</h1><p>The resource could not be found.</p>", 404

if __name__ == "__main__":
        app.run()

                           

