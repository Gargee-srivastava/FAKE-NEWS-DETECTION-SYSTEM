from model import *
from preprocessing import *
from Word2Vec import *
import flask
from flask import request, jsonify
import json
import requests

app = flask.Flask(__name__)
app.config["DEBUG"] = True
model=Fake()
model.load_weights("fake.h5")

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Get links</h1>
<p>A prototype API for google links</p>'''



@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


def predict(query, corpus):
    results = {
        0: 'disagree',
        1: 'agree',
        2: 'discuss',
        3: 'unrelated',
    }
    
    query = reframe_sentence(query, text_processor)
    corpus = reframe_sentence(corpus, text_processor)

    query, corpus = get_ids(query, corpus)

   
    predictions=model.predict([query,corpus])
    for prediction in predictions:
        return results[prediction.argmax()]  # this is the final output   "score between 1 to 10"
    # print("FINISH")     

@app.route('/api/text', methods=['GET'])
def api_filter():
    query_parameters = request.args
    id = query_parameters.get('id')
    text = id
    url = "https://www.google.com/search?q="+text
    response = get(url)
    response.status_code
    html_soup = BeautifulSoup(response.text, 'html.parser')
    main = html_soup.select('div.kCrYT a')
    links=[]
    count=0
    for link in main:
        link = link.get('href')
        if '/url?q=' in link:
        	clean_link = link.replace('/url?q=', '')
        	garbage = re.findall(r'(\&.*)', clean_link)
        	final_link = clean_link.replace(garbage[0], '')
        	links.append(final_link)
        	count=count+1
    print("Done")
    
    dictlist = [dict() for x in range(count)]
    x=0
    for i in links:
        try:       
            # print(i)
            article=Article(i)
            article.download()
            article.parse()
            article.nlp()
    # print(article.text)
            # print(article.summary)
            # print(article.authors)
            # print(article.publish_date)
            dictlist[x].update([('summary',article.summary),('link',i),('title',article.title),('Score',print(predict(text,article.summary))])
            x=x+1
    # print(article.text)
        except:
            pass
      
    # print(results)
    
    # x=0
    # for corpus in title:
    #   answer=predict(text,corpus)
      
    # print(dictlist)
    result_json=json.dumps(dictlist)	
    return result_json

    
if __name__ == "__main__":
	
    app.run()

