import { Config } from "@/modules/storage/config";
import { createCTX } from "@/utils/canvas";
import { cloneDeep } from "lodash-es";
import { Control } from "./control";
import { Data, GameStatus, ResolvedMap } from "./data";
import { EnemyData, Enemys } from "./enemys";
import { Events } from "./events";
import { Icons, IconData } from "./icons";
import { ItemData, Items } from "./items";
import { Loader } from "./loader";
import { Animate, Floor, Maps } from "./maps";
import { UI } from "./ui";
import { Utils } from "./utils";

export const MATERIALS = [
    'animates', 'enemys', 'items', 'npcs', 'terrains', 'enemy48', 'npc48', 'icons',
    'fog', 'cloud', 'sun', 'keyboard',
] as const;

class Core {
    readonly __SIZE__ = 13;
    readonly __PIXELS__ = this.__SIZE__ * 32;
    readonly __HALF_SIZE__ = Math.floor(this.__SIZE__ / 2);

    // @ts-ignore
    data: Data;
    // @ts-ignore
    firstData: Data['firstData'];

    material = {
        animates: {} as Record<string, Animate>,
        images: {
            autotile: {} as Record<string, HTMLImageElement>,
            tilesets: {} as Record<string, HTMLImageElement>,
            images: {} as Record<string, HTMLImageElement>,
            ...({} as { [ K in typeof MATERIALS[number] ]: HTMLImageElement })
        },
        items: {} as ItemData,
        enemys: {} as EnemyData,
        icons: {} as any as IconData,
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
            'fog': null as any as HTMLImageElement,
            'cloud': null as any as HTMLImageElement,
            'sun': null as any as HTMLImageElement
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
        'floorId': null as any as string,
        'thisMap': null,
        'maps': null as any as Record<string, ResolvedMap>,
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
        "globalAttribute": {
            // 'equipName': main.equipName || [],
            // "statusLeftBackground": main.styles.statusLeftBackground || "url(project/materials/ground.png) repeat",
            // "statusTopBackground": main.styles.statusTopBackground || "url(project/materials/ground.png) repeat",
            // "toolsBackground": main.styles.toolsBackground || "url(project/materials/ground.png) repeat",
            // "borderColor": main.styles.borderColor || [204, 204, 204, 1],
            // "statusBarColor": main.styles.statusBarColor || [255, 255, 255, 1],
            // "floorChangingStyle": main.styles.floorChangingStyle || "background-color: black; color: white",
            // "selectColor": main.styles.selectColor || [255, 215, 0, 1],
            "font": "Verdana"
        },
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
    status = {} as any as GameStatus;
    dymCanvas: Record<string, CanvasRenderingContext2D> = {};

    tilesets: string[] = [];
    /** 
     * 获得所有楼层的信息
     * @example core.floors[core.status.floorId].events // 获得本楼层的所有自定义事件
     */
    floors: Record<string, Floor> = {};
    floorIds: string[] = [];

    canvas: Record<string, CanvasRenderingContext2D>;

    nameMap: Record<string, string> = {};

    flags: Record<string, boolean> = {};

    values: Record<string, number> = {};

    userConfig = new Config({
        enemyDamage: true,
        critical: true,
        extraDamage: true,
        enableEnemyPoint: 0,
        leftHandPrefer: false,
        extraDamageType: 0,
        moveSpeed: 100,
        floorChangeTime: 500,
    });

    constructor() {
        const CANVAS = [
            { name: "bg", zIndex: 10 },
            { name: "event", zIndex: 30 },
            { name: "event2", zIndex: 50 },
            { name: "fg", zIndex: 60 },
            { name: "damage", zIndex: 65 },
            { name: "animate", zIndex: 70 },
            { name: "curtain", zIndex: 125 },
        ];
        this.canvas = {};
        for (const { name, zIndex } of CANVAS) {
            const ctx = createCTX();
            const canvas = ctx.canvas;
            canvas.style.position = "absolute";
            canvas.style.zIndex = zIndex.toString();
            canvas.width = this.__PIXELS__;
            canvas.height = this.__PIXELS__;
            this.canvas[name] = ctx;
        }
    }

    async load() {
        await core.loader.loadData();
        await core.loader.addPreloadTask();
    }

    mountCanvas(mountPoint: HTMLElement) {
        Object.values(core.canvas).forEach((ctx) => {
            mountPoint.appendChild(ctx.canvas);
        })
    }

    /**
     * 初始化
     */
    init() {
        this._init_flags();
        this._init_others();
        // this._init_plugins();

        // 初始化地图
        core.initStatus.maps = core.maps._initMaps();
        core.control._setRequestAnimationFrame();
    }

    private _init_flags() {
        core.flags = cloneDeep(core.data.flags);
        core.values = cloneDeep(core.data.values);
        core.firstData = cloneDeep(core.data.firstData);
        this._init_sys_flags();
        
        // 让你总是拼错！——拼错了就爬！
        // window.on = true;
        // window.off = false;
        // window.ture = true;
        // window.flase = false;
    
        // (core.firstData.shops||[]).forEach(function (t) { core.initStatus.shops[t.id] = t; });
    
        core.maps._initFloors();
        // 初始化怪物、道具等
        core.material.enemys = core.enemys.getEnemys();
        core.material.items = core.items.getItems();
        core.material.icons = core.icons.getIcons();
    
        core.events.initAutoEvents();
    }

    _init_others() {
        // 一些额外的东西

        core.animateFrame.weather.fog = core.material.images.fog;
        core.animateFrame.weather.cloud = core.material.images.cloud;
        core.animateFrame.weather.sun = core.material.images.sun;
        core.material.images.images.keyboard = core.material.images.keyboard;
        // // 记录存档编号
        // core.saves.saveIndex = core.getLocalStorage('saveIndex', 1);
        // core.control.getSaveIndexes(function (indexes) { core.saves.ids = indexes; });
    }

    _init_sys_flags = function () {
        if (core.flags.equipboxButton) core.flags.equipment = true;
        core.flags.displayEnemyDamage = core.userConfig.get('enemyDamage');
        core.flags.displayCritical = core.userConfig.get('critical');
        core.flags.displayExtraDamage = core.userConfig.get('extraDamage');
        // @ts-ignore
        core.flags.enableEnemyPoint = core.userConfig.get('enableEnemyPoint');
        core.flags.leftHandPrefer = core.userConfig.get('leftHandPrefer');
        // @ts-ignore
        core.flags.extraDamageType = core.userConfig.get('extraDamageType');
        // 行走速度
        core.values.moveSpeed = core.userConfig.get('moveSpeed');
        core.values.floorChangeTime = core.userConfig.get('floorChangeTime');
        // core.flags.enableHDCanvas = core.getLocalStorage('enableHDCanvas', !core.platform.isIOS);
    }

    private playPromise = Promise.resolve();
    private _playPromiseHandler = () => {};

    async startPlay() {
        this.playPromise = new Promise((res) => {
            this._playPromiseHandler = res;
        })
        return this.waitFinish();
    }

    async waitFinish() {
        return this.playPromise;
    }

    finishPlay() {
        this._playPromiseHandler();
        this.playPromise = Promise.resolve();
        this._playPromiseHandler = () => {};
    }
}

type Forward<T> = Omit<{
    [ K in keyof T as T[K] extends Function ? K : never ]: T[K]
}, "init" | "load">

type core = Core
    & Forward<Control> & { control: Control }
    & Forward<Enemys> & { enemys: Enemys }
    & Forward<Events> & { events: Events }
    & Forward<Icons> & { icons: Icons }
    & Forward<Items> & { items: Items }
    & Forward<Loader> & { loader: Loader }
    & Forward<Maps> & { maps: Maps }
    & Forward<UI> & { ui: UI }
    & Forward<Utils> & { utils: Utils }
    
function createCore(...libs: any[]): core  {
    const core = new Core();
    const forward = (libname: string, libConstructor: { new(): any }) => {
        const lib = new libConstructor();
        // @ts-ignore
        core[libname] = lib;
        const prototype = Object.getPrototypeOf(lib);
        Reflect.ownKeys(prototype).forEach((key) => {
            if (typeof key !== "string") return;
            if (key === "constructor" || key === "init" || key === "load") return;
            if (key.charAt(0) === '_') return;
            if (!(Object.getOwnPropertyDescriptor(prototype, key)?.value instanceof Function)) return;
            console.log(`[createCore] 转发${ libname }.${ key }`);

            const parameterInfo = /^\s*(function)?\s*[\w_$]*\(([\w_,$\s]*)\)\s*\{/.exec(prototype[key].toString());
            const parameters = (parameterInfo === null ? "" : parameterInfo[2]).replace(/\s*/g, '').replace(/,/g, ', ');
            eval(`core.${ key } = function (${ parameters }) {\n\treturn core.${ libname }.${ key }(${ parameters });\n}`);
        });
    }
    libs.forEach((lib) => {
        forward(lib.name, lib);
    })
    // @ts-ignore
    return core;
}

export const core = createCore(
    Control,
    Enemys,
    Events,
    Icons,
    Items,
    Loader,
    Maps,
    UI,
    Utils,
);

/**
 * @todo 粒度更细的热重载
 */
if (import.meta.hot) {
    import.meta.hot.decline();
}
