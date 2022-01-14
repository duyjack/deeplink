import "./App.css";
import { Component } from "react";
import browser from 'browser-detect';
import Blur from "./blur_background";
import Ping from "ping.js";
import Latency from './latency';

class App extends Component {
  constructor(props) {
    super(props);
    // Blur.init();
    // this.video = null;
    this.p = new Ping();
    this.begin = new Date();
    this.rtt = [];
    this.imgs = [
      'http://myserver.com/foo.gif',
      'http://myserver.com/bar.gif'
      // etc.
    ];
    this.latency = new Latency();
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

  componentDidMount() {
    // this.latency.initConnection();
    // this.setUserAgent(
    //   document.querySelector('iframe').contentWindow,
    //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
    // );
    alert(!!navigator.mediaDevices);
    // navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36';
  }

  componentWillUnmount() {
    // this.latency.stopConnection();
  }

  setUserAgent(window, userAgent) {
    // Works on Firefox, Chrome, Opera and IE9+
    if (navigator.__defineGetter__) {
        navigator.__defineGetter__('userAgent', function () {
            return userAgent;
        });
    } else if (Object.defineProperty) {
        Object.defineProperty(navigator, 'userAgent', {
            get: function () {
                return userAgent;
            }
        });
    }
    // Works on Safari
    if (window.navigator.userAgent !== userAgent) {
        var userAgentProp = {
            get: function () {
                return userAgent;
            }
        };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}

  onClick() {
    window.location.href = 'gomeet://gomeeting.vnpt.vn?url=https://econference.devitkv2.com/app/#/join-meeting/AGgv%2BW%2Fb4awoZaBXL0njGGuF6SntjnIzgzUQVKxNTrBzLNanqMhSZ1%2FTXVYofCKG';
    // window.location.href = 'https://google.com';
  }

  onClick1() {
    window.location.href = 'https://gomeeting.vnpt.vn?url=https://econference.devitkv2.com/app/#/join-meeting/AGgv%2BW%2Fb4awoZaBXL0njGGuF6SntjnIzgzUQVKxNTrBzLNanqMhSZ1%2FTXVYofCKG';
    // window.location.href = 'https://google.com';
  }

  onClick2() {
    window.location.href = 'https://google.com/';
  }

  onClick3() {
    window.location.href = 'https://gomeeting.vnpt.vn/';
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <iframe width="1200" height="2000" src="https://gomesainterb03.vnpt.vn/bigbluebutton/api/join?fullName=User+7546714&meetingID=random-7859808&password=ap&redirect=true&checksum=278f9316a75c30271af96449bfc1e0686f891649" title="W3Schools Free Online Web Tutorials"></iframe>
        {/* <button onClick={this.onClick.bind(this)}>
            Click ME GoMeet
          </button>
          <button onClick={this.onClick1.bind(this)}>
            Click ME https
          </button>
          <button onClick={this.onClick2.bind(this)}>
            Click ME google
          </button>
          <button onClick={this.onClick3.bind(this)}>
            Click ME GoMeeting home
          </button> */}
        {/* </header> */}
      </div>
    );
  }
}

export default App;
