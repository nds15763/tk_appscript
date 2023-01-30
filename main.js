var dM = device.model
var pX = device.width //vivo 1080, pixel4 1080
var pY = device.height //vivo 2400,pixel4 2280
if (dM.search("Pixel 3") != -1) {
    pY = pY - 180
}
var musicAPI = require('music.js')
var ocrAPI = require('ocr.js')
var ocr
// var httpAPI = require('http.js')
// var FileAPI = require('file.js')

main()

function main() {
    //初始化ocr
    ocr = ocrAPI.Init()
    toast("群控脚本启动");
    //打开tk
    openTiktok()
    //获取视频配置列表
    var postList = GetPostList()
    //循环发视频
    for (let index = 0; index < postList.length; index++) {
        //点击发布视频按钮
        clickVideoPost()
        let video = postList[index];
        //选择一个视频
        selectVideo(index);

        //添加视频内容
        addVideoContent(video);

        //添加视频内容
        addPostContent(video);

        //发视频结束随机间隔
        if (index < postList.length - 1) {
            //等待1分钟
            //加个随机数
            let ran = Math.floor(Math.random() * 120000);
            toast('点击发送，等待2分钟加' + ran + '秒钟视频上传完成');
            sleep(120000 + ran);
        }
    }

    // 气泡提示执行结束
    toast("执行结束");
}

//打开tk
function openTiktok() {
    launchApp("TikTok");
    //等待5秒，看是否会出现facebook连接请求
    console.log('等待启动');
    toast('等待启动');
    sleep(5000);
    console.log('启动完成');
    toast('启动完成');
}

function selectVideo(count) {
    if (dM.search("Pixel 3") != -1) {
        //添加视频内容
        selectVideoPixel3(count);
    } else if (dM.search("Pixel 4") != -1) {
        //添加视频内容
        selectVideoPixel4(count);
    } else {
        //添加视频内容
        selectVideoOther(count);
    }
}

function addVideoContent(video) {
    if (dM.search("Pixel 3") != -1) {
        //添加视频内容
        addVideoContentPixel3(video);
    } else if (dM.search("Pixel 4") != -1) {
        //添加视频内容
        addVideoContentPixel4(video);
    } else {
        //添加视频内容
        addVideoContentOther(video);
    }
}

//获取文案列表
function GetPostList() {
    //获取文案列表
    return [
        {
            "videoContent": "I think my fave affordable loose powder\n\
 which like blurs your under eyes makes\
 them look flawless makes you not crease\n\
 now comes in a pink shade this is the\
 best affordasble loose power lown.",
            "postContent": "A NEW affordable Pink Setting Powder, what do we think? #testingnewmakeup #pinksettingpowder #flawlessundereye",
            "music": "original sound - :)",
            "productList": ["vitamin babe mist"]
        },
        {
            "videoContent": "Every girl needs this for \nhair loss 💀",
            "postContent": "Tried this for the first time my hair feels amazing!!!#blackfriday#tiktokshop#tiktokshopfinds#tiktokmademebuyit #rosemaryoil #fyp",
            "music": "original sound - :)",
            "productList": ["Rosemary Oil For Hair 150ml"]
        },
        {
            "videoContent": 'Are you struggling with hair\
 loss? 🤔\n\
 Free shipping !🤨\n\
 Rosemary Oil For Hair only£6🤩',
            "postContent": "our hair loves this stuff #naturalhair #curlyhair #MomsofTikTok #hairoil ",
            "music": "original sound - :)",
            "productList": ["Rosemary Oil For Hair 150ml"]
        },
        {
            "videoContent": 'If you have hair loss\
 You can use \n"Rosemary\
 Oil"\n to promote hair\
 growth and your hair will\
 become lush.\nstrong &\
 shiner in just two weeks\
 of use!!\n\
    😱😱😱',
            "postContent": "Tried this for the first time my hair feels amazing!!!#blackfriday#tiktokshop#tiktokshopfinds#tiktokmademebuyit #rosemaryoil #fyp",
            "music": "original sound - :)",
            "productList": ["Rosemary Oil For Hair 150ml"]
        },
        {
            "videoContent": 'when you found the plouise has the new product\n\
 Wash Away 2022 Skincare Mystery Box\n\
 Welcome to 2023🤩',
            "postContent": "This sold out so fast!!! RUN RUN RUN🏃‍♀️#plouisemakeup #tiktokshop#tiktokshopfinds #plouisemakeupacademy #plouise_makeup_academy#plouisebase#plouisemysterybox#plouiseluckydip#newproducts#newsrock#tiktokshopping",
            "music": "original sound - :)",
            "productList": ["P.Louise Wash Away 2022 Skincare Mystery Box", "P.Louise Makeup Mystery Box"]
        },
        {
            "videoContent": 'Everything inside The £25\n\
 P.Louise Wash Away 2022\n\
 Skincare Mystery Box',
            "postContent": "This sold out so fast!!! RUN RUN RUN🏃‍♀️#plouisemakeup #tiktokshop#tiktokshopfinds #plouisemakeupacademy #plouise_makeup_academy#plouisebase#plouisemysterybox#plouiseluckydip#newproducts#newsrock#tiktokshopping",
            "music": "original sound - :)",
            "productList": ["P.Louise Wash Away 2022 Skincare Mystery Box", "P.Louise Makeup Mystery Box"]
        },
        {
            "videoContent": 'When you find "P.Louise\n\
 New products-2023 Mystery Box\n\
 worth than £600😍😍\n\
 Now is £25 It\'s a great deal for money!!!',
            "postContent": "This sold out so fast!!! RUN RUN RUN🏃‍♀️#plouisemakeup #tiktokshop#tiktokshopfinds #plouisemakeupacademy #plouise_makeup_academy#plouisebase#plouisemysterybox#plouiseluckydip#newproducts#newsrock#tiktokshopping",
            "music": "original sound - :)",
            "productList": ["P.Louise Wash Away 2022 Skincare Mystery Box", "P.Louise Makeup Mystery Box"]
        },
        {
            "videoContent": 'Come for a sunbed with\n\
 me using 2btanned😘\n\
 last chance to grab it half\n\
 price !!!😍\n\
 linked below',
            "postContent": "quick before the sale ends 🏃‍♀️🏃‍♀️🏃‍♀️ #fyp #viral #tiktokshop #2btanned #2btannedintesifyinggel #foryoupage",
            "music": "original sound - :)",
            "productList": ["2BTanned Intensifying Gel", "2bTanned Extreme Intensifying Tanning Cream"]
        },
        {
            "videoContent": 'when you paid full\n\
 price for 2btanned\n\
 products but now they\n\
 are HALF PRICE on\n\
 tiktok shop😭',
            "postContent": "this is deffo gonna break my bank #fyp #foryou #tanning #tanningbed #tan #sunbeds #2btanned #tanned #sunbed",
            "music": "original sound - :)",
            "productList": ["2BTanned Intensifying Gel", "2bTanned Extreme Intensifying Tanning Cream"]
        },
    ]
}

//点击发布视频按钮
function clickVideoPost() {
    //按钮内容查看  https://blog.csdn.net/qq_43435123/ar5ticle/details/109701395
    //click(585,2346)
    if (dM.search("Pixel 3") != -1) {
        click(Math.ceil(0.50 * device.width), Math.ceil(0.985 * pY))
    } else if (dM.search("Pixel 4") != -1) {
        click(Math.ceil(0.50 * device.width), 2150)
    } else {
        click(Math.ceil(0.50 * device.width), Math.ceil(0.985 * pY))
    }
    toast('视频启动，等待2秒');
    sleep(5000);
}
//添加发布页内容
function addPostContent(video) {
    if (dM.search("Pixel 3") != -1) {
        addPostContentPixel3(video)
    } else if (dM.search("Pixel 4") != -1) {
        addPostContentPixel4(video)
    } else {
        addPostContentOther(video)
    }
}

function selectVideoOther(count) {
    //打开相册
    click(Math.ceil(0.833 * device.width), Math.ceil(0.8125 * pY));
    console.log('点击相册');
    toast('点击相册，等待2秒');
    sleep(5000);

    //相册选择视频tab
    //click(500,335);
    click(Math.ceil(0.463 * device.width), Math.ceil(0.14 * device.height));
    console.log('点击视频tab');
    toast('点击视频tab');
    sleep(5000);

    //第一行视频  x:50 y:450   x:450 y:450   x:850 y:450
    //第二行视频  x:50 y:800   x:450 y:800   x:850 y:800
    //第三行视频  x:50 y:1150   x:450 y:1150   x:850 y:1150
    //根据个数选择视频 (最好是9个之内),i从0开始

    //每个类型的手机都不一样 

    let pXY = setXY(count)
    let videoX = pXY[0]
    let videoY = pXY[1]
    //相册选择视频tab
    click(videoX, videoY)
    console.log('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    toast('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    sleep(5000);
}

function selectVideoPixel3(count) {
    //打开相册
    click(Math.ceil(0.833 * device.width), Math.ceil(0.8125 * pY));
    console.log('点击相册');
    toast('点击相册，等待2秒');
    sleep(5000);

    //相册选择视频tab
    //click(500,335);
    click(Math.ceil(0.463 * device.width), Math.ceil(0.14 * device.height));
    console.log('点击视频tab');
    toast('点击视频tab');
    sleep(5000);

    //第一行视频  x:50 y:450   x:450 y:450   x:850 y:450
    //第二行视频  x:50 y:800   x:450 y:800   x:850 y:800
    //第三行视频  x:50 y:1150   x:450 y:1150   x:850 y:1150
    //根据个数选择视频 (最好是9个之内),i从0开始

    //每个类型的手机都不一样 

    let pXY = setXY(count)
    let videoX = pXY[0]
    let videoY = pXY[1]
    //相册选择视频tab
    click(videoX, videoY)
    console.log('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    toast('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    sleep(5000);

    click(1050, 2650);
    console.log('点击next');
    toast('点击next');
    sleep(5000);
}


function selectVideoPixel4(count) {
    //打开相册
    click(Math.ceil(0.833 * device.width), Math.ceil(0.8125 * pY));
    console.log('点击相册');
    toast('点击相册，等待2秒');
    sleep(5000);

    //相册选择视频tab
    //click(500,335);
    click(Math.ceil(0.463 * device.width), Math.ceil(0.14 * device.height));
    console.log('点击视频tab');
    toast('点击视频tab');
    sleep(5000);

    //第一行视频  x:50 y:450   x:450 y:450   x:850 y:450
    //第二行视频  x:50 y:800   x:450 y:800   x:850 y:800
    //第三行视频  x:50 y:1150   x:450 y:1150   x:850 y:1150
    //根据个数选择视频 (最好是9个之内),i从0开始

    //每个类型的手机都不一样 

    let pXY = setXY(count)
    let videoX = pXY[0]
    let videoY = pXY[1]
    //相册选择视频tab
    click(videoX, videoY)
    console.log('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    toast('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    sleep(5000);
}

function setXY(count) {
    let videoX = 50 + (count % 3) * 400
    let videoY = 450 + (count / 3) * 400

    if (dM.search("Pixel 3") != -1) {
        videoX = 100 + (count % 3) * 500
        videoY = 600 + (count / 3) * 800
    }
    return new Array(videoX, videoY)
}

function addVideoContentPixel3(video) {
    //点击文案按键
    click(Math.ceil(0.92 * device.width), Math.ceil(0.236 * device.height));
    console.log('点击文案按键');
    toast('点击文案按键');
    sleep(2000);

    //选择内容输入到屏幕内
    input(video["videoContent"]);
    console.log('视频文案:' + video["videoContent"]);
    toast('视频文案');
    sleep(2000);

    click(100, 1500);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    //点击完成
    click(1300, 260);
    console.log('点击完成');
    toast('点击完成');
    sleep(2000);

    toast('设置音乐');
    musicAPI.setMusic(ocr);
    sleep(5000);
}


//添加视频内容
function addVideoContentOther(video) {

    //点击文案按键
    click(960, 420);
    console.log('点击文案按键');
    toast('点击文案按键');
    sleep(2000);

    //选择内容输入到屏幕内
    input(video["videoContent"]);
    console.log('视频文案:' + video["videoContent"]);
    toast('视频文案');
    sleep(2000);

    //点击添加边框
    click(90, 1300);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    click(90, 1300);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    click(90, 1300);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    click(780, 1490);
    console.log('点击添加边框');
    toast('点击背景');
    sleep(1000);

    //点击完成
    //1300 260
    click(990, 200);
    console.log('点击完成');
    toast('点击完成');
    sleep(2000);

    toast('设置音乐');
    musicAPI.setMusic(ocr);
    sleep(5000);
}

//添加视频内容
function addVideoContentPixel4(video) {

    //点击文案按键
    click(1000, 550);
    console.log('点击文案按键');
    toast('点击文案按键');
    sleep(2000);

    //选择内容输入到屏幕内
    input(video["videoContent"]);
    console.log('视频文案:' + video["videoContent"]);
    toast('视频文案');
    sleep(2000);

    //点击添加边框
    click(65, 1150);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    click(65, 1150);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    click(65, 1150);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    click(1030, 1300);
    console.log('点击添加背景');
    toast('点击添加背景');
    sleep(1000);

    click(650, 1280);
    console.log('换成粉色');
    toast('换成粉色');
    sleep(1000);
    //点击完成
    //1300 260
    click(1000, 155);
    console.log('点击完成');
    toast('点击完成');
    sleep(2000);

    //pixel4可能会在编辑完文案后弹出一个继续编辑得框，需要点击空白刷下去
    click(50, 350);
    console.log('点击空白');
    toast('点击完成');
    sleep(2000);

    toast('设置音乐');
    musicAPI.setMusic(ocr);
    sleep(5000);
}

//添加发布页内容
function addPostContentOther(video) {
    //点一下
    click(180, 390);
    toast('点下空白');
    console.log('点下空白');
    sleep(2000);

    //敲个空格
    click(530, 2330);
    console.log('敲个空格');
    toast('敲个空格');
    sleep(1000);

    //输入视频文案
    input(video["postContent"] + " ");
    console.log('输入视频文案');
    sleep(2000);



    var pList = video["productList"]
    //循环输入产品 安卓倒序添加
    for (let pIndex = pList.length; pIndex > 0; pIndex--) {
        let pName = pList[pIndex - 1];
        //点击收回键盘
        click(900, 1350);
        console.log('点击收回键盘');
        sleep(2000);

        //点击添加产品
        click(900, 1350);
        console.log('点击添加产品');
        sleep(2000);

        //点击弹出框添加产品
        click(360, 1850);
        console.log('点击弹出框添加产品');
        sleep(10000);

        //点击搜索产品
        click(250, 350);
        console.log('点击搜索产品');
        sleep(2000);

        //输入产品名称
        setClip(pName)
        sleep(500)
        press(220, 360, 2000) //长按拉出粘贴键
        sleep(500)
        click(160, 250)
        console.log('输入产品名称：' + pName);
        sleep(1000);

        //点击键盘搜索
        click(950, 2300);
        console.log('点击搜索产品');
        sleep(10000);

        //选择第一个搜索结果（这一步有点问题，我忽然想到一个解决办法）
        click(900, 800);
        console.log('选择第一个搜索结果');
        sleep(5000);

        //选择弹出框的添加 （选个中间的点，这一步可有可无）
        click(600, 1260);
        console.log('选择弹出框的添加');
        sleep(5000); //这一步有个验证


        //最好是要删除文本框内文案，重新输入

        //选择弹出框的添加 （选个中间的点，这一步可有可无）
        click(430, 770);
        console.log('选择弹出框的添加');
        sleep(5000);
    }

    //点击收回键盘
    click(900, 1350);
    console.log('点击收回键盘');
    sleep(2000);

    //点击post
    click(800, 2300);
    console.log('点击post');
}

//添加发布页内容
function addPostContentPixel3(video) {
    //点一下
    click(200, 450);
    toast('点下空白');
    console.log('点下空白');
    sleep(2000);

    //敲个空格
    click(700, 2700);
    console.log('敲个空格');
    toast('敲个空格');
    sleep(2000);

    //输入视频文案
    input(video["postContent"] + " ");
    console.log('输入视频文案');
    sleep(2000);

    var pList = video["productList"]
    //循环输入产品 安卓倒序添加
    for (let pIndex = pList.length; pIndex > 0; pIndex--) {
        let pName = pList[pIndex - 1];
        //点击收回键盘
        click(1010, 1010);
        console.log('点击收回键盘');
        sleep(2000);

        //点击添加产品
        click(1150, 1620);
        console.log('点击添加产品');
        sleep(2000);

        //点击弹出框添加产品
        click(1000, 1850);
        console.log('点击弹出框添加产品');
        sleep(10000);

        //点击搜索产品
        click(250, 450);
        console.log('点击搜索产品');
        sleep(2000);

        //输入产品名称
        setClip(pName)
        sleep(500)
        press(250, 450, 2000) //长按拉出粘贴键
        sleep(500)
        click(150, 300)
        console.log('输入产品名称：' + pName);
        sleep(1000);

        //点击键盘搜索
        click(1320, 2660);
        console.log('点击搜索产品');
        sleep(10000);

        //选择第一个搜索结果（这一步有点问题，我忽然想到一个解决办法）
        click(1220, 970);
        console.log('选择第一个搜索结果');
        sleep(5000);

        //选择弹出框的添加 （选个中间的点，这一步可有可无）
        click(730, 1630);
        console.log('选择弹出框的添加');
        sleep(5000); //这一步有个验证


        //最好是要删除文本框内文案，重新输入

        //选择弹出框的添加 （选个中间的点，这一步可有可无）
        click(750, 950);
        console.log('选择弹出框的添加');
        sleep(5000);

        //点击收回键盘
        click(1010, 1010);
        console.log('点击收回键盘');
        sleep(2000);
    }
    //点击post
    click(1000, 2700);
    console.log('点击post');
}

//添加发布页内容
function addPostContentPixel4(video) {
    //点一下
    click(180, 390);
    toast('点下空白');
    console.log('点下空白');
    sleep(2000);

    //敲个空格
    click(530, 2070);
    console.log('敲个空格');
    toast('敲个空格');
    sleep(1000);

    //输入视频文案
    input(video["postContent"] + " ");
    console.log('输入视频文案');
    sleep(2000);



    var pList = video["productList"]
    //循环输入产品 安卓倒序添加
    for (let pIndex = pList.length; pIndex > 0; pIndex--) {
        let pName = pList[pIndex - 1];
        //点击收回键盘
        click(900, 1350);
        console.log('点击收回键盘');
        sleep(2000);

        //点击添加产品
        click(900, 1220);
        console.log('点击添加产品');
        sleep(2000);

        //点击弹出框添加产品
        click(360, 1500);
        console.log('点击弹出框添加产品');
        sleep(10000);

        //点击搜索产品
        click(250, 300);
        console.log('点击搜索产品');
        sleep(2000);

        //输入产品名称
        setClip(pName)
        sleep(500)
        press(220, 300, 2000) //长按拉出粘贴键
        sleep(500)
        click(160, 180)
        console.log('输入产品名称：' + pName);
        sleep(1000);

        //点击键盘搜索
        click(1000, 2070);
        console.log('点击搜索产品');
        sleep(10000);

        //选择第一个搜索结果（这一步有点问题，我忽然想到一个解决办法）
        click(900, 700);
        console.log('选择第一个搜索结果');
        sleep(5000);

        //选择弹出框的添加 （选个中间的点，这一步可有可无）
        click(600, 1260);
        console.log('选择弹出框的添加');
        sleep(5000); //这一步有个验证


        //最好是要删除文本框内文案，重新输入

        //选择弹出框的添加 （选个中间的点，这一步可有可无）
        click(500, 700);
        console.log('选择弹出框的添加');
        sleep(5000);
    }

    //点击收回键盘
    click(900, 1350);
    console.log('点击收回键盘');
    sleep(2000);

    //点击post
    click(800, 2150);
    console.log('点击post');
}