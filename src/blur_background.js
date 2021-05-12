import {
  generateDefaultGoogleMeetSegmentationTFLiteParams,
  generateGoogleMeetSegmentationTFLiteDefaultConfig,
  GoogleMeetSegmentationTFLiteWorkerManager,
} from "@dannadori/googlemeet-segmentation-tflite-worker-js";

let renderRequestId = null;
const fps = 25;
class Blur {
  constructor() {
    this.state = {
      video: null,
      stream: null,
      manager: null,
      params: null,
      config: null,
      videoConstraints: {},
      image: document.createElement("img"),
    };
    this.processOnLocal = true;
    this.modelPath = "/tflite/segm_lite_v681.tflite";
    this.enableSIMD = false;
    this.kernelSize = 0;
    this.useSoftmax = true;
    this.usePadding = false;
    this.threshold = 0.1;
    this.useSIMD = false;
    this.isStop = true;
  }

  async init() {
    const m = new GoogleMeetSegmentationTFLiteWorkerManager();
    const c = generateGoogleMeetSegmentationTFLiteDefaultConfig();
    c.processOnLocal = this.processOnLocal;
    c.modelPath = this.modelPath;
    c.enableSIMD = false;
    await m.init(c);

    const p = generateDefaultGoogleMeetSegmentationTFLiteParams();
    p.processWidth = 96;
    p.processHeight = 160;
    p.kernelSize = this.kernelSize;
    p.useSoftmax = this.useSoftmax;
    p.usePadding = this.usePadding;
    p.threshold = this.threshold;
    p.useSIMD = this.useSIMD;

    this.state.manager = m;
    this.state.config = c;
    this.state.params = p;
    this.isStop = false;
    return true;
  }

  async isReady() {
    if (this.state.manager != null) {
      return true;
    }
    return await this.init();
  }

  stop() {
    this.isStop = true;
  }

  start() {
    this.isStop = false;
  }

  async _estimateSegmentation(sourceStream) {
    const result = await this.state.manager.predict(sourceStream, this.state.params);
    return result;
  }

  segmentBodyInRealTime(canvas, sourceStream, callback) {
    const _this = this;
    const tmp = document.createElement("canvas");
    tmp.hidden = true;
    const front = document.createElement("canvas");
    front.hidden = true;
    // const srcCache = document.createElement("canvas");
    // srcCache.hidden = true;
    var stream = canvas.captureStream(fps);
    if (callback) {
      //callback(sourceStream.srcObject);
      callback(stream);
    }
    const bodySegmentationFrame = async () => {
      if (this.isStop) {
        cancelAnimationFrame(renderRequestId);
        return;
      }
      if (sourceStream) {
        const prediction = await _this._estimateSegmentation(sourceStream);
        // console.log(multiPersonSegmentation);
        const res = new ImageData(
          this.state.params.processWidth,
          this.state.params.processHeight
        );
        console.log('ImageData', this.state.params.processWidth, this.state.params.processHeight)
        for (
          let i = 0;
          i < this.state.params.processWidth * this.state.params.processHeight;
          i++
        ) {
          res.data[i * 4 + 0] = prediction[i];
          res.data[i * 4 + 1] = prediction[i];
          res.data[i * 4 + 2] = prediction[i];
          res.data[i * 4 + 3] = prediction[i];
        }
        tmp.width = this.state.params.processWidth;
        tmp.height = this.state.params.processHeight;
        tmp.getContext("2d").putImageData(res, 0, 0);

        // 前景の透過処理
        const frontCtx = front.getContext("2d");
        frontCtx.clearRect(0, 0, front.width, front.height);
        frontCtx.drawImage(tmp, 0, 0, front.width, front.height);
        frontCtx.globalCompositeOperation = "source-atop";
        frontCtx.drawImage(sourceStream, 0, 0, front.width, front.height);
        frontCtx.globalCompositeOperation = "source-over";

        // 最終書き込み
        const dstCtx = canvas.getContext("2d");
        //// クリア or 背景描画
        dstCtx.fillRect(0, 0, canvas.width, canvas.height);

        //// light Wrapping
        dstCtx.filter = `blur(7px)`;
        dstCtx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
        dstCtx.filter = "none";

        // 前景書き込み
        dstCtx.drawImage(front, 0, 0, canvas.width, canvas.height);
      }
      // End monitoring code for frames per second
      renderRequestId = requestAnimationFrame(bodySegmentationFrame);
    };
    if (sourceStream && sourceStream.readyState > 3 && !this.isStop) {
      bodySegmentationFrame()
        .then()
        .catch((err) => {
          console.log("err", err);
        });
    } else if (sourceStream && !this.isStop) {
      sourceStream.onloadedmetadata = () => {
        bodySegmentationFrame()
          .then()
          .catch((err) => {
            console.log("err", err);
          });
      };
    }
  }

  setBackgroundImage(backgroundPath) {
    if (backgroundPath != "none") {
      this.state.image.setAttribute("src", backgroundPath);
    } else {
      this.state.image.removeAttribute("src");
    }
  }

  haveBackgroundImage() {
    if (this.state.image.src != "") return true;
    return false;
  }
}

const blur = new Blur();
export default blur;
