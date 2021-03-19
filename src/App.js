import "./App.css";
import { Component } from "react";
import Blur from "./blur_background";

class App extends Component {
  constructor(props) {
    super(props);
    Blur.init();
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
  }

  componentDidMount() {
    this.setupCamera(() => {
      const videoElement = document.getElementById("video");
      const execute = (stream) => {
        const video2 = document.getElementById("video2");
        video2.srcObject = stream;
        try {
          video2.play();
        } catch (e) {
          console.error(e);
        }
      };
      var canvas = document.createElement("CANVAS");
      Blur.isReady().then(res => {
        if (res) {
          Blur.segmentBodyInRealTime(canvas, videoElement, execute);
        }
      });
    })
  }

  async setupCamera(callback) {
    const videoElement = document.getElementById("video");
    const videoConstraints = {
      facingMode: "environment",
    };
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: videoConstraints,
    });
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = () => {
      videoElement.width = videoElement.videoWidth;
      videoElement.height = videoElement.videoHeight;
      videoElement.play();
      if (callback) {
        callback();
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video id="video" width="200" height="100" hidden></video>
          <video id="video2" width="200" height="500"></video>
        </header>
      </div>
    );
  }
}

export default App;
