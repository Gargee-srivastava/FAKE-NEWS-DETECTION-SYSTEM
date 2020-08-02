from gensim.models import word2vec, Word2Vec
from keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np

def get_ids(head, body):
    # loading
    max_head = 30
    max_body = 100

    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    encd_head = tokenizer.texts_to_sequences([head])
    encd_body = tokenizer.texts_to_sequences([body])

    pad_head= pad_sequences(encd_head, maxlen=max_head, padding='post')
    pad_body= pad_sequences(encd_body, maxlen=max_body, padding='post')

    return pad_head, pad_body

def get_embedding_matrix(model_filepath):
    """
    Get the embedding matrix of the word2vec model
    :param model_filepath: the file path to the pre-build word2vec model
    :return: the embedding matrix of the word2vec model
    """
    w2v_model = Word2Vec.load(model_filepath)
    vocab=w2v_model.wv.vocab
    embedding_matrix = np.zeros((len(vocab.keys()) + 1, w2v_model.vector_size))
    for idx, word in enumerate(vocab.keys()):
        embedding_vector = w2v_model.wv.get_vector(word)
        if embedding_vector is not None:
            embedding_matrix[idx] = embedding_vector

    return embedding_matrix

if __name__ == '__main__':
    z = get_embedding_matrix('W2V.model')