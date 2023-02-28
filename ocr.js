var ocrAPI = {};
tmpImgPath = '/storage/emulated/0/DCIM/OCRTmp/'
var httpAPI = require('http.js');

ocrAPI.originFindText = function(ocr, text) {
    let capture = captureScreen();
    // 检测截图文字并计算检测时间，首次检测的耗时比较长
    // 检测时间取决于图片大小、内容、文字数量
    let result = ocr.detect(capture);

    let filtered = result.filter(item => item.confidence > 0.6);
    // 模糊搜索文字内容为"Auto.js"的文本结果
    let autojs = filtered.find(item => item.text.includes(text));
    console.log(autojs);
    return autojs
}

ocrAPI.findText = function(ocr, text) {
    captureScreen(tmpImgPath+"tmp_ocr.png");

    img = image2Base64()

    token = httpAPI.getBaiduToken()

    re = httpAPI.getOCRResult(token,img)

    // 检测截图文字并计算检测时间，首次检测的耗时比较长
    // 检测时间取决于图片大小、内容、文字数量
    // let result = ocr.detect(capture);

    // let filtered = result.filter(item => item.confidence > 0.6);
    // // 模糊搜索文字内容为"Auto.js"的文本结果
    // let autojs = filtered.find(item => item.text.includes(text));
    // console.log(autojs);
    return autojs
}

function image2Base64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

module.exports = ocrAPI;