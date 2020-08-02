from model import *
from preprocessing import *
from Word2Vec import *

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

    model=Fake()
    model.load_weights("fake.h5")

    # query and corpus will be generated using word2vec model from scrapped text
    # query=np.zeros((1,30))                          # (-1,30)
    # corpus=np.zeros((1,100))                         # (-1,100)

    predictions=model.predict([query,corpus])
    for prediction in predictions:
        print(prediction)
        print(results[prediction.argmax()])  # this is the final output   "score between 1 to 10"
    # print("FINISH")                

if __name__ == '__main__':
    query = """soldier shot near canadian parliament building"""               # Only one query by user. It can consist multiple sentences
    corpus = """soldier not dead ."""    # Only one website content. It can consist multiple sentences
    predict(query, corpus)
