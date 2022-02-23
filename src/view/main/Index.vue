<script setup lang="ts">
import { core } from '@/core/core';
import { onMounted, Ref, ref } from 'vue';

const gameDraw = ref(null) as any as Ref<HTMLElement>;

onMounted(() => {
    core.mountCanvas(gameDraw.value);
});
</script>
<template>
    <div class="main">
        <div class="gameDraw" ref="gameDraw"></div>    
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