import React, { useRef, useState, useEffect } from "react";
import image from "../assets/img/image.png";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawMesh } from "../utilities";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function FacialDetection() {
  const [emotion, setEmotion] = useState();
  const [songRec, setSongRec] = useState();
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

       // Websocket
       var socket = new WebSocket("ws://localhost:8000");
       var imageSrc = webcamRef.current.getScreenshot();
       var apiCall = {
         event: "localhost:subscribe",
         data: {
           image: imageSrc,
         },
       };
       var pred_log = {"emotion" : "user"}
       socket.onopen = () => socket.send(JSON.stringify(apiCall));
       socket.onmessage = function (event) {
        var pred_log = JSON.parse(event.data)
        setEmotion(pred_log["emotion"])
        setSongRec(pred_log.recommendation)
        // console.log(pred_log.recommendation, "log")
        const ctx = canvasRef.current.getContext("2d");
        requestAnimationFrame(() => {
          drawMesh(face, pred_log, ctx);
        });
     }
     

     
    }

     
  };
  useEffect(() => {
    runFaceDetectorModel();
  }, []);
  return (
    <section id="about" className="about bg-light">
      <div className="container">
        <div className="section-title">
          <h2>Lets find you a song</h2>
        </div>

        <div className="row">
          <div className="col-lg-6 m-3" id="camera-div">
              <div style={{ position: "relative" }}>
                <Webcam
                  ref={webcamRef}
                  style={{
                    position: "static", // Change 'static' to 'absolute' if needed
                    width: "100%",
                    height: "100%",
                  }}
                />

                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    zIndex: 2, // Ensure canvas appears on top of webcam
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            </div>

            
          <div className="text-center col-lg-5  pt-lg-0 m-3 content">
            <h3>Looks Like you're: {emotion ? emotion : "Nuetral"}</h3>
            <div className="row">
              <div className="col-12 text-center px-5">
                <Card style={{ width: "100%" }}>
                  <Card.Img
                    style={{ maxHeight: "300px" }}
                    variant="top"
                    src={songRec ? songRec.album.images[0].url : image}
                  />
                  {console.log(songRec)}
                  <Card.Body>
                    <Card.Title>{songRec ? songRec.name : "Last Goodbye"}</Card.Title>
                    <Card.Text>
                      By: {songRec ? songRec.artists[0]?.name : "Odesza" }
                    </Card.Text>
                    <Button variant="success" href={songRec ? songRec.external_urls.spotify : "#"} target="_blank">Listen On Spotify</Button>
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
