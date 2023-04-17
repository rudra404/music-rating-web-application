from flask import Flask, request
from flask_cors import CORS 
import sqlite3
from sqlite3 import Error
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
   return 'musicMicroservice is running on port 5000'

#@app.route('/search/<query>')
#def search_tracks(query):

#    conn = sqlite3.connect('Best_Listens.db')
#    cursor = conn.cursor()
#
#    cursor.execute("SELECT * FROM tracks WHERE name LIKE ? OR artist LIKE ? OR album LIKE ?",('%' + query + '%', '%' + query + '%', '%' + query + '%'))
#    tracks = cursor.fetchall()
#
#    conn.close()
#    return tracks
@app.route('/search/<query>')
def search_tracks(query):


    conn = sqlite3.connect('best_listens.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tracks WHERE name LIKE ?", ('%' + query + '%',))
    tracks = cursor.fetchall()
    cursor.execute("SELECT * FROM tracks WHERE artist LIKE ?", ('%' + query + '%',))
    artists = cursor.fetchall()
    cursor.execute("SELECT * FROM tracks WHERE album LIKE ?", ('%' + query + '%',))
    albums = cursor.fetchall()

    conn.close()
    return [tracks, artists, albums]

@app.route('/search2/', methods=['POST', 'GET'])
def search_tracks2():

    if request.method == 'GET':
        query  = request.args.get('search')
        conn = sqlite3.connect('best_listens.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tracks WHERE name LIKE ?", ('%' + query + '%',))
        tracks = cursor.fetchall()
        cursor.execute("SELECT * FROM tracks WHERE artist LIKE ?", ('%' + query + '%',))
        artists = cursor.fetchall()
        cursor.execute("SELECT * FROM tracks WHERE album LIKE ?", ('%' + query + '%',))
        albums = cursor.fetchall()

        conn.close()
        return [tracks, artists, albums]



@app.route('/search_id/<track_id>')
def search_tracks_by_id(track_id):

    conn = sqlite3.connect('best_listens.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tracks WHERE Track_id=?", (track_id ,))
    tracks = cursor.fetchall()
    conn.close()
    return tracks

@app.route('/av_rating/<track_id>')
def get_average_rating(track_id):

    conn = sqlite3.connect('best_listens.db')
    cursor = conn.cursor()
    cursor.execute("SELECT AVG(rating) FROM ratings WHERE track_id=?", (track_id,))
    average_rating = cursor.fetchone()[0]
    conn.close()
    if average_rating == None:
        average_rating = 'Not rated yet'

    return str(average_rating)


@app.route('/add_rating', methods=['GET'])
def add_rating():
    if request.method == 'GET':
        songID  = request.args.get('songID')
        userID  = request.args.get('userID')
        rating  = request.args.get('rating')
        conn = sqlite3.connect('best_listens.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM ratings WHERE user_id=? AND track_id=?", (userID, songID))
        existing_rating = cursor.fetchone()
        if existing_rating is None:
            cursor.execute("INSERT INTO ratings (user_id, track_id, rating) VALUES (?, ?, ?)", (userID, songID, rating))
        else:
            cursor.execute("UPDATE ratings SET rating=? WHERE id=?", (rating, existing_rating[0]))

        conn.commit()
        conn.close()
        return 'Rating added'

@app.route('/check_rating/', methods=['GET'])
def check_rating():
    if request.method == 'GET':
        songID  = request.args.get('songID')
        userID  = request.args.get('userID')
        conn = sqlite3.connect('best_listens.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM ratings WHERE user_id=? AND track_id=?", (userID, songID))
        existing_rating = cursor.fetchone()
        conn.close()
    if existing_rating == None:
        rating = 'Not rated yet'
    else:
        rating = existing_rating[3]
    return str(rating)

@app.route('/all_ratings/', methods=['GET'])
def all_ratings():
    if request.method == 'GET':
        userID  = request.args.get('userID')
        conn = sqlite3.connect('best_listens.db')
        cursor = conn.cursor()
        cursor.execute("SELECT track_id, rating FROM ratings WHERE user_id=? ", (userID))
        ratings = cursor.fetchall()
        conn.close()
    return ratings    

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)