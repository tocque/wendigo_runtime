<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { VIEW_WIDTH, VIEW_HEIGHT } from '@/constant';
import { viewManager } from './view';
import { resizer } from './resizer';

const { init } = defineProps<{ init: () => void }>();

onMounted(() => {
    resizer.init();
    init();
})

const STYLE = {
    width: VIEW_WIDTH + 'rem', height: VIEW_HEIGHT + 'rem'
};
</script>

<template>
    <div class="main" :style="STYLE">
        <template  v-for="([layer, closeHandler]) of viewManager.stack">
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
}
</style>

<style lang="less" scoped>
.main {
    position: relative;
    user-select: none;
}
.layer {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
