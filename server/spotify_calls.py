import requests
import json
import random



CLIENT_ID = 'aca1db0e22a143f5bb5981b3cc287f97'
CLIENT_SECRET = 'ef3f726333634533815afeb893e9c3ad'

AUTH_URL = 'https://accounts.spotify.com/api/token'

def get_access_token():
    # POST
    auth_response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    })

    # convert the response to JSON
    auth_response_data = auth_response.json()

    # save the access token
    access_token = auth_response_data['access_token']
    return access_token

def request_valid_song(access_token, genre="acoustic"):

    # Wildcards for random search
    random_wildcards = ['%25a%25', 'a%25', '%25a',
                        '%25e%25', 'e%25', '%25e',
                        '%25i%25', 'i%25', '%25i',
                        '%25o%25', 'o%25', '%25o',
                        '%25u%25', 'u%25', '%25u']
    wildcard = random.choice(random_wildcards)
    
    # Make a request for the Search API with pattern and random index
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}
    
    # Cap the max number of requests until getting RICK ASTLEYED
    song = None
    for i in range(51):
        try:
            song_request = requests.get(
                '{}/search?q={}{}&type=track&offset={}'.format(
                    "https://api.spotify.com/v1",
                    wildcard,
                    "%20genre:%22{}%22".format(genre.replace(" ", "%20")),
                    random.randint(0, 200)
                ),
                headers = authorization_header
            )
            song_info = random.choice(json.loads(song_request.text)['tracks']['items'])

            artist = song_info['artists'][0]['name']
            song = song_info['name']
            albumn_image = song_info['album']['images'][0]['url']
            break
        except IndexError:
            continue
        
    if song is None:
        artist = "Rick Astley"
        song = "Never Gonna Give You Up"
        
    return song_info

def genre_from_emotion(emotion):
    try:
        with open('genres.json', 'r') as infile:
            valid_genres = json.load(infile)
            print(type(valid_genres))
    except FileNotFoundError:
        print("Couldn't find genres file!")
    return "Test"