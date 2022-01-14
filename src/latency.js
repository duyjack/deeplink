import ReconnectingWebSocket from 'reconnecting-websocket';

const PING_INTERVAL = 15000;
const CONNECTION_TIMEOUT = 15000;

export default class Latency {
  constructor() {
    this.ws = new ReconnectingWebSocket(
      'wss://gomeeting4.vnpt.vn/check-latency',
      ['FC2AF42175E215926912AD1A6738A'],
      { connectionTimeout: CONNECTION_TIMEOUT });
    this.onWsOpen = this.onWsOpen.bind(this);
    this.onWsClose = this.onWsClose.bind(this);
    this.onWsMessage = this.onWsMessage.bind(this);
  }

  initConnection() {
    this.ws.onopen = this.onWsOpen;
    this.ws.onclose = this.onWsClose;
    this.ws.onmessage = this.onWsMessage;
  }

  stopConnection() {
    this.ws.close();
    this.ws.onmessage = null;
    this.ws.onopen = null;
    this.ws.onclose = null;
  }

  onWsOpen() {
    this.pingInterval = setInterval(this.ping.bind(this), PING_INTERVAL);
  }

  onWsClose() {
    clearInterval(this.pingInterval);
  }

  onWsMessage(message) {
    const parsedMessage = JSON.parse(message.data);
    if (parsedMessage.id === 'pong') {
      const current = new Date().getTime();
      const start = parsedMessage.time;
      const res = current - start;
      console.log('res', res);
    }
  }

  ping() {
    const message = { id: 'ping', time: new Date().getTime() };
    this.sendMessage(message);
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

}