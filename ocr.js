var ocrAPI = {};
var MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');
var isAccess = false;

ocrAPI.Init = function(){
    //MLKitOCR
    let ocr = new MLKitOCR();
    if (!isAccess){
        isAccess = requestScreenCapture();
    }
    return ocr
}


module.exports = ocrAPI;