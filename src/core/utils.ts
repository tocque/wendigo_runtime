/**
 * @module utils.ts 工具类
 * 
 */

import { addToClipboard } from "@/modules/client/clipboard";
import { download } from "@/modules/client/download";
import { decodeBase64, encodeBase64 } from "@/utils/common";
import { core } from "./core";
import { decodeRoute, encodeRoute } from "./route";

export class Utils {

    readonly scan = {
        'up': { 'x': 0, 'y': -1 },
        'left': { 'x': -1, 'y': 0 },
        'down': { 'x': 0, 'y': 1 },
        'right': { 'x': 1, 'y': 0 }
    };
    readonly scan2 = {
        'up': { 'x': 0, 'y': -1 },
        'left': { 'x': -1, 'y': 0 },
        'down': { 'x': 0, 'y': 1 },
        'right': { 'x': 1, 'y': 0 },
        'leftup': { 'x': -1, 'y': -1 },
        'leftdown': { 'x': -1, 'y': 1 },
        'rightup': { 'x': 1, 'y': -1 },
        'rightdown': { 'x': 1, 'y': 1 }
    };

    constructor() {
        this._init();
    }
    _init() {
        // 改用 polyfill.min.js 实现

        // // 定义Object.assign
        // if (typeof Object.assign != "function") {
        //     Object.assign = function (target, varArgs) {
        //         if (target == null) { // TypeError if undefined or null
        //             throw new TypeError('Cannot convert undefined or null to object');
        //         }

        //         var to = Object(target);

        //         for (var index = 1; index < arguments.length; index++) {
        //             var nextSource = arguments[index];

        //             if (nextSource != null) { // Skip over if undefined or null
        //                 for (var nextKey in nextSource) {
        //                     // Avoid bugs when hasOwnProperty is shadowed
        //                     if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
        //                         to[nextKey] = nextSource[nextKey];
        //                     }
        //                 }
        //             }
        //         }
        //         return to;
        //     };
        // }
        // if (typeof String.prototype.endsWith != "function") {
        //     String.prototype.endsWith = function (search, this_len) {
        //         if (this_len === undefined || this_len > this.length) {
        //             this_len = this.length;
        //         }
        //         return this.substring(this_len - search.length, this_len) === search;
        //     };
        // }
        // if (typeof String.prototype.startsWith != "function") {
        //     String.prototype.startsWith = function (search, this_len) {
        //         if (this_len === undefined || this_len > this.length) {
        //             this_len = this.length;
        //         }
        //         return this.substring(0, search.length) === search;
        //     };
        // }
        // if (typeof Array.prototype.fill != "function") {
        //     Array.prototype.fill = function (value) {
        //         for (var i = 0; i < this.length; ++i)
        //             if (this[i] == null)
        //                 this[i] = value;
        //         return this;
        //     };
        // }
        // if (typeof Array.prototype.includes != "function") {
        //     Array.prototype.includes = function (value) {
        //         return this.indexOf(value) >= 0;
        //     };
        // }
        // if (typeof String.prototype.includes != "function") {
        //     String.prototype.includes = function (value) {
        //         return this.indexOf(value) >= 0;
        //     };
        // }
        // if (typeof Object.values != "function") {
        //     Object.values = function (obj) {
        //         return Object.keys(obj).map(function (one) { return obj[one]; });
        //     };
        // }
    }

    /////////// 游戏逻辑相关 ///////////
    
    /**
     * 将一段文字中的${}（表达式）进行替换。
     * @example core.replaceText('衬衫的价格是${status:hp}镑${item:yellowKey}便士。'); // 把主角的生命值和持有的黄钥匙数量代入这句话
     * @param text 模板字符串，可以使用${}计算js表达式，支持“状态、物品、变量、独立开关、全局存储、图块id、图块类型、敌人数据、装备id”等量参与运算
     * @returns 替换完毕后的字符串
     */
    replaceText(text: string, prefix?: string): string {
        if (typeof text != 'string')
            return text;
        const index = text.indexOf("${");
        if (index < 0)
            return text;
        let cnt = 0, curr = index;
        while (++curr < text.length) {
            if (text.charAt(curr) == '{')
                cnt++;
            if (text.charAt(curr) == '}')
                cnt--;
            if (cnt == 0)
                break;
        }
        if (cnt != 0)
            return text;
        let value = this.calValue(text.substring(index + 2, curr), prefix);
        if (value == null)
            value = "";
        return text.substring(0, index) + value + this.replaceText(text.substring(curr + 1), prefix);
    }

    /**
     * 对一个表达式中的特殊规则进行替换，如status:xxx等。
     * @example core.replaceValue('衬衫的价格是${status:hp}镑${item:yellowKey}便士。'); // 把这两个冒号表达式替换为core.getStatus('hp')和core.itemCount('yellowKey')这样的函数调用
     * @param value 模板字符串，注意独立开关不会被替换
     * @returns 替换完毕后的字符串
     */
    replaceValue(value: string) {
        if ((value.indexOf(":") >= 0 || value.indexOf("flag：") >= 0 || value.indexOf('global：') >= 0)) {
            if (value.indexOf('status:') >= 0)
                value = value.replace(/status:([a-zA-Z0-9_]+)/g, "core.getStatus('$1')");
            if (value.indexOf('buff:') >= 0)
                value = value.replace(/buff:([a-zA-Z0-9_]+)/g, "core.getBuff('$1')");
            if (value.indexOf('item:') >= 0)
                value = value.replace(/item:([a-zA-Z0-9_]+)/g, "core.itemCount('$1')");
            if (value.indexOf('flag:') >= 0 || value.indexOf('flag：') >= 0)
                value = value.replace(/flag[:：]([a-zA-Z0-9_\u4E00-\u9FCC\u3040-\u30FF\u2160-\u216B\u0391-\u03C9]+)/g, "core.getFlag('$1', 0)");
            //if (value.indexOf('switch:' >= 0))
            //    value = value.replace(/switch:([a-zA-Z0-9_]+)/g, "core.getFlag('" + (prefix || ":f@x@y") + "@$1', 0)");
            if (value.indexOf('global:') >= 0 || value.indexOf('global：') >= 0)
                value = value.replace(/global[:：]([a-zA-Z0-9_\u4E00-\u9FCC\u3040-\u30FF\u2160-\u216B\u0391-\u03C9]+)/g, "core.getGlobal('$1', 0)");
            if (value.indexOf('enemy:') >= 0)
                value = value.replace(/enemy:([a-zA-Z0-9_]+)[\.:]([a-zA-Z0-9_]+)/g, "core.material.enemys['$1'].$2");
            if (value.indexOf('blockId:') >= 0)
                value = value.replace(/blockId:(\d+),(\d+)/g, "core.getBlockId($1, $2)");
            if (value.indexOf('blockNumber:') >= 0)
                value = value.replace(/blockNumber:(\d+),(\d+)/g, "core.getBlockNumber($1, $2)");
            if (value.indexOf('blockCls:') >= 0)
                value = value.replace(/blockCls:(\d+),(\d+)/g, "core.getBlockCls($1, $2)");
            if (value.indexOf('equip:') >= 0)
                value = value.replace(/equip:(\d)/g, "core.getEquip($1)");
            if (value.indexOf('temp:') >= 0)
                value = value.replace(/temp:([a-zA-Z0-9_]+)/g, "core.getFlag('@temp@$1', 0)");
        }
        return value;
    }

    /**
     * 计算一个表达式的值，支持status:xxx等的计算。
     * @example core.calValue('status:hp + status:def'); // 计算主角的生命值加防御力
     * @param value 待求值的表达式
     * @param prefix 独立开关前缀，一般可省略
     * @returns 求出的值
     */
    calValue(value: string, prefix?: string) {
        if (value.includes(':') || value.includes("flag：") || value.includes('global：')) {
            if (value.includes('switch:'))
                value = value.replace(/switch:([a-zA-Z0-9_]+)/g, "core.getFlag('" + (prefix || ":f@x@y") + "@$1', 0)");
            value = this.replaceValue(value);
        }
        return eval(value) as string;
    }
    /**
     * 将b（可以是另一个数组）插入数组a的开头，此函数用于弥补a.unshift(b)中b只能是单项的不足。
     * @deprecated
     * @example core.unshift(todo, {type: 'unfollow'}); // 在事件指令数组todo的开头插入“取消所有跟随者”指令
     * @param a 原数组
     * @param b 待插入的新首项或前缀数组
     * @returns 插入完毕后的新数组，它是改变原数组a本身得到的
     */
    unshift(a: any[], b: any) {
        if (!(a instanceof Array) || b == null)
            return;
        if (b instanceof Array) {
            core.clone(b).reverse().forEach(function (e) {
                a.unshift(e);
            });
        }
        else
            a.unshift(b);
        return a;
    }

    /**
     * 将b（可以是另一个数组）插入数组a的末尾，此函数用于弥补a.push(b)中b只能是单项的不足。
     * @deprecated
     * @example core.push(todo, {type: 'unfollow'}); // 在事件指令数组todo的末尾插入“取消所有跟随者”指令
     * @param a 原数组
     * @param b 待插入的新末项或后缀数组
     * @returns 插入完毕后的新数组，它是改变原数组a本身得到的
     */
    push(a: any[], b: any) {
        if (!(a instanceof Array) || b == null)
            return;
        if (b instanceof Array) {
            core.clone(b).forEach(function (e) {
                a.push(e);
            });
        }
        else
            a.push(b);
        return a;
    }

    /////////// 存储逻辑相关 ///////////

    // decompress(value) {
    //     try {
    //         var output = lzw_decode(value);
    //         if (output)
    //             return JSON.parse(output);
    //     }
    //     catch (e) {
    //     }
    //     try {
    //         var output = LZString.decompress(value);
    //         if (output)
    //             return JSON.parse(output);
    //     }
    //     catch (e) {
    //     }
    //     try {
    //         return JSON.parse(value);
    //     }
    //     catch (e) {
    //         main.log(e);
    //     }
    //     return null;
    // }

    /**
     * 设置本地存储
     * @deprecated
     */
    setLocalStorage(key: string, value?: any) {
        try {
            if (value == null) {
                this.removeLocalStorage(key);
                return;
            }

            var str = JSON.stringify(value).replace(/[\u007F-\uFFFF]/g, function (chr) {
                return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4);
            });
            localStorage.setItem(core.firstData.name + "_" + key, str);

            if (key == 'autoSave')
                core.saves.ids[0] = true;
            else if (/^save\d+$/.test(key))
                core.saves.ids[parseInt(key.substring(4))] = true;

            return true;
        }
        catch (e) {
            main.log(e);
            return false;
        }
    }
    /**
     * 获得本地存储
     * @deprecated
     * @param key 
     * @param defaultValue 
     * @returns 
     */
    getLocalStorage<T>(key: string, defaultValue: T): T {
        try {
            var value = JSON.parse(localStorage.getItem(core.firstData.name + "_" + key));
            if (value == null)
                return defaultValue;
            return value;
        } catch (e) {
            return defaultValue;
        }
    }
    /**
     * 移除本地存储
     * @deprecated
     * @param key 
     */
    removeLocalStorage(key: string) {
        localStorage.removeItem(core.firstData.name + "_" + key);
        if (key == 'autoSave')
            delete core.saves.ids[0];
        else if (/^save\d+$/.test(key))
            delete core.saves.ids[parseInt(key.substring(4))];
    }
    /** 往数据库写入一段数据 */
    setLocalForage(key: string, value?: any, successCallback?: () => void, errorCallback?: () => void) {
        if (value == null) {
            this.removeLocalForage(key);
            return;
        }

        var name = core.firstData.name + "_" + key;
        var str = JSON.stringify(value).replace(/[\u007F-\uFFFF]/g, function (chr) {
            return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4);
        });
        var callback = function (err) {
            if (err) {
                if (errorCallback)
                    errorCallback(err);
            }
            else {
                if (key == 'autoSave')
                    core.saves.ids[0] = true;
                else if (/^save\d+$/.test(key))
                    core.saves.ids[parseInt(key.substring(4))] = true;
                if (successCallback)
                    successCallback();
            }
        };
        this._setLocalForage_set(name, str, callback);
    }
    _setLocalForage_set(name, str, callback) {
        if (window.jsinterface && window.jsinterface.setLocalForage) {
            var id = setTimeout(null);
            core['__callback' + id] = callback;
            core.saves.cache[name] = str;
            window.jsinterface.setLocalForage(id, name, str);
        } else {
            var compressed = str.length > 100000 ? LZString.compress(str) : lzw_encode(str);
            core.saves.cache[name] = compressed;
            localforage.setItem(name, compressed, callback);
        }
    }
    /** 从数据库读出一段数据 */
    getLocalForage(key: string, defaultValue?: any, successCallback?: (data: any) => void, errorCallback?: () => void) {
        var name = core.firstData.name + "_" + key;
        var callback = function (err, value) {
            if (err) {
                if (errorCallback)
                    errorCallback(err);
            }
            else {
                core.saves.cache[name] = value;
                if (!successCallback)
                    return;
                if (value != null) {
                    var res = core.utils.decompress(value);
                    successCallback(res == null ? defaultValue : res);
                    return;
                }
                successCallback(defaultValue);
            }
        };
        if (core.saves.cache[name] != null) {
            return callback(null, core.saves.cache[name]);
        }
        this._getLocalForage_get(name, callback);
    }
    _getLocalForage_get(name, callback) {
        if (window.jsinterface && window.jsinterface.getLocalForage) {
            var id = setTimeout(null);
            core['__callback' + id] = callback;
            window.jsinterface.getLocalForage(id, name);
        } else {
            localforage.getItem(name, callback);
        }
    }
    /** 移除数据库的数据 */
    removeLocalForage(key: string, successCallback?: () => void, errorCallback?: () => void) {
        var name = core.firstData.name + "_" + key;
        var callback = function (err) {
            if (err) {
                if (errorCallback)
                    errorCallback(err);
            }
            else {
                if (key == 'autoSave')
                    delete core.saves.ids[0];
                else if (/^save\d+$/.test(key))
                    delete core.saves.ids[parseInt(key.substring(4))];
                if (successCallback)
                    successCallback();
            }
        };
        delete core.saves.cache[name];
        this._removeLocalForage_remove(name, callback);
    }
    _removeLocalForage_remove(name, callback) {
        if (window.jsinterface && window.jsinterface.removeLocalForage) {
            var id = setTimeout(null);
            core['__callback' + id] = callback;
            window.jsinterface.removeLocalForage(id, name);
        } else {
            localforage.removeItem(name, callback);
        }
    }
    clearLocalForage(callback) {
        core.saves.cache = {};
        if (window.jsinterface && window.jsinterface.clearLocalForage) {
            var id = setTimeout(null);
            core['__callback' + id] = callback;
            window.jsinterface.clearLocalForage(id);
        } else {
            localforage.clear(callback);
        }
    }
    iterateLocalForage(iter, callback) {
        if (window.jsinterface && window.jsinterface.iterateLocalForage) {
            var id = setTimeout(null);
            core['__iter' + id] = iter;
            core['__callback' + id] = callback;
            window.jsinterface.iterateLocalForage(id);
        } else {
            localforage.iterate(iter, callback);
        }
    }
    keysLocalForage(callback) {
        if (window.jsinterface && window.jsinterface.keysLocalForage) {
            var id = setTimeout(null);
            core['__callback' + id] = callback;
            window.jsinterface.keysLocalForage(id);
        } else {
            localforage.keys(callback);
        }
    }
    lengthLocalForage(callback) {
        if (window.jsinterface && window.jsinterface.lengthLocalForage) {
            var id = setTimeout(null);
            core['__callback' + id] = callback;
            window.jsinterface.lengthLocalForage(id);
        } else {
            localforage.length(callback);
        }
    }
    
    /**
     * 设置一个全局存储，适用于global:xxx，录像播放时将忽略此函数。
     * @deprecated
     * @example core.setBlobal('一周目已通关', true); // 设置全局存储“一周目已通关”为true，方便二周目游戏中的新要素。
     * @param key 全局变量名称，支持中文
     * @param value 全局变量的新值，不填或null表示清除此全局存储
     */
    setGlobal(key: string, value?: any) {
        // if (core.isReplaying())
        //     return;
        // core.setLocalStorage(key, value);
    }
    
    /**
     * 读取一个全局存储，适用于global:xxx，支持录像。
     * @deprecated
     * @example if (core.getGlobal('一周目已通关', false) === true) core.getItem('dagger'); // 二周目游戏进行到此处时会获得一把屠龙匕首
     * @param key 全局变量名称，支持中文
     * @param defaultValue 可选，当此全局变量不存在或值为null、undefined时，用此值代替
     * @returns 全局变量的值
     */
    getGlobal(key: string, defaultValue?: any) {
        // var value;
        // if (core.isReplaying()) {
        //     // 不考虑key不一致的情况
        //     var action = core.status.replay.toReplay.shift();
        //     if (action.indexOf("input2:") == 0) {
        //         value = JSON.parse(core.decodeBase64(action.substring(7)));
        //         core.setFlag('__global__' + key, value);
        //         core.status.route.push("input2:" + core.encodeBase64(JSON.stringify(value)));
        //     }
        //     else {
        //         // 录像兼容性：尝试从flag和localStorage获得
        //         // 注意这里不再二次记录 input2: 到录像
        //         core.status.replay.toReplay.unshift(action);
        //         value = core.getFlag('__global__' + key, core.getLocalStorage(key, defaultValue));
        //     }
        // }
        // else {
        //     value = core.getLocalStorage(key, defaultValue);
        //     core.setFlag('__global__' + key, value);
        //     core.status.route.push("input2:" + core.encodeBase64(JSON.stringify(value)));
        // }
        // return value;
    }
    
    /**
     * 深拷贝一个对象(函数将原样返回)
     * @deprecated
     * @example core.clone(core.status.hero, (name, value) => (name == 'items' || typeof value == 'number'), false); // 深拷贝主角的属性和道具
     * @param data 待拷贝对象
     * @param filter 过滤器，可选，表示data为数组或对象时拷贝哪些项或属性，true表示拷贝
     * @param recursion 过滤器是否递归，可选。true表示过滤器也被递归
     * @returns 拷贝的结果，注意函数将原样返回
     */
    clone<T>(data: T): T
    clone<T>(data: T, filter?: (name: string, value: any) => boolean, recursion?: boolean): any {
        if (!core.isset(data))
            return null;
        // date
        if (data instanceof Date) {
            var copy = new Date();
            copy.setTime(data.getTime());
            return copy;
        }
        // array
        if (data instanceof Array) {
            // @ts-ignore
            var copy = [];
            for (var i in data) {
                if (!filter || filter(i, data[i]))
                    // @ts-ignore
                    copy[i] = core.clone(data[i], recursion ? filter : null, recursion);
            }
            return copy;
        }
        // 函数
        if (data instanceof Function) {
            return data;
        }
        // object
        if (data instanceof Object) {
            // @ts-ignore
            var copy = {};
            // @ts-ignore
            for (var i in data) {
                // @ts-ignore
                if (data.hasOwnProperty(i) && (!filter || filter(i, data[i])))
                // @ts-ignore
                    copy[i] = core.clone(data[i], recursion ? filter : null, recursion);
            }
            return copy;
        }
        return data;
    }
    ////// 深拷贝1D/2D数组优化 //////
    cloneArray(data: any[]) {
        if (!(data instanceof Array))
            return this.clone(data);
        if (data[0] instanceof Array) {
            return data.map(function (one) { return one.slice(); });
        } else {
            return data.slice();
        }
    }
    
    /**
     * 等比例切分一张图片
     * @example core.splitImage(core.material.images.images['npc48.png'], 32, 48); // 把npc48.png切分成若干32×48px的小人
     * @param image 图片名（支持映射前的中文名）或图片对象（参见上面的例子），获取不到时返回[]
     * @param width 子图的宽度，单位为像素。原图总宽度必须是其倍数，不填视为32
     * @param height 子图的高度，单位为像素。原图总高度必须是其倍数，不填视为正方形
     * @returns 子图组成的数组，在原图中呈先行后列，从左到右、从上到下排列。
     */
    splitImage(image: string | HTMLImageElement, width = 32, height = width): HTMLImageElement[] {
        if (typeof image === "string") {
            image = core.getMappedName(image);
            image = core.material.images.images[image];
        }
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var ans = [];
        for (var j = 0; j < image.height; j += height) {
            for (var i = 0; i < image.width; i += width) {
                var w = Math.min(width, image.width - i), h = Math.min(height, image.height - j);
                canvas.width = w; canvas.height = h;
                core.drawImage(ctx, image, i, j, w, h, 0, 0, w, h);
                var img = new Image();
                img.src = canvas.toDataURL("image/png");
                ans.push(img);
            }
        }
        return ans;
    }

    /** 格式化日期为字符串 */
    formatDate(date: Date) {
        if (!date)
            date = new Date();
        return "" + date.getFullYear() + "-" + core.setTwoDigits(date.getMonth() + 1) + "-" + core.setTwoDigits(date.getDate()) + " "
            + core.setTwoDigits(date.getHours()) + ":" + core.setTwoDigits(date.getMinutes()) + ":" + core.setTwoDigits(date.getSeconds());
    }

    /** 格式化日期为最简字符串 */
    formatDate2(date: Date) {
        if (!date)
            date = new Date();
        return "" + date.getFullYear() + core.setTwoDigits(date.getMonth() + 1) + core.setTwoDigits(date.getDate())
            + core.setTwoDigits(date.getHours()) + core.setTwoDigits(date.getMinutes()) + core.setTwoDigits(date.getSeconds());
    }
    
    /** 格式化时间 */
    formatTime(time: number) {
        return core.setTwoDigits(~~(time / 3600000))
            + ":" + core.setTwoDigits(~~(time / 60000) % 60)
            + ":" + core.setTwoDigits(~~(time / 1000) % 60);
    }

    /** 两位数显示 */
    setTwoDigits(x: number) {
        x = ~~x;
        return (x < 10 && x >= 0) ? "0" + x : x;
    }
    
    /** 格式化文件大小 */
    formatSize(size: number) {
        if (size < 1024)
            return size + 'B';
        else if (size < 1024 * 1024)
            return (size / 1024).toFixed(2) + "KB";
        else
            return (size / 1024 / 1024).toFixed(2) + "MB";
    }

    /**
     * 大数字格式化，单位为10000的倍数（w,e,z,j,g），末尾四舍五入
     * @example core.formatBigNumber(123456789, false); // "12346w"
     * @param x 原数字
     * @param digits 
     * @returns 格式化结果
     */
    formatBigNumber(x: number, digits = 6) {
        if (!digits || digits < 5)
            digits = 6; // 连同负号、小数点和后缀字母在内的总位数，至少需为5，默认为6
        x = Math.trunc(x); // 尝试识别为小数，然后向0取整
        if (x == null || !Number.isFinite(x))
            return '???'; // 无法识别的数或正负无穷大，显示'???'
        var units = [
            { "val": 1e4, "suffix": "w" },
            { "val": 1e8, "suffix": "e" },
            { "val": 1e12, "suffix": "z" },
            { "val": 1e16, "suffix": "j" },
            { "val": 1e20, "suffix": "g" },
        ];
        if (Math.abs(x) > 1e20 * Math.pow(10, digits - 2))
            return x.toExponential(0); // 绝对值过大以致于失去精度的数，直接使用科学记数法，系数只保留整数
        var sign = x < 0 ? '-' : '';
        if (sign)
            --digits; // 符号位单独处理，负号要占一位
        x = Math.abs(x);

        if (x < Math.pow(10, digits))
            return sign + x;

        for (var i = 0; i < units.length; ++i) {
            var each = units[i];
            var u = (x / each.val).toFixed(digits).substring(0, digits);
            if (u.indexOf('.') < 0)
                continue;
            u = u.substring(0, u[u.length - 2] == '.' ? u.length - 2 : u.length - 1);
            return sign + u + each.suffix;
        }
        return sign + x.toExponential(0);
    }

    /** 变速移动 */
    applyEasing(name = "linear"): (number: number) => number {
        var list: Record<string, (number: number) => number> = {
            "easeIn": function (t) {
                return Math.pow(t, 3);
            },
            "easeOut": function (t) {
                return 1 - Math.pow(1 - t, 3);
            },
            "easeInOut": function (t) {
                // easeInOut试了一下感觉二次方效果明显点
                if (t < 0.5)
                    return Math.pow(t, 2) * 2;
                else
                    return 1 - Math.pow(1 - t, 2) * 2;
            },
            "linear": function (t) {
                return t;
            }
        };
        if (name == 'random') {
            var keys = Object.keys(list);
            name = keys[Math.floor(Math.random() * keys.length)];
        }
        return list[name] ?? list.linear;
    }
    
    /**
     * 颜色数组转十六进制
     * @example core.arrayToRGB([102, 204, 255]); // "#66ccff"，加载画面的宣传色
     * @param color 一行三列的数组，各元素必须为不大于255的自然数
     * @returns 该颜色的十六进制表示，使用小写字母
     */
    arrayToRGB(color: [number, number, number]) {
        if (!(color instanceof Array))
            return color;
        var nowR = this.clamp(~~(color[0]), 0, 255), nowG = this.clamp(~~(color[1]), 0, 255), nowB = this.clamp(~~(color[2]), 0, 255);
        return "#" + ((1 << 24) + (nowR << 16) + (nowG << 8) + nowB).toString(16).slice(1);
    }
    
    /**
     * 颜色数组转字符串
     * @example core.arrayToRGBA([102, 204, 255]); // "rgba(102,204,255,1)"
     * @param color 一行三列或一行四列的数组，前三个元素必须为不大于255的自然数。第四个元素（如果有）必须为0或不大于1的数字，第四个元素不填视为1
     * @returns 该颜色的字符串表示
     */
    arrayToRGBA(color: [number, number, number, number]) {
        if (!(color instanceof Array))
            return color;
        if (color[3] == null)
            color[3] = 1;
        var nowR = this.clamp(~~(color[0]), 0, 255), nowG = this.clamp(~~(color[1]), 0, 255), nowB = this.clamp(~~(color[2]), 0, 255), nowA = this.clamp((color[3]), 0, 1);
        return "rgba(" + nowR + "," + nowG + "," + nowB + "," + nowA + ")";
    }

    /**
     * 加密路线
     */
    encoderoute = encodeRoute;

    /**
     * 解密路线
     */
    decodeRoute = decodeRoute;

    /**
     * 判断一个值是否不为null，undefined和NaN
     * @example core.isset(0/0); // false，因为0/0等于NaN
     * @param val 待测值，可选
     * @returns false表示待测值为null、undefined、NaN或未填写，true表示为其他值。即!(v == null || v != v)
     */
    isset(val?: any) {
        return val != null && !(typeof val == 'number' && isNaN(val));
    }

    /**
     * 判定一个数组是否为另一个数组的前缀，用于录像接续播放。请注意函数名没有大写字母
     * @deprecated
     * @example core.subarray(['ad', '米库', '小精灵', '小破草', '小艾'], ['ad', '米库', '小精灵']); // ['小破草', '小艾']
     * @param a 可能的母数组，不填或比b短将返回null
     * @param b 可能的前缀，不填或比a长将返回null
     * @returns 如果b不是a的前缀将返回null，否则将返回a去掉此前缀后的剩余数组
     */
     subarray(a?: any[], b?: any[]): any[] | null {
        if (!(a instanceof Array) || !(b instanceof Array) || a.length < b.length)
            return null;
        for (var i = 0; i < b.length; ++i) {
            if (a[i] != b[i])
                return null;
        }
        return a.slice(b.length);
    }
    
    /**
     * 判定array是不是一个数组，以及element是否在该数组中。
     * @deprecated
     * @param array 可能的数组，不为数组或不填将导致返回值为false
     * @param element 待查找的元素
     * @returns 如果array为数组且具有element这项，就返回true，否则返回false
     */
    inArray(array?: any, element?: any) {
        return (array instanceof Array) && array.indexOf(element) >= 0;
    }
    
    /**
     * 将x限定在[a,b]区间内，注意a和b可交换
     * @example core.clamp(1200, 1, 1000); // 1000
     * @param x 原始值，!x为true时x一律视为0
     * @param a 下限值，大于b将导致与b交换
     * @param b 上限值，小于a将导致与a交换
     */
    clamp(x: number, a: number, b: number): number {
        var min = Math.min(a, b), max = Math.max(a, b);
        return Math.min(Math.max(x || 0, min), max);
    }

    /**
     * 访问浏览器cookie
     */
    getCookie(name: string) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
    /**
     * 填写非自绘状态栏
     * @deprecated
     * @example core.setStatusBarInnerHTML('hp', core.status.hero.hp, 'color: #66CCFF'); // 更新状态栏中的主角生命，使用加载画面的宣传色
     * @param name 状态栏项的名称，如'hp', 'atk', 'def'等。必须是core.statusBar中的一个合法项
     * @param value 要填写的内容，大数字会被格式化为至多6个字符，无中文的内容会被自动设为斜体
     * @param css 额外的css样式，可选。如更改颜色等
     */
    setStatusBarInnerHTML(name: string, value: any, css?: string) {
        // 弃用
    }
    strlen(str: string) {
        var count = 0;
        for (var i = 0, len = str.length; i < len; i++) {
            count += str.charCodeAt(i) < 256 ? 1 : 2;
        }
        return count;
    }/**
     * 计算应当转向某个方向
     * @param turn 转向的方向
     * @param direction 当前方向
     */
    turnDirection(turn: string | number, direction?: string): string {
        direction = direction ?? core.getHeroLoc('direction');
        const directionList = ["left", "leftup", "up", "rightup", "right", "rightdown", "down", "leftdown"];
        if (typeof turn === 'string') {
            if (directionList.indexOf(turn) >= 0)
                return turn;
            if (turn == ':hero')
                return core.getHeroLoc('direction');
            if (turn == ':backhero')
                return this.turnDirection(':back', core.getHeroLoc('direction'));
        }
        if (typeof turn === 'number' && turn % 45 == 0)
            turn /= 45;
        else {
            switch (turn) {
                case ':left': turn = 6; break; // turn left
                case ':right': turn = 2; break; // turn right
                case ':back': turn = 4; break; // turn back
                default: turn = 0; break;
            }
        }
        var index = directionList.indexOf(direction as string);
        if (index < 0)
            return direction as string;
        return directionList[(index + (turn || 0)) % directionList.length];
    }
    
    /**
     * 通配符匹配，用于搜索图块等批量处理。
     * @example core.playSound(core.matchWildcard('*Key', itemId) ? 'item.mp3' : 'door.mp3'); // 判断捡到的是钥匙还是别的道具，从而播放不同的音效
     * @param pattern 模式串，每个星号表示任意多个（0个起）字符
     * @param string 待测串
     * @returns true表示匹配成功，false表示匹配失败
     */
    matchWildcard(pattern: string, string: string) {
        try {
            return new RegExp('^' + pattern.split(/\*+/).map(function (s) {
                return s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
            }).join('.*') + '$').test(string);
        } catch (e) {
            return false;
        }
    }
    /** 是否满足正则表达式 */
    matchRegex(pattern: string, string: string) {
        try {
            if (pattern.startsWith("^"))
                pattern = pattern.substring(1);
            if (pattern.endsWith("$"))
                pattern = pattern.substring(0, pattern.length - 1);
            return new RegExp("^" + pattern + "$").test(string);
        } catch (e) {
            return false;
        }
    }
    /**
     * Base64加密
     * @param str 
     * @returns 
     */
    encodeBase64(str: string) {
        return encodeBase64(str);
    }
    /**
     * Base64解密
     * @param str 
     * @returns 
     */
    decodeBase64(str: string) {
        return decodeBase64(str);
    }
    rand(num: number) {
        var rand = core.getFlag('__rand__', 0);
        rand = this.__next_rand(rand);
        core.setFlag('__rand__', rand);
        var ans = rand / 2147483647;
        if (num && num > 0)
            return Math.floor(ans * num);
        return ans;
    }
    ////// 生成随机数（录像方法） //////
    rand2(num: number) {
        num = num || 2147483648;
        num = Math.abs(num);

        let value = 0;
        if (core.isReplaying()) {
            const action = core.status.replay.toReplay.shift()!;
            if (action.indexOf("random:") == 0) {
                value = parseInt(action.substring(7));
                if (isNaN(value) || value >= num || value < 0) {
                    console.warn('错误！当前random:项超过范围。将重新随机生成！');
                    value = Math.floor(Math.random() * num);
                }
            } else {
                console.warn('错误！当前需要一个random:项。将重新随机生成！');
                value = Math.floor(Math.random() * num);
            }
        }
        else {
            value = Math.floor(Math.random() * num);
        }
        core.status.route.push("random:" + value);
        return value;
    }
    __init_seed() {
        var rand = new Date().getTime() % 34834795 + 3534;
        rand = this.__next_rand(rand);
        rand = this.__next_rand(rand);
        rand = this.__next_rand(rand);
        core.setFlag('__seed__', rand);
        core.setFlag('__rand__', rand);
    }
    __next_rand(_rand: number) {
        _rand = (_rand % 127773) * 16807 - ~~(_rand / 127773) * 2836;
        _rand += _rand < 0 ? 2147483647 : 0;
        return _rand;
    }
    /**
     * 尝试请求读取一个本地文件内容 [异步]
     * @deprecated
     * @param success 成功后的回调
     * @param error 失败后的回调
     * @param accept 允许的文件后缀名
     * @param readType 不设置则以文本读取，否则以DataUrl形式读取
     */
    readFile(success: () => void, error: () => void, accept?: string, readType?: boolean) {

    }
    /**
     * 读取文件完毕
     * @deprecated
     * @param content 
     */
    readFileContent(content: string) {
        // var obj = null;
        // if (content.slice(0, 4) === 'data') {
        //     if (core.platform.successCallback)
        //         core.platform.successCallback(content);
        //     return;
        // }
        // // 检查base64
        // try {
        //     obj = JSON.parse(LZString.decompressFromBase64(content));
        // } catch (e) { }
        // if (!obj) {
        //     try {
        //         obj = JSON.parse(content);
        //     } catch (e) {
        //         main.log(e);
        //     }
        // }

        // if (obj) {
        //     if (core.platform.successCallback)
        //         core.platform.successCallback(obj);
        //     return;
        // }

        // if (core.platform.errorCallback)
        //     core.platform.errorCallback();
    }
    /**
     * 
     * @param filename 
     * @param content 
     */
    download(filename: string, content: string) {
        download(filename, content);
    }
    /**
     * 复制一段内容到剪切板
     * @param data 
     */
    copy(data: string) {
        addToClipboard(data);
    }

    /**
     * 显示确认框，类似core.drawConfirmBox()
     * @example core.myconfirm('重启游戏？', core.restart); // 弹窗询问玩家是否重启游戏
     * @param hint 弹窗的内容
     * @param yesCallback 确定后的回调函数
     * @param noCallback 取消后的回调函数，可选
     */
    myconfirm(hint: string, yesCallback: () => void, noCallback?: () => void) {

    }

    /**
     * 让用户输入一段文字
     * @param hint 
     * @param value 
     * @param callback 
     */
    myprompt(hint: string, value: string, callback: (value: string) => void) {

    }

    ////// 动画显示某对象 //////
    showWithAnimate(obj: HTMLElement, speed: number, callback: () => void) {
        //
    }
    ////// 动画使某对象消失 //////
    hideWithAnimate(obj: HTMLElement, speed: number, callback: () => void) {
        //
    }
    ////// 生成浏览器唯一的 guid //////
    getGuid() {
        var guid = localStorage.getItem('guid');
        if (guid != null)
            return guid;
        guid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        localStorage.setItem('guid', guid);
        return guid;
    }

    hashCode(obj: any): number {
        if (typeof obj == 'string') {
            var hash = 0, i, chr;
            if (obj.length === 0)
                return hash;
            for (i = 0; i < obj.length; i++) {
                chr = obj.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash;
        }
        return this.hashCode(JSON.stringify(obj).split("").sort().join(""));
    }

    /**
     * 
     * @param a 
     * @param b 
     * @returns 
     */
    same(a: any, b: any) {
        if (a == null && b == null)
            return true;
        if (a == null || b == null)
            return false;
        if (a === b)
            return true;
        if (a instanceof Array && b instanceof Array) {
            if (a.length != b.length)
                return false;
            for (let i = 0; i < a.length; i++) {
                if (!this.same(a[i], b[i]))
                    return false;
            }
            return true;
        }
        if (a instanceof Object && b instanceof Object) {
            var obj = {};
            for (var i in a) {
                // @ts-ignore
                obj[i] = true;
            }
            for (var i in b) {
                // @ts-ignore
                obj[i] = true;
            }
            for (var i in obj) {
                if (!this.same(a[i], b[i]))
                    return false;
            }
            return true;
        }
        return false;
    }
    // unzip(blobOrUrl, success, error, convertToText, onprogress) {
    //     var _error = function (msg) {
    //         main.log(msg);
    //         if (error)
    //             error(msg);
    //     };

    //     if (!window.zip) {
    //         return _error("zip.js not exists!");
    //     }

    //     if (typeof blobOrUrl == 'string') {
    //         return core.http('GET', blobOrUrl, null, function (data) {
    //             core.unzip(data, success, error, convertToText);
    //         }, _error, null, 'blob', onprogress);
    //     }

    //     if (!(blobOrUrl instanceof Blob)) {
    //         return _error("Should use Blob or URL as input");
    //     }

    //     zip.createReader(new zip.BlobReader(blobOrUrl), function (reader) {
    //         reader.getEntries(function (entries) {
    //             core.utils._unzip_readEntries(entries, function (data) {
    //                 reader.close(function () {
    //                     if (success)
    //                         success(data);
    //                 });
    //             }, convertToText);
    //         });
    //     }, _error);
    // }
    // _unzip_readEntries(entries, success, convertToText) {
    //     var results = {};
    //     if (entries == null || entries.length == 0) {
    //         return success(results);
    //     }
    //     var length = entries.length;
    //     entries.forEach(function (entry) {
    //         entry.getData(convertToText ? new zip.TextWriter('utf8') : new zip.BlobWriter(), function (data) {
    //             results[entry.filename] = data;
    //             length--;
    //             if (length == 0) {
    //                 success(results);
    //             }
    //         });
    //     });
    // }

    // /**
    //  * 发送一个HTTP请求 [异步]
    //  * @deprecated
    //  * @param type 请求类型
    //  * @param url 目标地址
    //  * @param formData 如果是POST请求则为表单数据
    //  * @param success 成功后的回调
    //  * @param error 失败后的回调
    //  */
    // http(
    //     type: 'GET' | 'POST',
    //     url: string,
    //     formData: FormData,
    //     success: (response: any) => void,
    //     error: (reason: string) => void,
    //     mimeType: string,
    //     responseType: XMLHttpRequestResponseType,
    //     onprogress: (loaded: number, total: number) => void
    // ) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open(type, url, true);
    //     if (mimeType)
    //         xhr.overrideMimeType(mimeType);
    //     if (responseType)
    //         xhr.responseType = responseType;
    //     xhr.onload = function (e) {
    //         if (xhr.status == 200) {
    //             if (success)
    //                 success(xhr.response);
    //         }
    //         else {
    //             if (error)
    //                 error("HTTP " + xhr.status);
    //         }
    //     };
    //     xhr.onprogress = function (e) {
    //         if (e.lengthComputable) {
    //             if (onprogress)
    //                 onprogress(e.loaded, e.total);
    //         }
    //     };
    //     xhr.onabort = function () {
    //         if (error)
    //             error("Abort");
    //     };
    //     xhr.ontimeout = function () {
    //         if (error)
    //             error("Timeout");
    //     };
    //     xhr.onerror = function () {
    //         if (error)
    //             error("Error on Connection");
    //     };
    //     if (formData)
    //         xhr.send(formData);
    //     else
    //         xhr.send();
    // }
}
