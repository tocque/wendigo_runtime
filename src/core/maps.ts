// @ts-nocheck

import { createCTX } from "@/utils/canvas";
import { core } from "./core";

export interface BlockInfo {
    cls: string, 
    id: string, 
    [key: string]: any 
}

export interface Block { 
    x: number, 
    y: number, 
    id: number, 
    event: BlockInfo
}

export type MapData = Record<string, BlockInfo>;

export interface frameObj {
    angle: number
    index: number
    mirror: number
    opacity: number
    x: number
    y: number
    zoom: number
}

export interface Animate {
    frame: number
    frames: FrameObj[][]
    images: (HTMLImageElement | null)[]
    ratio: number
    pitch: number
    se: string
}

export interface Floor {
    title: string,
    ratio: number
}

export class Maps {

    blocksInfo: MapData;

    groundCanvas = createCTX();
    groundPattern: CanvasPattern | null;

    private tempCanvas = createCTX();
    private cacheCanvas = createCTX();

    init(mapData: MapData) {
        this.blocksInfo = mapData;
        //delete(maps_90f36752_8815_4be8_b32b_d7fad1d0542e);
        const ctx = this.groundCanvas;
        const canvas = ctx.canvas;
        canvas.width = canvas.height = 32;
        this.groundPattern = ctx.createPattern(ctx.canvas, 'repeat');
    }
    _initFloors(floorId?: string) {
        if (!floorId) {
            core.floorIds.forEach((floorId) => {
                core.maps._initFloors(floorId);
            });
            return;
        }
        core.floors[floorId].width = core.floors[floorId].width || core.__SIZE__;
        core.floors[floorId].height = core.floors[floorId].height || core.__SIZE__;

        // 战前事件兼容性
        if (!core.floors[floorId].beforeBattle)
            core.floors[floorId].beforeBattle = {};
        // cannotMoveIn兼容性
        if (!core.floors[floorId].cannotMoveIn)
            core.floors[floorId].cannotMoveIn = {};
    }
    _resetFloorImages() {
        for (var floorId in core.status.maps) {
            (core.status.maps[floorId].images || []).forEach(function (one) {
                var flag = "__floorImg__" + floorId + "_" + one.x + "_" + one.y;
                if (core.getFlag(flag) == null) {
                    if (one.disabled)
                        core.setFlag(flag, true);
                }
            });
        }
    }
    _setHDCanvasSize(ctx, width, height) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (width != null)
            ctx.canvas.width = width * core.domStyle.ratio;
        if (height != null)
            ctx.canvas.height = height * core.domStyle.ratio;
        ctx.scale(core.domStyle.ratio, core.domStyle.ratio);
        ctx.canvas.setAttribute('isHD', 1);
    }
    // ------ 加载地图与地图的存档读档（压缩与解压缩） ------ //
    ////// 加载某个楼层（从剧本或存档中） //////
    loadFloor(floorId, map) {
        var floor = core.floors[floorId];
        if (!map)
            map = core.cloneArray(floor.map);
        if (map instanceof Array) {
            map = { "map": map };
        }
        if (!map.map)
            map.map = core.cloneArray(floor.map);
        var content = {};
        var notCopy = this._loadFloor_doNotCopy();
        for (var name in floor) {
            if (notCopy.indexOf(name) == -1 && floor[name] != null)
                content[name] = core.clone(floor[name]);
        }
        for (var name in map) {
            if (notCopy.indexOf(name) == -1 && map[name] != null)
                content[name] = core.clone(map[name]);
        }
        content.map = map.map;
        if (main.mode == 'editor') {
            this.extractBlocks(content);
        }
        return content;
    }
    _loadFloor_doNotCopy() {
        return [
            "firstArrive", "eachArrive", "blocks", "parallelDo", "map", "bgmap", "fgmap",
            "events", "changeFloor", "beforeBattle", "afterBattle", "afterGetItem", "afterOpenDoor",
            "cannotMove", "cannotMoveIn"
        ];
    }
    /// 根据需求解析出blocks
    extractBlocks(map) {
        map = map || core.status.floorId;
        if (typeof map == 'string')
            map = (core.status.maps || {})[map];
        if (!map)
            return;
        if (map.blocks)
            return;
        if (map.deleted) {
            map.blocks = [];
            return;
        }
        var floorId = map.floorId;
        map.blocks = this._mapIntoBlocks(this.decompressMap(map.map, floorId), core.floors[floorId], floorId);
    }
    _mapIntoBlocks(map, floor, floorId) {
        var blocks = [];
        var mw = core.floors[floorId].width;
        var mh = core.floors[floorId].height;
        for (var i = 0; i < mh; i++) {
            for (var j = 0; j < mw; j++) {
                var number = (map[i] || [])[j] || 0, block;
                if (main.mode == 'editor') {
                    if (!number)
                        continue;
                    block = { x: j, y: i, id: number, event: this.getBlockByNumber(number).event };
                } else {
                    block = this.initBlock(j, i, number, true, floor);
                }
                if (block.id != 0 || block.event.trigger)
                    blocks.push(block);
            }
        }
        return blocks;
    }
    extractBlocksForUI(map, flags) {
        if (!map || map.blocks)
            return;
        if (map.deleted)
            return map.blocks = [];
        var floorId = map.floorId;
        var decompressed = this.decompressMap(map.map, floorId);
        map.blocks = [];
        var floor = core.floors[floorId];
        var mw = floor.width;
        var mh = floor.height;
        for (var i = 0; i < mh; i++) {
            for (var j = 0; j < mw; j++) {
                var number = (decompressed[i] || [])[j] || 0;
                if (!number || number == 17)
                    continue;
                var isDisabled = this.isMapBlockDisabled(floorId, j, i, flags);
                if (isDisabled)
                    continue;
                if (isDisabled == null) {
                    // 检查是否初始禁用
                    var event = (floor.events || {})[j + "," + i];
                    if (event != null && event.enable === false)
                        continue;
                }
                var opacity = this._getBlockOpacityFromFlag(floorId, j, i, flags);
                if (opacity == null) {
                    // 检查初始不透明度
                    var event = (floor.events || {})[j + "," + i];
                    if (event != null && event.opacity != null)
                        opacity = event.opacity;
                }
                var filter = this._getBlockFilterFromFlag(floorId, j, i, flags);
                if (filter == null) {
                    // 检查初始filter
                    var event = (floor.events || {})[j + "," + i];
                    if (event != null && event.filter != null)
                        filter = core.clone(event.filter);
                }
                map.blocks.push(Object.assign({}, this.getBlockByNumber(number), { x: j, y: i, opacity: opacity, filter: filter }));
            }
        }
    }
    /**
     * 从ID获得数字
     * @param id 
     * @returns 
     */
    getNumberById(id: string): number {
        id = this.getIdOfThis(id);
        core.status.id2number = core.status.id2number || {};
        if (core.status.id2number[id] == null) {
            core.status.id2number[id] = this._getNumberById(id);
        }
        return core.status.id2number[id];
    }
    _getNumberById(id: string) {
        for (var number in this.blocksInfo) {
            if ((this.blocksInfo[number] || {}).id == id)
                return parseInt(number) || 0;
        }
        // tilesets
        if (/^X\d+$/.test(id)) {
            if (core.icons.getTilesetOffset(id))
                return parseInt(id.substring(1));
        }
        // 特殊ID
        if (id == 'none')
            return 0;
        if (id == 'airwall')
            return 17;
        return 0;
    }
    getBlockByNumber(number: number) {
        core.status.number2Block = core.status.number2Block || {};
        if (core.status.number2Block[number] != null)
            return core.status.number2Block[number];
        return core.status.number2Block[number] = this.initBlock(null, null, number, true);
    }
    getBlockById(id: string) {
        return this.getBlockByNumber(this.getNumberById(id));
    }
    /** 获得当前事件点的ID */
    getIdOfThis(id: string) {
        if (id != 'this')
            return id;
        if (core.status.event.id != 'action')
            return id;
        if (!core.status.event.data || core.status.event.data.x == null || core.status.event.data.y == null)
            return id;
        return core.getBlockId(core.status.event.data.x, core.status.event.data.y) || id;
    }
    /**
     * 数字和ID的对应关系
     * @param x 
     * @param y 
     * @param id 
     * @param addInfo 
     * @param eventFloor 
     * @returns 
     */
    initBlock(x: number, y: number, id: string, addInfo, eventFloor) {
        var disable = null;
        var opacity = null;
        var filter = null;
        if (eventFloor != null) {
            disable = this.isMapBlockDisabled(eventFloor.floorId, x, y);
            opacity = this._getBlockOpacityFromFlag(eventFloor.floorId, x, y);
            filter = this._getBlockFilterFromFlag(eventFloor.floorId, x, y);
        }
        var block = { 'x': x, 'y': y, 'id': id };
        if (disable != null)
            block.disable = disable;
        if (opacity != null)
            block.opacity = opacity;
        if (filter != null)
            block.filter = filter;

        if (id == 17)
            block.event = { "cls": "terrains", "id": "airwall", "cannotIn": ["up", "down", "left", "right"] };
        else if (id in this.blocksInfo)
            block.event = JSON.parse(JSON.stringify(this.blocksInfo[id]));
        else if (core.icons.getTilesetOffset(id))
            block.event = { "cls": "tileset", "id": "X" + id };
        else
            block.event = { 'cls': 'terrains', 'id': 'none', 'noPass': false };

        if (block.event.noPass == null) {
            if (block.event.canPass == null) {
                block.event.noPass = block.event.cls != 'items';
            } else {
                block.event.noPass = !block.event.canPass;
            }
        }
        delete block.event.canPass;

        // 增加怪物的faceIds
        if (block.event.cls.indexOf("enemy") == 0) {
            var enemy = core.material.enemys[block.event.id];
            if (enemy && enemy.faceIds) {
                block.event.faceIds = enemy.faceIds;
            }
        }

        if (addInfo)
            this._addInfo(block);
        if (eventFloor) {
            this._addEvent(block, x, y, (eventFloor.events || {})[x + "," + y]);
            var changeFloor = (eventFloor.changeFloor || {})[x + "," + y];
            if (changeFloor)
                this._addEvent(block, x, y, { "trigger": "changeFloor", "data": changeFloor });
        }
        if (main.mode == 'editor')
            delete block.disable;
        return block;
    }
    ////// 添加一些信息到block上 //////
    _addInfo(block) {
        if (block.event.cls.indexOf("enemy") == 0 && !block.event.trigger) {
            block.event.trigger = 'battle';
        }
        if (block.event.cls == 'items' && !block.event.trigger) {
            block.event.trigger = 'getItem';
        }
        if (block.event.animate == null) {
            block.event.animate = core.icons._getAnimateFrames(block.event.cls);
        }
        block.event.height = 32;
        if (block.event.cls == 'enemy48' || block.event.cls == 'npc48')
            block.event.height = 48;
    }
    ////// 向该楼层添加剧本的自定义事件 //////
    _addEvent(block, x, y, event) {
        if (!event)
            return;
        // event是字符串或数组？
        if (typeof event == "string") {
            event = { "data": [event] };
        }
        else if (event instanceof Array) {
            event = { "data": event };
        }
        event.data = event.data || [];

        // 覆盖enable
        if (block.disable == null && event.enable != null) {
            block.disable = !event.enable;
        }
        // 覆盖opacity
        if (block.opacity == null && event.opacity != null) {
            block.opacity = event.opacity;
        }
        if (block.filter == null && event.filter != null) {
            block.filter = core.clone(event.filter);
        }
        // 覆盖animate
        if (event.animate === false) {
            block.event.animate = 1;
        }
        // 覆盖所有属性
        for (var key in event) {
            if (key != "enable" && key != "animate" && key != "opacity" && key != "filter" && event[key] != null) {
                block.event[key] = core.clone(event[key]);
            }
        }
        // 给无trigger的增加trigger:action
        if (!block.event.trigger) {
            block.event.trigger = 'action';
        }
    }
    ////// 初始化所有地图 //////
    _initMaps() {
        var floorIds = core.floorIds;
        var maps = {};
        for (var i = 0; i < floorIds.length; i++) {
            var floorId = floorIds[i];
            maps[floorId] = this.loadFloor(floorId);
        }
        return maps;
    }
    ////// 压缩地图
    compressMap(mapArr, floorId) {
        var floorMap = core.floors[floorId].map;
        if (core.utils.same(mapArr, floorMap))
            return null;

        var mw = core.floors[floorId].width;
        var mh = core.floors[floorId].height;
        for (var x = 0; x < mh; x++) {
            if (core.utils.same(mapArr[x], floorMap[x])) {
                // 没有改变的行直接删掉记成0
                mapArr[x] = 0;
            }
            else {
                for (var y = 0; y < mw; y++) {
                    if (mapArr[x][y] === floorMap[x][y]) {
                        // 没有改变的数据记成-1
                        mapArr[x][y] = -1;
                    }
                }
            }
        }
        return mapArr;
    }
    _processInvalidMap(mapArr, width, height) {
        if (mapArr.length == height && mapArr[0].length == width)
            return mapArr;
        var map = [];
        for (var i = 0; i < height; ++i) {
            map.push(Array(width).fill(0));
        }
        for (var j = 0; j < height; ++j) {
            for (var i = 0; i < width; ++i) {
                if (j < mapArr.length && i < mapArr[j].length)
                    map[j][i] = mapArr[j][i];
            }
        }
        return map;
    }
    _getBlockOpacityFromFlag(floorId, x, y, flags) {
        if (flags == null)
            flags = (core.status.hero || {}).flags;
        if (flags == null)
            return null;
        var __opacity__ = flags.__opacity__ || {};
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return null;
        if ((flags.__removed__ || []).indexOf(floorId) >= 0)
            return null;
        var index = x + y * core.floors[floorId].width;
        return (__opacity__[floorId] || {})[index];
    }
    _getBlockFilterFromFlag(floorId, x, y, flags) {
        if (flags == null)
            flags = (core.status.hero || {}).flags;
        if (flags == null)
            return null;
        var __filter__ = flags.__filter__ || {};
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return null;
        if ((flags.__removed__ || []).indexOf(floorId) >= 0)
            return null;
        var index = x + y * core.floors[floorId].width;
        return core.clone((__filter__[floorId] || {})[index]);
    }
    ////// 设置某个点的不透明度 //////
    setBlockOpacity(opacity, x, y, floorId) {
        if (window.flags == null)
            return;
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        if (!window.flags.__opacity__)
            window.flags.__opacity__ = {};
        if ((window.flags.__removed__ || []).indexOf(floorId) >= 0)
            return;
        var index = x + y * core.floors[floorId].width;
        var __opacity__ = window.flags.__opacity__;
        if (!__opacity__[floorId])
            __opacity__[floorId] = {};
        if (opacity == null)
            delete __opacity__[floorId][index];
        else
            __opacity__[floorId][index] = opacity;

        ////// 重绘该点图块
        var block = core.getBlock(x, y, floorId, true);
        if (block != null) {
            block.opacity = opacity;
            if (floorId == core.status.floorId && !block.disable) {
                if (block.event.cls == 'autotile') {
                    core.redrawMap();
                } else {
                    core.drawBlock(block);
                    core.addGlobalAnimate(block);
                }
            }
        }
    }
    setBlockFilter(filter, x, y, floorId) {
        if (window.flags == null)
            return;
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        if (!window.flags.__filter__)
            window.flags.__filter__ = {};
        if ((window.flags.__removed__ || []).indexOf(floorId) >= 0)
            return;
        var index = x + y * core.floors[floorId].width;
        var __filter__ = window.flags.__filter__;
        if (!__filter__[floorId])
            __filter__[floorId] = {};
        if (filter == null)
            delete __filter__[floorId][index];
        else {
            if (!filter.blur && !filter.hue && !filter.shadow && !filter.grayscale && !filter.invert)
                delete __filter__[floorId][index];
            else
                __filter__[floorId][index] = core.clone(filter);
        }

        ////// 重绘该点图块
        var block = core.getBlock(x, y, floorId, true);
        if (block != null) {
            block.filter = core.clone(filter);
            if (floorId == core.status.floorId && !block.disable) {
                if (block.event.cls == 'autotile') {
                    core.redrawMap();
                } else {
                    core.drawBlock(block);
                    core.addGlobalAnimate(block);
                }
            }
        }
    }
    ////// 某个点图块是否被强制启用或禁用
    isMapBlockDisabled(floorId, x, y, flags) {
        if (flags == null)
            flags = (core.status.hero || {}).flags;
        if (flags == null)
            return null;
        var __disabled__ = flags.__disabled__ || {};
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return null;
        if ((flags.__removed__ || []).indexOf(floorId) >= 0)
            return null;
        var index = x + y * core.floors[floorId].width;
        if (!__disabled__[floorId])
            return null;
        if (__disabled__[floorId][0].indexOf(index) >= 0)
            return true;
        if (__disabled__[floorId][1].indexOf(index) >= 0)
            return false;
    }
    ////// 设置某个点的图块强制启用/禁用状态
    setMapBlockDisabled(floorId, x, y, disabled) {
        if (window.flags == null)
            return;
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return null;
        if (!window.flags.__disabled__)
            window.flags.__disabled__ = {};
        if ((window.flags.__removed__ || []).indexOf(floorId) >= 0)
            return;
        var __disabled__ = window.flags.__disabled__ || {};
        if (!__disabled__[floorId])
            __disabled__[floorId] = [[], []];
        var index = x + y * core.floors[floorId].width;
        __disabled__[floorId][0] = __disabled__[floorId][0].filter(function (x) { return x != index; });
        __disabled__[floorId][1] = __disabled__[floorId][1].filter(function (x) { return x != index; });
        if (disabled == null)
            return;
        if (disabled)
            __disabled__[floorId][0].push(index);
        else
            __disabled__[floorId][1].push(index);
    }
    ////// 解压缩地图
    decompressMap(mapArr, floorId) {
        var mw = core.floors[floorId].width;
        var mh = core.floors[floorId].height;
        var floorMap = this._processInvalidMap(core.floors[floorId].map, mw, mh);

        if (!mapArr)
            return core.cloneArray(floorMap);

        for (var x = 0; x < mh; x++) {
            if (x >= mapArr.length) {
                mapArr.push(0);
            }
            if (mapArr[x] === 0) {
                mapArr[x] = core.cloneArray(floorMap[x]);
            }
            else {
                for (var y = 0; y < mw; y++) {
                    if (y >= mapArr[x].length)
                        mapArr[x].push(-1);
                    if (mapArr[x][y] === -1) {
                        mapArr[x][y] = floorMap[x][y];
                    }
                }
            }
        }
        return mapArr;
    }
    /**
     * 将当前地图重新变成数字，以便于存档
     * @param floorId 
     * @returns 
     */
    saveMap(floorId: string) {
        var maps = core.status.maps;
        if (!floorId) {
            var map = {};
            for (var id in maps) {
                var obj = this.saveMap(id);
                if (Object.keys(obj).length > 0)
                    map[id] = obj;
            }
            return map;
        }
        // 砍层状态：直接返回
        if ((flags.__removed__ || []).indexOf(floorId) >= 0) {
            return {};
        }

        var map = maps[floorId];
        var thisFloor = this._compressFloorData(map, core.floors[floorId]);
        var mapArr = this.compressMap(map.blocks ? this._getMapArrayFromBlocks(map.blocks, map.width, map.height, true) : map.map, floorId);
        if (mapArr != null)
            thisFloor.map = mapArr;
        return thisFloor;
    }
    _compressFloorData(map, floor) {
        var thisFloor = {};
        var notCopy = this._loadFloor_doNotCopy();
        for (var name in map) {
            if (notCopy.indexOf(name) == -1) {
                var floorData = floor[name];
                if (!core.utils.same(map[name], floorData)) {
                    thisFloor[name] = core.clone(map[name]);
                }
            }
        }
        return thisFloor;
    }
    ////// 将存档中的地图信息重新读取出来 //////
    loadMap(data, floorId, flags) {
        if (!floorId) {
            var map = {};
            core.floorIds.forEach(function (id) {
                if (core.inArray((flags || {}).__removed__, id)) {
                    data[id] = { deleted: true, canFlyTo: false, canFlyFrom: false, cannotViewMap: true };
                }
                map[id] = core.maps.loadFloor(id, data[id]);
            });
            return map;
        }
        return this.loadFloor(floorId, data[floorId]);
    }
    /**
     * 更改地图画布的尺寸
     * @param floorId 
     * @returns 
     */
    resizeMap(floorId: string) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        core.bigmap.width = core.floors[floorId].width;
        core.bigmap.height = core.floors[floorId].height;
        core.bigmap.posX = core.bigmap.posY = 0;

        core.bigmap.v2 = core.bigmap.width * core.bigmap.height > core.bigmap.threshold;
        var width = core.bigmap.v2 ? core.__PIXELS__ + 64 : core.bigmap.width * 32;
        var height = core.bigmap.v2 ? core.__PIXELS__ + 64 : core.bigmap.height * 32;

        core.bigmap.canvas.forEach(function (cn) {
            if (core.domStyle.hdCanvas.indexOf(cn) >= 0)
                core.maps._setHDCanvasSize(core.canvas[cn], width, height);
            else {
                core.canvas[cn].canvas.width = width;
                core.canvas[cn].canvas.height = height;
            }
            core.canvas[cn].canvas.style.width = width * core.domStyle.scale + "px";
            core.canvas[cn].canvas.style.height = height * core.domStyle.scale + "px";
            core.canvas[cn].translate(core.bigmap.v2 ? 32 : 0, core.bigmap.v2 ? 32 : 0);
            if (main.mode === 'editor' && editor.isMobile) {
                core.canvas[cn].canvas.style.width = width / core.__PIXELS__ * 96 + "vw";
                core.canvas[cn].canvas.style.height = height / core.__PIXELS__ * 96 + "vw";
            }
        });
    }
    ////// 将当前地图重新变成二维数组形式 //////
    getMapArray(floorId, noCache) {
        floorId = floorId || core.status.floorId;
        var map = core.status.maps[floorId];
        if (!map.blocks || !noCache)
            return map.map;
        return map.map = this._getMapArrayFromBlocks(map.blocks, map.width, map.height);
    }
    ////// 获得地图上某点的数字
    getMapNumber(x, y, floorId, noCache) {
        return this.getMapArray(floorId, noCache)[y][x];
    }
    _updateMapArray(floorId, x, y) {
        floorId = floorId || core.status.floorId;
        var map = core.status.maps[floorId];
        if (!map.blocks)
            return;
        if (x == null || y == null)
            return this.getMapArray(floorId, true);
        var block = this.getBlock(x, y, floorId, true);
        if (block == null || block.disable)
            map.map[y][x] = 0;
        else
            map.map[y][x] = block.id;
    }
    _getMapArrayFromBlocks(blockArray, width, height, showDisable) {
        var blocks = [];
        for (var x = 0; x < height; x++)
            blocks.push(Array(width).fill(0));

        blockArray.forEach(function (block) {
            if (showDisable || !block.disable)
                blocks[block.y][block.x] = block.id;
        });
        return blocks;
    }
    ////// 以x,y的形式返回每个点的事件 //////
    getMapBlocksObj(floorId, noCache) {
        floorId = floorId || core.status.floorId;
        if (core.status.mapBlockObjs[floorId] && !noCache)
            return core.status.mapBlockObjs[floorId];

        var obj = {};
        core.extractBlocks(floorId);
        core.status.maps[floorId].blocks.forEach(function (block) {
            obj[block.x + "," + block.y] = block;
        });
        return core.status.mapBlockObjs[floorId] = obj;
    }
    ////// 将背景前景层变成二维数组的形式 //////
    _getBgFgMapArray(name, floorId, noCache) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return [];
        var width = core.floors[floorId].width;
        var height = core.floors[floorId].height;

        if (!noCache && core.status[name + "maps"][floorId])
            return core.status[name + "maps"][floorId];

        var arr = (main.mode == 'editor' && !(window.editor && editor.uievent && editor.uievent.isOpen))
            ? core.cloneArray(editor[name + 'map']) : null;
        if (arr == null)
            arr = core.cloneArray(core.floors[floorId][name + "map"] || []);

        for (var y = 0; y < height; ++y) {
            if (arr[y] == null)
                arr[y] = Array(width).fill(0);
        }
        (core.getFlag('__' + name + 'v__', {})[floorId] || []).forEach(function (one) {
            arr[one[1]][one[0]] = one[2] || 0;
        });
        (core.getFlag('__' + name + 'd__', {})[floorId] || []).forEach(function (one) {
            arr[one[1]][one[0]] = 0;
        });
        if (main.mode == 'editor') {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    arr[y][x] = arr[y][x].idnum || arr[y][x] || 0;
                }
            }
        }
        if (core.status[name + "maps"])
            core.status[name + "maps"][floorId] = arr;
        return arr;
    }
    getBgMapArray(floorId) {
        return this._getBgFgMapArray('bg', floorId);
    }
    getFgMapArray(floorId) {
        return this._getBgFgMapArray('fg', floorId);
    }
    _getBgFgNumber(name, x, y, floorId) {
        if (x == null)
            x = core.getHeroLoc('x');
        if (y == null)
            y = core.getHeroLoc('y');
        return this._getBgFgMapArray(name, floorId)[y][x];
    }
    getBgNumber(x, y, floorId) {
        return this._getBgFgNumber('bg', x, y, floorId);
    }
    getFgNumber(x, y, floorId) {
        return this._getBgFgNumber('fg', x, y, floorId);
    }
    // ------ 当前能否朝某方向移动，能否瞬间移动 ------ //
    ////// 生成全图的当前可移动信息 //////
    generateMovableArray(floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return null;
        var arrays = this._generateMovableArray_arrays(floorId);

        var width = core.floors[floorId].width, height = core.floors[floorId].height;
        var array = [];
        for (var x = 0; x < width; ++x) {
            array[x] = Array(height).fill([]);
        }
        var v2 = floorId == core.status.floorId && core.bigmap.v2;
        var startX = v2 ? Math.max(0, core.bigmap.posX - core.bigmap.extend) : 0;
        var endX = v2 ? Math.min(width, core.bigmap.posX + core.__SIZE__ + core.bigmap.extend + 1) : width;
        var startY = v2 ? Math.max(0, core.bigmap.posY - core.bigmap.extend) : 0;
        var endY = v2 ? Math.min(height, core.bigmap.posY + core.__SIZE__ + core.bigmap.extend + 1) : height;

        for (var x = startX; x < endX; x++) {
            for (var y = startY; y < endY; y++) {
                array[x][y] = ["left", "down", "up", "right"].filter(function (direction) {
                    return core.maps._canMoveHero_checkPoint(x, y, direction, floorId, arrays);
                });
            }
        }
        return array;
    }
    _generateMovableArray_arrays(floorId) {
        return {
            bgArray: this.getBgMapArray(floorId),
            fgArray: this.getFgMapArray(floorId),
            eventArray: this.getMapArray(floorId)
        };
    }
    ////// 勇士能否前往某方向 //////
    canMoveHero(x, y, direction, floorId) {
        if (x == null)
            x = core.getHeroLoc('x');
        if (y == null)
            y = core.getHeroLoc('y');
        direction = direction || core.getHeroLoc('direction');
        return this._canMoveHero_checkPoint(x, y, direction, floorId);
    }
    _canMoveHero_checkPoint(x, y, direction, floorId, arrays) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return false;
        arrays = arrays || this._generateMovableArray_arrays(floorId);

        // 1. 检查该点 cannotMove
        if (core.inArray((core.floors[floorId].cannotMove || {})[x + "," + y], direction))
            return false;

        var nx = x + core.utils.scan[direction].x, ny = y + core.utils.scan[direction].y;
        if (nx < 0 || ny < 0 || nx >= core.floors[floorId].width || ny >= core.floors[floorId].height)
            return false;

        // 2. 检查下个点的 cannotMoveIn
        if (core.inArray((core.floors[floorId].cannotMoveIn || {})[nx + "," + ny], core.turnDirection(":back", direction)))
            return false;

        // 3. 检查该点素材的 cannotOut 和下一个点的 cannotIn
        if (this._canMoveHero_checkCannotInOut(Object.keys(arrays).map(function (name) { return arrays[name][y][x]; }), "cannotOut", direction))
            return false;
        if (this._canMoveHero_checkCannotInOut(Object.keys(arrays).map(function (name) { return arrays[name][ny][nx]; }), "cannotIn", direction))
            return false;

        // 4. 检查是否能进将死的领域
        if (floorId == core.status.floorId && !core.flags.canGoDeadZone && !core.status.lockControl &&
            Math.max(core.status.hero.hp, 1) <= ((core.status.checkBlock.damage || {})[nx + "," + ny] || 0) && arrays.eventArray[ny][nx] == 0)
            return false;

        return true;
    }
    _canMoveHero_checkCannotInOut(number, name, direction) {
        if (number instanceof Array) {
            for (var x in number) {
                if (this._canMoveHero_checkCannotInOut(number[x], name, direction))
                    return true;
            }
            return false;
        }
        if (name == 'cannotIn')
            direction = core.turnDirection(":back", direction);
        return core.inArray((this.getBlockByNumber(number).event || {})[name], direction);
    }
    ////// 能否瞬间移动 //////
    canMoveDirectly(destX, destY) {
        return this.canMoveDirectlyArray([[destX, destY]])[0];
    }
    canMoveDirectlyArray(locs, canMoveArray) {
        var ans = [], number = locs.length;

        var fromX = core.getHeroLoc('x'), fromY = core.getHeroLoc('y');
        if (!this._canMoveDirectly_checkGlobal()) {
            for (var i = 0; i < number; ++i)
                ans.push(-1);
            return ans;
        }
        for (var i = 0; i < number; ++i) {
            if (locs[i][0] == fromX && locs[i][1] == fromY) {
                ans.push(0);
                number--;
            }
            else if (locs[i][0] < 0 || locs[i][0] >= core.bigmap.width || locs[i][1] < 0 || locs[i][1] >= core.bigmap.height) {
                ans.push(-1);
                number--;
            }
            else
                ans.push(null);
        }
        if (number == 0)
            return ans;

        // 检查起点事件
        if (!this._canMoveDirectly_checkStartPoint(fromX, fromY)) {
            for (var i in ans) {
                if (ans[i] == null)
                    ans[i] = -1;
            }
            return ans;
        }

        return this._canMoveDirectly_bfs(fromX, fromY, locs, number, ans, canMoveArray);
    }
    _canMoveDirectly_checkGlobal() {
        // 检查全塔是否禁止瞬间移动
        if (!core.flags.enableMoveDirectly)
            return false;
        // 检查该楼层是否不可瞬间移动
        if (core.status.thisMap.cannotMoveDirectly)
            return false;
        // flag:cannotMoveDirectly为true：不能
        if (core.hasFlag('cannotMoveDirectly'))
            return false;

        return true;
    }
    _canMoveDirectly_checkStartPoint(sx, sy) {
        if (core.status.checkBlock.damage[sx + "," + sy])
            return false;
        var block = core.getBlock(sx, sy);
        if (block != null) {
            // 只有起点是传送点才是能无视
            return block.event.trigger == 'changeFloor';
        }
        return true;
    }
    _canMoveDirectly_bfs(sx, sy, locs, number, ans, canMoveArray) {
        canMoveArray = canMoveArray || this.generateMovableArray();
        var blocksObj = this.getMapBlocksObj();
        // 滑冰
        var bgMap = this.getBgMapArray();

        var visited = [], queue = [];
        visited[sx + "," + sy] = 0;
        queue.push(sx + "," + sy);

        while (queue.length > 0) {
            var now = queue.shift().split(","), x = parseInt(now[0]), y = parseInt(now[1]);
            for (var direction in core.utils.scan) {
                if (!core.inArray(canMoveArray[x][y], direction))
                    continue;
                var nx = x + core.utils.scan[direction].x, ny = y + core.utils.scan[direction].y, nindex = nx + "," + ny;
                if (visited[nindex])
                    continue;
                if (core.onSki(bgMap[ny][nx]))
                    continue;
                if (!this._canMoveDirectly_checkNextPoint(blocksObj, nx, ny))
                    continue;
                visited[nindex] = visited[now] + 1;
                // if (nx == ex && ny == ey) return visited[nindex];
                for (var i in ans) {
                    if (locs[i][0] == nx && locs[i][1] == ny && ans[i] == null) {
                        // 不可以绿点为终点
                        var block = blocksObj[nx + "," + ny];
                        if (block && !block.disable && block.event.trigger) {
                            ans[i] = -1;
                        } else {
                            ans[i] = visited[nindex];
                        }
                        number--;
                        if (number == 0)
                            return ans;
                    }
                }
                queue.push(nindex);
            }
        }

        for (var i in ans) {
            if (ans[i] == null)
                ans[i] = -1;
        }
        return ans;
    }
    _canMoveDirectly_checkNextPoint(blocksObj, x, y) {
        var index = x + "," + y;
        var block = blocksObj[index];
        // 该点是否不可通行或有脚本
        if (block && !block.disable && (block.event.noPass || block.event.script || block.event.event))
            return false;
        // 该点是否是绿点可触发
        if (block && !block.disable && block.event.trigger) {
            if (block.event.trigger != 'changeFloor')
                return false;
            var ignore = core.flags.ignoreChangeFloor;
            if (block.event.data && block.event.data.ignoreChangeFloor != null)
                ignore = block.event.data.ignoreChangeFloor;
            if (!ignore)
                return false;
        }
        // 是否存在阻激夹域伤害
        if (core.status.checkBlock.damage[index])
            return false;
        if (core.status.checkBlock.repulse[index])
            return false;
        // 是否存在捕捉
        if (core.status.checkBlock.ambush[index])
            return false;

        return true;
    }
    ////// 自动寻路找寻最优路径 //////
    automaticRoute(destX, destY) {
        var startX = core.getHeroLoc('x'), startY = core.getHeroLoc('y');
        if (destX == startX && destY == startY)
            return [];
        // BFS找寻最短路径
        var route = this._automaticRoute_bfs(startX, startY, destX, destY);
        if (route[destX + "," + destY] == null)
            return [];
        // 路径数组转换
        var ans = [], nowX = destX, nowY = destY;
        while (nowX != startX || nowY != startY) {
            var dir = route[nowX + "," + nowY];
            ans.push({ 'direction': dir, 'x': nowX, 'y': nowY });
            nowX -= core.utils.scan[dir].x;
            nowY -= core.utils.scan[dir].y;
        }
        ans.reverse();
        return ans;
    }
    _automaticRoute_bfs(startX, startY, destX, destY) {
        var route = {}, canMoveArray = this.generateMovableArray();
        // 使用优先队列
        var queue = new PriorityQueue({ comparator: function (a, b) { return a.depth - b.depth; } });
        route[startX + "," + startY] = '';
        queue.queue({ depth: 0, x: startX, y: startY });
        var blocks = core.getMapBlocksObj();
        while (queue.length != 0) {
            var curr = queue.dequeue(), deep = curr.depth, nowX = curr.x, nowY = curr.y;
            for (var direction in core.utils.scan) {
                if (!core.inArray(canMoveArray[nowX][nowY], direction))
                    continue;
                var nx = nowX + core.utils.scan[direction].x;
                var ny = nowY + core.utils.scan[direction].y;
                if (nx < 0 || nx >= core.bigmap.width || ny < 0 || ny >= core.bigmap.height || route[nx + "," + ny] != null)
                    continue;
                // 重点
                if (nx == destX && ny == destY) {
                    route[nx + "," + ny] = direction;
                    break;
                }
                // 不可通行
                if (core.noPass(nx, ny))
                    continue;
                route[nx + "," + ny] = direction;
                queue.queue({ depth: deep + this._automaticRoute_deepAdd(nx, ny, blocks), x: nx, y: ny });
            }
            if (route[destX + "," + destY] != null)
                break;
        }
        return route;
    }
    _automaticRoute_deepAdd(x, y, blocks) {
        // 判定每个可通行点的损耗值，越高越应该绕路
        var deepAdd = 1;
        var block = blocks[x + "," + y];
        if (block && !block.disable) {
            var id = block.event.id;
            // 绕过亮灯
            if (id == "light")
                deepAdd += 100;
            // 绕过路障
            if (id.endsWith("Net") && !core.hasFlag(id.substring(0, id.length - 3)))
                deepAdd += 100;
            // 绕过血瓶和绿宝石
            if (core.hasFlag('__potionNoRouting__') && (id.endsWith("Potion") || id == 'greenGem'))
                deepAdd += 100;
            // 绕过传送点
            // if (block.event.trigger == 'changeFloor') deepAdd+=10;
        }
        // 绕过存在伤害的地方
        deepAdd += (core.status.checkBlock.damage[x + "," + y] || 0) * 100;
        // 绕过捕捉
        if (core.status.checkBlock.ambush[x + "," + y])
            deepAdd += 1000;
        return deepAdd;
    }
    // -------- 绘制地图，各层图块，楼层贴图，Autotile -------- //
    _getBigImageInfo(bigImage, face, animate) {
        face = face || "down";
        if (["up", "down", "left", "right"].indexOf(face) < 0)
            face = "down";
        var per_width = bigImage.width / 4;
        var per_height = bigImage.height / 4;
        var sx = animate * per_width, sy;
        if (per_height <= per_width / 2) { // 强制视为 1*4 的怪物
            per_height = bigImage.height;
            sy = 0;
        } else {
            sy = core.material.icons.hero[face].loc * per_height;
        }
        var dx, dy;
        switch (face) {
            case "down": case "up": case "left": case "right": dx = 16 - per_width / 2; dy = 32 - per_height; break;
            // case "left": dx = 0; dy = 32 - per_height; break;
            // case "right": dx = 32 - per_width; dy = 32 - per_height; break;
        }

        return { sx: sx, sy: sy, per_width: per_width, per_height: per_height, face: face, dx: dx, dy: dy };
    }
    ////// 绘制一个图块 //////
    drawBlock(block, animate, ctx) {
        if (block.event.id == 'none')
            return;
        var redraw = animate != null;
        if (!redraw)
            animate = 0;
        var x = block.x, y = block.y;
        // --- 在界面外的动画不绘制
        // 判定是否绘制
        if (core.bigmap.v2) {
            var posX = core.bigmap.posX, posY = core.bigmap.posY;
            if (x < posX - 1 || y < posY - 1 || x > posX + core.__SIZE__ || y > posY + core.__SIZE__ + 1) { // +1 for 48 height
                return;
            }
        } else {
            if (redraw && block.event.animate > 1 &&
                (32 * x < core.bigmap.offsetX - 64 || 32 * x > core.bigmap.offsetX + core.__PIXELS__ + 32
                    || 32 * y < core.bigmap.offsetY - 64 || 32 * y > core.bigmap.offsetY + core.__PIXELS__ + 32 + 16)) {
                return;
            }
        }

        var blockInfo = this.getBlockInfo(block);
        if (blockInfo == null)
            return;
        if (blockInfo.cls != 'tileset')
            blockInfo.posX = animate % blockInfo.animate;
        blockInfo.opacity = block.opacity;
        blockInfo.filter = block.filter;
        if (!block.name)
            this._drawBlockInfo(blockInfo, block.x, block.y, ctx);

        else
            this._drawBlockInfo_bgfg(blockInfo, block.name, block.x, block.y, ctx);
    }
    _drawBlockInfo_bigImage(blockInfo, x, y, ctx) {
        var bigImageInfo = this._getBigImageInfo(blockInfo.bigImage, blockInfo.face, blockInfo.posX);
        var per_width = bigImageInfo.per_width, per_height = bigImageInfo.per_height, sx = bigImageInfo.sx, sy = bigImageInfo.sy;
        var bigImage = blockInfo.bigImage;

        if (main.mode == 'editor') {
            var px = 32 * x - 32 * core.bigmap.posX;
            var py = 32 * y - 32 * core.bigmap.posY;
            if (ctx == null)
                ctx = 'event';
            core.clearMap(ctx, px, py, 32, 32);
            core.drawImage(ctx, bigImage, sx, sy, per_width, per_height, px, py, 32, 32);
            return;
        }

        var px = 32 * x - core.bigmap.offsetX;
        var py = 32 * y - core.bigmap.offsetY;

        // 上半部分 - 会遮挡勇士；z值高于event2，为51
        var header = "_bigImage_header_" + x + "_" + y;
        // 下半部分 - 会被勇士遮挡；z值高于event，为31
        var body = "_bigImage_body_" + x + "_" + y;
        var dx = bigImageInfo.dx, dy = bigImageInfo.dy;

        switch (bigImageInfo.face) {
            case "down": case "up": case "left": case "right":
                core.createCanvas(header, px + dx, py + dy, per_width, -dy, 51);
                this._drawBlockInfo_drawWithFilter(blockInfo, header, function () {
                    core.drawImage(header, bigImage, sx, sy, per_width, -dy, 0, 0, per_width, -dy);
                });
                core.createCanvas(body, px + dx, py, per_width, 32, 31);
                this._drawBlockInfo_drawWithFilter(blockInfo, body, function () {
                    core.drawImage(body, bigImage, sx, sy - dy, per_width, 32, 0, 0, per_width, 32);
                });
                break;
            /*case "left":
                core.createCanvas(header, px + dx, py + dy, per_width, -dy, 51);
                this._drawBlockInfo_drawWithFilter(blockInfo, header, function () {
                    core.drawImage(header, bigImage, sx, sy, per_width, -dy, 0, 0, per_width, -dy);
                });
                core.createCanvas(body, px + dx, py, per_width, 32, 31);
                this._drawBlockInfo_drawWithFilter(blockInfo, body, function () {
                    core.drawImage(body, bigImage, sx, sy - dy, per_width, 32, 0, 0, per_width, 32);
                });
                break;
            case "right":
                core.createCanvas(header, px + dx, py + dy, per_width, -dy, 51);
                this._drawBlockInfo_drawWithFilter(blockInfo, header, function () {
                    core.drawImage(header, bigImage, sx, sy, per_width, -dy, 0, 0, per_width, -dy);
                });
                core.createCanvas(body, px + dx, py, per_width, per_height / 2 + 16, 31);
                this._drawBlockInfo_drawWithFilter(blockInfo, body, function () {
                    core.drawImage(body, bigImage, sx, sy - dy, per_width, 32, 0, 0, per_width, 32);
                });
                break;*/
        }
        if (core.dymCanvas[header]) {
            core.dymCanvas[header].canvas.setAttribute('_ox', 32 * x + dx);
            core.dymCanvas[header].canvas.setAttribute('_oy', 32 * y + dy);
        }
        if (core.dymCanvas[body]) {
            core.dymCanvas[body].canvas.setAttribute('_ox', 32 * x + dx);
            core.dymCanvas[body].canvas.setAttribute('_oy', 32 * y);
        }
    }
    _drawBlockInfo_drawWithFilter(blockInfo, ctx, func) {
        var alpha = null;
        if (blockInfo.opacity != null)
            alpha = core.setAlpha(ctx, blockInfo.opacity);
        core.setFilter(ctx, blockInfo.filter);
        func();
        core.setFilter(ctx, null);
        if (alpha != null)
            core.setAlpha(ctx, alpha);
    }
    _drawBlockInfo(blockInfo, x, y, ctx) {
        if (blockInfo.bigImage)
            return this._drawBlockInfo_bigImage(blockInfo, x, y, ctx);

        var image = blockInfo.image, posX = blockInfo.posX, posY = blockInfo.posY, height = blockInfo.height;
        var px = 32 * x - 32 * core.bigmap.posX;
        var py = 32 * y - 32 * core.bigmap.posY;
        if (ctx == null)
            ctx = 'event';

        this._drawBlockInfo_drawWithFilter(blockInfo, ctx, function () {
            core.clearMap(ctx, px, py, 32, 32);
            core.drawImage(ctx, image, posX * 32, posY * height + height - 32, 32, 32, px, py, 32, 32);
        });
        if (height > 32) {
            this._drawBlockInfo_drawWithFilter(blockInfo, 'event2', function () {
                core.clearMap('event2', px, py + 32 - height, 32, height - 32);
                core.drawImage('event2', image, posX * 32, posY * height, 32, height - 32, px, py + 32 - height, 32, height - 32);
            });
        }
    }
    _drawBlockInfo_bgfg(blockInfo, name, x, y, ctx) {
        var image = blockInfo.image, posX = blockInfo.posX, posY = blockInfo.posY, height = blockInfo.height;
        var px = 32 * x - 32 * core.bigmap.posX;
        var py = 32 * y - 32 * core.bigmap.posY;
        if (ctx == null)
            ctx = name;

        core.clearMap(ctx, px, py + 32 - height, 32, height);
        if (name == 'bg') {
            if (height > 32) {
                core.clearMap(ctx, px, py - 32, 32, 32);
                core.drawImage(ctx, this.groundCanvas.canvas, px, py - 32);
            }
            core.drawImage(ctx, this.groundCanvas.canvas, px, py);
        }
        var alpha = null;
        if (blockInfo.opacity != null)
            alpha = core.setAlpha(ctx, blockInfo.opacity);
        else if (name == 'fg' && this._drawBlockInfo_shouldBlurFg(x, y))
            alpha = core.setAlpha(ctx, 0.6);
        core.setFilter(ctx, blockInfo.filter);
        core.drawImage(ctx, image, posX * 32, posY * height, 32, height, px, py + 32 - height, 32, height);
        core.setFilter(ctx, null);
        if (alpha != null)
            core.setAlpha(ctx, alpha);
    }
    ////// 是否应当存在事件时虚化前景层 //////
    _drawBlockInfo_shouldBlurFg(x, y) {
        if (main.mode == 'play' && !core.flags.blurFg)
            return false;
        var block = this.getBlock(x, y);
        if (block == null || block.id == 0)
            return false;
        if (block.event.cls == 'autotile' || block.event.cls == 'tileset')
            return block.event.script || block.event.event;
        return true;
    }
    ////// 生成groundPattern //////
    generateGroundPattern(floorId) {
        // 生成floorId层的groundPattern（盒子内的怪物动画）
        var groundId = ((core.status.maps || core.floors)[floorId || core.status.floorId] || {}).defaultGround || "ground";
        var groundInfo = core.getBlockInfo(groundId);
        if (groundInfo == null)
            return;
        this.groundCanvas.clearRect(0, 0, 32, 32);
        this.groundCanvas.drawImage(groundInfo.image, 32 * groundInfo.posX, groundInfo.height * groundInfo.posY, 32, 32, 0, 0, 32, 32);
        this.groundPattern = this.groundCanvas.createPattern(this.groundCanvas.canvas, 'repeat');
        // 如果需要用纯色可以直接将下面代码改成改成
        // this.groundPattern = '#000000';
    }
    ////// 绘制某张地图 //////
    drawMap(floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        core.clearMap('all');
        this.generateGroundPattern(floorId);
        core.status.floorId = floorId;
        core.extractBlocks(floorId);
        core.status.thisMap = core.status.maps[floorId];

        this._drawMap_drawAll();
        if (core.status.curtainColor) {
            core.fillRect('curtain', 0, 0, core.__PIXELS__, core.__PIXELS__,
                core.arrayToRGBA(core.status.curtainColor));
        }
        core.drawHero();
        core.updateStatusBar();
    }
    ////// 重绘某张地图 //////
    redrawMap() {
        core.bigmap.canvas.forEach(function (one) {
            core.clearMap(one);
        });
        this._drawMap_drawAll(null, { redraw: true });
        core.drawDamage();
    }
    _drawMap_drawAll(floorId, config) {
        floorId = floorId || core.status.floorId;
        this.drawBg(floorId, config);
        this.drawEvents(floorId);
        this.drawFg(floorId, config);
    }
    _drawMap_drawBlockInfo(ctx, block, blockInfo, arr, config) {
        if (blockInfo == null)
            return;
        var onMap = config.onMap;
        if (onMap && core.bigmap.v2) {
            // 判定是否绘制
            var posX = core.bigmap.posX, posY = core.bigmap.posY;
            if (block.x < posX - 1 || block.y < posY - 1 || block.x > posX + core.__SIZE__ || block.y > posY + core.__SIZE__ + 1) { // +1 for 48 height
                return;
            }
        }

        if (blockInfo.cls == 'autotile') { // Autotile单独处理
            var alpha = null;
            if (block.opacity != null)
                alpha = core.setAlpha(ctx, block.opacity);
            core.setFilter(ctx, block.filter);
            this._drawAutotile(ctx, arr, block, 32, 0, 0, 0, onMap);
            core.setFilter(ctx, null);
            if (alpha != null)
                core.setAlpha(ctx, alpha);
            if (onMap)
                this.addGlobalAnimate(block);
            return;
        }
        if (!onMap) {
            var height = blockInfo.height;
            if (blockInfo.bigImage) {
                config.postDraw.push(function () {
                    var bigImageInfo = core.maps._getBigImageInfo(blockInfo.bigImage, blockInfo.face, 0);
                    var per_width = bigImageInfo.per_width, per_height = bigImageInfo.per_height;
                    core.maps._drawBlockInfo_drawWithFilter(block, ctx, function () {
                        core.drawImage(ctx, blockInfo.bigImage, bigImageInfo.sx, bigImageInfo.sy, per_width, per_height,
                            32 * block.x + bigImageInfo.dx, 32 * block.y + bigImageInfo.dy, per_width, per_height);
                    });
                });
                return;
            }
            this._drawBlockInfo_drawWithFilter(block, ctx, function () {
                core.drawImage(ctx, blockInfo.image, 32 * blockInfo.posX, height * blockInfo.posY, 32, height, 32 * block.x, 32 * block.y + 32 - height, 32, height);
            });
            return;
        }
        this.drawBlock(block, null, ctx);
        this.addGlobalAnimate(block);
    }
    ////// 绘制背景层 //////
    // config：绘制的参数，可包含如下项：
    // redraw - 是否是重绘；ctx - 要绘制到的画布（仅限缩略图使用）；
    drawBg(floorId, config) {
        floorId = floorId || core.status.floorId;
        if (config == null)
            config = {};
        if (typeof config == 'string' || config.canvas)
            config = { ctx: config };
        config = Object.assign({}, config);
        if (config.ctx == null) {
            config.onMap = true;
            config.ctx = 'bg';
            core.clearMap('bg');
            core.status.floorAnimateObjs = this._getFloorImages(floorId);
        }
        var toDrawCtx = core.getContextByName(config.ctx);
        if (!toDrawCtx)
            return;

        var cacheCtx = toDrawCtx;
        if (config.onMap) {
            cacheCtx = this.cacheCanvas;
            cacheCtx.canvas.width = toDrawCtx.canvas.width;
            cacheCtx.canvas.height = toDrawCtx.canvas.height;
            if (core.bigmap.v2)
                cacheCtx.translate(32, 32);
        }
        this._drawBg_draw(floorId, toDrawCtx, cacheCtx, config);
        if (config.onMap)
            cacheCtx.translate(0, 0);
    }
    _drawBg_draw(floorId, toDrawCtx, cacheCtx, config) {
        config.ctx = cacheCtx;
        core.maps._drawBg_drawBackground(floorId, config);
        // ------ 调整这两行的顺序来控制是先绘制贴图还是先绘制背景图块；后绘制的覆盖先绘制的。
        core.maps._drawFloorImages(floorId, config.ctx, 'bg', null, null, config.onMap);
        core.maps._drawBgFgMap(floorId, 'bg', config);
        if (config.onMap)
            core.drawImage(toDrawCtx, cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
        config.ctx = toDrawCtx;
    }
    _drawBg_drawBackground(floorId, config) {
        var groundId = (core.status.maps || core.floors)[floorId].defaultGround || "ground";
        var groundInfo = core.getBlockInfo(groundId);
        var onMap = config.onMap;
        if (groundInfo != null) {
            var start = onMap && core.bigmap.v2 ? -1 : 0;
            var endX = onMap && core.bigmap.v2 ? core.__SIZE__ + 1 : core.floors[floorId].width;
            var endY = onMap && core.bigmap.v2 ? core.__SIZE__ + 1 : core.floors[floorId].height;

            var patternCanvas = document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 32;
            var patternCtx = patternCanvas.getContext('2d');
            core.drawImage(patternCtx, groundInfo.image, 32 * groundInfo.posX, groundInfo.height * groundInfo.posY, 32, 32, 0, 0, 32, 32);

            core.fillRect(config.ctx, 32 * start, 32 * start, 32 * (endX - start), 32 * (endY - start), patternCtx.createPattern(patternCanvas, 'repeat'));
        }
    }
    ////// 绘制事件层 //////
    drawEvents(floorId, blocks, config) {
        floorId = floorId || core.status.floorId;
        if (config == null)
            config = {};
        if (typeof config == 'string' || config.canvas)
            config = { ctx: config };
        config = Object.assign({}, config);
        if (config.ctx == null) {
            config.onMap = true;
            config.ctx = 'event';
            core.clearMap('event');
            core.clearMap('event2');
        }
        var toDrawCtx = core.getContextByName(config.ctx);
        if (!toDrawCtx)
            return;

        var cacheCtx = toDrawCtx;
        if (config.onMap) {
            cacheCtx = this.cacheCanvas;
            cacheCtx.canvas.width = toDrawCtx.canvas.width;
            cacheCtx.canvas.height = toDrawCtx.canvas.height;
            if (core.bigmap.v2)
                cacheCtx.translate(32, 32);
        }

        var arr = null;
        if (!blocks) {
            core.extractBlocks(floorId);
            blocks = core.status.maps[floorId].blocks;
            arr = this.getMapArray(floorId, !config.redraw);
        } else {
            arr = this._getMapArrayFromBlocks(blocks, core.floors[floorId].width, core.floors[floorId].height);
        }
        config.postDraw = [];

        blocks.filter(function (block) {
            if (config.onMap && core.bigmap.v2) {
                // 判定是否绘制
                var posX = core.bigmap.posX, posY = core.bigmap.posY;
                if (block.x < posX - 1 || block.y < posY - 1 || block.x > posX + core.__SIZE__ || block.y > posY + core.__SIZE__ + 1) { // +1 for 48 height
                    return false;
                }
            }
            return block.event && !block.disable;
        }).forEach(function (block) {
            core.maps._drawMap_drawBlockInfo(cacheCtx, block, core.maps.getBlockInfo(block), arr, config);
        });
        config.postDraw.forEach(function (v) { v(); });
        delete config.postDraw;

        if (config.onMap) {
            core.drawImage(toDrawCtx, cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
            cacheCtx.translate(0, 0);
        }
    }
    ////// 绘制前景层 //////
    // config：绘制的参数，可包含如下项：
    // redraw - 是否是重绘；ctx - 要绘制到的画布（仅限缩略图使用）；
    drawFg(floorId, config) {
        floorId = floorId || core.status.floorId;
        if (config == null)
            config = {};
        if (typeof config == 'string' || config.canvas)
            config = { ctx: config };
        config = Object.assign({}, config);
        if (config.ctx == null) {
            config.onMap = true;
            config.ctx = 'fg';
            core.clearMap('fg');
        }
        var toDrawCtx = core.getContextByName(config.ctx);
        if (!toDrawCtx)
            return;

        var cacheCtx = toDrawCtx;
        if (config.onMap) {
            cacheCtx = this.cacheCanvas;
            cacheCtx.canvas.width = toDrawCtx.canvas.width;
            cacheCtx.canvas.height = toDrawCtx.canvas.height;
            if (core.bigmap.v2)
                cacheCtx.translate(32, 32);
        }
        this._drawFg_draw(floorId, toDrawCtx, cacheCtx, config);
        if (config.onMap)
            cacheCtx.translate(0, 0);
    }
    _drawFg_draw(floorId, toDrawCtx, cacheCtx, config) {
        config.ctx = cacheCtx;
        // ------ 调整这两行的顺序来控制是先绘制贴图还是先绘制前景图块；后绘制的覆盖先绘制的。
        core.maps._drawFloorImages(floorId, config.ctx, 'fg', null, null, config.onMap);
        core.maps._drawBgFgMap(floorId, 'fg', config);
        if (config.onMap)
            core.drawImage(toDrawCtx, cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
        config.ctx = toDrawCtx;
    }
    ////// 实际的背景/前景图块的绘制 //////
    _drawBgFgMap(floorId, name, config) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        var width = core.floors[floorId].width;
        var height = core.floors[floorId].height;

        if (!core.status[name + "maps"])
            core.status[name + "maps"] = {};

        var startX = config.onMap && core.bigmap.v2 ? Math.max(0, core.bigmap.posX - 1) : 0;
        var endX = config.onMap && core.bigmap.v2 ? Math.min(width, core.bigmap.posX + core.__SIZE__ + 1) : width;
        var startY = config.onMap && core.bigmap.v2 ? Math.max(0, core.bigmap.posY - 1) : 0;
        var endY = config.onMap && core.bigmap.v2 ? Math.min(height, core.bigmap.posY + core.__SIZE__ + 2) : height; // +1 for 48 px

        var arr = this._getBgFgMapArray(name, floorId, !config.redraw);
        config.postDraw = [];
        for (var x = startX; x < endX; x++) {
            for (var y = startY; y < endY; y++) {
                if (arr[y][x] == 0)
                    continue;
                var block = this.initBlock(x, y, arr[y][x], true);
                block.name = name;
                var blockInfo = this.getBlockInfo(block);
                if (!blockInfo)
                    continue;
                this._drawMap_drawBlockInfo(config.ctx, block, blockInfo, arr, config);
            }
        }
        config.postDraw.forEach(function (v) { v(); });
        delete config.postDraw;
    }
    ////// 绘制楼层贴图 //////
    _drawFloorImages(floorId, ctx, name, images, currStatus, onMap) {
        floorId = floorId || core.status.floorId;
        if (!images)
            images = this._getFloorImages(floorId);
        var redraw = currStatus != null;
        images.forEach(function (one) {
            var image = core.material.images.images[core.getMappedName(one.name)];
            var frame = one.frame || 1;
            if (!image)
                return;
            var flag = "__floorImg__" + floorId + "_" + one.x + "_" + one.y;
            if (core.hasFlag(flag))
                return;
            if (redraw && frame == 1)
                return; // 不重绘

            if (/.*\.gif/i.test(one.name)) {
                if (redraw)
                    return;
                this._drawFloorImages_gif(image, one.x, one.y);
                return;
            }
            this._drawFloorImage(ctx, name, one, image, currStatus, onMap);
        }, this);
    }
    _getFloorImages(floorId) {
        return ((core.status.maps || core.floors)[floorId || core.status.floorId] || {}).images || [];
    }
    _drawFloorImages_gif(image, dx, dy) {
        core.dom.gif.innerHTML = "";
        var gif = new Image();
        gif.src = image.src;
        gif.style.position = 'absolute';
        gif.style.left = (dx * core.domStyle.scale) + "px";
        gif.style.top = (dy * core.domStyle.scale) + "px";
        gif.style.width = image.width * core.domStyle.scale + "px";
        gif.style.height = image.height * core.domStyle.scale + "px";
        core.dom.gif.appendChild(gif);
        return;
    }
    _drawFloorImage(ctx, name, one, image, currStatus, onMap) {
        var height = image.height;
        var imageName = one.name + (one.reverse || '');
        var width = parseInt((one.w == null ? image.width : one.w) / (one.frame || 1));
        var height = one.h == null ? image.height : one.h;
        var sx = (one.sx || 0) + (currStatus || 0) % (one.frame || 1) * width;
        var sy = one.sy || 0;
        var x = one.x || 0, y = one.y || 0;
        if (onMap && core.bigmap.v2) {
            if (x > 32 * core.bigmap.posX + core.__PIXELS__ + 32 || x + width < 32 * core.bigmap.posX - 32
                || y > 32 * core.bigmap.posX + core.__PIXELS__ + 32 || y + height < 32 * core.bigmap.posY - 32) {
                return;
            }
            x -= 32 * core.bigmap.posX;
            y -= 32 * core.bigmap.posY;
        }

        if (one.canvas != 'auto' && one.canvas != name)
            return;
        if (one.canvas != 'auto') {
            if (currStatus != null)
                core.clearMap(ctx, x, y, width, height);
            core.drawImage(ctx, imageName, sx, sy, width, height, x, y, width, height);
        } else {
            if (name == 'bg') {
                if (currStatus != null)
                    core.clearMap(ctx, x, y + height - 32, width, 32);
                core.drawImage(ctx, imageName, sx, sy + height - 32, width, 32, x, y + height - 32, width, 32);
            } else if (name == 'fg') {
                if (currStatus != null)
                    core.clearMap(ctx, x, y, width, height - 32);
                core.drawImage(ctx, imageName, sx, sy, width, height - 32, x, y, width, height - 32);
            }
        }
    }
    ////// 绘制Autotile //////
    _drawAutotile(ctx, mapArr, block, size, left, top, status, onMap) {
        var xx = block.x, yy = block.y;
        var autotile = core.material.images['autotile'][block.event.id];
        status = status || 0;
        status %= parseInt(autotile.width / 96);
        var done = {};
        var isGrass = function (x, y) {
            if (core.maps._drawAutotile_getAutotileAroundId(mapArr[yy][xx], x, y, mapArr)) {
                return 1;
            } else {
                return 0;
            }
        };
        var iG = [];
        [-1, 0, 1].forEach(function (_x) {
            iG[_x] = [];
            [-1, 0, 1].forEach(function (_y) {
                iG[_x][_y] = isGrass(xx + _x, yy + _y);
            });
        });
        if (iG[-1][-1] + iG[0][-1] + iG[0][0] + iG[-1][0] == 3 && !iG[-1][-1]) {
            this._drawAutotile_render(ctx, xx * size + left, yy * size + top, size, autotile, status, 16, null, onMap);
            done[0] = true;
        }
        if (iG[0][-1] + iG[1][-1] + iG[1][0] + iG[0][0] == 3 && !iG[1][-1]) {
            this._drawAutotile_render(ctx, xx * size + left + size / 2, yy * size + top, size, autotile, status, 17, null, onMap);
            done[1] = true;
        }
        if (iG[0][0] + iG[1][0] + iG[1][1] + iG[0][1] == 3 && !iG[1][1]) {
            this._drawAutotile_render(ctx, xx * size + left + size / 2, yy * size + top + size / 2, size, autotile, status, 18, null, onMap);
            done[3] = true;
        }
        if (iG[0 - 1][0] + iG[0][0] + iG[0][1] + iG[-1][1] == 3 && !iG[-1][1]) {
            this._drawAutotile_render(ctx, xx * size + left, yy * size + top + size / 2, size, autotile, status, 19, null, onMap);
            done[2] = true;
        }
        var _id = iG[0][-1] + 2 * iG[-1][0] + 4 * iG[0][1] + 8 * iG[1][0];

        this._drawAutotile_render(ctx, xx * size, yy * size, size, autotile, status, _id, done, onMap);
    }
    _drawAutotile_render(canvas, x, y, size, autotile, status, index, done, onMap) {
        if (onMap) {
            x -= 32 * core.bigmap.posX;
            y -= 32 * core.bigmap.posY;
        }
        var indexData = [[[96 * status, 0, 32, 32, x, y, size, size],],
        [[96 * status, 3 * 32, 16, 32, x, y, size / 2, size], [96 * status + 2 * 32 + 16, 3 * 32, 16, 32, x + size / 2, y, size / 2, size],],
        [[96 * status + 2 * 32, 32, 32, 16, x, y, size, size / 2], [96 * status + 2 * 32, 3 * 32 + 16, 32, 16, x, y + size / 2, size, size / 2],],
        [[96 * status + 2 * 32, 3 * 32, 32, 32, x, y, size, size],],
        [[96 * status, 32, 16, 32, x, y, size / 2, size], [96 * status + 2 * 32 + 16, 32, 16, 32, x + size / 2, y, size / 2, size],],
        [[96 * status, 2 * 32, 16, 32, x, y, size / 2, size], [96 * status + 2 * 32 + 16, 2 * 32, 16, 32, x + size / 2, y, size / 2, size],],
        [[96 * status + 2 * 32, 32, 32, 32, x, y, size, size],],
        [[96 * status + 2 * 32, 2 * 32, 32, 32, x, y, size, size],],
        [[96 * status, 32, 32, 16, x, y, size, size / 2], [96 * status, 3 * 32 + 16, 32, 16, x, y + size / 2, size, size / 2],],
        [[96 * status, 3 * 32, 32, 32, x, y, size, size],],
        [[96 * status + 32, 32, 32, 16, x, y, size, size / 2], [96 * status + 32, 3 * 32 + 16, 32, 16, x, y + size / 2, size, size / 2],],
        [[96 * status + 32, 3 * 32, 32, 32, x, y, size, size],],
        [[96 * status, 32, 32, 32, x, y, size, size],],
        [[96 * status, 2 * 32, 32, 32, x, y, size, size],],
        [[96 * status + 32, 32, 32, 32, x, y, size, size],],
        [[96 * status + 32, 2 * 32, 32, 32, x, y, size, size],],
        [[96 * status + 2 * 32, 0, 16, 16, x, y, size / 2, size / 2],],
        [[96 * status + 2 * 32 + 16, 0, 16, 16, x, y, size / 2, size / 2],],
        [[96 * status + 2 * 32 + 16, 16, 16, 16, x, y, size / 2, size / 2],],
        [[96 * status + 2 * 32, 16, 16, 16, x, y, size / 2, size / 2],],
        ];
        var data = indexData[index];
        if (index >= 16) { // 拐角直接绘制
            core.drawImage(canvas, autotile, data[0][0], data[0][1], data[0][2], data[0][3], data[0][4], data[0][5], size / 2, size / 2);
        } else { // 非拐角要根据是否已经绘制进行切分后绘制
            this._drawAutotile_renderCut(canvas, autotile, x, y, size, data, done);
        }
    }
    _drawAutotile_renderCut(canvas, autotile, x, y, size, data, done) {
        var drawData = [];
        done = done || {};
        if (data.length == 2) {
            var idx = 0;
            var cut = 0;
            for (var i in data) {
                if (data[i][2] % 32) { // 是否纵切
                    cut = 0;
                }
                else if (data[i][3] % 32) { // 是否横切
                    cut = 1;
                }
                if (data[i][0] % 32 || data[i][1] % 32) { // right down
                    idx = 1;
                } else { // left top
                    idx = 0;
                }
                if (cut) {
                    idx *= 2;
                    if (!done[idx])
                        drawData[idx] = [data[i][0], data[i][1]];
                    if (!done[idx + 1])
                        drawData[idx + 1] = [parseInt(data[i][0]) + 16, data[i][1]];
                } else {
                    if (!done[idx])
                        drawData[idx] = [data[i][0], data[i][1]];
                    if (!done[idx + 2])
                        drawData[idx + 2] = [data[i][0], parseInt(data[i][1]) + 16];
                }
            }
        } else {
            if (!done[0])
                drawData[0] = [data[0][0], data[0][1]];
            if (!done[1])
                drawData[1] = [data[0][0] + 16, data[0][1]];
            if (!done[2])
                drawData[2] = [data[0][0], data[0][1] + 16];
            if (!done[3])
                drawData[3] = [data[0][0] + 16, data[0][1] + 16];
        }
        for (var i = 0; i < 4; i++) {
            var dt = drawData[i]; if (!dt)
                continue;
            core.drawImage(canvas, autotile, dt[0], dt[1], 16, 16, x + (i % 2) * size / 2, y + parseInt(i / 2) * size / 2, size / 2, size / 2);
        };
    }
    _drawAutotile_drawBlockByIndex(ctx, dx, dy, autotileImg, index, size, status) {
        //index为autotile的图块索引1-48
        var sx = 16 * ((index - 1) % 6), sy = 16 * (~~((index - 1) / 6));
        status = status || 0;
        status %= parseInt(autotileImg.width / 96);
        core.drawImage(ctx, autotileImg, sx + 96 * status, sy, 16, 16, dx, dy, size / 2, size / 2);
    }
    _drawAutotile_getAutotileAroundId(currId, x, y, mapArr) {
        if (x < 0 || y < 0 || x >= mapArr[0].length || y >= mapArr.length)
            return 1;
        else
            return (core.material.autotileEdges[currId] || []).indexOf(mapArr[y][x]) >= 0;
    }
    _drawAutotile_checkAround(x, y, mapArr) {
        // 得到周围四个32*32块（周围每块都包含当前块的1/4，不清楚的话画下图你就明白）的数组索引
        var currId = mapArr[y][x];
        var pointBlock = [];
        for (var i = 0; i < 4; i++) {
            var bsum = 0;
            var offsetx = i % 2, offsety = ~~(i / 2);
            for (var j = 0; j < 4; j++) {
                var mx = j % 2, my = ~~(j / 2);
                var b = this._drawAutotile_getAutotileAroundId(currId, x + offsetx + mx - 1, y + offsety + my - 1, mapArr);
                bsum += b * (Math.pow(2, 3 - j));
            }
            pointBlock.push(bsum);
        }
        return pointBlock;
    }
    _drawAutotile_getAutotileIndexs(x, y, mapArr, indexArrs) {
        var indexArr = [];
        var pointBlocks = this._drawAutotile_checkAround(x, y, mapArr);
        for (var i = 0; i < 4; i++) {
            var arr = indexArrs[pointBlocks[i]];
            indexArr.push(arr[3 - i]);
        }
        return indexArr;
    }
    _drawAutotileAnimate(block, animate) {
        var x = block.x, y = block.y;
        // ------ 界面外的动画不绘制
        if (core.bigmap.v2) {
            var posX = core.bigmap.posX, posY = core.bigmap.posY;
            if (x < posX - 1 || y < posY - 1 || x > posX + core.__SIZE__ || y > posY + core.__SIZE__) {
                return;
            }
        } else {
            if (32 * x < core.bigmap.offsetX - 64 || 32 * x > core.bigmap.offsetX + core.__PIXELS__ + 32
                || 32 * y < core.bigmap.offsetY - 64 || 32 * y > core.bigmap.offsetY + core.__PIXELS__ + 32 + 16) {
                return;
            }
        }

        var cv = block.name ? core.canvas[block.name] : core.canvas.event;
        cv.clearRect(32 * x - 32 * core.bigmap.posX, 32 * y - 32 * core.bigmap.posY, 32, 32);
        var alpha = null;
        if (block.opacity != null)
            alpha = core.setAlpha(cv, block.opacity);
        core.setFilter(cv, block.filter);
        if (block.name) {
            if (block.name == 'bg')
                core.drawImage('bg', this.groundCanvas.canvas, 32 * x - 32 * core.bigmap.posX, 32 * y - 32 * core.bigmap.posY);
            this._drawAutotile(cv, this._getBgFgMapArray(block.name), block, 32, 0, 0, animate, true);
        }
        else {
            this._drawAutotile(cv, this.getMapArray(), block, 32, 0, 0, animate, true);
        }
        core.setFilter(cv, null);
        if (alpha != null)
            core.setAlpha(cv, alpha);
    }
    ////// 为autotile判定边界 ////// 
    _makeAutotileEdges() {
        const autotileIds = Object.keys(core.material.images.autotile);
        core.material.autotileEdges = {};

        const ctx = createCTX();
        const canvas = ctx.canvas;
        canvas.width = canvas.height = 32;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        const first = {}, second = {};
        autotileIds.forEach((t) => {
            const n = core.maps.getNumberById(t);
            core.clearMap(ctx, 0, 0, 32, 32);
            core.drawImage(ctx, core.material.images.autotile[t], 0, 0, 32, 32, 0, 0, 32, 32);
            first[n] = canvas.toDataURL("image/png");
            core.clearMap(ctx, 0, 0, 32, 32);
            core.drawImage(ctx, core.material.images.autotile[t], 32, 0, 32, 32, 0, 0, 32, 32);
            second[n] = canvas.toDataURL("image/png");
        });

        for (var n in first) {
            n = parseInt(n);
            core.material.autotileEdges[n] = [n];
            for (var n2 in second) {
                n2 = parseInt(n2);
                if (n == n2)
                    continue;
                if (first[n] == second[n2]) {
                    core.material.autotileEdges[n].push(n2);
                }
            }
        }
    }
    ////// 绘制缩略图 //////
    // 此函数将绘制一个缩略图，floorId为目标floorId，blocks为地图的图块（可为null使用floorId对应默认的）
    // options为绘制选项（可为null），包括：
    //    heroLoc: 勇士位置；heroIcon：勇士图标（默认当前勇士）；damage：是否绘制显伤；flags：当前的flags（存读档时使用）
    //    ctx：要绘制到的画布（名）；x,y：起点横纵坐标（默认0）；size：大小（默认416/480）；
    //    all：是否绘制全图（默认false）；centerX,centerY：截取中心（默认为地图正中心）
    drawThumbnail(floorId, blocks, options) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        options = options || {};
        if (typeof options == 'string' || options.canvas)
            options = { ctx: options };
        var ctx = options.ctx;
        // Step1：绘制到tempCanvas上
        this._drawThumbnail_drawTempCanvas(floorId, blocks, options);
        options.ctx = ctx;
        // Step2：从tempCanvas绘制到对应的画布上
        this._drawThumbnail_drawToTarget(floorId, options);
    }
    _drawThumbnail_drawTempCanvas(floorId, blocks, options) {
        var width = core.floors[floorId].width;
        var height = core.floors[floorId].height;
        // 绘制到tempCanvas上面
        var tempCanvas = this.tempCanvas;

        // 如果是大地图模式？
        if (options.all) {
            // 计算比例
            var scale = Math.max(core.__SIZE__ / width, core.__SIZE__ / height);
            tempCanvas.canvas.width = width * 32 * scale;
            tempCanvas.canvas.height = height * 32 * scale;
            tempCanvas.scale(scale, scale);
        } else if (width * height > core.bigmap.threshold) {
            options.v2 = true;
            tempCanvas.canvas.width = core.__PIXELS__;
            tempCanvas.canvas.height = core.__PIXELS__;
            var centerX = options.centerX, centerY = options.centerY;
            if (centerX == null)
                centerX = Math.floor(width / 2);
            if (centerY == null)
                centerY = Math.floor(height / 2);
            var offsetX = core.clamp(centerX - core.__HALF_SIZE__, 0, width - core.__SIZE__), offsetY = core.clamp(centerY - core.__HALF_SIZE__, 0, height - core.__SIZE__);
            tempCanvas.translate(-32 * offsetX, -32 * offsetY);
        } else {
            options.v2 = false;
            tempCanvas.canvas.width = width * 32;
            tempCanvas.canvas.height = height * 32;
        }
        options.ctx = tempCanvas;

        // 地图过大的缩略图不绘制显伤
        if (width * height > core.bigmap.threshold)
            options.damage = false;

        // --- 暂存 flags
        var hasHero = core.status.hero != null, flags = null;
        if (options.flags) {
            if (!hasHero)
                core.status.hero = {};
            flags = core.status.hero.flags;
            core.status.hero.flags = options.flags;
        }

        this._drawThumbnail_realDrawTempCanvas(floorId, blocks, options);

        // --- 恢复 flags
        if (!hasHero)
            delete core.status.hero;
        else if (flags != null)
            core.status.hero.flags = flags;
        tempCanvas.setTransform(1, 0, 0, 1, 0, 0);
    }
    _drawThumbnail_realDrawTempCanvas(floorId, blocks, options) {
        // 缩略图：背景
        this.drawBg(floorId, options);
        // 缩略图：事件
        this.drawEvents(floorId, blocks, options);
        // 缩略图：勇士
        if (options.heroLoc) {
            options.heroIcon = options.heroIcon || core.status.hero.image || 'hero.png';
            options.heroIcon = core.getMappedName(options.heroIcon);
            var icon = core.material.icons.hero[options.heroLoc.direction];
            var height = core.material.images.images[options.heroIcon].height / 4;
            var width = (core.material.images.images[options.heroIcon].width || 128) / 4;
            core.drawImage(options.ctx, core.material.images.images[options.heroIcon], icon.stop * width, icon.loc * height, width, height,
                32 * options.heroLoc.x + 32 - width, 32 * options.heroLoc.y + 32 - height, width, height);
        }
        // 缩略图：前景
        this.drawFg(floorId, options);
        // 缩略图：显伤
        if (options.damage && core.hasItem('book')) {
            core.updateCheckBlock(floorId);
            core.control.updateDamage(floorId, options.ctx);
        }
    }
    _drawThumbnail_drawToTarget(floorId, options) {
        var ctx = core.getContextByName(options.ctx);
        if (ctx == null)
            return;
        var x = options.x || 0, y = options.y || 0, size = options.size || core.__PIXELS__;
        var width = core.floors[floorId].width, height = core.floors[floorId].height;
        var centerX = options.centerX, centerY = options.centerY;
        if (centerX == null)
            centerX = Math.floor(width / 2);
        if (centerY == null)
            centerY = Math.floor(height / 2);
        var tempCanvas = this.tempCanvas;

        if (options.all) {
            var tempWidth = tempCanvas.canvas.width, tempHeight = tempCanvas.canvas.height;
            // 绘制全景图
            if (tempWidth <= tempHeight) {
                var realHeight = size, realWidth = realHeight * tempWidth / tempHeight;
                var side = (size - realWidth) / 2;
                core.fillRect(ctx, x, y, side, realHeight, '#000000');
                core.fillRect(ctx, x + size - side, y, side, realHeight);
                core.drawImage(ctx, tempCanvas.canvas, 0, 0, tempWidth, tempHeight, x + side, y, realWidth, realHeight);
            }
            else {
                var realWidth = size, realHeight = realWidth * tempHeight / tempWidth;
                var side = (size - realHeight) / 2;
                core.fillRect(ctx, x, y, realWidth, side, '#000000');
                core.fillRect(ctx, x, y + size - side, realWidth, side);
                core.drawImage(ctx, tempCanvas.canvas, 0, 0, tempWidth, tempHeight, x, y + side, realWidth, realHeight);
            }
        }
        else {
            // 只绘制可见窗口
            if (options.v2) {
                core.drawImage(ctx, tempCanvas.canvas, 0, 0, core.__PIXELS__, core.__PIXELS__, x, y, size, size);
            } else {
                var offsetX = core.clamp(centerX - core.__HALF_SIZE__, 0, width - core.__SIZE__), offsetY = core.clamp(centerY - core.__HALF_SIZE__, 0, height - core.__SIZE__);
                core.drawImage(ctx, tempCanvas.canvas, offsetX * 32, offsetY * 32, core.__PIXELS__, core.__PIXELS__, x, y, size, size);
            }

        }
    }
    // -------- 获得某个点的图块信息 -------- //
    ////// 某个点是否不可通行 //////
    noPass(x, y, floorId) {
        var block = core.getBlock(x, y, floorId);
        if (block == null)
            return false;
        return block.event.noPass;
    }
    ////// 某个点是否存在NPC //////
    npcExists(x, y, floorId) {
        var block = this.getBlock(x, y, floorId);
        if (block == null)
            return false;
        return block.event.cls.indexOf('npc') == 0;
    }
    ////// 某个点是否存在（指定的）地形 //////
    terrainExists(x, y, id, floorId) {
        var block = this.getBlock(x, y, floorId);
        if (block == null)
            return false;
        return block.event.cls == 'terrains' && (id ? block.event.id == id : true);
    }
    ////// 某个点是否存在楼梯 //////
    stairExists(x, y, floorId) {
        var blockId = this.getBlockId(x, y, floorId);
        if (blockId == null)
            return false;
        var ids = ['upFloor', 'downFloor'];
        ids = ids.concat(['leftPortal', 'rightPortal', 'upPortal', 'downPortal', 'portal', 'starPortal']);
        return ids.indexOf(blockId) >= 0;
    }
    ////// 当前位置是否在楼梯边 //////
    nearStair() {
        var x = core.getHeroLoc('x'), y = core.getHeroLoc('y');
        return this.stairExists(x, y) || this.stairExists(x - 1, y) || this.stairExists(x, y - 1) || this.stairExists(x + 1, y) || this.stairExists(x, y + 1);
    }
    ////// 某个点是否存在（指定的）怪物 //////
    enemyExists(x, y, id, floorId) {
        var block = this.getBlock(x, y, floorId);
        if (block == null)
            return false;
        return block.event.cls.indexOf('enemy') == 0 && (id ? block.event.id == id : true);
    }
    /** 获得某个点的block */
    getBlock(x?: number, y?: number, floorId?: string, showDisable?: boolean): Block | null {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return null;
        core.extractBlocks(floorId);
        var blockObjs = this.getMapBlocksObj(floorId);
        var block = blockObjs[x + "," + y];
        if (block && (showDisable || !block.disable))
            return block;
        return null;
    }
    /**
     * 判定某个点的图块id
     * @example if(core.getBlockId(x1, y1) != 'greenSlime' && core.getBlockId(x2, y2) != 'redSlime') core.openDoor(x3, y3); // 一个简单的机关门事件，打败或炸掉这一对绿头怪和红头怪就开门
     * @param x 横坐标
     * @param y 纵坐标
     * @param floorId 地图id，不填视为当前地图
     * @param showDisable 隐藏点是否不返回null，true表示不返回null
     * @returns 图块id，该点无图块则返回null
     */
    getBlockId(x: number, y: number, floorId?: string, showDisable?: boolean) {
        var block = core.getBlock(x, y, floorId, showDisable);
        return block == null ? null : block.event.id;
    }
    ////// 获得某个点的数字 //////
    getBlockNumber(x, y, floorId, showDisable) {
        var block = core.getBlock(x, y, floorId, showDisable);
        return block == null ? null : block.id;
    }
    ////// 获得某个点的blockCls //////
    getBlockCls(x, y, floorId, showDisable) {
        var block = core.getBlock(x, y, floorId, showDisable);
        return block == null ? null : block.event.cls;
    }
    ////// 获得某个点的不透明度 //////
    getBlockOpacity(x, y, floorId, showDisable) {
        var block = core.getBlock(x, y, floorId, showDisable);
        if (block == null)
            return null;
        if (block.opacity == null)
            return 1.0;
        return block.opacity == null ? 1.0 : block.opacity;
    }
    ////// 获得某个点的filter //////
    getBlockFilter(x, y, floorId, showDisable) {
        var block = core.getBlock(x, y, floorId, showDisable);
        if (block == null)
            return null;
        if (block.filter == null)
            return { blur: 0, hue: 0, grayscale: 0, invert: false, shadow: 0 };
        return core.clone(block.filter);
    }
    /**
     * 获得某个图块或素材的信息，包括ID，cls，图片，坐标，faceIds等等
     * @param block 
     * @returns 
     */
    getBlockInfo(block: string | number | Block) {
        if (!block) {
            console.error(`[getBlockInfo] 参数为空`);
            return null;
        }
        if (typeof block == 'string') { // 参数是ID
            block = this.getNumberById(block);
        }
        if (typeof block == 'number') { // 参数是数字
            if (block == 0)
                return null;
            block = this.getBlockByNumber(block);
        }
        var number = block.id, id = block.event.id, cls = block.event.cls, name = block.event.name, image = null, posX = 0, posY = 0, animate = block.event.animate, doorInfo = block.event.doorInfo, height = block.event.height || 32, faceIds = {}, face = 'down', bigImage = null;

        if (id == 'none')
            return null;
        else if (id == 'airwall') {
            if (!core.material.images.airwall)
                return null;
            image = core.material.images.airwall;
            name = "空气墙";
        }
        else if (cls == 'tileset') {
            var offset = core.icons.getTilesetOffset(id);
            if (offset == null)
                return null;
            posX = offset.x;
            posY = offset.y;
            image = core.material.images.tilesets[offset.image];
        }
        else if (cls == 'autotile') {
            image = core.material.images.autotile[id];
        }
        else {
            image = core.material.images[cls];
            posY = core.material.icons[cls][id];
            faceIds = block.event.faceIds || {};
            for (var f in faceIds) {
                if (faceIds[f] == id) {
                    face = f;
                    break;
                }
            }
            if (block.event.bigImage)
                bigImage = core.material.images.images[block.event.bigImage];
            if (core.material.enemys[id]) {
                name = core.material.enemys[id].name;
                bigImage = core.material.images.images[core.material.enemys[id].bigImage];
            } else if (core.material.items[id]) {
                name = core.material.items[id].name;
            }
            // 非门效果则强制变成四帧动画
            if (!doorInfo && bigImage != null)
                animate = 4;
        }

        return {
            number: number, id: id, cls: cls, name: name, image: image, posX: posX, doorInfo: doorInfo,
            posY: posY, height: height, faceIds: faceIds, animate: animate, face: face, bigImage: bigImage
        };
    }
    ////// 搜索某个图块出现的所有位置 //////
    searchBlock(id, floorId, showDisable) {
        if (typeof id == 'number')
            id = this.getBlockByNumber(id).event.id;
        floorId = floorId || core.status.floorId;
        var result = [];
        if (floorId instanceof Array) {
            floorId.forEach(function (floorId) {
                result = result.concat(core.searchBlock(id, floorId, showDisable));
            });
            return result;
        }
        core.extractBlocks(floorId);
        for (var i = 0; i < core.status.maps[floorId].blocks.length; ++i) {
            var block = core.status.maps[floorId].blocks[i];
            if ((showDisable || !block.disable) && (core.matchWildcard(id, block.event.id) || core.matchRegex(id, block.event.id))) {
                result.push({ floorId: floorId, x: block.x, y: block.y, block: block });
            }
        }
        return result;
    }
    ////// 给定筛选函数，搜索某个图块出现的所有位置 //////
    searchBlockWithFilter(blockFilter, floorId, showDisable) {
        floorId = floorId || core.status.floorId;
        var result = [];
        if (floorId instanceof Array) {
            floorId.forEach(function (floorId) {
                result = result.concat(core.searchBlockWithFilter(blockFilter, floorId, showDisable));
            });
            return result;
        }
        core.extractBlocks(floorId);
        for (var i = 0; i < core.status.maps[floorId].blocks.length; ++i) {
            var block = core.status.maps[floorId].blocks[i];
            if ((showDisable || !block.disable) && blockFilter(block)) {
                result.push({ floorId: floorId, x: block.x, y: block.y, block: block });
            }
        }
        return result;
    }
    ////// 获得某个图块，其行走图朝向朝下的图块ID //////
    getFaceDownId(block) {
        if (block == null)
            return null;
        if (typeof block == 'string') { // 参数是ID
            block = this.getNumberById(block);
        }
        if (typeof block == 'number') { // 参数是数字
            if (block == 0)
                return null;
            block = this.getBlockByNumber(block);
        }
        if (!block.event)
            return null;
        return (block.event.faceIds || {}).down || block.event.id;
    }
    // -------- 启用/禁用图块，楼层贴图 -------- //
    ////// 将某个块从禁用变成启用状态 //////
    showBlock(x, y, floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        var block = core.getBlock(x, y, floorId, true);
        if (block == null)
            return; // 不存在

        // 本身是禁用事件，启用之
        if (block.disable) {
            block.disable = false;
            core.setMapBlockDisabled(floorId, x, y, false);
            this._updateMapArray(floorId, block.x, block.y);
            // 在本层，添加动画
            if (floorId == core.status.floorId) {
                if (block.event.cls == 'autotile') {
                    core.redrawMap();
                } else {
                    core.drawBlock(block);
                    core.addGlobalAnimate(block);
                    core.updateStatusBar();
                }
            }
        }
    }
    ////// 只隐藏但不删除某块 //////
    hideBlock(x, y, floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;

        var block = core.getBlock(x, y, floorId, true);
        if (block == null)
            return; // 不存在

        block.disable = true;
        core.setMapBlockDisabled(floorId, block.x, block.y, true);
        this._updateMapArray(floorId, block.x, block.y);

        // 删除动画，清除地图
        this._removeBlockFromMap(floorId, block);
    }
    ////// 根据图块的索引来隐藏图块 //////
    hideBlockByIndex(index, floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        core.extractBlocks(floorId);
        var blocks = core.status.maps[floorId].blocks, block = blocks[index];
        block.disable = true;
        core.setMapBlockDisabled(floorId, block.x, block.y, true);
        this._updateMapArray(floorId, block.x, block.y);
    }
    ////// 一次性隐藏多个block //////
    hideBlockByIndexes(indexes, floorId) {
        indexes.sort(function (a, b) {
            return b - a;
        }).forEach(function (index) {
            core.hideBlockByIndex(index, floorId);
        });
    }
    _removeBlockFromMap(floorId, block) {
        if (floorId != core.status.floorId)
            return;
        var filter = block.filter || {};
        if (block.event.cls == 'autotile' || filter.blur > 0 || filter.shadow > 0) {
            core.redrawMap();
        } else {
            var x = block.x, y = block.y;
            var px = 32 * x - core.bigmap.posX * 32;
            var py = 32 * y - core.bigmap.posY * 32;
            core.removeGlobalAnimate(x, y);
            core.clearMap('event', px, py, 32, 32);
            var height = block.event.height || 32;
            if (height > 32)
                core.clearMap('event2', px, py + 32 - height, 32, height - 32);
            // 删除大怪物
            core.deleteCanvas("_bigImage_header_" + x + "_" + y);
            core.deleteCanvas("_bigImage_body_" + x + "_" + y);
            core.updateStatusBar();
        }
    }
    ////// 删除某个图块 //////
    removeBlock(x, y, floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return false;

        core.extractBlocks(floorId);
        for (var i in core.status.maps[floorId].blocks) {
            var block = core.status.maps[floorId].blocks[i];
            if (block.x == x && block.y == y) {
                this.removeBlockByIndex(i, floorId);
                this._removeBlockFromMap(floorId, block);
                return true;
            }
        }
        return false;
    }
    ////// 根据block的索引（尽可能）删除该块 //////
    removeBlockByIndex(index, floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        core.extractBlocks(floorId);
        var blocks = core.status.maps[floorId].blocks, block = blocks[index];
        blocks.splice(index, 1);
        if (core.status.mapBlockObjs[floorId])
            delete core.status.mapBlockObjs[floorId][block.x + "," + block.y];
        core.setMapBlockDisabled(floorId, block.x, block.y, true);
        this._updateMapArray(floorId, block.x, block.y);
    }
    ////// 一次性删除多个block //////
    removeBlockByIndexes(indexes, floorId) {
        indexes.sort(function (a, b) {
            return b - a;
        }).forEach(function (index) {
            core.removeBlockByIndex(index, floorId);
        });
    }
    ////// 显示前景/背景地图 //////
    showBgFgMap(name, loc, floorId, callback) {
        this._triggerBgFgMap('show', name, loc, floorId, callback);
    }
    ////// 隐藏前景/背景地图 //////
    hideBgFgMap(name, loc, floorId, callback) {
        this._triggerBgFgMap('hide', name, loc, floorId, callback);
    }
    ////// 设置前景/背景地图的显示状态 //////
    _triggerBgFgMap(type, name, loc, floorId, callback) {
        if (type != 'show')
            type = 'hide';
        if (!name || (!name.startsWith('bg') && !name.startsWith('fg')))
            return;
        if (typeof loc[0] == 'number' && typeof loc[1] == 'number')
            loc = [loc];
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;

        if (loc.length == 0)
            return;
        var disabled = core.getFlag('__' + name + 'd__', {});
        disabled[floorId] = disabled[floorId] || [];
        loc.forEach(function (t) {
            if (type == 'hide') {
                disabled[floorId].push([t[0], t[1]]);
            } else {
                disabled[floorId] = disabled[floorId].filter(function (one) { return one[0] != t[0] || one[1] != t[1]; });
            }
        });
        core.setFlag('__' + name + 'd__', disabled);

        core.status[name + "maps"][floorId] = null;

        if (floorId == core.status.floorId) {
            core.redrawMap();
        }
        if (callback)
            callback();
    }
    ////// 显示一个楼层贴图 //////
    showFloorImage(loc, floorId, callback) {
        this._triggerFloorImage('show', loc, floorId, callback);
    }
    ////// 隐藏一个楼层贴图 //////
    hideFloorImage(loc, floorId, callback) {
        this._triggerFloorImage('hide', loc, floorId, callback);
    }
    ///// 设置贴图显示状态 //////
    _triggerFloorImage(type, loc, floorId, callback) {
        if (type != 'show')
            type = 'hide';
        if (typeof loc[0] == 'number' && typeof loc[1] == 'number')
            loc = [loc];
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;

        if (loc.length == 0)
            return;
        loc.forEach(function (t) {
            var x = t[0], y = t[1];
            var flag = "__floorImg__" + floorId + "_" + x + "_" + y;
            if (type == 'hide')
                core.setFlag(flag, true);
            else
                core.removeFlag(flag);
        });

        if (floorId == core.status.floorId) {
            core.redrawMap();
        }
        if (callback)
            callback();
    }
    ////// 改变图块 //////
    setBlock(number, x, y, floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId || number == null || x == null || y == null)
            return;
        if (x < 0 || x >= core.floors[floorId].width || y < 0 || y >= core.floors[floorId].height)
            return;
        if (typeof number == 'string') {
            if (/^\d+$/.test(number))
                number = parseInt(number);
            else
                number = core.getNumberById(number);
        }

        var block = this.initBlock(x, y, number, true, core.floors[floorId]);
        if (block.id == 0 && !block.event.trigger) {
            // 转变图块为0且该点无事件，视为删除
            core.removeBlock(x, y, floorId);
            return;
        }
        var originBlock = core.getBlock(x, y, floorId, true);
        var originEvent = originBlock == null ? null : originBlock.event;
        if (originBlock == null) {
            core.status.maps[floorId].blocks.push(block);
            if (core.status.mapBlockObjs[floorId])
                core.status.mapBlockObjs[floorId][block.x + "," + block.y] = block;
            core.setMapBlockDisabled(floorId, block.x, block.y, false);
            delete block.disable;
        }
        else {
            originBlock.id = number;
            originBlock.event = block.event;
            block = originBlock;
        }
        this._updateMapArray(floorId, x, y);
        if (floorId == core.status.floorId) {
            // 有任何一个是autotile直接重绘地图
            if ((originEvent != null && originEvent.cls == 'autotile') || block.event.cls == 'autotile') {
                core.redrawMap();
            } else {
                if (originEvent != null) {
                    this._removeBlockFromMap(floorId, { x: x, y: y, event: originEvent });
                }
                if (!block.disable) {
                    core.drawBlock(block);
                    core.addGlobalAnimate(block);
                    core.updateStatusBar();
                }
            }
        }
    }
    animateSetBlock(number, x, y, floorId, time, callback) {
        floorId = floorId || core.status.floorId;
        time = time || 0;
        if (floorId != core.status.floorId || time == 0) {
            // 不在当前楼层，直接忽略
            this.setBlock(number, x, y, floorId);
            if (callback)
                callback();
            return;
        }
        if (typeof number == 'string') {
            if (/^\d+$/.test(number))
                number = parseInt(number);
            else
                number = core.getNumberById(number);
        }
        var originBlock = core.getBlock(x, y, floorId, true);
        var block = this.initBlock(x, y, number, true, core.floors[floorId]);

        // 如果原本是启用的
        if (originBlock != null && !originBlock.disable) {
            return this._animateSetBlock_originEnabled(block, number, x, y, floorId, time, callback);
        }

        // 如果原本不存在
        if (originBlock == null) {
            return this._animateSetBlock_originNotExists(block, number, x, y, floorId, time, callback);
        }

        // 如果原本存在且禁用；应当直接设置，没有动画
        if (originBlock != null && originBlock.disable) {
            return this._animateSetBlock_originDisabled(number, x, y, floorId, callback);
        }
        if (callback)
            callback();
    }
    _animateSetBlock_originEnabled(block, number, x, y, floorId, time, callback) {
        // 情况1：设置到0
        if (block.id == 0) {
            // 如果该点红点没有事件 - 直接删除
            if (!block.event.trigger) {
                return this.animateBlock([x, y], 'remove', time, callback);
            } else {
                // 如果该点红点有事件；则设置到0，但是需启用
                return this.animateBlock([x, y], 'hide', time, function () {
                    core.setBlock(0, x, y, floorId);
                    core.showBlock(x, y, floorId);
                    if (callback)
                        callback();
                });
            }
        }

        // 情况2：设置到非0
        else {
            return this.animateBlock([x, y], 'hide', time / 2, function () {
                core.setBlock(number, x, y, floorId);
                core.animateBlock([x, y], 'show', time / 2, callback);
            });
        }
    }
    _animateSetBlock_originNotExists(block, number, x, y, floorId, time, callback) {
        // 情况1：设置到0；没有动画效果
        if (block.id == 0) {
            core.setBlock(number, x, y, floorId);
            if (callback)
                callback();
        }
        else {
            // 情况2：设置到非0，有淡入动画
            core.setBlock(number, x, y, floorId);
            core.hideBlock(x, y, floorId);
            core.animateBlock([x, y], 'show', time, callback);
            return;
        }
    }
    _animateSetBlock_originDisabled(number, x, y, floorId, callback) {
        core.setBlock(number, x, y, floorId);
        if (callback)
            callback();
    }
    animateSetBlocks(number, locs, floorId, time, callback) {
        if (!(locs instanceof Array)) {
            if (callback)
                callback();
            return;
        }
        if (typeof locs[0] == 'number' && typeof locs[1] == 'number')
            locs = [locs];

        var count = locs.length;
        var _afterSet = function () {
            count--;
            if (count == 0) {
                if (callback)
                    callback();
            }
        };
        locs.forEach(function (loc) {
            core.animateSetBlock(number, loc[0], loc[1], floorId, time, _afterSet);
        });
    }
    ////// 事件转向 //////
    turnBlock(direction, x, y, floorId) {
        var id = core.getBlockId(x, y, floorId, true);
        var blockInfo = core.getBlockInfo(id);
        if (blockInfo == null)
            return;
        var faceIds = blockInfo.faceIds || {};
        var currDirection = null;
        for (var dir in core.utils.scan) {
            if (faceIds[dir] == id) {
                currDirection = dir;
            }
        }
        if (currDirection == null)
            return;
        var nextDirection = core.turnDirection(direction, currDirection);
        var nextId = faceIds[nextDirection];
        if (nextId != null && nextId != id) {
            this.setBlock(nextId, x, y, floorId);
        }
    }
    ////// 将地图中所有某个图块替换成另一个图块 //////
    replaceBlock(fromNumber, toNumber, floorId) {
        floorId = floorId || core.status.floorId;
        if (floorId instanceof Array) {
            floorId.forEach(function (floorId) {
                core.replaceBlock(fromNumber, toNumber, floorId);
            });
            return;
        }
        var toBlock = this.getBlockByNumber(toNumber, true);
        core.extractBlocks(floorId);
        core.status.maps[floorId].blocks.forEach(function (block) {
            if (block.id == fromNumber) {
                block.id = toNumber;
                for (var one in toBlock.event) {
                    block.event[one] = core.clone(toBlock.event[one]);
                }
                this._updateMapArray(floorId, block.x, block.y);
            }
        }, this);
        if (floorId == core.status.floorId)
            core.redrawMap();
    }
    ////// 改变前景背景的图块 //////
    setBgFgBlock(name, number, x, y, floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId || number == null || x == null || y == null)
            return;
        if (x < 0 || x >= core.floors[floorId].width || y < 0 || y >= core.floors[floorId].height)
            return;
        if (!name || (!name.startsWith('bg') && !name.startsWith('fg')))
            return;

        if (typeof number == 'string') {
            if (/^\d+$/.test(number))
                number = parseInt(number);
            else
                number = core.getNumberById(number);
        }

        var values = core.getFlag('__' + name + 'v__', {});
        values[floorId] = (values[floorId] || []).filter(function (one) { return one[0] != x || one[1] != y; });
        values[floorId].push([x, y, number]);
        core.setFlag('__' + name + 'v__', values);

        core.status[name + "maps"][floorId] = null;

        if (floorId == core.status.floorId) {
            core.clearMap(name);
            if (name.startsWith('bg'))
                core.drawBg(floorId);
            else
                core.drawFg(floorId);
        }
    }
    ////// 重置地图 //////
    resetMap(floorId) {
        floorId = floorId || core.status.floorId;
        if (!floorId)
            return;
        if (typeof floorId == 'string')
            floorId = [floorId];
        var needRefresh = false;
        floorId.forEach(function (t) {
            core.status.maps[t] = core.maps.loadFloor(t);
            // 重置本层的全部独立事件
            Object.keys(core.status.hero.flags).forEach(function (one) {
                if (one.startsWith(floorId + '@'))
                    delete core.status.hero.flags[one];
            });
            // 重置本层的图块删除信息
            delete (flags.__disabled__ || {})[t];
            delete (core.status.mapBlockObjs || {})[t];
            if (t == core.status.floorId)
                needRefresh = true;
        });
        if (needRefresh)
            this.redrawMap();
        core.drawTip("地图重置成功");
    }
    // -------- 移动/跳跃图块，图块的淡入淡出 -------- //
    ////// 初始化独立的block canvas //////
    _initDetachedBlock(blockInfo, x, y, displayDamage) {
        var headCanvas = null, bodyCanvas = '__body_' + x + "_" + y, damageCanvas = null;
        // head
        if (!blockInfo.bigImage && blockInfo.height > 32) {
            headCanvas = "__head_" + x + "_" + y;
            core.createCanvas(headCanvas, 0, 0, 32, blockInfo.height - 32, 55);
        }
        // body
        if (blockInfo.bigImage) {
            var bigImageInfo = this._getBigImageInfo(blockInfo.bigImage, blockInfo.face, blockInfo.posX);
            core.createCanvas(bodyCanvas, 0, 0, bigImageInfo.per_width, bigImageInfo.per_height, 35);
        } else {
            core.createCanvas(bodyCanvas, 0, 0, 32, 32, 35);
        }
        // damage
        var damage = null, damageColor = null;
        if (blockInfo.cls.indexOf('enemy') == 0 && core.hasItem('book') && displayDamage) {
            var damageString = core.enemys.getDamageString(blockInfo.id, x, y);
            damage = damageString.damage;
            damageColor = damageString.color;
        }
        if (damage != null) {
            damageCanvas = "__damage_" + x + "_" + y;
            var ctx = core.createCanvas(damageCanvas, 0, 0, 32, 32, 65);
            ctx.textAlign = 'left';
            ctx.font = "bold 11px Arial";
            core.fillBoldText(ctx, damage, 1, 31, damageColor);
            if (core.flags.displayCritical) {
                var critical = core.enemys.nextCriticals(blockInfo.id);
                if (critical.length > 0)
                    critical = critical[0];
                critical = core.formatBigNumber(critical[0], true);
                if (critical == '???')
                    critical = '?';
                core.fillBoldText(ctx, critical, 1, 21, '#FFFFFF');
            }
        }
        return {
            "headCanvas": headCanvas,
            "bodyCanvas": bodyCanvas,
            "damageCanvas": damageCanvas
        };
    }
    ////// 移动独立的block canvas //////
    _moveDetachedBlock(blockInfo, nowX, nowY, opacity, canvases) {
        var height = blockInfo.height, posX = blockInfo.posX, posY = blockInfo.posY, image = blockInfo.image;
        var headCanvas = canvases.headCanvas, bodyCanvas = canvases.bodyCanvas, damageCanvas = canvases.damageCanvas;
        if (headCanvas) {
            core.dymCanvas[headCanvas].clearRect(0, 0, 32, height);
            core.dymCanvas[headCanvas].drawImage(image, posX * 32, posY * height, 32, height - 32, 0, 0, 32, height - 32);
            core.relocateCanvas(headCanvas, nowX - core.bigmap.offsetX, nowY + 32 - height - core.bigmap.offsetY);
            core.setOpacity(headCanvas, opacity);
        }
        if (bodyCanvas) {
            if (blockInfo.bigImage) {
                var face = blockInfo.face;
                if (!blockInfo.faceIds)
                    face = 'down';
                else if (!blockInfo.faceIds[face]) {
                    // 维持此时朝向
                    face = 'down';
                    for (var f in blockInfo.faceIds) {
                        if (blockInfo.faceIds[f] == blockInfo.id) {
                            face = f;
                        }
                    }
                }
                var bigImageInfo = this._getBigImageInfo(blockInfo.bigImage, face, blockInfo.posX);
                var per_width = bigImageInfo.per_width, per_height = bigImageInfo.per_height;
                core.dymCanvas[bodyCanvas].clearRect(0, 0, bigImageInfo.per_width, bigImageInfo.per_height);
                core.dymCanvas[bodyCanvas].drawImage(blockInfo.bigImage, bigImageInfo.sx, bigImageInfo.sy, per_width, per_height, 0, 0, per_width, per_height);
                core.relocateCanvas(bodyCanvas, nowX - core.bigmap.offsetX + bigImageInfo.dx, nowY - core.bigmap.offsetY + bigImageInfo.dy);
                core.setOpacity(bodyCanvas, opacity);
            } else {
                core.dymCanvas[bodyCanvas].clearRect(0, 0, 32, 32);
                core.dymCanvas[bodyCanvas].drawImage(image, posX * 32, posY * height + height - 32, 32, 32, 0, 0, 32, 32);
                core.relocateCanvas(bodyCanvas, nowX - core.bigmap.offsetX, nowY - core.bigmap.offsetY);
                core.setOpacity(bodyCanvas, opacity);
            }
        }
        if (damageCanvas) {
            core.relocateCanvas(damageCanvas, nowX - core.bigmap.offsetX, nowY - core.bigmap.offsetY);
            core.setOpacity(damageCanvas, opacity);
        }
    }
    ////// 删除独立的block canvas //////
    _deleteDetachedBlock(canvases) {
        core.deleteCanvas(canvases.headCanvas);
        core.deleteCanvas(canvases.bodyCanvas);
        core.deleteCanvas(canvases.damageCanvas);
    }
    _getAndRemoveBlock(x, y) {
        var block = core.getBlock(x, y);
        if (block == null)
            return null;
        var blockInfo = this.getBlockInfo(block);
        if (blockInfo == null)
            return;
        core.removeBlock(x, y);
        return [block, blockInfo];
    }
    ////// 显示移动某块的动画，达到{“type”:”move”}的效果 //////
    moveBlock(x, y, steps, time, keep, callback) {
        if (core.status.replay.speed == 24)
            time = 1;
        time = time || 500;
        var blockArr = this._getAndRemoveBlock(x, y);
        if (blockArr == null) {
            if (callback)
                callback();
            return;
        }
        var block = blockArr[0], blockInfo = blockArr[1];
        var moveSteps = (steps || []).map(function (t) {
            return [t.split(':')[0], parseInt(t.split(':')[1] || "1")];
        }).filter(function (t) {
            return ['up', 'down', 'left', 'right', 'forward', 'backward', 'leftup', 'leftdown', 'rightup', 'rightdown', 'speed'].indexOf(t[0]) >= 0
                && !(t[0] == 'speed' && t[1] < 16);
        });
        var canvases = this._initDetachedBlock(blockInfo, x, y, block.event.animate !== false);
        this._moveDetachedBlock(blockInfo, 32 * x, 32 * y, 1, canvases);

        var moveInfo = {
            sx: x, sy: y, x: x, y: y, px: 32 * x, py: 32 * y, opacity: 1, keep: keep, lastDirection: null, offset: 1,
            moveSteps: moveSteps, step: 0, per_time: time / 16 / core.status.replay.speed
        };
        this._moveBlock_doMove(blockInfo, canvases, moveInfo, callback);
    }
    _moveBlock_doMove(blockInfo, canvases, moveInfo, callback) {
        var animateTotal = blockInfo.animate, animateTime = 0;
        // 强制npc48行走时使用四帧动画
        if (!blockInfo.doorInfo && !blockInfo.bigImage && blockInfo.cls == 'npc48')
            animateTotal = 4;
        var _run = function () {
            var cb = function () {
                core.maps._deleteDetachedBlock(canvases);
                // 不消失
                if (moveInfo.keep) {
                    core.setBlock(blockInfo.number, moveInfo.x, moveInfo.y);
                    core.showBlock(moveInfo.x, moveInfo.y);
                    core.moveEnemyOnPoint(moveInfo.sx, moveInfo.sy, moveInfo.x, moveInfo.y);
                }
                if (callback)
                    callback();
            };

            var animate = window.setInterval(function () {
                if (blockInfo.cls != 'tileset') {
                    animateTime += moveInfo.per_time;
                    if (animateTime > core.values.animateSpeed) {
                        animateTime = 0;
                        blockInfo.posX = (blockInfo.posX + 1) % animateTotal;
                    }
                }
                if (moveInfo.moveSteps.length != 0) {
                    if (core.maps._moveBlock_updateSpeed(moveInfo)) {
                        clearInterval(animate);
                        delete core.animateFrame.asyncId[animate];
                        _run();
                    }
                    else
                        core.maps._moveBlock_moving(blockInfo, canvases, moveInfo);
                }

                else
                    core.maps._moveJumpBlock_finished(blockInfo, canvases, moveInfo, animate, cb);
            }, moveInfo.per_time);

            core.animateFrame.lastAsyncId = animate;
            core.animateFrame.asyncId[animate] = cb;
        };
        _run();
    }
    _moveBlock_updateSpeed(moveInfo) {
        if (moveInfo.step == 0 && moveInfo.moveSteps[0][0] == 'speed' && moveInfo.moveSteps[0][1] >= 16) {
            moveInfo.per_time = moveInfo.moveSteps[0][1] / 16 / core.status.replay.speed;
            moveInfo.moveSteps.shift();
            return true;
        }
        return false;
    }
    _moveBlock_updateDirection(blockInfo, moveInfo) {
        moveInfo.offset = 1;
        var curr = moveInfo.moveSteps[0];
        // 展开forward和backward
        if ((curr[0] == 'backward' || curr[0] == 'forward') && curr[1] > 1) {
            moveInfo.moveSteps.shift();
            for (var i = 0; i < curr[1]; ++i) {
                moveInfo.moveSteps.unshift([curr[0], 1]);
            }
            return this._moveBlock_updateDirection(blockInfo, moveInfo);
        }
        if (moveInfo.lastDirection == null) {
            for (var d in blockInfo.faceIds) {
                if (blockInfo.faceIds[d] == blockInfo.id) {
                    moveInfo.lastDirection = d;
                    break;
                }
            }
        }
        if (curr[0] == 'forward' || curr[0] == 'backward') {
            if (moveInfo.lastDirection == null) {
                moveInfo.moveSteps.shift();
                return false;
            }
            if (curr[0] == 'backward')
                moveInfo.offset = -1;
            curr[0] = moveInfo.lastDirection;
        }
        moveInfo.lastDirection = curr[0];

        // 根据faceIds修改朝向
        var faceDirection = curr[0];
        if (faceDirection == 'leftup' || faceDirection == 'leftdown')
            faceDirection = 'left';
        if (faceDirection == 'rightup' || faceDirection == 'rightdown')
            faceDirection = 'right';
        var currid = blockInfo.faceIds[faceDirection];
        blockInfo.face = faceDirection;
        if (currid) {
            var posY = core.material.icons[blockInfo.cls][currid];
            if (posY != null) {
                blockInfo.number = core.getNumberById(currid) || blockInfo.number;
                blockInfo.posY = posY;
            }
        }
        // 处理 left:0 的情况，仅转向
        if (curr[1] <= 0) {
            moveInfo.moveSteps.shift();
            return false;
        }
        moveInfo.x += core.utils.scan2[curr[0]].x * moveInfo.offset;
        moveInfo.y += core.utils.scan2[curr[0]].y * moveInfo.offset;
        return true;
    }
    _moveBlock_moving(blockInfo, canvases, moveInfo) {
        if (moveInfo.step == 0) {
            if (!this._moveBlock_updateDirection(blockInfo, moveInfo))
                return;
        }
        var curr = moveInfo.moveSteps[0];
        moveInfo.step++;
        moveInfo.px += core.utils.scan2[curr[0]].x * 2 * moveInfo.offset;
        moveInfo.py += core.utils.scan2[curr[0]].y * 2 * moveInfo.offset;
        this._moveDetachedBlock(blockInfo, moveInfo.px, moveInfo.py, moveInfo.opacity, canvases);
        if (moveInfo.step == 16) {
            moveInfo.step = 0;
            moveInfo.moveSteps[0][1]--;
            if (moveInfo.moveSteps[0][1] <= 0) {
                moveInfo.moveSteps.shift();
            }
        }
    }
    ////// 显示跳跃某块的动画，达到{"type":"jump"}的效果 //////
    jumpBlock(sx, sy, ex, ey, time, keep, callback) {
        time = time || 500;
        var blockArr = this._getAndRemoveBlock(sx, sy);
        if (blockArr == null) {
            if (callback)
                callback();
            return;
        }
        var block = blockArr[0], blockInfo = blockArr[1];
        var canvases = this._initDetachedBlock(blockInfo, sx, sy, block.event.animate !== false);
        this._moveDetachedBlock(blockInfo, 32 * sx, 32 * sy, 1, canvases);
        var jumpInfo = this.__generateJumpInfo(sx, sy, ex, ey, time);
        jumpInfo.keep = keep;

        this._jumpBlock_doJump(blockInfo, canvases, jumpInfo, callback);
    }
    __generateJumpInfo(sx, sy, ex, ey, time) {
        var dx = ex - sx, dy = ey - sy, distance = Math.round(Math.sqrt(dx * dx + dy * dy));
        var jump_peak = 6 + distance, jump_count = jump_peak * 2;
        time /= Math.max(core.status.replay.speed, 1);
        return {
            sx: sx, sy: sy, x: sx, y: sy, ex: ex, ey: ey, px: 32 * sx, py: 32 * sy, opacity: 1,
            jump_peak: jump_peak, jump_count: jump_count,
            step: 0, per_time: time / jump_count
        };
    }
    _jumpBlock_doJump(blockInfo, canvases, jumpInfo, callback) {
        var cb = function () {
            core.maps._deleteDetachedBlock(canvases);
            // 不消失
            if (jumpInfo.keep) {
                core.setBlock(blockInfo.number, jumpInfo.ex, jumpInfo.ey);
                core.showBlock(jumpInfo.ex, jumpInfo.ey);
                core.moveEnemyOnPoint(jumpInfo.sx, jumpInfo.sy, jumpInfo.ex, jumpInfo.ey);
            }
            if (callback)
                callback();
        };

        var animate = window.setInterval(function () {
            if (jumpInfo.jump_count > 0)
                core.maps._jumpBlock_jumping(blockInfo, canvases, jumpInfo);

            else
                core.maps._moveJumpBlock_finished(blockInfo, canvases, jumpInfo, animate, cb);
        }, jumpInfo.per_time);

        core.animateFrame.lastAsyncId = animate;
        core.animateFrame.asyncId[animate] = cb;
    }
    __updateJumpInfo(jumpInfo) {
        jumpInfo.jump_count--;
        jumpInfo.x = (jumpInfo.x * jumpInfo.jump_count + jumpInfo.ex) / (jumpInfo.jump_count + 1.0);
        jumpInfo.y = (jumpInfo.y * jumpInfo.jump_count + jumpInfo.ey) / (jumpInfo.jump_count + 1.0);
        jumpInfo.px = 32 * jumpInfo.x;
        var delta = Math.abs(jumpInfo.jump_count - jumpInfo.jump_peak);
        jumpInfo.py = 32 * jumpInfo.y - (jumpInfo.jump_peak * jumpInfo.jump_peak - delta * delta) / 2;
    }
    _jumpBlock_jumping(blockInfo, canvases, jumpInfo) {
        this.__updateJumpInfo(jumpInfo);
        core.maps._moveDetachedBlock(blockInfo, jumpInfo.px, jumpInfo.py, jumpInfo.opacity, canvases);
    }
    _moveJumpBlock_finished(blockInfo, canvases, info, animate, cb) {
        if (info.keep)
            info.opacity = 0;
        else
            info.opacity -= 0.06;
        if (info.opacity <= 0) {
            delete core.animateFrame.asyncId[animate];
            clearInterval(animate);
            cb();
        }
        else {
            this._moveDetachedBlock(blockInfo, info.px, info.py, info.opacity, canvases);
        }
    }
    ////// 显示/隐藏某个块时的动画效果 //////
    animateBlock(loc, type, time, callback) {
        if (core.status.replay.speed == 24)
            time = 1;
        if (typeof loc[0] == 'number' && typeof loc[1] == 'number')
            loc = [loc];
        if (type != 'show' && type != 'hide' && type != 'remove' && typeof type != 'number') {
            if (callback)
                callback();
        }
        // --- 检测所有是0的点
        var list = this._animateBlock_getList(loc, type);
        if (list.length == 0) {
            if (callback)
                callback();
            return;
        }
        this._animateBlock_drawList(list, 0);
        time /= Math.max(core.status.replay.speed, 1);
        this._animateBlock_doAnimate(loc, list, type, time, callback);
    }
    _animateBlock_doAnimate(loc, list, type, time, callback) {
        var step = 0, steps = Math.max(parseInt(time / 10), 1);
        var cb = function () {
            list.forEach(function (t) {
                if (t.blockInfo)
                    core.maps._deleteDetachedBlock(t.canvases);
            });
            loc.forEach(function (t) {
                if (type == 'show')
                    core.showBlock(t[0], t[1]);
                else if (type == 'hide')
                    core.hideBlock(t[0], t[1]);
                else if (type == 'remove')
                    core.removeBlock(t[0], t[1]);
                else {
                    core.setBlockOpacity(type, t[0], t[1]);
                    core.showBlock(t[0], t[1]);
                }
            });
            if (callback)
                callback();
        };

        var animate = setInterval(function () {
            step++;
            core.maps._animateBlock_drawList(list, step / steps);
            if (step == steps) {
                delete core.animateFrame.asyncId[animate];
                clearInterval(animate);
                cb();
            }
        }, 10);

        core.animateFrame.lastAsyncId = animate;
        core.animateFrame.asyncId[animate] = cb;
    }
    _animateBlock_getList(loc, type) {
        var list = [];
        loc.forEach(function (t) {
            var block = core.getBlock(t[0], t[1], null, true);
            if (block == null)
                return;

            var fromOpacity = block.opacity;
            if (fromOpacity == null)
                fromOpacity = 1.0;

            var blockInfo = core.maps.getBlockInfo(block);
            if (blockInfo == null) {
                list.push({ 'x': t[0], 'y': t[1] });
                return;
            }
            if (typeof type == 'number' && block.disable)
                return;
            // 该点是否已经被启用/删除
            if ((type == 'show' && !block.disable) || ((type == 'hide' || type == 'remove') && block.disable)) {
                list.push({ 'x': t[0], 'y': t[1] });
                return;
            }

            var toOpacity = type;
            if (type == 'show') {
                toOpacity = fromOpacity;
                fromOpacity = 0.0;
            }
            else if (type == 'hide' || type == 'remove') {
                core.hideBlock(t[0], t[1]); // 暂时先隐藏
                toOpacity = 0.0;
            }
            else {
                core.hideBlock(t[0], t[1]); // 暂时先隐藏
            }

            var canvases = core.maps._initDetachedBlock(blockInfo, t[0], t[1], block.event.displayDamage !== false);

            list.push({
                'x': t[0], 'y': t[1], 'blockInfo': blockInfo, 'canvases': canvases,
                'fromOpacity': fromOpacity, 'toOpacity': toOpacity,
            });

        });
        return list;
    }
    _animateBlock_drawList(list, progress) {
        list.forEach(function (t) {
            if (t.blockInfo)
                core.maps._moveDetachedBlock(t.blockInfo, t.x * 32, t.y * 32, t.fromOpacity + progress * (t.toOpacity - t.fromOpacity), t.canvases);
        });
    }
    // ------ 全局动画控制，动画绘制 ------ //
    ////// 添加一个全局动画 //////
    addGlobalAnimate(block) {
        if (!block || !block.event)
            return;
        this.removeGlobalAnimate(block.x, block.y, block.name);
        if (block.event.cls == 'autotile') {
            var id = block.event.id, img = core.material.images.autotile[id];
            if (!img || img.width == 96)
                return;
            core.status.autotileAnimateObjs.push(block);
        }
        else {
            if (!block.event.bigImage && (!block.event.animate || block.event.animate == 1))
                return;
            core.status.globalAnimateObjs.push(block);
        }
    }
    ////// 删除一个或所有全局动画 //////
    removeGlobalAnimate(x, y, name) {
        // 没有定义xy，则全部删除
        if (x == null || y == null) {
            core.status.globalAnimateStatus = 0;
            core.status.globalAnimateObjs = [];
            core.status.autotileAnimateObjs = [];
            core.status.floorAnimateObjs = [];
            return;
        }

        core.status.globalAnimateObjs = core.status.globalAnimateObjs.filter(function (block) {
            return block.x != x || block.y != y || block.name != name;
        });

        // 检查Autotile
        core.status.autotileAnimateObjs = core.status.autotileAnimateObjs.filter(function (block) {
            return block.x != x || block.y != y || block.name != name;
        });
    }
    ////// 绘制UI层的box动画 //////
    drawBoxAnimate() {
        if (core.status.boxAnimateObjs.length == 0)
            return;
        // check ui2
        if (main.mode == 'play' && core.status.boxAnimateObjs.filter(function (one) { return one.bigImage; }).length > 0 && !core.dymCanvas.ui2) {
            core.createCanvas('ui2', 0, 0, core.__PIXELS__, core.__PIXELS__, 142);
        }
        core.clearMap('ui2');

        core.status.boxAnimateObjs.forEach(function (obj) {
            if (obj.bigImage) {
                var ctx = obj.ctx || 'ui2';
                var bigImageInfo = core.maps._getBigImageInfo(obj.bigImage, obj.face, core.status.globalAnimateStatus % 4);
                var sx = bigImageInfo.sx, sy = bigImageInfo.sy, per_width = bigImageInfo.per_width, per_height = bigImageInfo.per_height;
                var actual_width = Math.min(per_width, obj.max_width || per_width), actual_height = per_height * actual_width / per_width;
                core.drawImage(ctx, obj.bigImage, sx, sy, per_width, per_height,
                    obj.centerX - actual_width / 2, obj.centerY - actual_height / 2, actual_width, actual_height);
            } else {
                var ctx = obj.ctx || 'ui';
                core.clearMap(ctx, obj.bgx, obj.bgy, obj.bgWidth, obj.bgHeight);
                core.fillRect(ctx, obj.bgx, obj.bgy, obj.bgWidth, obj.bgHeight, this.groundPattern);
                core.drawImage(ctx, obj.image, core.status.globalAnimateStatus % obj.animate * 32, obj.pos,
                    32, obj.height, obj.x, obj.y, obj.dw || 32, obj.dh || obj.height);
            }
        });
        if (main.mode != 'play')
            core.status.boxAnimateObjs = [];
    }
    ////// 绘制动画 //////
    drawAnimate(name, x, y, alignWindow, callback) {
        name = core.getMappedName(name);

        // 正在播放录像：不显示动画
        if (core.isReplaying() || !core.material.animates[name] || x == null || y == null) {
            if (callback)
                callback();
            return -1;
        }

        // 开始绘制
        var animate = core.material.animates[name], centerX = 32 * x + 16, centerY = 32 * y + 16;
        if (alignWindow) {
            centerX += core.bigmap.offsetX;
            centerY += core.bigmap.offsetY;
        }
        animate.se = animate.se || {};
        if (typeof animate.se == 'string')
            animate.se = { 1: animate.se };

        var id = setTimeout(null);
        core.status.animateObjs.push({
            "name": name,
            "id": id,
            "animate": animate,
            "centerX": centerX,
            "centerY": centerY,
            "index": 0,
            "callback": callback
        });

        return id;
    }
    ////// 绘制一个跟随勇士的动画 //////
    drawHeroAnimate(name, callback) {
        name = core.getMappedName(name);

        // 正在播放录像或动画不存在：不显示动画
        if (core.isReplaying() || !core.material.animates[name]) {
            if (callback)
                callback();
            return -1;
        }

        // 开始绘制
        var animate = core.material.animates[name];
        animate.se = animate.se || {};
        if (typeof animate.se == 'string')
            animate.se = { 1: animate.se };

        var id = setTimeout(null);
        core.status.animateObjs.push({
            "name": name,
            "id": id,
            "animate": animate,
            "hero": true,
            "index": 0,
            "callback": callback
        });

        return id;
    }
    ////// 获得当前正在播放的所有（指定）动画的id列表 //////
    getPlayingAnimates(name) {
        return (core.status.animateObjs || []).filter(function (one) {
            return name == null || one.name == name;
        }).map(function (one) { return one.id; });
    }
    ////// 绘制动画的某一帧 //////
    _drawAnimateFrame(name, animate, centerX, centerY, index) {
        var ctx = core.getContextByName(name);
        if (!ctx)
            return;
        var frame = animate.frames[index % animate.frame];
        core.playSound((animate.se || {})[index % animate.frame + 1], (animate.pitch || {})[index % animate.frame + 1]);
        var ratio = animate.ratio;
        frame.forEach(function (t) {
            var image = animate.images[t.index];
            if (!image)
                return;

            var realWidth = image.width * ratio * t.zoom / 100;
            var realHeight = image.height * ratio * t.zoom / 100;
            core.setAlpha(ctx, t.opacity / 255);

            var cx = centerX + t.x, cy = centerY + t.y;

            var ix = cx - realWidth / 2 - core.bigmap.offsetX, iy = cy - realHeight / 2 - core.bigmap.offsetY;

            var mirror = t.mirror ? 'x' : null;
            var angle = t.angle ? -t.angle * Math.PI / 180 : null;
            core.drawImage(ctx, image, ix, iy, realWidth, realHeight, null, null, null, null, angle, mirror);

            core.setAlpha(ctx, 1);
        });
    }
    ////// 停止动画 //////
    stopAnimate(id, doCallback) {
        for (var i = 0; i < core.status.animateObjs.length; i++) {
            var obj = core.status.animateObjs[i];
            if (id == null || obj.id == id) {
                if (doCallback) {
                    (function (callback) {
                        setTimeout(function () {
                            if (callback)
                                callback();
                        });
                    })(obj.callback);
                }
            }
        }
        core.status.animateObjs = core.status.animateObjs.filter(function (x) { return id != null && x.id != id; });
        if (core.status.animateObjs.length == 0)
            core.clearMap('animate');
    }
}
