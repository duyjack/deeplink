import "./App.css";
import { Component } from "react";
//import Blur from "./blur_background";

class App extends Component {
  constructor(props) {
    super(props);
    //Blur.init();
    this.video = null;
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
  }

  componentDidMount() {
    this.testtIOS();
    // alert(/iPad|iPhone|iPod/.test(navigator.platform))
    // this.setupCamera(() => {
    //   const videoElement = this.video;
    //   const execute = (stream) => {
    //     const video2 = document.getElementById("video2");
    //     video2.srcObject = stream;
    //     video2.play().catch(err => {
    //       console.log('err', err)
    //       video2.play().catch(err => {
    //         console.log('err', err)
    //       }).then(() => {
  
    //       })
    //     }).then(() => {

    //     })
    //   };
    //   var canvas = document.createElement("CANVAS");
    //   Blur.isReady().then(res => {
    //     if (res) {
    //       Blur.segmentBodyInRealTime(canvas, videoElement, execute);
    //     }
    //   });
    // })
  }

  async testtIOS() {
    const video1 = document.getElementById("video1");
    const video2 = document.getElementById("video2");
    const constraints = { video: true, audio: false };
    const createStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      return stream;
    }
    video1.pause();
    video1.srcObject = await createStream();
    video1.play();
    setTimeout(async () => {
      video2.pause();
      video2.srcObject = await createStream();
      video2.play();
    }, 2000)
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
          <video id="video1" width="200" height="500"></video>
          <video id="video2" width="200" height="500"></video>
        </header>
      </div>
    );
  }
}

export default App;
