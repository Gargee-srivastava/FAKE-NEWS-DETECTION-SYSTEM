The reverse.py file is used to break the video into frames and then apply reverse imaging on those frames.
It employs open-cv (Opencv is python library for computer vision tasks) to extract the frames from video.
These extracted frames are then uploaded to the https://api.imgbb.com/ .
This website stores the images  temporarly and provide us the URL of the uploaded image.
The URL of the uploaded image is sent to our backend system , which is deployed on "Heroku".
The backend system performs the "Reverse Imaging" task and provide us with the result.
