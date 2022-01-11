import { Icons } from "./icons";
import { Utils } from "./utils";

class Core {
    readonly __SIZE__ = 13;
    readonly __PIXELS__ = this.__SIZE__ * 32;
    readonly __HALF_SIZE__ = Math.floor(this.__SIZE__ / 2);

    material = {
        animates: {},
        images: {},
        items: {},
        enemys: {},
        icons: {},
        ground: null,
        grundCanvas: null,
        groundPattern: null,
        autotileEdges: {},
    };
    timeout = {
        'turnHeroTimeout': null,
        'onDownTimeout': null,
        'sleepTimeout': null,
    };
    
    interval = {
        'heroMoveInterval': null,
        'onDownInterval': null,
    };
    animateFrame = {
        'totalTime': 0,
        'totalTimeStart': 0,
        'globalAnimate': false,
        'globalTime': 0,
        'selectorTime': 0,
        'selectorUp': true,
        'animateTime': 0,
        'moveTime': 0,
        'lastLegTime': 0,
        'leftLeg': true,
        'weather': {
            'time': 0,
            'type': null,
            'level': 1,
            'nodes': [],
            'data': null,
            'fog': null,
            'cloud': null,
            'sun': null
        },
        "tip": null,
        "asyncId": {},
        "lastAsyncId": null
    };
    platform = {
        'isOnline': true,
        'isPC': true,
        'isAndroid': false,
        'isIOS': false,
        'string': 'PC',
        'isWeChat': false,
        'isQQ': false,
        'isChrome': false,
        'supportCopy': false,

        'fileInput': null,
        'fileReader': null,
        'successCallback': null,
        'errorCallback': null, // 读取失败
    };
    // 样式
    domStyle = {
        scale: 1.0,
        ratio: 1.0,
        hdCanvas: ["damage", "ui", "data"],
        availableScale: [],
        isVertical: false,
        showStatusBar: true,
        toolbarBtn: false,
    };
    bigmap = {
        canvas: ["bg", "event", "event2", "fg", "damage"],
        offsetX: 0,
        offsetY: 0,
        posX: 0,
        posY: 0,
        width: this.__SIZE__,
        height: this.__SIZE__,
        v2: false,
        threshold: 1024,
        extend: 10,
        scale: 1.0,
        tempCanvas: null,
        cacheCanvas: null, // A cache canvas
    };
    initStatus = {
        'played': false,
        'gameOver': false,

        // 勇士属性
        'hero': {},
        'heroCenter': { 'px': null, 'py': null },

        // 当前地图
        'floorId': null,
        'thisMap': null,
        'maps': null,
        'bgmaps': {},
        'fgmaps': {},
        'mapBlockObjs': {},
        'checkBlock': {},
        'damage': {
            'posX': 0,
            'posY': 0,
            'data': [],
            'extraData': [],
        },

        'lockControl': false,

        // 勇士移动状态
        'heroMoving': 0,
        'heroStop': true,

        // 自动寻路相关
        'automaticRoute': {
            'autoHeroMove': false,
            'autoStep': 0,
            'movedStep': 0,
            'destStep': 0,
            'destX': null,
            'destY': null,
            'offsetX': null,
            'offsetY': null,
            'autoStepRoutes': [],
            'moveStepBeforeStop': [],
            'lastDirection': null,
            'cursorX': null,
            'cursorY': null,
            "moveDirectly": false,
        },

        // 按下键的时间：为了判定双击
        'downTime': null,
        'ctrlDown': false,
        'preview': {
            'enabled': false,
            'prepareDragging': false,
            'dragging': false,
            'px': 0,
            'py': 0,
        },

        // 路线&回放
        'route': [],
        'replay': {
            'replaying': false,
            'pausing': false,
            'animate': false,
            'failed': false,
            'toReplay': [],
            'totalList': [],
            'speed': 1.0,
            'steps': 0,
            'save': [],
        },
        // 录像折叠
        'routeFolding': {},

        // event事件
        'shops': {},
        'event': {
            'id': null,
            'data': null,
            'selection': null,
            'ui': null,
            'interval': null,
        },
        'autoEvents': [],
        'textAttribute': {
            'position': "center",
            "offset": 0,
            "title": [255, 215, 0, 1],
            "background": [0, 0, 0, 0.85],
            "text": [255, 255, 255, 1],
            "titlefont": 22,
            "textfont": 16,
            "bold": false,
            "time": 0,
            "letterSpacing": 0,
            "animateTime": 0,
        },
        // "globalAttribute": {
        //     'equipName': main.equipName || [],
        //     "statusLeftBackground": main.styles.statusLeftBackground || "url(project/materials/ground.png) repeat",
        //     "statusTopBackground": main.styles.statusTopBackground || "url(project/materials/ground.png) repeat",
        //     "toolsBackground": main.styles.toolsBackground || "url(project/materials/ground.png) repeat",
        //     "borderColor": main.styles.borderColor || [204, 204, 204, 1],
        //     "statusBarColor": main.styles.statusBarColor || [255, 255, 255, 1],
        //     "floorChangingStyle": main.styles.floorChangingStyle || "background-color: black; color: white",
        //     "selectColor": main.styles.selectColor || [255, 215, 0, 1],
        //     "font": main.styles.font || "Verdana"
        // },
        'curtainColor': null,

        // 动画
        'globalAnimateObjs': [],
        'floorAnimateObjs': [],
        'boxAnimateObjs': [],
        'autotileAnimateObjs': [],
        "globalAnimateStatus": 0,
        'animateObjs': [],
    };
    // 标记的楼层列表，用于数据统计
    markedFloorIds = {};
    status = {};
    dymCanvas = {};

    tilesets: string[] = [];

    /////////// 系统事件相关 ///////////

    ////// 初始化 //////
    async init(coreData: any) {
        // for (var key in coreData)
        //     core[key] = coreData[key];
        this._init_flags();
        // this._init_platform();
        // this._init_others();
        // this._init_plugins();

        // 初始化画布
        // for (var name in core.canvas) {
        //     if (core.domStyle.hdCanvas.indexOf(name) >= 0)
        //         core.maps._setHDCanvasSize(core.canvas[name], core.__PIXELS__, core.__PIXELS__);
        //     else {
        //         core.canvas[name].canvas.width = core.__PIXELS__;
        //         core.canvas[name].canvas.height = core.__PIXELS__;
        //     }
        // }

        // core.loader._load(function () {
        //     core.extensions._load(function () {
        //         core._afterLoadResources(callback);
        //     });
        // });
    }

    private _init_flags() {
        core.flags = core.clone(core.data.flags);
        core.values = core.clone(core.data.values);
        core.firstData = core.clone(core.data.firstData);
        this._init_sys_flags();
        
        // 让你总是拼错！——拼错了就爬！
        // window.on = true;
        // window.off = false;
        // window.ture = true;
        // window.flase = false;
    
        (core.firstData.shops||[]).forEach(function (t) { core.initStatus.shops[t.id] = t; });
    
        core.maps._initFloors();
        // 初始化怪物、道具等
        core.material.enemys = core.enemys.getEnemys();
        core.material.items = core.items.getItems();
        core.material.icons = core.icons.getIcons();
    
        // 初始化自动事件
        for (var floorId in core.floors) {
            var autoEvents = core.floors[floorId].autoEvent || {};
            for (var loc in autoEvents) {
                var locs = loc.split(","), x = parseInt(locs[0]), y = parseInt(locs[1]);
                for (var index in autoEvents[loc]) {
                    var autoEvent = core.clone(autoEvents[loc][index]);
                    if (autoEvent && autoEvent.condition && autoEvent.data) {
                        autoEvent.floorId = floorId;
                        autoEvent.x = x;
                        autoEvent.y = y;
                        autoEvent.index = index;
                        autoEvent.symbol = floorId + "@" + x + "@" + y + "@" + index;
                        autoEvent.condition = core.replaceValue(autoEvent.condition);
                        autoEvent.data = core.precompile(autoEvent.data);
                        core.initStatus.autoEvents.push(autoEvent);
                    }
                }
            }
        }
        // 道具的穿上/脱下，视为自动事件
        for (var equipId in core.material.items) {
            var equip = core.material.items[equipId];
            if (equip.cls != 'equips' || !equip.equip) continue;
            if (!equip.equip.equipEvent && !equip.equip.unequipEvent) continue;
            var equipFlag = '_equipEvent_' + equipId;
            var autoEvent1 = {
                symbol: "_equipEvent_" + equipId,
                currentFloor: false,
                multiExecute: true,
                condition: "core.hasEquip('" + equipId + "') && !core.hasFlag('"+equipFlag+"')",
                data: core.precompile([{"type": "setValue", "name": "flag:" + equipFlag, "value": "true"}].concat(equip.equip.equipEvent||[])),
            };
            var autoEvent2 = {
                symbol: "_unequipEvent_" + equipId,
                currentFloor: false,
                multiExecute: true,
                condition: "!core.hasEquip('" + equipId + "') && core.hasFlag('"+equipFlag+"')",
                data: core.precompile([{"type": "setValue", "name": "flag:" + equipFlag, "value": "null"}].concat(equip.equip.unequipEvent||[])),
            };
            core.initStatus.autoEvents.push(autoEvent1);
            core.initStatus.autoEvents.push(autoEvent2);
        }
    
        core.initStatus.autoEvents.sort(function (e1, e2) {
            if (e1.floorId == null) return 1;
            if (e2.floorId == null) return -1;
            if (e1.priority != e2.priority) return e2.priority - e1.priority;
            if (e1.floorId != e2.floorId) return core.floorIds.indexOf(e1.floorId) - core.floorIds.indexOf(e2.floorId);
            if (e1.x != e2.x) return e1.x - e2.x;
            if (e1.y != e2.y) return e1.y - e2.y;
            return e1.index - e2.index;
        })
    
    }    
}

type Forward<T> = { [ K in keyof T ]: Extract<T[K], Function> }[keyof T]

type core = Core
    & Forward<Utils> & { utils: Utils }
    & Forward<Icons> & { icons: Icons }

function createCore(): core {
    const core = new Core();
    function forward(libname: string, lib: Object) {
        // @ts-ignore
        raw[libname] = lib;
        const prototype = Object.getPrototypeOf(lib);
        Reflect.ownKeys(prototype).forEach((key) => {
            if (typeof key !== "string") return;
            if (key === "constructor") return;
            if (key.charAt(0) === '_') return;
            if (!(Object.getOwnPropertyDescriptor(prototype, key)?.value instanceof Function)) return;
            // @ts-ignore
            console.log(a, key, Object.getOwnPropertyDescriptor(prototype, key), a[key]);
            // @ts-ignore
            const parameterInfo = /^\s*function\s*[\w_$]*\(([\w_,$\s]*)\)\s*\{/.exec(a[key].toString());
            const parameters = (parameterInfo == null ? "" : parameterInfo[1]).replace(/\s*/g, '').replace(/,/g, ', ');
            eval(`core.${ key } = function (${ parameters }) {\n\treturn core.${ libname }.${ key }(${ parameters });\n}`);
        });
    }
    forward("utils", Utils);
    forward("icons", Icons);
    // @ts-ignore
    return core;
}

export const core = createCore();
