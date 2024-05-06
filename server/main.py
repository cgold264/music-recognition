import json
import io
import base64

from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from spotify_calls import get_access_token, request_valid_song
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


import cv2
import numpy as np
from fer import FER

app = FastAPI()
detector = FER()


origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Emotion(BaseModel):
    emotion : Optional[str] =  None

@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    #while True:
    try:
        payload = await websocket.receive_text()
        payload = json.loads(payload)
        imageByt64 = payload['data']['image'].split(',')[1]
        # decode and convert into image
        image = np.fromstring(base64.b64decode(imageByt64), np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        
        # Detect Emotion via Tensorflow model
        prediction = detector.detect_emotions(image)
        # print("prediction: ", prediction)
        response = {
            "predictions": prediction[0]['emotions'],
            "emotion": max(prediction[0]['emotions'], key=prediction[0]['emotions'].get)
        }
        await websocket.send_json(response)
        websocket.close()
    except Exception as e:
        print("Error", e)
        websocket.close()

@app.post("/song/")
async def create_item(emotion: Emotion):
    song_rec = await request_valid_song(get_access_token(), "chill")
    artist = song_rec['artists'][0]['name']
    song = song_rec['name']
    album_image = song_rec['album']['images'][0]['url']
    external_url = song_rec['external_urls']['spotify']
    return JSONResponse(content=jsonable_encoder({"song": song, "artist": artist, "album_image": album_image, "external_urls": external_url}))

