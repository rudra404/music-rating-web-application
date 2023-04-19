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
       accessToken = request.headers.get('accessToken')
       accessToken = str(accessToken)
       print(accessToken)

       headers = {"accessToken": accessToken}
       data = {
            "userID": userID,
        }
       followers = requests.post('http://localhost:3002/followings/getFollowings', 
                                 json=data, 
                                 headers=headers) 
       followers = followers.json()
       print(followers)
       
       followersID = []
       for i in range (len(followers)):
          followersID.append(followers[i]['followerID'])
       print(followersID)

   # userID

   # get users' followings' ratings 
   # collate into one array sorted by recency 
   # return array
   return 'done'

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5051)