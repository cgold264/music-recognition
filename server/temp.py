# TensorFlow and tf.keras
import tensorflow as tf

# Helper libraries
import numpy as np
import matplotlib.pyplot as plt


from typing import Optional
from fastapi import FastAPI, WebSocket

import cv2
import numpy as np
from fer import FER
app = FastAPI()
detector = FER()

print("Installed")

def detect_temp():
    # prediction = detector.detect_emotions("./image.png")
    # response = {
    #     "predictions": prediction[0]['emotions'],
    #     "emotion": max(prediction[0]['emotions'], key=prediction[0]['emotions'].get)
    # }
    print(response)

    