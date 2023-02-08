var musicAPI = {};
var MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');
var isAccess = false;
//设置音乐
musicAPI.setMusic = function () {
    //MLKitOCR
    var ocr = new MLKitOCR();
    if (!isAccess){
        isAccess = requestScreenCapture();
        sleep(2000);
    }
    //校准位置
    console.log("setMusic")
    //判断机型
    dM = device.model
    if (dM.search("Pixel 3") != -1) {
        setMusicPixel3(ocr)
    } else if (dM.search("Pixel 4") != -1) {
        setMusicPixel4(ocr)
    } else {
        setMusicOther(ocr)
    }
}

function setMusicPixel3(ocr) {
    //点击添加音乐
    click(720, 350);
    console.log('点击添加音乐');
    sleep(5000);

    //通过OCR点击到收藏音乐库，返回偏移量
    let FY = clickToFavMusicPage(ocr)

    //如果是pixel3 标准是1050
    if (FY == 0 || Math.abs(FY - 1050) > 100) {
        //点击第一首
        click(500, 1500);
        console.log('点击收藏音乐');
        sleep(2000);

        //点击确定
        click(1270, 1500);
        console.log('点击确定');
        sleep(2000);
    } else {
        //点击第一首
        click(500, 1300);//1500
        console.log('点击收藏音乐');
        sleep(2000);

        //点击确定
        click(1270, 1300);//1500
        console.log('点击确定');
        sleep(2000);
    }

    //点击next
    click(1000, 2700);
    console.log('点击next');
    sleep(5000);
}

function setMusicPixel4(ocr) {
    re = findText(ocr,"Sounds")
    if (re){
        musicAPI.clickText("Sounds")
    }else{
        //点击添加音乐
        click(560, 222);
        console.log('点击添加音乐');
        sleep(5000);
    }


    //点击添加音乐
    click(1025, 1215);
    console.log('点击搜索按钮');
    sleep(5000);

    //通过OCR点击到收藏音乐库，返回偏移量
    let FY = clickToFavMusicPage(ocr)
    //如果是pixel4 标准是900
    if (FY == 0 || Math.abs(FY - 750) > 100) {
        //选择第一个音乐
        click(400, 1100);//1100
        console.log('选择第一个音乐');
        sleep(1000);

        //选择第一个音乐
        click(950, 1100);//1100
        console.log('选择音乐');
        sleep(5000);
    } else {
        //选择第一个音乐
        click(400, 950);//1200
        console.log('选择第一个音乐');
        sleep(1000);

        //选择第一个音乐
        click(950, 950);//1200
        console.log('选择音乐');
        sleep(5000);
    }
    //落下弹窗
    click(500, 500);
    console.log('落下弹窗');
    sleep(1000);
    //点击next
    click(1000, 2150);
    console.log('点击next');
    sleep(5000);
}
function setMusicOther(ocr) {
    //点击添加音乐
    click(120, 2300);
    console.log('点击添加音乐');
    sleep(5000);

    //点击搜索音乐
    click(1000, 1320);
    console.log('点击搜索音乐');
    sleep(5000);

    //通过OCR点击到收藏音乐库，返回偏移量
    let FY = clickToFavMusicPage(ocr)
    //如果是vivo 标准是750
    if (FY == 0 || Math.abs(FY - 750) > 100) {
        //选择第一个音乐
        click(400, 1200);//1200
        console.log('选择第一个音乐');
        sleep(1000);

        //选择第一个音乐
        click(950, 1200);//1200
        console.log('选择音乐');
        sleep(5000);
    } else {
        //选择第一个音乐
        click(400, 950);//1200
        console.log('选择第一个音乐');
        sleep(1000);

        //选择第一个音乐
        click(950, 1050);//1200
        console.log('选择音乐');
        sleep(5000);
    }
    //退出音乐选择
    click(700, 700);
    console.log('退出音乐选择');
    sleep(2000);

    //点击next
    click(800, 2300);
    console.log('点击next');
    sleep(2000);
}

function clickToFavMusicPage(ocr) {
    let autojs = {}
    for (let i = 0; i < 5; i++) {
        autojs = findText(ocr, "Favorites")
        if (autojs) {
            break;
        }
        toast('第' + i + '次监测，失败');
    }

    let FY = 0
    if (autojs) {
        console.log(`confidence = ${autojs.confidence}, bounds = ${autojs.bounds}, center = (${autojs.bounds.centerX()}, ${autojs.bounds.centerY()})`);
        FY = autojs.bounds.centerY()
        autojs.clickCenter();
    } else {

        toast('没有检测到收藏音乐，或音乐面板跳转失败！！！！');
        sleep(1000);
        toast('没有检测到收藏音乐，或音乐面板跳转失败！！！！');
        sleep(1000);
    }
    sleep(3000);

    ocr.release();

    return FY
}

function findText(ocr, text) {
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

//设置音乐
musicAPI.clickText = function (text) {
     //MLKitOCR
     var ocr = new MLKitOCR();
     if (!isAccess){
         isAccess = requestScreenCapture();
         sleep(2000);
     }
    let autojs = {}
    for (let i = 0; i < 5; i++) {
        autojs = findText(ocr, text)
        if (autojs) {
            break;
        }
        toast('第' + i + '次监测，失败');
    }

    if (autojs) {
        console.log(`confidence = ${autojs.confidence}, bounds = ${autojs.bounds}, center = (${autojs.bounds.centerX()}, ${autojs.bounds.centerY()})`);
        autojs.clickCenter();
    } else {

        toast('没有检测到该文字');
        sleep(1000);
        toast('没有检测到该文字');
        sleep(1000);
    }
    sleep(3000);

    ocr.release();

    return 
}

//设置音乐
musicAPI.checkText = function (text) {
    //MLKitOCR
    var ocr = new MLKitOCR();
    if (!isAccess){
        isAccess = requestScreenCapture();
        sleep(2000);
    }
   let autojs = {}
   for (let i = 0; i < 5; i++) {
       autojs = findText(ocr, text)
       if (autojs) {
           break;
       }
       toast('第' + i + '次监测，失败');
   }

   let FY = 0
   if (autojs) {
       console.log(`confidence = ${autojs.confidence}, bounds = ${autojs.bounds}, center = (${autojs.bounds.centerX()}, ${autojs.bounds.centerY()})`);
       FY = autojs.bounds.centerY()
       autojs.clickCenter();
   } else {

       toast('没有检测到该文字');
       sleep(1000);
       toast('没有检测到该文字');
       sleep(1000);
   }
   sleep(3000);

   ocr.release();

   return FY
}

module.exports = musicAPI;