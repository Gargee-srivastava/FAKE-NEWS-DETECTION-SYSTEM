from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPool2D,BatchNormalization
from keras.optimizers import Adam

def Model():
    model=Sequential()
    model.add(Conv2D(filters = 32, kernel_size = (3,3),padding = 'valid',activation ='relu', input_shape = (128,128,3)))
    model.add(BatchNormalization())
    model.add(Conv2D(filters = 64, kernel_size = (5,5),padding = 'valid',activation ='relu'))
    model.add(BatchNormalization())
    model.add(MaxPool2D(pool_size=(2,2)))
    # model.add(Dropout(0.5))
    model.add(Flatten())
    # model.add(Dense(128, activation = "relu"))
    # model.add(Dropout(0.2))
    model.add(Dense(256, activation = "relu"))
    # model.add(Dropout(0.5))
    model.add(Dense(2, activation = "softmax"))
    print(model.summary())

    optimizer = Adam()
    model.compile(optimizer = optimizer , loss = "categorical_crossentropy", metrics=["accuracy"])
    return model