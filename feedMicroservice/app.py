from flask import Flask, request
from flask_cors import CORS 
import requests
import json
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
   return 'musicMicroservice is running on port 5051'

@app.route('/getFeed', methods=['POST', 'GET'])
def getFeed():
   if request.method == 'GET':
       userID = request.args.get('userID')
       accessToken = str(request.headers.get('accessToken'))

       headers = {"accessToken": accessToken}

       followings = (requests.post('http://localhost:3002/followings/getFollowings', 
                                 json={"userID": userID}, 
                                 headers=headers)).json()
       print(followings)
       # followings = people that you are following
       # followingsID = ids of people you are following
       followingsID = []
       for i in range (len(followings)):
          followingsID.append(followings[i]['userID'])
       print(followingsID)

       ratingsFeed = [] # song info, rating, user who rated

       for i in range (len(followingsID)):
          id = int(followingsID[i]) # person your followings ID
          # followerRatings = that users all ratings for all songs
          followerRatings = (requests.get(f'http://localhost:5050/all_ratings?userID={id}')).json()
          print(followerRatings)

          user = (requests.post(f'http://localhost:3002/getUser', json={"userID": id}, headers=headers)).json()
          print(user)

          feedInfo = []
          # followerRatings [{songID, rating}, {}, {}]
          for j in range (len(followerRatings)):
             song = (requests.get(f'http://localhost:5050/search_id/{followerRatings[j][0]}')).json()
            #  song.append(list(followerRatings[j][1]) + list(followingsID[i]))
             feedInfo.append(song) 
             print(feedInfo)
          ratingsFeed.append(followerRatings)
        
        # for i in range (len(ratingsFeed)):
          

       print(ratingsFeed)

   # userID

   # get users' followings' ratings 
   # collate into one array sorted by recency 
   # return array
   return 'done'

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5051)