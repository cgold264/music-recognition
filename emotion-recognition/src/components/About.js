import React, { useRef, useState, useEffect } from "react";
import image from "../assets/img/image.png";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawMesh } from "../utilities";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function About() {
    const [canvasTop, setCanvasTop] = useState(0);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const blazeface = require("@tensorflow-models/blazeface");

  //  Load blazeface
  const runFaceDetectorModel = async () => {
    const model = await blazeface.load();
    console.log("FaceDetection Model is Loaded..");
    setInterval(() => {
      detect(model);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces(video);
      //console.log(face);

      console.log(face);
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, "test", ctx);
      });
    }

      // Websocket
      var socket = new WebSocket("ws://localhost:8000");
      var imageSrc = webcamRef.current.getScreenshot();
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          image: imageSrc,
        },
      };
      socket.onopen = () => socket.send(JSON.stringify(apiCall));
      socket.onmessage = function (event) {
      var pred_log = JSON.parse(event.data);
      console.log(pred_log)
    }
  };
  useEffect(() => {
    runFaceDetectorModel();
  }, []);
  useEffect(() => {
    const cameraDiv = document.getElementById("camera-div");
    if (cameraDiv) {
      setCanvasTop(cameraDiv.getBoundingClientRect().y);
    }
  }, []);
  return (
    <section id="about" className="about bg-light">
      <div className="container">
        <div className="section-title">
          <h2>Lets find you a song</h2>
        </div>

        <div className="row">
          <div className="col-lg-6 m-3" id="camera-div">
            <Webcam
              ref={webcamRef}
              style={{
                position: "static",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 600,
                top: 20,
                textAlign: "center",
                zIndex: 1, // 'zIndex' should be camelCase
                width: "100%",
                height: "100%",
              }}
            />
            </div>

            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 600,
                top: canvasTop,
                textAlign: "center",
                zIndex: 2, // Ensure canvas appears on top of webcam
                width: 560,
                height: 480,
              }}
            />
          <div className="text-center col-lg-5  pt-lg-0 m-3 content">
            <h3>Our Recommendation</h3>
            <div className="row">
              <div className="col-12 text-center px-5">
                <Card style={{ width: "100%" }}>
                  <Card.Img
                    style={{ maxHeight: "300px" }}
                    variant="top"
                    src={image}
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
