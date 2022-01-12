
class Platform {

    string: string
    /** 是否http */isOnline: boolean
    /** 是否是PC */isPC: boolean
    /** 是否是Android */isAndroid: boolean
    /** 是否是iOS */isIOS: boolean
    /** 是否是Safari */isSafari: boolean
    /** 是否是微信 */isWeChat: boolean
    /** 是否是QQ */isQQ: boolean
    /** 是否是Chrome */isChrome: boolean

    constructor() {
        this.isOnline = location.protocol.indexOf("http") === 0;
        if (!this.isOnline) {
            alert("请勿直接打开html文件！使用启动服务或者APP进行离线游戏。");
        }
        this.isPC = true;
        this.isAndroid = false;
        this.isIOS = false;
        ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"].forEach((t) => {
            if (navigator.userAgent.includes(t)) {
                if (t === 'iPhone' || t === 'iPad' || t === 'iPod') this.isIOS = true;
                if (t === 'Android') this.isAndroid = true;
                this.isPC = false;
            }
        });
        this.string = this.isPC ? "PC" : this.isAndroid ? "Android" : this.isIOS ? "iOS" : "";
        const chrome = /Chrome\/(\d+)\./i.exec(navigator.userAgent);
        this.isChrome = chrome !== null && parseInt(chrome[1]) >= 50;
        this.isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
        this.isQQ = /QQ/i.test(navigator.userAgent);
        this.isWeChat = /MicroMessenger/i.test(navigator.userAgent);
    }
}

export const platform = new Platform();
