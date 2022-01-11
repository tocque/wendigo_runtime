import { ref } from "vue";

export type ProgressHandler = (loaded: number, total: number) => void;

export type LoadingTask = (progress: ProgressHandler, finish: () => void) => void;

class Preloader {
    /**
     * 已加载的资源量
     */
    loaded = ref(0);

    /**
     * 需要加载的全部资源量
     */
    total = ref(0);

    private tasks: Promise<void>[] = [];

    addTask(task: LoadingTask) {
        let prevLoaded = 0, prevTotal = 0;
        this.tasks.push(new Promise<void>((res) => {
            task(
                (loaded, total) => {
                    this.loaded.value += (loaded - prevLoaded);
                    this.total.value += (total - prevTotal);
                    prevLoaded = loaded;
                    prevTotal = total;
                },
                () => res(),
            );
        }))
    }

    /**
     * 
     */
    complete() {
        return Promise.all(this.tasks);
    }    
}

export const preloader = new Preloader();
