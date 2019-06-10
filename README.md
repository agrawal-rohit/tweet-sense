# Twitter Sentiment Analysis 

![App](https://user-images.githubusercontent.com/29514438/59224071-1eb0f600-8beb-11e9-9d93-b648441af4d2.PNG)

This is a web app which can be used to **analyze users' sentiments across Twitter hashtags**. Its created using React and Django and uses an LSTM model trained on the [Kaggle Sentiment140 dataset](https://www.kaggle.com/kazanova/sentiment140) and served as a REST API to the ReactJS frontend. The server pulls tweets using **tweepy** and performs inference using Keras. It also pulls data from the **Wikipedia API** based the hashtag chosen to display a short description. As part of the analysis, I also added few examples of the tweets and their predicted sentiments.

## How to Install and use
- clone the repository
- open command prompt in ```react-frontend``` folder, and use ```npm install``` to install the front-end dependencies 
- open another command prompt in the ```root``` folder and use ```python install -r requirements.txt``` to install the server dependencies
- use ```python manage.py runserver``` to run the application
