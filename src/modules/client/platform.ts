        core.platform.isOnline = location.protocol.indexOf("http") == 0;
        if (!core.platform.isOnline) alert("请勿直接打开html文件！使用启动服务或者APP进行离线游戏。");
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"].forEach(function (t) {
            if (navigator.userAgent.indexOf(t) >= 0) {
                if (t == 'iPhone' || t == 'iPad' || t == 'iPod') core.platform.isIOS = true;
                if (t == 'Android') core.platform.isAndroid = true;
                core.platform.isPC = false;
            }
        });
        core.platform.string = core.platform.isPC ? "PC" : core.platform.isAndroid ? "Android" : core.platform.isIOS ? "iOS" : "";
        var chrome = /Chrome\/(\d+)\./i.exec(navigator.userAgent);
        if (chrome && parseInt(chrome[1]) >= 50) core.platform.isChrome = true;
        core.platform.isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
        core.platform.isQQ = /QQ/i.test(navigator.userAgent);
        core.platform.isWeChat = /MicroMessenger/i.test(navigator.userAgent);
    
        core.flags.enableHDCanvas = core.getLocalStorage('enableHDCanvas', !core.platform.isIOS);
        if (main.mode != 'editor') {
            core.domStyle.scale = core.getLocalStorage('scale', 1);
            if (core.flags.enableHDCanvas) core.domStyle.ratio = Math.max(window.devicePixelRatio || 1, core.domStyle.scale);
        }