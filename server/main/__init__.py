import os
from flask import Flask, request, jsonify
import tweepy
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import pickle
from tensorflow.compat.v1 import get_default_graph
import tensorflow as tf

tf.compat.v1.disable_v2_behavior()

# --------------------------------------
# BASIC APP SETUP
# --------------------------------------
app = Flask(__name__, instance_relative_config=True)

# Config
app_settings = os.getenv("APP_SETTINGS", "main.config.DevelopmentConfig")
app.config.from_object(app_settings)

# Extensions
from flask_cors import CORS

CORS(app)

# Keras stuff
global graph
graph = get_default_graph()
model = load_model("main/Sentiment_CNN_model.h5")
MAX_SEQUENCE_LENGTH = 300

# Twitter
auth = tweepy.OAuth2BearerHandler(app.config.get("BEARER_TOKEN"))
api = tweepy.API(auth, wait_on_rate_limit=True)

# loading tokenizer
with open("main/tokenizer.pickle", "rb") as handle:
    tokenizer = pickle.load(handle)


def predict(text, include_neutral=True):
    # Tokenize text
    x_test = pad_sequences(
        tokenizer.texts_to_sequences([text]), maxlen=MAX_SEQUENCE_LENGTH
    )
    # Predict
    score = model.predict([x_test])[0]
    if score >= 0.4 and score <= 0.6:
        label = "Neutral"
    if score <= 0.4:
        label = "Negative"
    if score >= 0.6:
        label = "Positive"

    return {"label": label, "score": float(score)}


@app.route("/")
def index():
    return "Hello"


@app.route("/getsentiment", methods=["GET"])
def getsentiment():
    data = {"success": False}
    # if parameters are found, echo the msg parameter
    if request.args != None:
        with graph.as_default():
            data["predictions"] = predict(request.args.get("text"))
        data["success"] = True
    return jsonify(data)


@app.route("/analyzehashtag", methods=["GET"])
def analyzehashtag():
    positive = 0
    neutral = 0
    negative = 0
    tweets = api.search_tweets(
        q='#' + request.args.get("text") + " -filter:retweets", lang="en", count=10000
    )
    for tweet in tweets:
        with graph.as_default():
            prediction = predict(tweet.text)
        if prediction["label"] == "Positive":
            positive += 1
        if prediction["label"] == "Neutral":
            neutral += 1
        if prediction["label"] == "Negative":
            negative += 1

    return jsonify({"positive": positive, "neutral": neutral, "negative": negative})


@app.route("/gettweets", methods=["GET"])
def gettweets():
    tweets = []
    for tweet in api.search_tweets(
        q=request.args.get("text") + " -filter:retweets", lang="en", count=10
    ):
        temp = {}
        temp["text"] = tweet.text
        temp["username"] = tweet.user.screen_name
        with graph.as_default():
            prediction = predict(tweet.text)
        temp["label"] = prediction["label"]
        temp["score"] = prediction["score"]
        tweets.append(temp)

    return jsonify({"results": tweets})
