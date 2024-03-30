import json
import io
import base64

from typing import Optional
from fastapi import FastAPI, WebSocket

import cv2
import numpy as np
app = FastAPI()

@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    emotion_dict = {
        0: 'neutral', 
        1: 'happiness', 
        2: 'surprise', 
        3: 'sadness',
        4: 'anger', 
        5: 'disgust', 
        6: 'fear'
    }
    #while True:
    try:
        payload = await websocket.receive_text()
        payload = json.loads(payload)
        imageByt64 = payload['data']['image'].split(',')[1]
        # decode and convert into image
        image = np.fromstring(base64.b64decode(imageByt64), np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)

        
        
        # Detect Emotion via Tensorflow model
        # prediction = detector.detect_emotions(image)
        
        # Read ONNX model
        model = 'onnx_model.onnx'
        model = cv2.dnn.readNetFromONNX('emotion-ferplus-8.onnx')
        
        # Read the Caffe face detector.
        model_path = 'RFB-320/RFB-320.caffemodel'
        proto_path = 'RFB-320/RFB-320.prototxt'
        # net = dnn.readNetFromCaffe(proto_path, model_path)
        # model.setInput(resize_frame)
        # output = model.forward()
        # end_time = time.time()
        model.setInput(image)
        output = model.forward()
        pred = emotion_dict[list(output[0]).index(max(output[0]))]
        print(pred)
        response = {
            "predictions": pred,
            # "emotion": max(probs[0]['emotions'], key=probs[0]['emotions'].get)
        }

        await websocket.send_json(pred)
        websocket.close()
    except:
        websocket.close()

