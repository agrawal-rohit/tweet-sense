![App](imgs/demo.gif)

This web application allows users to analyze sentiments across Twitter hashtags/terms. It's built using React and Django, leveraging an LSTM model trained on the [Kaggle Sentiment140 dataset](https://www.kaggle.com/kazanova/sentiment140). The model is served as a REST API to the ReactJS frontend.

## Features
- **Sentiment Analysis:** Using an LSTM model to analyze sentiments on Twitter.
- **Integration with [Tweepy](https://www.tweepy.org/):** For fetching real-time tweets.
- **Wikipedia API:** To provide context about the hashtags.
- **Visual Examples:** Displaying tweets with their predicted sentiments.
- **Additional Resource:** A kernel for sentiment classification using CNN + 1D pooling is available [here](https://www.kaggle.com/thatawkwardguy/twitter-sentiment-classification-using-cnns).

![Untitled Diagram (6)](https://user-images.githubusercontent.com/29514438/59569258-5f55b700-90a4-11e9-8167-60f53a765c02.jpg)

## Getting Started

### Prerequisites
- Docker installed on your system.
- Twitter API Bearer Token from [Twitter Developer Portal](https://developer.twitter.com/en/portal/projects-and-apps).

### Running the Application
1. **Model Setup:**
    - Download the [trained CNN model](https://drive.google.com/file/d/1ckK5m4JysFKtBuC9yCnEaHe6cxOgXlG8/view?usp=sharing) and place it in the `server/main` folder. *(Note: To use the LSTM model, follow the training steps below and save the model in the `server/main` folder. Modify the loaded model name in `server/main/init.py`.)*

2. **Configuration:**
    - Add your Twitter API Bearer Token to `server/main/config.py`.

3. **Starting the App:**
    - Run `docker-compose up --build` in the terminal from the root directory.
    - Access the app via http://localhost:3000.


### Training the Model
#### CNN Model
Run the [Kaggle Notebook for CNN Sentiment Classification](https://www.kaggle.com/thatawkwardguy/twitter-sentiment-classification-using-cnns).

#### LSTM Model
- Download the [Kaggle Sentiment140 dataset](https://www.kaggle.com/kazanova/sentiment140) and place it as `sentiment140.csv` in the root folder.
- Execute the code in `Twitter Sentiment Analysis.ipynb`.

*(Note: The LSTM model requires more time to train due to its sequential nature. It offers performance similar to the CNN model, but a GPU is recommended for faster processing.)*
