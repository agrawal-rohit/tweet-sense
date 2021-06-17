# twitter-sentiment-analysis-web-app

<br>

![App](imgs/demo.gif)

This is a web app which can be used to **analyze users' sentiments across Twitter hashtags/terms**. Its created using React and Django and uses an LSTM model trained on the [Kaggle Sentiment140 dataset](https://www.kaggle.com/kazanova/sentiment140) and served as a REST API to the ReactJS frontend.

The server pulls tweets using **tweepy** and performs inference using Keras. It also pulls data from the **Wikipedia API** based the hashtag chosen to display a short description. As part of the analysis, I also added few examples of the tweets and their predicted sentiments. A kernel for another sentiment classification using a CNN + 1D pooling can be found [here](https://www.kaggle.com/thatawkwardguy/twitter-sentiment-classification-using-cnns)

![Untitled Diagram (6)](https://user-images.githubusercontent.com/29514438/59569258-5f55b700-90a4-11e9-8167-60f53a765c02.jpg)

## How to Use

### Running the application

1. Download the [trained model](https://drive.google.com/file/d/1ckK5m4JysFKtBuC9yCnEaHe6cxOgXlG8/view?usp=sharing) and put into the `server/main` folder <br>(**Note:** _This is the CNN model. f you want use the LSTM model, you'll need to follow the training steps below and put the saved model in `server/main`. Also, don't forget to change the loaded model name in `server/main/init.py`_ )

2. Run `docker-compose up --build` in the terminal from the root folder <br> (**Note:** _Ensure that you have Docker installed_)

3. Open `http://localhost:5000` in your browser to access the app

### Training the model
_(Note: If you have a GPU in your system, I suggest that you train the CNN model. The LSTM model takes longer to train due to its sequential nature, and offer relatively similar performance)_

#### CNN Model
1. Copy and run the [Kaggle Notebook](https://www.kaggle.com/thatawkwardguy/twitter-sentiment-classification-using-cnns).

#### LSTM Model
1. Download the [Kaggle Sentiment140 dataset](https://www.kaggle.com/kazanova/sentiment140) and put it in the root folder as `sentiment140.csv`.
3. Run the code blocks given in the `Twitter Sentiment Analysis.ipynb`
