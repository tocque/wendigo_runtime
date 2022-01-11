import { clone } from "lodash-es";
import { core } from "./core";

interface Scan {
    loc: number,
    stop: number,
    leftFoot: number,
    rightFoot: number
}

export interface IconData {
    hero: {
        down: Scan
        left: Scan,
        right: Scan,
        up: Scan,

        leftup: Scan,
        leftdown: Scan,
        rightup: Scan,
        rightdown: Scan,

        width: number,
        height: number,
    },
    terrains: Record<string, number>
    animates: Record<string, number>
    npcs: Record<string, number>
    npc48: Record<string, number>
    enemys: Record<string, number>
    enemy48: Record<string, number>
    items: Record<string, number>
    autotile: Record<string, number>
}

export class Icons {
    
    // @ts-ignore
    icons: IconData;
    tilesetStartOffset = 10000;

    init() {
        // @ts-ignore
        this.icons = icons_4665ee12_3a1f_44a4_bea3_0fccba634dc1;
        //delete(icons_4665ee12_3a1f_44a4_bea3_0fccba634dc1);
        // tileset的起点
    }
    getIcons() {
        var icons = clone(this.icons);
        icons.hero.leftup = icons.hero.leftdown = icons.hero.left;
        icons.hero.rightup = icons.hero.rightdown = icons.hero.right;
        return icons;
    }
    ////// 根据道具ID获得其cls //////
    getClsFromId(id: string) {
        for (var cls in core.material.icons) {
            // @ts-ignore
            if (cls != 'hero' && id in core.material.icons[cls])
                return cls;
        }
        return null;
    }

    private allIconIds: string[] | null = null;

    getAllIconIds() {
        if (!this.allIconIds)
            return this.allIconIds;
        this.allIconIds = [];
        for (var type in this.icons) {
            // @ts-ignore
            this.allIconIds = this.allIconIds.concat(Object.keys(this.icons[type]));
        }
        return this.allIconIds;
    }
    _getAnimateFrames(cls: string) {
        if (cls == 'enemys' || cls == 'npcs') {
            return 2;
        }
        if (cls == 'animates' || cls == 'enemy48' || cls == 'npc48') {
            return 4;
        }
        return 1;
    }
    ////// 根据图块数字或ID获得所在的tileset和坐标信息 //////
    getTilesetOffset(id: string | number) {

        if (typeof id === 'string') {
            id = core.getIdOfThis(id);
            // Tileset的ID必须是 X+数字 的形式
            if (!/^X\d+$/.test(id)) {
                return null;
            }
            id = parseInt(id.substring(1));
        } else if (typeof id != 'number') {
            return null;
        }

        core.tilesets = core.tilesets || [];
        var startOffset = this.tilesetStartOffset;
        for (var i in core.tilesets) {
            var imgName = core.tilesets[i];
            var img = core.material.images.tilesets[imgName];
            var width = Math.floor(parseInt(img.getAttribute('_width')) / 32), height = Math.floor(parseInt(img.getAttribute('_height')) / 32);
            if (id >= startOffset && id < startOffset + width * height) {
                var x = (id - startOffset) % width, y = parseInt((id - startOffset) / width);
                return { "image": imgName, "x": x, "y": y };
            }
            startOffset += this.tilesetStartOffset;
        }
        return null;
    }
}
