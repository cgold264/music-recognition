import React, { useRef, useState, useEffect } from "react";
import image from "../assets/img/image.png";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawMesh } from "../utilities";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ColorRing } from 'react-loader-spinner'

import {
  useQuery,
} from '@tanstack/react-query'



export default function FacialDetection() {
  const [emotion, setEmotion] = useState();
   const [songRec, setSongRec] = useState();
  const [loadSong, setLoadSong] = useState(true)
  const [emotionCount, setEmotionCount] = useState({
    "frame_count": 0,
    "angry": 0,
    "neutral": 0,
    "happy": 0,
    "fear": 0,
    "surprise": 0,
    "sad": 0
  })
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

  const getSong = async () => {
    if(loadSong){
      const response = await fetch("http://localhost:8000/song/", {
        method: "POST",
        body: JSON.stringify({
          emotion: emotion
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const responseData = await response.json();
      setSongRec(responseData);
      setLoadSong(false)
      return responseData;
    } 
  }
  
  const { data: tempSongRecResponse, refetch } = useQuery({
    queryKey: ["emotion", emotion],
    queryFn: getSong(),
  });//include criteria state to query key

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
       socket.onopen = () => socket.send(JSON.stringify(apiCall));
       socket.onmessage = function (event) {
        var pred_log = JSON.parse(event.data)
        setEmotion(pred_log["emotion"])
        setEmotionCount(prevState => {
          const updatedEmotionCount = { ...prevState };
          updatedEmotionCount[pred_log["emotion"]] += 1;
          updatedEmotionCount["frame_count"] += 1;
          return updatedEmotionCount;
        })
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
                    zIndex: 2, 
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
                  {loadSong ? <><ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                /> 
                                <h3 className="color-primary">
                                  Loading Song...
                                </h3>
                                </>: 
                                <>
                                <Card style={{ width: "100%" }}>
                                  <Card.Img
                                    style={{ maxHeight: "300px" }}
                                    variant="top"
                                    src={songRec ? songRec.album_image: image}
                                  />
                                  <Card.Body>
                                    <Card.Title>{songRec ? songRec.song : "Last Goodbye"}</Card.Title>
                                    <Card.Text>
                                      By: {songRec ? songRec.artist : "Odesza" }
                                    </Card.Text>
                                    <Button variant="success" href={songRec ? songRec.external_urls : "#"} target="_blank">Listen On Spotify</Button>
                                  </Card.Body>
                                </Card>
                                <Button variant="outline-success" className="m-3"onClick={() => {setLoadSong(true)}}>
                                  New Song <i class='bx bx-skip-next-circle'></i>
                                </Button>
                                </>
                                }
                              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
