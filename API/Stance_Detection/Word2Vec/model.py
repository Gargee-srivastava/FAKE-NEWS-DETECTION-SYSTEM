from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten, Embedding, Input, Lambda
from tensorflow.keras import layers
from tensorflow.keras.layers import MaxPooling1D, GlobalMaxPooling1D, AveragePooling1D
from tensorflow.keras.layers import concatenate,dot
import numpy as np
from Word2Vec import get_embedding_matrix


def Fake():

    vocab_size=22496
    embed_dim=300
    embed_matrix=get_embedding_matrix('W2V.model')          # generate this embed_matrix using word2vec
    max_body=100
    max_head=30

    head_input = Input(shape=(max_head,), name='head_input')
    body_input = Input(shape=(max_body,), name='body_input')
    shared_embed = Embedding(vocab_size, embed_dim, weights=[embed_matrix], trainable=False)  # embed_dim instead of 10
    head_embed = shared_embed(head_input)
    body_embed = shared_embed(body_input)

    conv_11 = layers.Conv1D(64, 5, activation='relu', name='conv11')
    conv_12 = layers.Conv1D(64, 5, activation='relu', name='conv12')
    conv_21 = layers.Conv1D(32, 3, activation='relu', name='conv21')
    conv_22 = layers.Conv1D(32, 3, activation='relu', name='conv22')
    # pooling layers
    pool_3 = MaxPooling1D(pool_size=3, strides=2, name='pool3')
    pool_4 = MaxPooling1D(pool_size=3, strides=2, name='pool4')

    head_CNN = conv_11(head_embed)
    head_CNN = pool_3(head_CNN)
    head_CNN = conv_21(head_CNN)
    head_CNN = pool_4(head_CNN)
    head_CNN = Flatten()(head_CNN)

    body_CNN = conv_12(body_embed)
    body_CNN = pool_3(body_CNN)
    body_CNN = conv_22(body_CNN)
    body_CNN = pool_4(body_CNN)
    body_CNN = Flatten()(body_CNN)

    conc = concatenate([head_CNN, body_CNN])
    dense = Dense(100, activation='relu')(conc)
    dense = Dropout(0.3)(dense)
    dense = Dense(4, activation='softmax')(dense)
    model = Model(inputs=[head_input, body_input], outputs=dense)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['acc'])
    return (model)
