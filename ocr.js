var OCRAPI = {};
var MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');

OCRAPI.Init() = function(){
    //MLKitOCR
    let ocr = new MLKitOCR();
    if (!isAccess){
        isAccess = requestScreenCapture();
    }
    return ocr
}


module.exports = OCRAPI;