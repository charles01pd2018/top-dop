from tokens import *
import tweepy
import requests
import os
import json

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(CONSUMER_KEY, CONSUMER_SECRET)
api = tweepy.API(auth)
username='@TommyDANGerouss'
tweets_list= api.user_timeline(screen_name=username, count=200) # Get the last tweet
# By default api.user_timeline() gets the last 20 tweets, but you can specify it
# with the count parameter
tweet= tweet_list[0] # An object of class Status (tweepy.models.Status)
print(tweet.created_at) # Print the datetime object for the tweet
print(tweet.text) # Print the text of the tweet
print(tweet.in_reply_to_screen_name) # Print the username of the user the 
# the tweet is replying to, it is None if the tweet is not a reply