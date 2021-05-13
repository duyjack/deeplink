import "./App.css";
import { Component } from "react";
import Blur from "./blur_background";

class App extends Component {
  constructor(props) {
    super(props);
    Blur.init();
    this.video = null;
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
  }

  componentDidMount() {
    alert(/iPad|iPhone|iPod/.test(navigator.platform))
    this.setupCamera(() => {
      const videoElement = this.video;
      const execute = (stream) => {
        const video2 = document.getElementById("video2");
        video2.srcObject = stream;
        video2.play().catch(err => {
          console.log('err', err)
          video2.play().catch(err => {
            console.log('err', err)
          }).then(() => {
  
          })
        }).then(() => {

        })
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
    if (!this.video) {
      this.video = document.createElement("video")
    }
    const videoElement = this.video;
    const videoConstraints = {
      facingMode: "environment",
    };
    const stream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
    });
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = () => {
      videoElement.width = videoElement.videoWidth;
      videoElement.height = videoElement.videoHeight;
      console.log('videoElement.videoWidth', videoElement.videoWidth);
      console.log('videoElement.videoWidth', videoElement.videoHeight);
      videoElement.play().catch(err => {
        console.log('err', err);
        videoElement.play().catch(err => {
          console.log('err', err);
        }).then(() => {
          if (callback) {
            callback();
          }
        })
      }).then(() => {
        if (callback) {
          callback();
        }
      })
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video id="video2" width="200" height="500"></video>
        </header>
      </div>
    );
  }
}

export default App;
