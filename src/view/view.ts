import { EventHook } from "@/utils/eventHook";
import { isEmpty, last } from "lodash-es";
import { Component, markRaw, reactive } from "vue";

export interface CloseHandler<T = any> {
    (value: T): void,
    onBefore(hook: () => any): any,
}

function createCloseHandler<T>(close: (value: T) => void) {
    const hook = new EventHook();
    const closeHandler = async (value: T) => {
        await Promise.all(hook.call());
        close(value);
    }
    closeHandler.onBefore = (action: () => any) => hook.tap(action);
    return closeHandler;
}

/**
 * UI栈
 */
class ViewManager {

    stack: [Component, CloseHandler][] = reactive([]);

    /**
     * 向UI栈中追加一个UI，当其被释放时，promise完成
     * 为了保证UI栈的正确性，当一个组件不在栈顶时，会将其上方的所有组件一并弹出
     * @param component UI的vue根组件
     */
    async push<T = void>(component: Component) {
        const value = await new Promise<T>((res) => {
            const close = createCloseHandler(res);
            this.stack.push(markRaw([component, close]));
        });
        while (true) {
            const top = last(this.stack);
            if (!top) {
                console.error("UI栈错误");
                break;
            } else if (top[0] === component) {
                this.stack.pop();
                break;
            }
            this.stack.pop();
        };
        return value;
    }
}

export const viewManager = new ViewManager();
