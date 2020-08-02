from model1 import *
from pylab import *
from PIL import Image, ImageChops, ImageEnhance
import os

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

model=Model()
model.load_weights("./version1_1.h5")

fol="./test/attachments"
for i in os.listdir(fol):
    name=os.path.join(fol,i)
    X=Resiz(convert_to_ela_image(name,90))   # read the file
    X=np.reshape(X,(-1,128,128,3))
    pred=model.predict(X)                                                               # getting prediction
    Class=["Orignal","Morphed"]

    print(Class[np.argmax(pred[0])],i)

