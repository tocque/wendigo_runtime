import { computed, ComputedRef, reactive, readonly, Ref, ref, watch } from "vue";
import { VIEW_WIDTH, VIEW_HEIGHT } from "@/constant";

class Resizer {

    private realRatio = ref(1);
    
    /**
     * 获取当前的实际缩放比例的只读代理 
     */
    getRealRatio(): Ref<number> {
        return readonly(this.realRatio);
    }

    private maxVaildRatio = ref(1);

    /**
     * 获取窗口允许的最大缩放比例的只读代理 
     */
    getMaxVaildRatio() {
        return readonly(this.maxVaildRatio);
    }
    
    private expectRatio = ref(1);

    /**
     * 获取用户设置的最大缩放比例的只读代理 
     */
    getExpectRatio() {
        return readonly(this.expectRatio);
    }

    /**
     * 设置最大缩放比例
     */
    setExpectRatio(ratio: number) {
        this.expectRatio.value = ratio;
    }

    init() {
        const root = document.documentElement;
        /**
         * 计算可选缩放比例，并进行画面缩放
         */
        const update = () => {
            requestAnimationFrame(() => {
                this.maxVaildRatio.value = Math.min(
                    root.clientWidth  / VIEW_WIDTH,
                    root.clientHeight / VIEW_HEIGHT
                );;
                const ratio = Math.min(
                    this.expectRatio.value,
                    this.maxVaildRatio.value
                );
                root.style.fontSize = ratio + 'px';
                this.realRatio.value = ratio;
            });
        }
        window.addEventListener("resize", update);
        watch(this.expectRatio, update);
        update();
    }
}

export const resizer = new Resizer();
