<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { VIEW_WIDTH, VIEW_HEIGHT } from '@/constant';
import Main from './main/Index.vue';
import { viewManager } from './view';
import { resizer } from './resizer';
import { core } from '@/core/core';
import { showLoading } from './layers/loading';

onMounted(() => {
    resizer.init();
    core.load().then(() => {
        core.init();
    });
    showLoading().then(async () => {
        // 游戏逻辑主循环
        // @ts-ignore
        window.core = core;
    });
});

const STYLE = {
    width: VIEW_WIDTH + 'rem', height: VIEW_HEIGHT + 'rem'
};
</script>

<template>
    <div class="game" :style="STYLE">
        <Main></Main>
        <template v-for="([layer, closeHandler]) of viewManager.stack">
            <component class="layer" :is="layer" :close="closeHandler"></component>
        </template>
    </div>
</template>

<style>
#app {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* visibility: hidden; */
}
</style>

<style lang="less" scoped>
.game {
    position: relative;
    user-select: none;
}
.layer {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
