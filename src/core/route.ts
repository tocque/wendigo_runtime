import { compressToBase64, decompressFromBase64 } from "lz-string";
import { core } from "./core";

function id2number(id: string) {
    var number = core.maps.getNumberById(id);
    return number == 0 ? id : number;
}

function encodeOne(t: string) {
    if (t.indexOf('item:') == 0)
        return "I" + id2number(t.substring(5)) + ":";
    else if (t.indexOf('unEquip:') == 0)
        return "u" + t.substring(8);
    else if (t.indexOf('equip:') == 0)
        return "e" + id2number(t.substring(6)) + ":";
    else if (t.indexOf('saveEquip:') == 0)
        return "s" + t.substring(10);
    else if (t.indexOf('loadEquip:') == 0)
        return "l" + t.substring(10);
    else if (t.indexOf('fly:') == 0)
        return "F" + t.substring(4) + ":";
    else if (t == 'choices:none')
        return "c";
    else if (t.indexOf('choices:') == 0)
        return "C" + t.substring(8);
    else if (t.indexOf('shop:') == 0)
        return "S" + t.substring(5) + ":";
    else if (t == 'turn')
        return 'T';
    else if (t.indexOf('turn:') == 0)
        return "t" + t.substring(5).substring(0, 1).toUpperCase() + ":";
    else if (t == 'getNext')
        return 'G';
    else if (t == 'input:none')
        return 'p';
    else if (t.indexOf('input:') == 0)
        return "P" + t.substring(6);
    else if (t.indexOf('input2:') == 0)
        return "Q" + t.substring(7) + ":";
    else if (t == 'no')
        return 'N';
    else if (t.indexOf('move:') == 0)
        return "M" + t.substring(5);
    else if (t.indexOf('key:') == 0)
        return 'K' + t.substring(4);
    else if (t.indexOf('click:') == 0)
        return 'k' + t.substring(6);
    else if (t.indexOf('random:') == 0)
        return 'X' + t.substring(7);
    return '(' + t + ')';
}

/**
 * 加密路线
 * @param route 
 * @returns 
 */
export function encodeRoute(route: string[]) {
    var ans = "", lastMove = "", cnt = 0;

    route.forEach((t) => {
        if (t == 'up' || t == 'down' || t == 'left' || t == 'right') {
            if (t != lastMove && cnt > 0) {
                ans += lastMove.substring(0, 1).toUpperCase();
                if (cnt > 1)
                    ans += cnt;
                cnt = 0;
            }
            lastMove = t;
            cnt++;
        }
        else {
            if (cnt > 0) {
                ans += lastMove.substring(0, 1).toUpperCase();
                if (cnt > 1)
                    ans += cnt;
                cnt = 0;
            }
            ans += encodeOne(t);
        }
    });
    if (cnt > 0) {
        ans += lastMove.substring(0, 1).toUpperCase();
        if (cnt > 1)
            ans += cnt;
    }
    return compressToBase64(ans);
}

interface DecodeObj {
    route: string
    index: number
    ans: string[]
}


function getNumber(decodeObj: DecodeObj) {
    var num = "";
    var first = true;
    while (true) {
        var ch = decodeObj.route.charAt(decodeObj.index);
        if (ch >= '0' && ch <= '9')
            num += ch;
        else if (ch == '-' && first)
            num += ch;
        else
            break;
        first = false;
        decodeObj.index++;
    }
    if (num.length == 0)
        num = "1";
    return parseInt(num);
}
function getString(decodeObj: DecodeObj) {
    var str = "";
    while (decodeObj.index < decodeObj.route.length && decodeObj.route.charAt(decodeObj.index) != ':') {
        str += decodeObj.route.charAt(decodeObj.index++);
    }
    decodeObj.index++;
    return str;
}
function number2id(number: string) {
    if (/^\d+$/.test(number)) {
        var info = core.maps.blocksInfo[number];
        if (info)
            return info.id;
    }
    return number;
}

function decodeOne(decodeObj: DecodeObj, c: string) {
    // --- 特殊处理自定义项
    if (c == '(') {
        var idx = decodeObj.route.indexOf(')', decodeObj.index);
        if (idx >= 0) {
            decodeObj.ans.push(decodeObj.route.substring(decodeObj.index, idx));
            decodeObj.index = idx + 1;
            return;
        }
    }
    var nxt = (c == 'I' || c == 'e' || c == 'F' || c == 'S' || c == 'Q' || c == 't') ?
        getString(decodeObj) : getNumber(decodeObj);

    var mp = { "U": "up", "D": "down", "L": "left", "R": "right" };

    switch (c) {
        case "U":
        case "D":
        case "L":
        case "R":
            for (var i = 0; i < nxt; i++)
                decodeObj.ans.push(mp[c]);
            break;
        case "I":
            // @ts-ignore
            decodeObj.ans.push("item:" + number2id(nxt));
            break;
        case "u":
            decodeObj.ans.push("unEquip:" + nxt);
            break;
        case "e":
            // @ts-ignore
            decodeObj.ans.push("equip:" + number2id(nxt));
            break;
        case "s":
            decodeObj.ans.push("saveEquip:" + nxt);
            break;
        case "l":
            decodeObj.ans.push("loadEquip:" + nxt);
            break;
        case "F":
            decodeObj.ans.push("fly:" + nxt);
            break;
        case 'c':
            decodeObj.ans.push('choices:none');
            break;
        case "C":
            decodeObj.ans.push("choices:" + nxt);
            break;
        case "S":
            decodeObj.ans.push("shop:" + nxt);
            break;
        case "T":
            decodeObj.ans.push("turn");
            break;
        case "t":
            // @ts-ignore
            decodeObj.ans.push("turn:" + mp[nxt]);
            break;
        case "G":
            decodeObj.ans.push("getNext");
            break;
        case "p":
            decodeObj.ans.push("input:none");
            break;
        case "P":
            decodeObj.ans.push("input:" + nxt);
            break;
        case "Q":
            decodeObj.ans.push("input2:" + nxt);
            break;
        case "N":
            decodeObj.ans.push("no");
            break;
        case "M":
            ++decodeObj.index;
            decodeObj.ans.push("move:" + nxt + ":" + getNumber(decodeObj));
            break;
        case "K":
            decodeObj.ans.push("key:" + nxt);
            break;
        case "k":
            ++decodeObj.index;
            var px = getNumber(decodeObj);
            ++decodeObj.index;
            var py = getNumber(decodeObj);
            decodeObj.ans.push("click:" + nxt + ":" + px + ":" + py);
            break;
        case "X":
            decodeObj.ans.push("random:" + nxt);
            break;
    }
}

/**
 * 解密路线
 * @param route 
 * @returns 
 */
export function decodeRoute(route: string) {
    if (!route)
        return route;

    // 解压缩
    try {
        var v = decompressFromBase64(route);
        if (v != null && /^[-_a-zA-Z0-9+\/=:()]*$/.test(v)) {
            if (v != "" || route.length < 8)
                route = v;
        }
    } catch (e) {
    }

    var decodeObj: DecodeObj = { route: route, index: 0, ans: [] };
    while (decodeObj.index < decodeObj.route.length) {
        decodeOne(decodeObj, decodeObj.route.charAt(decodeObj.index++));
    }
    return decodeObj.ans;
}
