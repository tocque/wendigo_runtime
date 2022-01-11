<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { VIEW_WIDTH, VERSION } from '@/constant';
import { clamp } from 'lodash-es';
import { preloader } from '@/modules/preloader';

const { close } = defineProps<{ close: () => void }>();

const { loaded, total } = preloader;

const percentage = computed(() => {
    if (total.value === 0) return 0;
    return ~~(loaded.value / total.value * 100)
});
const barWidth = computed(() => (percentage.value * VIEW_WIDTH / 100))
const percentagePosition = computed(() => {
    return clamp(barWidth.value - 15, 0, VIEW_WIDTH - 30);
});
</script>

<template>
    <div class="container">
        <div class="top">
            <span class="version">version: {{ VERSION }}</span>
        </div>
        <div class="slide">
            <img src="/project/images/fg.png" draggable="false" />
        </div>
        <div class="bottom">
            <div class="process-bar"
                :style="{ width: barWidth + 'rem' }"
            ></div>
            <div class="percentage"
                :style="{ marginLeft: percentagePosition + 'rem' }"
            >{{ percentage }} %</div>
            <div class="load-status">正在加载（{{ loaded }}mb/{{ total }}mb）</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.top, .bottom, .slide {
    position: absolute;
    width: 100%;
}
.top, .bottom {
    height: 40rem;
}
.top {
    top: 0;
}
.bottom {
    bottom: 0;
}
.slide {
    top: 40rem;
    bottom: 40rem;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}
.version {
    margin-left: 5rem;

    color: #888888;
    font-size: 12rem;
}
@barcolor: #FCE547;
.process-bar {
    background-color: @barcolor;
    height: 2rem;
}
.percentage {
    color: @barcolor;
}
.load-status {
    color: #FFFFFF;
    margin: auto;
    text-align: center;
}
</style>
