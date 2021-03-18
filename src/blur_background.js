import "@tensorflow/tfjs-backend-webgl";
import * as bodyPix from "@tensorflow-models/body-pix";

const architecture = "MobileNetV1"; // ResNet50 MobileNetV1
const outputStride = 16; // 16 32
const multiplier = 1; // 1
const quantBytes = 2; // 1 2 4

const internalResolution = "low"; // low medium high full
const segmentationThreshold = 0.7; // from 0 to 1
const maxDetections = 20; // from 1 to 20
const scoreThreshold = 0.33; // from 0 to 1
const nmsRadius = 20; // from 1 to 30

const backgroundBlurAmount = 3; // from 1 to 20
const edgeBlurAmount = 3; // from 0 to 20

const flipHorizontally = false;

const fps = 25;

class Blur {
  constructor() {
    this.state = {
      video: null,
      stream: null,
      net: null,
      videoConstraints: {},
    };
    this.isStop = true;
  }

  async init() {
    this.state.net = await bodyPix.load({
      architecture: architecture,
      outputStride: outputStride,
      multiplier: multiplier,
      quantBytes: quantBytes,
    });
    return true;
  }

  stop() {
    this.isStop = true;
  }

  async isReady() {
    if (this.state.net != null) {
      return true;
    }
    return this.init();
  }

  async _estimateSegmentation(sourceStream) {
    this.state.video = sourceStream;
    // return await this.state.net.segmentPerson(this.state.video, {
    //   internalResolution: internalResolution,
    //   segmentationThreshold: segmentationThreshold,
    //   maxDetections: maxDetections,
    //   scoreThreshold: scoreThreshold,
    //   nmsRadius: nmsRadius,
    // });
    const canvas = await this.state.net.segmentPerson(this.state.video, {
      flipHorizontal: flipHorizontally,
      internalResolution: internalResolution,
      segmentationThreshold: segmentationThreshold,
      maxDetections: maxDetections,
      scoreThreshold: scoreThreshold,
      nmsRadius: nmsRadius,
      minKeypointScore: 0.3,
      refineSteps: 10
    });
    if (canvas.length && canvas.length > 0) {
      //console.log('canvas.length ', canvas.length);
      //console.log('canvas[0] ', canvas[0].pose);
      return canvas[0];
    }
    return canvas;
  }

  segmentBodyInRealTime(idCanvas, sourceStream, callback) {
    this.isStop = false;
    const canvas = document.getElementById(idCanvas);
    var stream = canvas.captureStream(fps);
    if (callback) {
      callback(stream);
    }
    const _this = this;
    const bodySegmentationFrame = async () => {
      const multiPersonSegmentation = await _this._estimateSegmentation(
        sourceStream
      );
      if (multiPersonSegmentation) {
        bodyPix.drawBokehEffect(
          canvas,
          sourceStream,
          multiPersonSegmentation,
          backgroundBlurAmount,
          edgeBlurAmount,
          flipHorizontally
        );
      }
      // End monitoring code for frames per second

      requestAnimationFrame(bodySegmentationFrame);
    };
    if (sourceStream.readyState > 3) {
      if (!this.isStop) {
        bodySegmentationFrame();
      }
    } else {
      sourceStream.onloadedmetadata = () => {
        if (!this.isStop) {
          bodySegmentationFrame();
        }
      }
    }
  }
}

const blur = new Blur();
export default blur;
