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

  componentDidMount() {
    // this.latency.initConnection();
  }

  componentWillUnmount() {
    // this.latency.stopConnection();
  }

  onClick() {
    window.location.href = 'gomeet://gomeeting.vnpt.vn/?url=https://gomeeting.vnpt.vn/app/#/join/8f6064636896cc9c?accessCode=B3NEOC&fullName=Canh';
    // window.location.href = 'https://google.com';
  }

  onClick1() {
    window.location.href = 'gomeet://gomeeting.vnpt.vn/?url=https%3A%2F%2Fgomeeting.vnpt.vn%2Fapp%2F%23%2Fjoin%2F8f6064636896cc9c%3FaccessCode%3DB3NEOC%26fullName%3DVu%20Duc%20Canh';
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
        <header className="App-header">
          <button onClick={this.onClick.bind(this)}>
            Click ME GoMeet
          </button>
          <button onClick={this.onClick1.bind(this)}>
            Click ME encode
          </button>
          <button onClick={this.onClick2.bind(this)}>
            Click ME google
          </button>
          <button onClick={this.onClick3.bind(this)}>
            Click ME GoMeeting home
          </button>
        </header>
      </div>
    );
  }
}

export default App;
