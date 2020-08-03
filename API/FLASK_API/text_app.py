import flask
from flask import request, jsonify
import json
from keras.preprocessing.sequence import pad_sequences
import torch
import torch.nn as nn
from torch.utils.data import TensorDataset, DataLoader, SequentialSampler
import numpy as np
from requests import get
from bs4 import BeautifulSoup
import re
import nltk
from newspaper import Article

np.set_printoptions(suppress=True)

from transformers import (WEIGHTS_NAME, BertConfig,
                                  BertForSequenceClassification, BertTokenizer)
import pandas as pd

import tensorflow as tf
from transformers import TFBertModel

class BertCSC413_Linear(BertForSequenceClassification):
    def __init__(self, config):
        super(BertCSC413_Linear, self).__init__(config)
        self.classifier = nn.Linear(config.hidden_size, self.config.num_labels)

app = flask.Flask(__name__)

model = BertCSC413_Linear.from_pretrained(
    "bert-base-uncased", 
    num_labels = 2,    
    output_attentions = False, 
    output_hidden_states = False,
)

model.load_state_dict(torch.load('model-1.bin'))

device = torch.device("cpu")
model.to(device)
model.eval()


def predict_troll(sentence):
    tokenizer = BertTokenizer.from_pretrained('bert-base-cased', do_lower_case=False)
    valid_inputs = []
    encoded_input = tokenizer.encode(
                        sentence,
                        add_special_tokens = True,
                )
    valid_inputs.append(encoded_input)

    MAX_LEN = 256
    valid_inputs = pad_sequences(valid_inputs, maxlen=MAX_LEN, dtype="long", 
                            value=0, truncating="post", padding="post")

    valid_masks = []
    att_mask = [int(token_id > 0) for token_id in valid_inputs[0]]
    valid_masks.append(att_mask)

    valid_inputs = torch.tensor(valid_inputs)
    valid_masks = torch.tensor(valid_masks)

    # batch_size = 1
    # valid_data = TensorDataset(valid_inputs, valid_masks)
    # valid_sampler = SequentialSampler(valid_data)
    # valid_dataloader = DataLoader(valid_data, sampler=valid_sampler, batch_size=batch_size)

    acc = get_accuracy(valid_inputs, valid_masks)
    return acc

def get_accuracy(valid_inputs, valid_masks):
    with torch.no_grad():
        outputs = model(valid_inputs.to(device), 
                        token_type_ids=None, 
                        attention_mask=valid_masks.to(device))
    
    logits = outputs[0]
    _, preds = torch.max(logits, 1)
    acc = logits.numpy()[0][preds.numpy()[0]]

    label = "Troll" if preds.numpy()[0] == 1 else "Not troll"
    return label

TARGET_COUNT = 1

tok1 = BertTokenizer.from_pretrained('bert-base-uncased', do_lower_case=False)

MAX_SEQUENCE_LENGTH = 256


def create_model():
    q_id = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    q_mask = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    q_atn = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    
    config = BertConfig() # print(config) to see settings
    config.output_hidden_states = False # Set to True to obtain hidden states
    
    bert_model = TFBertModel.from_pretrained('bert-base-uncased', config=config)
    q_embedding = bert_model(q_id, attention_mask=q_mask, token_type_ids=q_atn)[0]
    q = tf.keras.layers.GlobalAveragePooling1D()(q_embedding)
    
    TFBertModel
    x = tf.keras.layers.Dropout(0.2)(q)
    x = tf.keras.layers.Dense(TARGET_COUNT, activation='sigmoid')(x)

    humour_model = tf.keras.models.Model(inputs=[q_id, q_mask, q_atn], outputs=x)
    return humour_model

TARGET_COUNT1 = 3

def create_model1():
    q_id = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    a_id = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    
    q_mask = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    a_mask = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    
    q_atn = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    a_atn = tf.keras.layers.Input((MAX_SEQUENCE_LENGTH,), dtype=tf.int32)
    
    config = BertConfig()
    config.output_hidden_states = False
    
    bert_model = TFBertModel.from_pretrained('bert-base-uncased', config=config)
    
    q_embedding = bert_model(q_id, attention_mask=q_mask, token_type_ids=q_atn)[0]
    a_embedding = bert_model(a_id, attention_mask=a_mask, token_type_ids=a_atn)[0]
    
    q = tf.keras.layers.GlobalAveragePooling1D()(q_embedding)
    a = tf.keras.layers.GlobalAveragePooling1D()(a_embedding)
    
    x = tf.keras.layers.Concatenate()([q, q])
    x = tf.keras.layers.Reshape((1, x.shape[-1]))(x)

    cnn = tf.keras.layers.Conv1D(64, 3, padding='same', activation='relu')(x)
    cnn = tf.keras.layers.MaxPooling1D(pool_size=1, strides=2)(cnn)
    cnn = tf.keras.layers.BatchNormalization()(cnn)

    lstm = tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(units=64))(cnn)
    lstm = tf.keras.layers.Dropout(0.2)(lstm)

    dense = tf.keras.layers.Dense(64,activation='relu')(lstm)
    x = tf.keras.layers.BatchNormalization()(x)
    
    x = tf.keras.layers.Dense(TARGET_COUNT1, activation='softmax')(dense)
    x = tf.keras.layers.BatchNormalization()(x)

    model = tf.keras.models.Model(inputs=[q_id, q_mask, q_atn, a_id, a_mask, a_atn], outputs=x)
    
    return model


stance_model = create_model1()
stance_model.load_weights('best_stance_detector_3.h5')

def compute_input_arrays1(sentence, body, tok1, max_sequence_length):
    input_ids_q, input_masks_q, input_segments_q = [], [], []
    input_ids_a, input_masks_a, input_segments_a = [], [], []

    ids_q, masks_q, segments_q, ids_a, masks_a, segments_a = _convert_to_transformer_inputs1(sentence, body, tok1, max_sequence_length)

    input_ids_q.append(ids_q)
    input_masks_q.append(masks_q)
    input_segments_q.append(segments_q)
    input_ids_a.append(ids_a)
    input_masks_a.append(masks_a)
    input_segments_a.append(segments_a)

    return [np.asarray(input_ids_q, dtype=np.int32),
            np.asarray(input_masks_q, dtype=np.int32),
            np.asarray(input_segments_q, dtype=np.int32),
            np.asarray(input_ids_a, dtype=np.int32),
            np.asarray(input_masks_a, dtype=np.int32),
            np.asarray(input_segments_a, dtype=np.int32)]


def _convert_to_transformer_inputs1(title, question, tok1, max_sequence_length):
    """Converts tokenized input to ids, masks and segments for transformer (including bert)"""

    def return_id(str1, str2, truncation_strategy, length):

        inputs = tok1.encode_plus(str1, str2,
            add_special_tokens=True,
            max_length=length,
            truncation_strategy=truncation_strategy,
            truncation=True)

        input_ids =  inputs["input_ids"]
        input_masks = inputs['attention_mask']
        input_segments = inputs["token_type_ids"]
        padding_length = length - len(input_ids)
        padding_id = tok1.pad_token_id
        input_ids = input_ids + ([padding_id] * padding_length)
        input_masks = input_masks + ([0] * padding_length)
        input_segments = input_segments + ([0] * padding_length)

        return [input_ids, input_masks, input_segments]

    input_ids_q, input_masks_q, input_segments_q = return_id(
        title, None, 'longest_first', max_sequence_length)

    input_ids_a, input_masks_a, input_segments_a = return_id(
        question, None, 'longest_first', max_sequence_length)

    return [input_ids_q, input_masks_q, input_segments_q,
            input_ids_a, input_masks_a, input_segments_a]


    return [np.asarray(input_ids_q, dtype=np.int32),
            np.asarray(input_masks_q, dtype=np.int32),
            np.asarray(input_segments_q, dtype=np.int32),
            np.asarray(input_ids_a, dtype=np.int32),
            np.asarray(input_masks_a, dtype=np.int32),
            np.asarray(input_segments_a, dtype=np.int32)]

def predict_stance(sentence, body):

    inputs = compute_input_arrays1(sentence, body, tok1, MAX_SEQUENCE_LENGTH)

    valid_inputs = [inputs[i] for i in range(len(inputs))]

    preds = stance_model.predict(valid_inputs)
    preds = np.argmax(preds, axis=1)
    label = {
        0: 'agree',
        1: 'disagree',
        2: 'discuss'
    }

    return label[preds[0]]


humour_model = create_model()
humour_model.load_weights('humour.h5')
off_model = create_model()
off_model.load_weights('offensive.h5')

def _convert_to_transformer_inputs(title, tok1, max_sequence_length):
    def return_id(str1, str2, truncation_strategy, length):
        inputs = tok1.encode_plus(str1, str2,
            add_special_tokens=True,
            max_length=length,
            truncation_strategy=truncation_strategy,
            truncation=True
        )
        
        input_ids =  inputs["input_ids"]
        input_masks = [1] * len(input_ids)
        input_segments = inputs["token_type_ids"]
        padding_length = length - len(input_ids)
        padding_id = tok1.pad_token_id
        input_ids = input_ids + ([padding_id] * padding_length)
        input_masks = input_masks + ([0] * padding_length)
        input_segments = input_segments + ([0] * padding_length)
        
        return [input_ids, input_masks, input_segments]
    
    input_ids_q, input_masks_q, input_segments_q = return_id(title, None, 'longest_first', max_sequence_length)
        
    return [input_ids_q, input_masks_q, input_segments_q]

def compute_input_arrays(sentence, tok1, max_sequence_length):
    input_ids_q, input_masks_q, input_segments_q = [], [], []

    ids_q, masks_q, segments_q = _convert_to_transformer_inputs(sentence, tok1, max_sequence_length)
    
    input_ids_q.append(ids_q)
    input_masks_q.append(masks_q)
    input_segments_q.append(segments_q)

    return [np.asarray(input_ids_q, dtype=np.int32), 
            np.asarray(input_masks_q, dtype=np.int32), 
            np.asarray(input_segments_q, dtype=np.int32)]


def predict(sentence):
    
    inputs = compute_input_arrays(sentence, tok1, MAX_SEQUENCE_LENGTH)

    valid_inputs = [inputs[i] for i in range(len(inputs))]

    preds = humour_model.predict(valid_inputs)
    label = "Humor" if preds[0][0] >= 0.5 else "Not humour"
    return label


def predict_off(sentence):


    inputs = compute_input_arrays(sentence, tok1, MAX_SEQUENCE_LENGTH)

    valid_inputs = [inputs[i] for i in range(len(inputs))]

    preds = off_model.predict(valid_inputs)
    label = "Offensive" if preds[0][0] >= 0.8 else "Not offensive"
    return label;


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Get links</h1>
<p>News Finder</p>'''


nltk.download('punkt')

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

    

@app.route('/api/text', methods=['GET'])
def api_filter():
    query_parameters = request.args
    id = query_parameters.get('id')
    ll=[]
    ll.append(predict(id))
    ll.append(predict_troll(id))
    ll.append(predict_off(id))
    sentence = 'What the fuck dude!!'
    body = 'ascbhcasybhbaxb'
    print(predict_stance(sentence, body))
    #print(predict_troll(id))
    #print(predict_troll("Get fuck off."))
    #print(predict(id))
    #print(predict("Get fuck off."))
    return(jsonify(ll))

@app.route('/api/fake',methods=['GET'])
def api_filter2():
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
            whitelist = set('abcdefghijklmnopqrstuvwxyzABCDEF GHIJKLMNOPQRSTUVWXYZ1234567890')
            answer = ''.join(filter(whitelist.__contains__, article.summary))
            print
            
            dictlist[x].update([('summary',article.summary),('link',i),('title',article.title),('Score',predict_stance(text,answer))])
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
    app.run(host='0.0.0.0')
