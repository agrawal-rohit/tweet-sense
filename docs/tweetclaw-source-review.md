# TweetClaw Source Review

Tweet Sense uses Tweepy for live hashtag searches. Keep that default flow when
you want the app to fetch current public posts directly.

TweetClaw is useful when a reviewer already uses OpenClaw and wants a saved,
reviewed X/Twitter source packet before comparing sentiment results. Use it as a
source-review step, not as a replacement for the model, frontend, or Tweepy
integration.

## Workflow

1. Install TweetClaw in OpenClaw from npm:

   ```bash
   openclaw plugins install npm:@xquik/tweetclaw
   ```

2. Use TweetClaw to collect public posts for the hashtag, keyword, or reply
   thread you want to inspect.

3. Review the export before using it in analysis. Keep only the fields needed for
   sentiment comparison, such as post text, created time, author handle, and
   engagement counts.

4. Run those text values through Tweet Sense's `/getsentiment` endpoint or the
   model notebook, then compare them with the live Tweepy route.

Do not commit TweetClaw exports, bearer tokens, OpenClaw credentials, or private
review notes to this repository.
