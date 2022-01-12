// @ts-nocheck
import { clone } from "lodash-es";
import { Control } from "./control";
import { Enemys } from "./enemys";
import { Events } from "./events";
import { Icons, IconData } from "./icons";
import { Items } from "./items";
import { Maps } from "./maps";
import { UI } from "./ui";
import { Utils } from "./utils";


class Core {
    readonly __SIZE__ = 13;
    readonly __PIXELS__ = this.__SIZE__ * 32;
    readonly __HALF_SIZE__ = Math.floor(this.__SIZE__ / 2);

    material = {
        animates: {} as Record<string, Animate>,
        images: {
            tilesets: {} as Record<string, HTMLImageElement>,
            images: {} as Record<string, HTMLImageElement>,
        },
        items: {} as Record<string, Item>,
        enemys: {} as Record<string, Enemy>,
        icons: {} as any as IconData,
        ground: null as any as CanvasRenderingContext2D,
        groundCanvas: null as any as CanvasRenderingContext2D,
        groundPattern: null as any as CanvasPattern | null,
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
        tempCanvas: null as any as CanvasRenderingContext2DSettings,
        /** A cache canvas */
        cacheCanvas: null as any as CanvasRenderingContext2DSettings,
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
    status = {} as any as gameStatus;
    dymCanvas: Record<string, CanvasRenderingContext2D> = {};

    tilesets: string[] = [];
    /** 
     * 获得所有楼层的信息
     * @example core.floors[core.status.floorId].events // 获得本楼层的所有自定义事件
     */
    floors: Record<string, Floor> = {};

    canvas: Record<string, CanvasRenderingContext2D> = {};

    nameMap: Record<string, string> = {};

    /////////// 系统事件相关 ///////////

    ////// 初始化 //////
    init(coreData: any) {
        // for (var key in coreData)
        //     core[key] = coreData[key];
        this._init_flags();
        // this._init_others();
        // this._init_plugins();

        // 初始化画布
        for (var name in core.canvas) {
            core.canvas[name].canvas.width = core.__PIXELS__;
            core.canvas[name].canvas.height = core.__PIXELS__;
        }

        // core._afterLoadResources(callback);
    }

    private _init_flags() {
        core.flags = clone(core.data.flags);
        core.values = clone(core.data.values);
        core.firstData = clone(core.data.firstData);
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
    
        core.events.initAutoEvents();
    }

    _init_others() {
        // 一些额外的东西
        core.material.groundCanvas = document.createElement('canvas').getContext('2d');
        core.material.groundCanvas.canvas.width = core.material.groundCanvas.canvas.height = 32;
        core.material.groundPattern = core.material.groundCanvas.createPattern(core.material.groundCanvas.canvas, 'repeat');
        core.bigmap.tempCanvas = document.createElement('canvas').getContext('2d');
        core.bigmap.cacheCanvas = document.createElement('canvas').getContext('2d');
        core.loadImage("materials", 'fog', function (name, img) { core.animateFrame.weather.fog = img; });
        core.loadImage("materials", "cloud", function (name, img) { core.animateFrame.weather.cloud = img; })
        core.loadImage("materials", "sun", function (name, img) { core.animateFrame.weather.sun = img; })
        core.loadImage("materials", 'keyboard', function (name, img) {core.material.images.keyboard = img; });
        // 记录存档编号
        core.saves.saveIndex = core.getLocalStorage('saveIndex', 1);
        core.control.getSaveIndexes(function (indexes) { core.saves.ids = indexes; });
    }
}

let a: string = 1;

type Forward<T> = {
    [ K in keyof T as T[K] extends Function ? K : never ]: T[K]
}

type core = Core
    & Forward<Control> & { control: Control }
    & Forward<Enemys> & { enemys: Enemys }
    & Forward<Events> & { events: Events }
    & Forward<Icons> & { icons: Icons }
    & Forward<Items> & { items: Items }
    & Forward<Maps> & { maps: Maps }
    & Forward<UI> & { ui: UI }
    & Forward<Utils> & { utils: Utils }
    
    function createCore(): core {
        const core = new Core();
    const forward = (libname: string, lib: Object) => {
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
    forward("control", Control);
    forward("enemys", Enemys);
    forward("events", Events);
    forward("icons", Icons);
    forward("items", Items);
    forward("maps", Maps);
    forward("ui", UI);
    forward("utils", Utils);
    // @ts-ignore
    return core;
}

export const core = createCore();
