import "./App.css";
import { Component } from "react";
import browser from 'browser-detect';
import Blur from "./blur_background";

class App extends Component {
  constructor(props) {
    super(props);
    // Blur.init();
    // this.video = null;
  }

  // componentDidUpdate(prevProps) {
  //   console.log('componentDidUpdate');
  // }

  // componentDidMount() {
  //   const result = browser();
  //   alert(JSON.stringify(result));
  //   this.setupCamera(() => {
  //     const videoElement = this.video;
  //     const execute = (stream) => {
  //       const video2 = document.getElementById("video2");
  //       video2.srcObject = stream;
  //       video2.play().catch(err => {
  //         console.log('err', err)
  //         video2.play().catch(err => {
  //           console.log('err', err)
  //         }).then(() => {

  //         })
  //       }).then(() => {

  //       })
  //     };
  //     var canvas = document.createElement("CANVAS");
  //     Blur.isReady().then(res => {
  //       if (res) {
  //         Blur.segmentBodyInRealTime(canvas, videoElement, execute);
  //       }
  //     });
  //   })
  // }

  // async testtIOS() {
  //   const video1 = document.getElementById("video1");
  //   //const video2 = document.getElementById("video2");
  //   const constraints = { video: true, audio: false };
  //   const createStream = async () => {
  //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //     const mediaStream = new MediaStream();
  //     if (stream.getTracks().length > 0) {
  //       mediaStream.addTrack(stream.getTracks()[0]);
  //     }
  //     return mediaStream;
  //   }
  //   video1.pause();
  //   video1.srcObject = await createStream();
  //   console.log(video1.srcObject)
  //   video1.play();
  //   // setTimeout(async () => {
  //   //   video2.pause();
  //   //   video2.srcObject = await createStream();
  //   //   video2.load();
  //   // }, 2000)
  // }

  // async setupCamera(callback) {
  //   if (!this.video) {
  //     this.video = document.createElement("video")
  //   }
  //   const videoElement = this.video;
  //   const videoConstraints = {
  //     facingMode: "environment",
  //   };
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     video: videoConstraints,
  //   });
  //   videoElement.srcObject = stream;
  //   videoElement.onloadedmetadata = () => {
  //     videoElement.width = videoElement.videoWidth;
  //     videoElement.height = videoElement.videoHeight;
  //     console.log('videoElement.videoWidth', videoElement.videoWidth);
  //     console.log('videoElement.videoWidth', videoElement.videoHeight);
  //     videoElement.play().catch(err => {
  //       console.log('err', err);
  //       videoElement.play().catch(err => {
  //         console.log('err', err);
  //       }).then(() => {
  //         if (callback) {
  //           callback();
  //         }
  //       })
  //     }).then(() => {
  //       if (callback) {
  //         callback();
  //       }
  //     })
  //   };
  // }

  onClick() {
    window.location.href = 'gomeet://gomeeting.vnpt.vn?url=https%3A%2F%2Feconference.devitkv2.com%2Fapp%2F%23%2Fjoin-meeting%2FMy6Z%252BlEkrkVATqnEHEFipp7gNQ2YbzqGdsg9yzjLJoWObKKzMEKDttfnL7tFLLC1&code=My6Z%2BlEkrkVATqnEHEFipp7gNQ2YbzqGdsg9yzjLJoWObKKzMEKDttfnL7tFLLC1';
    // window.location.href = 'https://google.com';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.onClick.bind(this)}>
            Click ME
          </button>
        </header>
      </div>
    );
  }
}

export default App;
