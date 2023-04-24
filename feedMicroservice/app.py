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
       
       # followings = people that you are following
       # followingsID = ids of people you are following
       followingsID = []
       for i in range (len(followings)):
          followingsID.append(followings[i]['userID'])

       ratingsFeed = [] # array containing an array for each person you follow which contains an array with song info, rating, datetime for rating,
                        # user who rated for every song they have rated

       for i in range (len(followingsID)):
          id = int(followingsID[i]) # person your followings ID
          # followerRatings = that users all ratings for all songs
          followerRatings = (requests.get(f'http://localhost:5050/all_ratings?userID={id}')).json()
          user = (requests.post(f'http://localhost:3002/auth/getUser', json={"userID": id}, headers=headers)).json()
          name = (user['username'])

          for j in range (len(followerRatings)):
             song = (requests.get(f'http://localhost:5050/search_id/{followerRatings[j][0]}')).json()
             song.append(followerRatings[j][1])
             song.append(followerRatings[j][2])
             song.append(name)
             ratingsFeed.append(song)   
       sortedFeed = sorted(ratingsFeed, key=lambda x: x[2], reverse=True)
       return sortedFeed

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5051)