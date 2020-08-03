import flask
from flask import request, jsonify
import json
import joblib
import re
import requests
from pprint import pprint
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras import Model

from transformers import TFBertModel, BertConfig, BertTokenizer

TARGET_COUNT = 1
    
app = flask.Flask(__name__)

def create_model():
    q_id = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    q_mask = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    q_atn = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)

    config = BertConfig()
    config.output_hidden_states = False
    
    bert_model = TFBertModel.from_pretrained('bert-base-uncased', config=config)
    q_embedding = bert_model(q_id, attention_mask=q_mask, token_type_ids=q_atn)[0]
    q = tf.keras.layers.GlobalAveragePooling1D()(q_embedding)
    
    x = tf.keras.layers.Dropout(0.2)(q)
    x = tf.keras.layers.Dense(TARGET_COUNT, activation='sigmoid')(x)

    model = tf.keras.models.Model(inputs=[q_id, q_mask, q_atn], outputs=x)
    return model

MAX_SEQUENCE_LENGTH = 256
model2 = create_model()
model2.load_weights("best_model_source.h5")
model2.layers.pop()
model2.layers.pop()
model = Model(model2.input, model2.layers[-2].output)

URL = "https://techclan-twitter.herokuapp.com/twitterjson"
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', do_lower_case=False)

def sort_coo(coo_matrix):
    tuples = zip(coo_matrix.col, coo_matrix.data)
    return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)

def extract_topn_from_vector(feature_names, sorted_items, topn=10):
    sorted_items = sorted_items[:topn]
    score_vals = []
    feature_vals = []

    for idx, score in sorted_items:
        fname = feature_names[idx]
        score_vals.append(round(score, 3))
        feature_vals.append(feature_names[idx])

    results= {}
    for idx in range(len(feature_vals)):
        results[feature_vals[idx]]=score_vals[idx]
    
    return results

def pre_process(text):
    text=text.lower()
    text=re.sub("</?.*?>"," <> ",text)
    text=re.sub("(\\d|\\W)+"," ",text)
    return text

def get_keywords(sentence):
    cv = joblib.load("vectorizer.pkl")
    tfidf_transform = joblib.load("tfidf.pkl")
    sent = [pre_process(sentence)]
    tf_idf_vector=tfidf_transform.transform(cv.transform(sent))
    results=[]
    for i in range(tf_idf_vector.shape[0]):
        curr_vector=tf_idf_vector[i]
        sorted_items=sort_coo(curr_vector.tocoo())
        keywords=extract_topn_from_vector(cv.get_feature_names(),sorted_items,5)
        results.append(keywords)
    
    return results

def _convert_to_transformer_inputs(title, tokenizer, max_sequence_length):
    """Converts tokenized input to ids, masks and segments for transformer (including bert)"""
    
    def return_id(str1, str2, truncation_strategy, length):

        inputs = tokenizer.encode_plus(str1, str2,
            add_special_tokens=True,
            max_length=length,
            truncation_strategy=truncation_strategy,
            truncation=True)
        
        input_ids =  inputs["input_ids"]
        input_masks = inputs['attention_mask']
        input_segments = inputs["token_type_ids"]
        padding_length = length - len(input_ids)
        padding_id = tokenizer.pad_token_id
        input_ids = input_ids + ([padding_id] * padding_length)
        input_masks = input_masks + ([0] * padding_length)
        input_segments = input_segments + ([0] * padding_length)
        
        return [input_ids, input_masks, input_segments]
    
    input_ids_q, input_masks_q, input_segments_q = return_id(
        title, None, 'longest_first', max_sequence_length)
        
    return [input_ids_q, input_masks_q, input_segments_q]

def compute_input_arrays(sentence, tokenizer, max_sequence_length):
    input_ids_q, input_masks_q, input_segments_q = [], [], []
    
    ids_q, masks_q, segments_q= _convert_to_transformer_inputs(sentence, tokenizer, max_sequence_length)
    
    input_ids_q.append(ids_q)
    input_masks_q.append(masks_q)
    input_segments_q.append(segments_q)
    
    return [np.asarray(input_ids_q, dtype=np.int32),
            np.asarray(input_masks_q, dtype=np.int32),
            np.asarray(input_segments_q, dtype=np.int32)]

def get_embedding(sentence):
    inputs = compute_input_arrays([sentence], tokenizer, MAX_SEQUENCE_LENGTH)

    valid_inputs = [inputs[i] for i in range(len(inputs))]

    return model.predict(valid_inputs)
def timeline(sentence):
    keywords = get_keywords(sentence)[0]
    keywords[sentence.split(" ")[0]] = 1
    all = set()
    content_list = []
    original_embedding = get_embedding(sentence)

    for hash in keywords.keys():
        PARAMS = {'id':hash}
        r = requests.get(url = URL, params = PARAMS) 
        data = r.json()
        cnt = 0
        for tweet in data['statuses']:
            if tweet["retweeted"] == False and tweet['text'][:4] != "RT @" and tweet['lang'] == 'en':
                similar_sentence = get_embedding(tweet['text'])
                sim = cosine_similarity(original_embedding, similar_sentence)
                if len(tweet['created_at']) != 0 and tweet['text'] not in all:
                    date = tweet['created_at'].split()
                    d = date[2]+"-"+date[1]+"-"+date[5][-2:]+" "+date[3]
                    content_list.append([tweet['text'], tweet['user']['name'], d, sim])
                    all.add(tweet['text'])
                    cnt += 1
                if cnt == 7:
                    break

    if len(content_list) == 0:
        return []
    content_list = sorted(content_list, key=lambda date: date[3])[:20]
    content_list = sorted(content_list, key=lambda date: datetime.strptime(date[2], "%d-%b-%y %H:%M:%S"))

    result = dict()
    for idx, ele in enumerate(content_list):
        result[idx] = {
            "name": ele[1],
            "tweet_text": ele[0],
            "date_time": ele[2]
        }

    return result


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Get links</h1>
<p>News Finder</p>'''



@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

    

@app.route('/api/twitter', methods=['GET'])
def api_filter():
    query_parameters = request.args
    id = query_parameters.get('id')
    text=id
    dictlist=timeline(text)
    result_json=json.dumps(dictlist)	
    return result_json   
if __name__ == "__main__":
    app.run(host='0.0.0.0')

