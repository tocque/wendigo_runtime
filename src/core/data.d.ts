import { MotaEvent } from "./events";

type Direction = 'up' | 'down' | 'left' | 'right';
type RGBArray = [number, number, number, number]

export interface HeroLoc {
    direction: Direction,
    x: number,
    y: number
}

export interface HeroData {
    image: string,
    animate: boolean,
    name: string,
    lv: number,
    hpmax: number,
    hp: number,
    manamax: number,
    mana: number,
    atk: number,
    def: number,
    mdef: number,
    money: number,
    exp: number,
    equipment: [],
    items: {
        constants: Record<string, number>,
        tools: Record<string, number>,
        equips: Record<string, number>
    },
    loc: HeroLoc
    flags: Record<string, any>,
    followers: string[],
    steps: number
}

export interface GameLevel {
    name: string,
    title: string,
    hard: number,
    action: MotaEvent,
    color?: string | RGBArray 
}

export interface Data {
    /**
     * 资源的列表
     */
    main: {
        floorIds: string[],
        floorPartitions: [string, string][],
        images: string[],
        tilesets: string[],
        animates: string[],
        bgms: string[],
        sounds: string[],
        fonts: string[],
        nameMap: string[],
        levelChoose: GameLevel[],
        equipName: string[],
        startBgm: string,
        // styles: Record<string, any>
    }
    firstData: {
        floorId: string,
        hero: HeroData,
        // startCanvas: any[],
        startText: MotaEvent,
        // shops: any[],
        levelUp: any[],
    }
    values: Record<string, number>,
    flags: Record<string, boolean>,
}

export interface HeroStatus {
    equipment: (string | null)[]
    lv: number
    name: string
    hp: number
    hpmax: number
    mana: number
    manamax: number
    atk: number
    def: number
    mdef: number
    money: number
    exp: number
    loc: {
        direction: Direction
        x: number
        y: number
    }
    items: {
        keys: Record<string, number>
        constants: Record<string, number>
        tools: Record<string, number>
        equips: Record<string, number>
        [ key: string ]: Record<string, number>
    }
    flags: Record<string, any>
    steps: number
    statistics: {
        battle: number
        battleDamage: number
        currTime: number
        exp: number
        extraDamage: number
        hp: number
        ignoreSteps: number
        money: number
        moveDirectly: number
        poisonDamage: number
        start: number
        totalTime: number
    }
    [key: string]: any
}

export interface ResolvedMap {

}

export interface GameStatus {
    played: boolean
    gameOver: boolean

    /** 当前勇士状态信息。例如core.status.hero.atk就是当前勇士的攻击力数值 */
    hero: HeroStatus

    /** 当前层的floorId */
    floorId: string
    /** 获得所有楼层的地图信息 */
    maps: { [key: string]: ResolvedMap }
    /** 获得当前楼层信息，等价于core.status.maps[core.status.floorId] */
    thisMap: ResolvedMap
    bgmaps: { [key: string]: number[][] }
    fgmaps: { [key: string]: number[][] }
    mapBlockObjs: { [key: string]: any }
    /** 显伤伤害 */
    checkBlock: {}
    damage: {}

    lockControl: boolean

    /** 勇士移动状态 */ 
    heroMoving: number
    heroStop: boolean

    // 自动寻路相关
    automaticRoute: {
        autoHeroMove: boolean
        autoStep: number
        movedStep: number
        destStep: number
        destX: any
        destY: any
        offsetX: any
        offsetY: any
        autoStepRoutes: []
        moveStepBeforeStop: []
        lastDirection: any
        cursorX: any
        cursorY: any
        moveDirectly: boolean
    },

    // 按下键的时间：为了判定双击
    downTime: number
    ctrlDown: boolean

    // 路线&回放
    route: string[],
    replay: {
        replaying: boolean
        pausing: boolean
        /** 正在某段动画中 */animate: boolean
        toReplay: []
        totalList: []
        speed: number
        steps: number
        save: []
    }

    // event事件
    shops: {}
    event: {
        id: null
        data: null
        selection: null
        ui: null
        interval: null
    }
    autoEvents: []
    textAttribute: {
        position: string
        offset: number
        title: RGBArray
        background: RGBArray
        text: RGBArray
        titlefont: number
        textfont: number
        bold: boolean
        time: number
        letterSpacing: number
        animateTime: number
    },
    globalAttribute: {
        equipName: string[]
        statusLeftBackground: string
        statusTopBackground: string
        toolsBackground: string
        borderColor: string
        statusBarColor: string
        floorChangingStyle: string
        font: string
    }
    curtainColor: null

    // 动画
    globalAnimateObjs: []
    floorAnimateObjs: []
    boxAnimateObjs: []
    autotileAnimateObjs: []
    globalAnimateStatus: number
    animateObjs: []
}
