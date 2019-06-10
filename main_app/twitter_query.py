import tweepy
from config import consumer_key, consumer_secret, access_token, access_token_secret
####input your credentials here

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)
#####United Airlines
for tweet in tweepy.Cursor(api.search,q="#Modi -filter:retweets",rpp=5,
                           lang="en", tweet_mode='extended').items(5):
    print (tweet)
    print (tweet.user.screen_name)
    break
