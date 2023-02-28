var dM = device.model
var pX = device.width //vivo 1080, pixel4 1080
var pY = device.height //vivo 2400,pixel4 2280
if (dM.search("Pixel 3") != -1) {
    pY = pY - 180
}
var musicAPI = require('music.js');
var httpAPI = require('http.js');
// var FileAPI = require('file.js')

main()

function main() {
    //
    checkAccessibilityService()
    toast("群控脚本启动");
    //打开tk
    openTiktok()

    //获取视频配置列表

    //判断视频形式
    selectVideoType(0)

}

function checkAccessibilityService(){
}

function selectVideoType(type) {
    //0 怼墙拍
    if (type == 0) {
        normalFlow(type)
    } else if (type == 1) {
        //1 生成视频
        greanScreenFlow(type)
    }
}

//判断视频形式，0:老形式  1:抠图形式
function normalFlow(vType) {

    var postList = GetPostList()

    //循环发视频
    for (let index = 0; index < postList.length; index++) {

        //等待视频生成一分钟，如果不是第一次执行，则再随机等待1~3分钟
        toastLog("等待视频发布，1分钟");

        //点击发布视频按钮
        clickVideoPost()
        //let video = creativeList[index];
        //选择一个视频 
        //selectVideo(index, vType);
        //改了，现在需要重新拍一个视频
        newVideo(index,vType)

        content = postList[index]
        //添加视频内容
        addvideo_content(content);

        //添加视频内容
        addpost_content(content);

        //加个随机数
        let ran = Math.floor(Math.random() * 120000);
        toast('点击发送，等待' + ((60000 + ran) / 60000) + '分钟');
        sleep(60000 + ran);
    }

    // 气泡提示执行结束
    toast("执行结束");
}

function newVideo(){
        press(537,1827, 6000) //长按6秒拍摄视频
        sleep(2000)
        click(954, 1837) //点击对勾
        console.log('输入产品名称：' + pName);
        sleep(1000);
 
}


//判断视频形式，0:老形式  1:抠图形式
function greanScreenFlow(vType) {
    //根据用户名查询该用户的配置
    //creativeList = httpAPI.getCreativeListByUserName("kimibest_shoper")

    //获取本次需要发送的产品ID列
    var creativeList = [7,8,9,10,11]

    //循环发视频
    for (let index = 0; index < creativeList.length; index++) {
        //根据产品ID获取需要投放的创意
        // creativeID = httpAPI.getCreativeIDByProduct(postList[index])

        //根据创意ID获取发布文案
        content = httpAPI.getContentByCreativeID(creativeList[index])

        //根据创意ID生成视频
        taskID = httpAPI.getTaskByCreativeID(creativeList[index])
        if (taskID == "500") {
            continue;
        }

        //等待视频生成一分钟，如果不是第一次执行，则再随机等待1~3分钟
        toastLog("等待视频制作，1分钟");
        //sleep(60000)
        if (index != 0) {
            //加个随机数
            let ran = Math.floor(Math.random() * 120000);
            toast('点击发送，等待' + ((60000 + ran) / 60000) + '分钟');
            sleep(60000 + ran);
        }

        //判断模式，是需要拍摄视频还是请求视频
        //这个之后再做  

        //根据创意ID生成视频
        httpAPI.getVideoByTaskID(taskID, 0)

        //点击发布视频按钮
        clickVideoPost()
        //let video = creativeList[index];
        //选择一个视频 //这里也需要改，得看模式了,如果模式1的话得新拍一个视频
        selectVideo(index, vType);

        //添加视频内容
        addvideo_content(content);

        //添加视频内容
        addpost_content(content);
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

function selectVideo(count, vtype) {

    if (dM.search("Pixel 3") != -1) {
        //添加视频内容
        selectVideoPixel3(count);
    } else if (dM.search("Pixel 4") != -1) {
        //添加视频内容
        selectVideoPixel4(count, vtype);
    } else {
        //添加视频内容
        selectVideoOther(count);
    }
}

function addvideo_content(video) {
    if (dM.search("Pixel 3") != -1) {
        //添加视频内容
        addvideo_contentPixel3(video);
    } else if (dM.search("Pixel 4") != -1) {
        //添加视频内容
        addvideo_contentPixel4(video);
    } else {
        //添加视频内容
        addvideo_contentOther(video);
    }
}

//获取文案列表
function GetPostList() {
    //获取文案列表
    return [
        {
            "video_content": "Ok but how is this Rosemary oil only £7.2?!😲🤩",
            "post_content": "#tiktokshop#tiktokshopfinds",
            "music": "original sound - :)",
            "product_list": ["rosemary oil"]
        },
        {
            "video_content": "Best setting spray EVERRRR😍",
            "post_content": "Setting spray is v v v important mwah💦#tiktokshop#tiktokshopfinds",
            "music": "original sound - :)",
            "product_list": ["Oui Cherie Mist"]
        },
        {
            "video_content": "I'm a fat girl,but I found the best way to lose wight before summer🧐",
            "post_content": "#tiktokshop#tiktokshopfinds",
            "music": "original sound - :)",
            "product_list": ["K-Mart Smart Weighted Hula Hoop Pro with Counter"]
        },
        {
            "video_content": "This is the best Powder Puff on tiktok shop <33 😍",
            "post_content": "#tiktokshop#tiktokshopfinds",
            "music": "original sound - :)",
            "product_list": ["Velvet Powder Puff"]
        },
        {
            "video_content": "Every girl needs this bag <33 😍 so cute🤩",
            "post_content": "#tiktokshop#tiktokshopfinds",
            "music": "original sound - :)",
            "product_list": ["F8257 Luggage Small Bag Women's Crossbody"]
        },
        {
            "video_content": "Ok but this suit will make him fall deep in love w u😍",
            "post_content": "#tiktokshop#tiktokshopfinds",
            "music": "original sound - :)",
            "product_list": ["[Curlady] 2023 New Women Shaping Bodysuit Tummy Control Shapewear"]
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
function addpost_content(video) {
    if (dM.search("Pixel 3") != -1) {
        addpost_contentPixel3(video)
    } else if (dM.search("Pixel 4") != -1) {
        addpost_contentPixel4(video)
    } else {
        addpost_contentOther(video)
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


    //点击next 
    toast('点击next');
    click(871, 2288);
    sleep(3000);


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

}


function selectVideoPixel4(count, vtype) {
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
    if (vtype == 0) {
        //相册选择视频tab
        click(videoX, videoY)
    } else if (vtype == 1) {
        click(50, 450)
    }

    console.log('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    toast('点击第' + count + '个视频,x:' + videoX + ',y:' + videoY);
    sleep(5000);
    re = musicAPI.checkText("Select")
    if (re != 0) {
        toast('点击next');
        // click(880, re);
        click(956, 2131);
        sleep(2000);
    }
}

function setXY(count) {
    let videoX = 50 + (count % 3) * 400
    let videoY = 450 + (count / 3) * 400

    if (dM.search("Pixel 3") != -1) {
        videoX = 100 + (count % 3) * 500
        videoY = 600 + (count / 3) * 800
    }

    if (dM.search("Pixel 4") != -1) {
        videoX = 80 + (count % 3) * 400
        videoY = 450 + (count / 3) * 400

    }
    return new Array(videoX, videoY)
}

function addvideo_contentPixel3(video) {
    //点击文案按键
    click(Math.ceil(0.92 * device.width), Math.ceil(0.236 * device.height));
    console.log('点击文案按键');
    toast('点击文案按键');
    sleep(2000);

    //选择内容输入到屏幕内
    input(video["video_content"]);
    console.log('视频文案:' + video["video_content"]);
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
    musicAPI.setMusic();
    sleep(5000);
}


//添加视频内容
function addvideo_contentOther(video) {

    //点击文案按键
    click(310, 2300);
    console.log('点击文案按键');
    toast('点击文案按键');
    sleep(2000);

    //选择内容输入到屏幕内
    input(video["video_content"]);
    console.log('视频文案:' + video["video_content"]);
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
    musicAPI.setMusic();
    sleep(5000);
}

//添加视频内容
function addvideo_contentPixel4(video) {

    musicAPI.clickText("Text")
    //点击文案按键
    // click(1000, 550);
    // console.log('点击文案按键');
    // toast('点击文案按键');
    // sleep(2000);

    //选择内容输入到屏幕内
    input(video["video_content"]);
    console.log('视频文案:' + video["video_content"]);
    toast('视频文案');
    sleep(2000);

    //点击添加边框
    click(65, 1150);
    console.log('点击添加边框');
    toast('点击添加边框');
    sleep(1000);

    // click(65, 1150);
    // console.log('点击添加边框');
    // toast('点击添加边框');
    // sleep(1000);

    // click(65, 1150);
    // console.log('点击添加边框');
    // toast('点击添加边框');
    // sleep(1000);

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
    musicAPI.setMusic();
    sleep(5000);
}

//添加发布页内容
function addpost_contentOther(video) {
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
    input(video["post_content"] + " ");
    console.log('输入视频文案');
    sleep(2000);



    var pList = video["product_list"]
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
function addpost_contentPixel3(video) {
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
    input(video["post_content"] + " ");
    console.log('输入视频文案');
    sleep(2000);

    var pList = video["product_list"]
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
function addpost_contentPixel4(video) {
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
    input(video["post_content"] + " ");
    console.log('输入视频文案');
    sleep(2000);



    var pList = video["product_list"]
    //循环输入产品 安卓倒序添加
    for (let pIndex = pList.length; pIndex > 0; pIndex--) {
        let pName = pList[pIndex - 1];
        //点击收回键盘
        click(180, 2226);
        console.log('点击收回键盘');
        sleep(2000);

        //点击添加产品
        re = musicAPI.checkText("link")
        if (re == 0) {
            toast('点击添加产品');
            click(900, 1220);
            sleep(2000);
        }

        //点击弹出框添加产品
        re = musicAPI.checkText("product")
        if (re == 0) {
            click(360, 1500);
            console.log('点击弹出框添加产品');
            sleep(10000);
        }

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
        click(600, 1160);
        console.log('选择弹出框的添加');
        sleep(5000); //这一步有个验证


        //最好是要删除文本框内文案，重新输入

        //选择弹出框的添加 （选个中间的点，这一步可有可无）
        click(500, 700);
        console.log('选择弹出框的添加');
        sleep(5000);
    }

    //点击收回键盘
    click(200, 2222);
    console.log('点击收回键盘');
    sleep(2000);

    //点击post
    click(800, 2150);
    console.log('点击post');
}

