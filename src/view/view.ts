import { Component, markRaw, reactive } from "vue";

/**
 * UI栈
 */
class ViewManager {

    stack: [Component, (value: any) => void][] = reactive([]);

    /**
     * 向UI栈中追加一个UI，当其被释放时，promise完成
     * 为了保证UI栈的正确性，当一个组件不在栈顶时，会将其上方的所有组件一并弹出
     * @param component UI的vue根组件
     */
    async push(component: Component) {
        const value = await new Promise<any>((res) => {
            this.stack.push(markRaw([component, res]));
        });
        const index = this.stack.findIndex((e) => {
            return e[0] === component;
        });
        if (index === -1) {
            console.error("UI栈错误");
        }
        this.stack = this.stack.slice(0, index-1);
        return value;
    }
}

export const viewManager = new ViewManager();
