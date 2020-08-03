from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from time import gmtime, strftime
from utils import fetch_reply
import requests
from twilio.twiml.messaging_response import MessagingResponse
import datetime
import random
import requests
import json
import time
app = Flask(__name__)

@app.route("/")
def hello():
    return "Just a cute little hello from Miss Gargee to you "

@app.route("/sms", methods=['POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Fetch the message
    media_msg = request.form.get('NumMedia')
    msg = request.form.get('Body').lower()
    resp = MessagingResponse()
    responded = False
    if '1' in media_msg:
     pic_url = request.form.get('MediaUrl0')  # URL of the person's media
     # pprint(pic_url)        # so you can see the URL that the picture generated 
     resp.message("We have recieved your request for image analysis! Please wait for our response")
     resp.message(pic_url)
     url = "https://techclan-twitter.herokuapp.com/reverse_image?URL="
     url=url+pic_url
     resp.message('The image has been succesfully uploaded to our server!The Url of the image is :')
     response=requests.get(url)
     parsed=json.loads(response.text)
     s1=""
     count=0
     for each in parsed:
      s1=s1+each+"\n ................\n"
      if count>5:
       break
      count=count+1
     resp.message('The reverse image analysis of image reports are:')
     resp.message(s1)
     time.sleep(1)
     u='http://18.205.87.224/api/text?id='
     u=u+pic_url
     response=requests.get(u)
     parsed=json.loads(response.text)
     resp.message(parsed)
     responded==True
    elif '5' in msg:
      r = requests.get('https://coronavirus-19-api.herokuapp.com/countries/india')
      if r.status_code == 200:
       data = r.json()
       text = f'_Covid-19 Cases in India_ \n..........................\nConfirmed Cases : *{data["cases"]}* \n................\nToday Cases : *{data["todayCases"]}* \n..............\nDeaths : *{data["deaths"]}* \n..................................\nRecovered : *{data["recovered"]}* \n\n..................\nTotal Tested : *{data["totalTests"]}* \n\n Type 0 to return to main menu'
      else:
       text = 'I could not retrieve the results at this time, sorry.'
      resp.message(text)
      responded = True 
    
    elif '1' in msg:
    
     resp.message("wait we will fetch your results soon!!")
     url = "http://18.234.107.157:5000/api/text?id="
     ms=str(msg)
     #a,b=ms.split(' ',1)
     url=url+ms
     response=requests.get(url)
     parsed=json.loads(response.text)
     agree=0
     disagree=0
     discuss=0
     ctr=0
     for each in parsed:
      if ctr>100:
       break
      ctr=ctr+1
      answ=each.get('Score',"error")
      if answ == "agree":
       agree=agree+1
      elif answ == "disagree":
       disagree=disagree+1
     if(agree>disagree):
       resp.message("This is *REAL*  according to our sources !! Our results are based on following sources..we cannot be 100% Sure.")
     else:
      resp.message("This is *FAKE* according to our sources !! Our results are based on following sources..we cannot be 100% Sure.")
     count=0
     s1=""
     for each in parsed:
      s1=s1+each['link']+"*Title :*" +each['title']+"\n ................\n"
      if count>5:
       break
      count=count+1
     resp.message(s1)
     responded==True
   #reporting
    elif '3' in msg:
    # resp.message("We have reported your content to our police database!!")
     ms=str(msg)
     a,b=ms.split(' ',1)
     url='https://spreadsheetupdate1.herokuapp.com/spreed?id='
     url=url+ms
     r=requests.get(url)
     resp.message("We have reported your content to our police database!!")
     responded==True



    
    #for news

    elif msg=='news' or msg=='4':
     
     url="""https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,cnbc,abc-news,google-news-uk,independent&apiKey=3ff5909978da49b68997fd2a1e21fae8"""
     r = requests.get(url)
     #resp.message("stay")       
     if r.status_code == 200:
      resp.message("stay here with us! We are fetching news for you ")
      data = r.json()
      articles = data['articles'][:5]
      result = ""
      ctr=0          
      for article in articles:
     #  if ctr>10:
      #   break
     #  ctr=ctr+1
       title = article['title']
       url = article['url']
       if 'Z' in article['publishedAt']:
        published_at = datetime.datetime.strptime(article['publishedAt'][:19], "%Y-%m-%dT%H:%M:%S")
       else:
        published_at = datetime.datetime.strptime(article['publishedAt'], "%Y-%m-%dT%H:%M:%S%z")
       
       result += """*{}*
Read more: {}
_Published at {:02}/{:02}/{:02} {:02}:{:02}:{:02} UTC_
""".format(
    title,
    url, 
    published_at.day, 
    published_at.month, 
    published_at.year, 
    published_at.hour, 
    published_at.minute, 
    published_at.second
    )+"\n ..................\n"

     else:
      result = 'I cannot fetch news at this time. Sorry!'

     resp.message(result)
     responded = True	
    else:
     phone_no = request.form.get('From')
     reply = fetch_reply(msg, phone_no)

     resp = MessagingResponse()
     resp.message(reply)
     responded = True
 

     	

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
