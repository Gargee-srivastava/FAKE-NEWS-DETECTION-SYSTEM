It is a classifier model , that employes the power of Deep Learning to classify between Morphed image and orignal image.

Model.py   : This file contains our classifier model.
             It is build using Keras ans python.
Predict.py : This is the prediction file , it will use Model and pretrained weights to predict the output.
             It is build using Keras and python.




Model uses the ELA (Error level analysis) to generate the noise map of the image.
This noise map is  used to feed the Deep Neural Network.
The Deep Neural Network , uses the power of convolutional operations and filters to extract the information from the image.
These extracted fatures are then passed on to the Fully connected layer and this fully connected layer is joined to a final softmax layer to get the prediction.

For stablizing the network , we used the Normalization layer as well as Dropout layers.


Loss Function :

We used the categorical cross entropy loss function for training the neural net.
