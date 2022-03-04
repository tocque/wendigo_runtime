<script setup lang="ts">
import { core } from '@/core/core';
import { onMounted, Ref, ref } from 'vue';
import { resizer } from '../resizer';

const gameDraw = ref(null) as any as Ref<HTMLElement>;

onMounted(() => {
    core.mountCanvas(gameDraw.value);
});

interface Loc {
    x: number;
    y: number;
    size: number;
}

const getClickLoc = (e: MouseEvent): Loc => {

    const scale = resizer.getRealRatio().value;
    const x = e.clientX;
    const y = e.clientY;
    const left = gameDraw.value.offsetLeft;
    const top = gameDraw.value.offsetTop;
    const size = 32;

    return {
        x: Math.max(x - left) / scale, y: Math.max(y - top, 0) / scale, size,
    };
}

const handleMouseEvent = (action: (loc: Loc) => void) => {
    return (e: MouseEvent) => {
        try {
            e.stopPropagation();
            const loc = getClickLoc(e);
            if (loc == null) return;
            action(loc);
        } catch (err) {
            console.error(err, e);
        }
    }
}

/**
 * 鼠标按下时
 */
const onmousedown = handleMouseEvent(({ x, y, size }) => {
    const bx = ~~(x / size), by = ~~(y / size);
    core.doRegisteredAction('ondown', bx, by, x, y);
});

/**
 * 鼠标移动时
 */
const onmousemove = handleMouseEvent(({ x, y, size }) => {
    const bx = ~~(x / size), by = ~~(y / size);
    core.doRegisteredAction('onmove', bx, by, x, y);
});

/**
 * 鼠标放开时
 */
const onmouseup = handleMouseEvent(({ x, y, size }) => {
    const bx = ~~(x / size), by = ~~(y / size);
    core.doRegisteredAction('onup', bx, by, x, y);
});

const onmousewheel = (e: WheelEvent) => {
    const action = (direct: number) => core.doRegisteredAction('onmousewheel', direct);
    // @ts-ignore
    if (e.wheelDelta) action(Math.sign(e.wheelDelta));
    else if (e.detail) action(Math.sign(e.detail));
}

// let lastTouchLoc: null | Loc = null;

// ////// 手指在触摸屏开始触摸时 //////
// const ontouchstart = (e) => {
//     try {
//         e.preventDefault();
//         var loc = core.actions._getClickLoc(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
//         if (loc == null) return;
//         main.lastTouchLoc = loc;
//         core.ondown(loc);
//     }catch (ee) { main.log(ee); }
// }

// let lastTouchLoc: null | [ x, y ] = null;
// ////// 手指在触摸屏上移动时 //////
// dataCanvas.ontouchmove = function (e) {
//     try {
//         e.preventDefault();
//         var loc = core.actions._getClickLoc(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
//         if (loc == null) return;
//         main.lastTouchLoc = loc;
//         core.onmove(loc);
//     }catch (ee) { main.log(ee); }
// }

// ////// 手指离开触摸屏时 //////
// dataCanvas.ontouchend = function (e) {
//     try {
//         e.preventDefault();
//         if (lastTouchLoc === null) return;
//         var loc = lastTouchLoc;
//         delete lastTouchLoc === null;
//         core.onup(loc);
//     } catch (e) {
//         main.log(e);
//     }
// }
</script>
<template>
    <div class="main">
        <div class="gameDraw" ref="gameDraw"
            @mousedown="onmousedown"
            @mouseup="onmouseup"
            @mousemove="onmousemove"
            @wheel="onmousewheel"
        ></div>    
    </div>
</template>
<style lang="less" scoped>
.main {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
}
.gameDraw {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 416rem;
    height: 416rem;
}
</style>