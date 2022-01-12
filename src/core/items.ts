import { Assert } from "@/utils/assert";
import { clone } from "lodash-es";
import { core } from "./core";

export interface Item {
    cls: string
    itemEffect?: string
    [key: string]: any
}

export class Items {

    items: Record<string, Item> = {};

    constructor() {
        this._init();
    }
    ////// 初始化 //////
    _init() {
        // @ts-ignore
        this.items = items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a;
        for (var itemId in this.items) {
            this.items[itemId].id = itemId;
        }
    }
    ////// 获得所有道具 //////
    getItems() {
        const items = clone(this.items);
        // @ts-ignore
        var equipInfo = core.getFlag<any>('equipInfo');
        if (equipInfo) {
            for (var id in equipInfo) {
                items[id].equip = clone(equipInfo[id]);
            }
        }
        return items;
    }
    /**
     * 即捡即用类的道具获得时的效果
     * @example core.getItemEffect('redPotion', 10) // 执行获得10瓶红血的效果
     * @param itemId 道具id
     * @param itemNum 道具数量，可选，默认为1
     */
    getItemEffect(itemId: string, itemNum = 1) {
        var itemCls = core.material.items[itemId].cls;
        // 消耗品
        if (itemCls === 'items') {
            var curr_hp = core.status.hero.hp;
            var itemEffect = core.material.items[itemId].itemEffect;
            if (itemEffect) {
                try {
                    for (var i = 0; i < itemNum; ++i)
                        eval(itemEffect);
                } catch (e) {
                    main.log(e);
                }
            }
            core.status.hero.statistics.hp += core.status.hero.hp - curr_hp;

            var useItemEvent = core.material.items[itemId].useItemEvent;
            if (useItemEvent) {
                try {
                    core.insertAction(useItemEvent);
                }
                catch (e) {
                    main.log(e);
                }
            }
            core.updateStatusBar();
        }
        else {
            core.addItem(itemId, itemNum);
        }
    }
    /**
     * 即捡即用类的道具获得时的额外提示
     * @example core.getItemEffectTip(redPotion) // （获得 红血瓶）'，生命+100'
     * @param itemId 道具id
     * @returns 图块属性itemEffectTip的内容
     */
    getItemEffectTip(itemId: string) {
        var itemCls = core.material.items[itemId].cls;
        // 消耗品
        if (itemCls === 'items') {
            var itemEffectTip = core.material.items[itemId].itemEffectTip;
            if (itemEffectTip) {
                try {
                    return core.replaceText(itemEffectTip) || "";
                } catch (e) {
                    main.log(e);
                    return "";
                }
            }
        }
        return "";
    }
    /**
     * 使用一个道具
     * @example core.useItem('pickaxe', true) // 使用破墙镐，不计入录像，无回调
     * @param itemId 道具id
     * @param noRoute 是否不计入录像，快捷键使用的请填true，否则可省略
     * @param callback 道具使用完毕或使用失败后的回调函数
     */
    useItem(itemId: string, noRoute?: boolean, callback?: () => void) {
        if (!this.canUseItem(itemId)) {
            if (callback)
                callback();
            return;
        }
        // 执行道具效果
        this._useItemEffect(itemId);
        // 执行完毕
        this._afterUseItem(itemId);
        // 记录路线
        if (!noRoute)
            core.status.route.push("item:" + itemId);
        if (callback)
            callback();
    }
    _useItemEffect(itemId: string) {
        var useItemEffect = core.material.items[itemId].useItemEffect;
        if (useItemEffect) {
            try {
                eval(useItemEffect);
            }
            catch (e) {
                main.log(e);
            }
        }
        var useItemEvent = core.material.items[itemId].useItemEvent;
        if (useItemEvent) {
            try {
                core.insertAction(useItemEvent);
            }
            catch (e) {
                main.log(e);
            }
        }
    }
    _afterUseItem(itemId: string) {
        // 道具使用完毕：删除
        var itemCls = core.material.items[itemId].cls;
        if (itemCls == 'tools')
            core.status.hero.items[itemCls][itemId]--;
        if (core.status.hero.items[itemCls][itemId] <= 0)
            delete core.status.hero.items[itemCls][itemId];
        core.updateStatusBar();
    }
    /**
     * 检查能否使用某种道具
     * @example core.canUseItem('pickaxe') // 能否使用破墙镐
     * @param itemId 道具id
     * @returns true表示可以使用
     */
    canUseItem(itemId: string) {
        // 没有道具
        if (!core.hasItem(itemId))
            return false;

        var canUseItemEffect = core.material.items[itemId].canUseItemEffect;
        if (canUseItemEffect) {
            try {
                return Assert.isBoolean(eval(canUseItemEffect));
            }
            catch (e) {
                main.log(e);
                return false;
            }
        }
    }
    /**
     * 统计某种道具的持有量
     * @example core.itemCount('yellowKey') // 持有多少把黄钥匙
     * @param itemId 道具id
     * @returns 该种道具的持有量，不包括已穿戴的装备
     */
    itemCount(itemId: string): number {
        if (!core.material.items[itemId] || !core.isPlaying())
            return 0;
        var itemCls = core.material.items[itemId].cls;
        if (itemCls == "items")
            return 0;
        return core.status.hero.items[itemCls][itemId] || 0;
    }
    /**
     * 检查主角是否持有某种道具(不包括已穿戴的装备)
     * @example core.hasItem('yellowKey') // 主角是否持有黄钥匙
     * @param itemId 道具id
     * @returns true表示持有
     */
    hasItem(itemId: string): boolean {
        return this.itemCount(itemId) > 0;
    }
    /**
     * 检查主角是否穿戴着某件装备
     * @example core.hasEquip('sword5') // 主角是否装备了神圣剑
     * @param itemId 装备id
     * @returns true表示已装备
     */
    hasEquip(itemId: string): boolean {
        if (!(core.material.items[itemId] || {}).equip || !core.isPlaying())
            return false;

        for (var i in core.status.hero.equipment)
            if (core.status.hero.equipment[i] == itemId)
                return true;
        return false;
    }
    /**
     * 检查主角某种类型的装备目前是什么
     * @example core.getEquip(1) // 主角目前装备了什么盾牌
     * @param equipType 装备类型，自然数
     * @returns 装备id，null表示未穿戴
     */
    getEquip(equipType: number): string | null {
        return core.status.hero.equipment[equipType] || null;
    }
    /**
     * 设置某种道具的持有量
     * @example core.setItem('yellowKey', 3) // 设置黄钥匙为3把
     * @param itemId 道具id
     * @param itemNum 新的持有量，可选，自然数，默认为0
     */
    setItem(itemId: string, itemNum = 0) {
        var itemCls = core.material.items[itemId].cls;
        if (itemCls == 'items')
            return;

        core.status.hero.items[itemCls][itemId] = itemNum;
        if (core.status.hero.items[itemCls][itemId] <= 0) {
            delete core.status.hero.items[itemCls][itemId];
        }
        core.updateStatusBar();
    }
    /**
     * 静默增减某种道具的持有量 不会更新游戏画面或是显示提示
     * @example core.addItem('yellowKey', -2) // 没收两把黄钥匙
     * @param itemId 道具id
     * @param itemNum 增加量，负数表示没收，默认为1
     */
    addItem(itemId: string, itemNum = 1) {
        var itemData = core.material.items[itemId];
        var itemCls = itemData.cls;
        if (itemCls == 'items')
            return;
        if (core.status.hero.items[itemCls][itemId] == null) {
            core.status.hero.items[itemCls][itemId] = 0;
        }
        core.status.hero.items[itemCls][itemId] += itemNum;
        if (core.status.hero.items[itemCls][itemId] <= 0) {
            delete core.status.hero.items[itemCls][itemId];
        }
        // 永久道具只能有一个
        if (itemCls == 'constants' && core.status.hero.items[itemCls][itemId] > 1)
            core.status.hero.items[itemCls][itemId] = 1;
        core.updateStatusBar();
    }
    /** 删除某个物品 */
    removeItem(itemId: string, itemNum = 1) {
        if (!core.hasItem(itemId))
            return false;
        var itemCls = core.material.items[itemId].cls;
        core.status.hero.items[itemCls][itemId] -= itemNum;
        if (core.status.hero.items[itemCls][itemId] <= 0) {
            delete core.status.hero.items[itemCls][itemId];
        }
        core.updateStatusBar();
        return true;
    }
    // ---------- 装备相关 ------------ //
    /** 根据类型获得一个可用的装备孔 */
    getEquipTypeByName(name: string) {
        const names = core.status.globalAttribute.equipName;
        const types: number[] = [];
        for (var i = 0; i < names.length; ++i) {
            if (names[i] === name) {
                types.push(i);
                if (!core.status.hero.equipment[i])
                    return i;
            }
        }
        return types.length == 1 ? types[0] : -1;
    }
    /**
     * 判定某件装备的类型
     * @example core.getEquipTypeById('shield5') // 1（盾牌）
     * @param equipId 装备id
     * @returns 类型编号，自然数
     */
    getEquipTypeById(equipId: string) {
        var type = core.material.items[equipId].equip.type;
        if (typeof type == 'string')
            type = this.getEquipTypeByName(type);
        return type;
    }
    /**
     * 检查能否穿上某件装备
     * @example core.canEquip('sword5', true) // 主角可以装备神圣剑吗，如果不能会有提示
     * @param equipId 装备id
     * @param hint 无法穿上时是否提示（比如是因为未持有还是别的什么原因）
     * @returns true表示可以穿上，false表示无法穿上
     */
    canEquip(equipId: string, hint: boolean) {
        // 装备是否合法
        var equip = core.material.items[equipId] || {};
        if (!equip.equip) {
            if (hint) {
                core.playSound('操作失败');
                core.drawTip("不合法的装备！");
            }
            return false;
        }

        // 是否拥有该装备
        if (!core.hasItem(equipId) && !core.hasEquip(equipId)) {
            if (hint) {
                core.playSound('操作失败');
                core.drawTip("你当前没有" + equip.name + "，无法换装");
            }
            return false;
        }

        // 可装备条件
        var canUseItemEffect = core.material.items[equipId].canUseItemEffect;
        if (canUseItemEffect) {
            try {
                if (!eval(canUseItemEffect)) {
                    if (hint) {
                        core.playSound('操作失败');
                        core.drawTip("当前不可换上" + equip.name);
                    }
                    return false;
                }
            }
            catch (e) {
                console.log(e);
                return false;
            }
        }
        return true;
    }
    /**
     * 尝试穿上某件背包里的装备并提示
     * @example core.loadEquip('sword5') // 尝试装备上背包里的神圣剑，无回调
     * @param equipId 装备id
     * @param callback 穿戴成功或失败后的回调函数
     */
    loadEquip(equipId: string, callback?: () => void) {
        if (!this.canEquip(equipId, true)) {
            if (callback)
                callback();
            return;
        }

        var loadEquip = core.material.items[equipId] || {};
        var type = this.getEquipTypeById(equipId);
        if (type < 0) {
            core.playSound('操作失败');
            core.drawTip("当前没有" + loadEquip.equip.type + "的空位！");
            if (callback)
                callback();
            return;
        }

        this._realLoadEquip(type, equipId, core.status.hero.equipment[type], callback);
    }
    /**
     * 脱下某个类型的装备
     * @example core.unloadEquip(1) // 卸下盾牌，无回调
     * @param equipType 装备类型编号，自然数
     * @param callback 卸下装备后的回调函数
     */
    unloadEquip(equipType: number, callback?: () => void) {
        var unloadEquipId = core.status.hero.equipment[equipType];
        if (!unloadEquipId) {
            if (callback)
                callback();
            return;
        }

        this._realLoadEquip(equipType, null, unloadEquipId, callback);
    }
    /**
     * 比较两件（类型可不同）装备的优劣
     * @example core.compareEquipment('sword5', 'shield5') // 比较神圣剑和神圣盾的优劣
     * @param compareEquipId 装备甲的id
     * @param beComparedEquipId 装备乙的id
     * @returns 两装备的各属性差，甲减乙，0省略
     */
    compareEquipment(compareEquipId: string, beComparedEquipId: string): { value: Record<string, number>, percentage: Record<string, number> } {
        var result = { "value": {}, "percentage": {} };
        var first = core.material.items[compareEquipId], second = core.material.items[beComparedEquipId];
        for (const one in result) {
            for (var name in core.status.hero) {
                if (typeof core.status.hero[name] == 'number') {
                    var ans = 0;
                    if (first)
                        ans += ((first.equip || {})[one] || {})[name] || 0;
                    if (second)
                        ans -= ((second.equip || {})[one] || {})[name] || 0;
                    if (ans != 0)
                        // @ts-ignore
                        result[one][name] = ans;
                }
            }
        }
        return result;
    }
    /**
     * 实际换装的效果
     * @param equipId 
     * @param unloadEquipId 
     */
    _loadEquipEffect(equipId: string, unloadEquipId: string) {
        // 比较能力值
        var result = core.compareEquipment(equipId, unloadEquipId);

        for (var name in result.percentage)
            core.addBuff(name, result.percentage[name] / 100);

        for (var name in result.value)
            core.status.hero[name] += result.value[name];
    }
    _realLoadEquip(type: number, loadId: string | null, unloadId: string | null, callback?: () => void) {
        const loadEquip =   loadId ? core.material.items[loadId] : {},
            unloadEquip = unloadId ? core.material.items[unloadId] : {};

        // --- 音效
        this._realLoadEquip_playSound();

        // --- 实际换装
        // @ts-ignore
        this._loadEquipEffect(loadId, unloadId);

        // --- 加减
        if (loadId)
            core.removeItem(loadId);
        if (unloadId)
            core.addItem(unloadId);
        core.status.hero.equipment[type] = loadId || null;

        // --- 提示
        if (loadId)
            core.drawTip("已装备上" + loadEquip.name, loadId);
        else if (unloadId)
            core.drawTip("已卸下" + unloadEquip.name, unloadId);

        if (callback)
            callback();
    }
    _realLoadEquip_playSound() {
        if (core.hasFlag("__quickLoadEquip__"))
            return;
        core.stopSound();
        core.playSound('穿脱装备');
    }
    /**
     * 保存当前套装
     * @example core.quickSaveEquip(1) // 将当前套装保存为1号套装
     * @param index 套装编号，自然数
     */
    quickSaveEquip(index: number) {
        var saveEquips = core.getFlag("saveEquips", [] as string[][]);
        saveEquips[index] = clone(core.status.hero.equipment);
        core.setFlag("saveEquips", saveEquips);
        core.status.route.push("saveEquip:" + index);
        core.drawTip("已保存" + index + "号套装");
    }
    /**
     * 快速换装
     * @example core.quickLoadEquip(1) // 快速换上1号套装
     * @param index 套装编号，自然数
     */
    quickLoadEquip(index: number) {
        var current = core.getFlag("saveEquips", [] as string[][])[index];
        if (!current) {
            core.playSound('操作失败');
            core.drawTip(index + "号套装不存在");
            return;
        }
        // 检查所有的装备
        var equipSize = core.status.globalAttribute.equipName.length;
        for (var i = 0; i < equipSize; i++) {
            var v = current[i];
            if (v && !this.canEquip(v, true))
                return;
        }
        core.status.route.push("loadEquip:" + index);
        core.setFlag("__quickLoadEquip__", true);
        // 快速换装
        var toEquip: (string | null)[] = [];
        for (var i = 0; i < equipSize; i++) {
            var now = core.status.hero.equipment[i];
            // --- 只考虑diff的装备
            var to = current[i];
            if (now != to) {
                toEquip.push(to || null);
                if (now) {
                    this.unloadEquip(i);
                }
            }
        }
        for (const to of toEquip) {
            if (to) {
                this.loadEquip(to);
            }
        }
        core.removeFlag("__quickLoadEquip__");
        this._realLoadEquip_playSound();

        core.drawTip("成功换上" + index + "号套装");
    }
    /**
     * 设置某个装备的属性并计入存档
     * @example core.setEquip('sword1', 'value', 'atk', 300, '+='); // 设置铁剑的攻击力数值再加300
     * @param equipId 装备id
     * @param valueType 增幅类型，只能是value（数值）或percentage（百分比）
     * @param name 要修改的属性名称，如atk
     * @param value 要修改到的属性数值
     * @param operator 操作符，可选，如+=表示在原始值上增加
     * @param prefix 独立开关前缀，一般不需要
     */
    setEquip(equipId: string, valueType: string, name: string, value: any, operator?: string, prefix?: string) {
        var equip = core.material.items[equipId];
        if (!equip || equip.cls != 'equips')
            return;
        var equipInfo = equip.equip || {};
        if (!equipInfo[valueType])
            equipInfo[valueType] = {};
        var toEquipInfo = clone(equipInfo);
        toEquipInfo[valueType][name] = core.events._updateValueByOperator(core.calValue(value, prefix), equipInfo[valueType][name], operator);
        // 如果是穿上状态，则还需要直接修改当前数值
        if (core.hasEquip(equipId)) {
            // 设置一个临时装备，然后模拟换装操作
            var tempId = 'temp:' + equipId;
            core.material.items[tempId] = { 'cls': 'equips', 'equip': clone(toEquipInfo) };
            this._loadEquipEffect(tempId, equipId);
            delete core.material.items[tempId];
            core.updateStatusBar();
        }
        equip.equip = clone(toEquipInfo);
        flags.equipInfo = flags.equipInfo || {};
        flags.equipInfo[equipId] = clone(toEquipInfo);
    }
}
