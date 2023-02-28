var httpAPI = {};
//图片上传
var xhr;
var server = "http://45.32.95.28/"

//根据产品请求创意
httpAPI.getCreativeIDByProduct = function (productID) {
    //先暂定1
    return 1
}

//获取Baidu OCR token
httpAPI.getBaiduToken = function () {
    jsonr = httpAPI.fa_get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=gNbzrlb3VUOetvrjqv9emxTI&client_secret=TZabBufkPlrmbKIQtfxf6Tl6xgxvqQuD", 1);//JSON.parse(r);
    if (jsonr == undefined) {
        toastLog("获取视频内容失败");
    }
    return jsonr.access_token

}

httpAPI.getOCRResult = function (token, imgBase64) {
    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=" + token;
    var res = http.post(url, postdata, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        form: {
            'image': imgBase64,
            'language_type': 'ENG'
        }
    });
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
    } else {
        toast("请求成功");
    }
    toastLog("响应头：" + res.headers)
    toastLog("响应体：" + res.body.string());
    return res.body.json()
}

//请求创意内容
httpAPI.getContentByCreativeID = function (creativeID) {
    jsonr = httpAPI.fa_get(server + "tk/getcontent/id=" + creativeID, 1);//JSON.parse(r);
    if (jsonr == undefined) {
        toastLog("获取视频内容失败");
    }
    return jsonr
}

//根据任务ID下载视频
httpAPI.getTaskByCreativeID = function (creativeID) {
    //请求创意ID，并获取下载地址
    jsonr = httpAPI.fa_get(server + "tk/getcreate/id=" + creativeID, 1);//JSON.parse(r);
    if (jsonr == undefined) {
        //震动提示
        device.vibrate(1000);
        toastLog("视频服务器连接失败");
        sleep(1000)
        device.vibrate(1000);
        toastLog("视频服务器连接失败");
        sleep(1000)
        device.vibrate(1000);
        toastLog("视频服务器连接失败");
        sleep(1000)
        return "500" //视频服务连接失败
    }
    return jsonr.taskID
}
httpAPI.getTaskStatus = function (taskID) {
    var tstatus = httpAPI.fa_get(server + "tk/get_task_status/id=" + taskID, 1);
    if (tstatus == undefined) {
        toastLog("获取任务状态失败");
        return false
    }
    return tstatus.status
}
//根据任务ID下载视频
httpAPI.getVideoByTaskID = function (taskID, times) {

    for (let i = 0; i < 6; i++) {
        if (!httpAPI.getTaskStatus(taskID)) {
            toastLog("服务未完成，等待重试，次数:" + i + ",任务ID:" + taskID);
            if (i == 6) {
                //震动提示
                device.vibrate(1000);
                toastLog("视频下载失败"); i
                sleep(1000)
                device.vibrate(1000);
                toastLog("视频下载失败");
                sleep(1000)
                device.vibrate(1000);
                toastLog("视频下载失败");
                sleep(1000)
                break
            }
            sleep(30000);
        } else {
            break
        }
    }
    var r = httpAPI.fa_get(server + "tk/download/t=" + taskID, 2);
    if (r == undefined) {
        toastLog("服务未完成，等待重试，任务ID:" + taskID);
        sleep(10000);
        //等待10秒重试
        r = httpAPI.fa_get(server + "tk/download/t=" + taskID, 2);
    }
    toastLog("视频下载成功,等待文件写入");
    //等待写入完成
    sleep(10000);
    path = '/storage/emulated/0/DCIM/Camera/'
    fre = files.create(path);  //创建文件或文件夹 如果存在 返回false
    if (fre) {
        console.log("创建文件夹")
    }
    // var scriptPath = path+jsonr.video_src;
    var scriptPath = path + taskID + ".mp4";
    files.writeBytes(scriptPath, r);
    // 必须扫一下，要不查不到
    media.scanFile(scriptPath);
    toastLog("下载结束");

}


httpAPI.fileDownloadTest = function (fileUrl, fileName) {
    if ("undefined" == typeof fileUrl || !fileUrl) {
        alert('文件路径不能为空'); return false;
    }
    var fileUrlArr = fileUrl.split(',');
    var fileFix = "undefined" != typeof fileUrlArr[1] && fileUrlArr[1] ? fileUrlArr[1] : '';
    var link = document.createElement('a');  //创建a标签
    var body = document.querySelector('body');  //获取body元素
    link.href = fileUrl; // href赋值
    link.download = fileName + fileFix; // 下载文件名称
    link.style.display = 'none'; // fix Firefox 设置隐藏
    body.appendChild(link); // a标签添加到页面
    link.click(); //设置a标签触发单击事件
    body.removeChild(link); //移除a标签
    window.URL.revokeObjectURL(link.href); // 释放创建的对象
}

httpAPI.fa_get = function (url123, mods) {

    var fan = undefined;
    var codeee = undefined;
    try {

        codeee = http.get(url123)
    } catch (e) {

        codeee = undefined;
        console.log("[fa_get]", "get异常1：" + e)
    }
    if (codeee == undefined) {

        try {

            codeee = http.get(url123)
        } catch (e) {

            codeee = undefined;
            console.log("[fa_get]", "get异常2：" + e)
        }
        if (codeee == undefined) {

            try {

                sleep(5000);
                codeee = http.get(url123)
            } catch (e) {

                codeee = undefined;
                console.log("[fa_get]", "get异常3：" + e)
            }
        }
    }
    if (codeee != undefined && codeee.statusCode == 200) {
        console.log(codeee)
        if (mods == 0) {

            try {

                fan = codeee.body.string()
            } catch (e) {

                fan = undefined;
                console.log("[fa_get]", "codeee.body.string()：" + e)
            }
        } else if (mods == 1) {

            try {

                fan = codeee.body.json()
            } catch (e) {

                fan = undefined;
                console.log("[fa_get]", "codeee.body.json()：" + e)
            }
        } else if (mods == 2) {

            try {

                fan = codeee.body.bytes()
            } catch (e) {

                fan = undefined;
                console.log("[fa_get]", "codeee.body.bytes()：" + e)
            }
        } else if (mods == 3) {

            try {

                fan = codeee.body
            } catch (e) {

                fan = undefined;
                console.log("[fa_get]", "codeee.body：" + e)
            }
        }
    }
    return fan
}

httpAPI.PostCreativeData = function () {

}


//上传文件方法
httpAPI.UploadFile = function () {
    var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    var url = "http://45.32.95.28/tk/greenscreen"; // 接收上传文件的后台地址

    var form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象

    xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
    xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
    xhr.onload = uploadComplete; //请求完成
    xhr.onerror = uploadFailed; //请求失败

    xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
    xhr.upload.onloadstart = function () {//上传开始执行方法
        ot = new Date().getTime();   //设置上传开始时间
        oloaded = 0;//设置上传开始时，以上传的文件大小为0
    };

    xhr.send(form); //开始上传，发送form数据
}

//下载文件方法
httpAPI.DownloadVideo = function (url, fileName) {
    // 请求进来，就可以加在loading
    fetch(url).then(res => {
        return res.blob()
    }).then(blob => {
        // 这是一个外部引用的download.js文件，这个文件，在下面，可以粘贴到你的项目使用
        DownloadAPI.download(blob, fileName)
        // 下载结束，loading结束
    }).catch(err => {
        console.log(err)
        return false
    }).finally(res => {
        // 这里也可以结束loading。不管是成功失败，都会结束loading
        return true
    })
}

//上传成功响应
function uploadComplete(evt) {
    //服务断接收完文件返回的结果

    var data = JSON.parse(evt.target.responseText);
    if (data.success) {
        alert("上传成功！");
    } else {
        alert("上传失败！");
    }

}
//上传失败
function uploadFailed(evt) {
    alert("上传失败！");
}
//取消上传
function cancleUploadFile() {
    xhr.abort();
}


//上传进度实现方法，上传过程中会频繁调用该方法
function progressFunction(evt) {
    var progressBar = document.getElementById("progressBar");
    var percentageDiv = document.getElementById("percentage");
    // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
    if (evt.lengthComputable) {//
        progressBar.max = evt.total;
        progressBar.value = evt.loaded;
        percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
    }
    var time = document.getElementById("time");
    var nt = new Date().getTime();//获取当前时间
    var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
    ot = new Date().getTime(); //重新赋值时间，用于下次计算
    var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
    oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
    //上传速度计算
    var speed = perload / pertime;//单位b/s
    var bspeed = speed;
    var units = 'b/s';//单位名称
    if (speed / 1024 > 1) {
        speed = speed / 1024;
        units = 'k/s';
    }
    if (speed / 1024 > 1) {
        speed = speed / 1024;
        units = 'M/s';
    }
    speed = speed.toFixed(1);
    //剩余时间
    var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
    time.innerHTML = '，速度：' + speed + units + '，剩余时间：' + resttime + 's';
    if (bspeed == 0) time.innerHTML = '上传已取消';
}
module.exports = httpAPI;