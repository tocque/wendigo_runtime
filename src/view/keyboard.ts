import { computeKeybinding } from "@/utils/keybinding";
import { isEmpty, last } from "lodash-es";
    
export type KeyBinding = number;

export namespace Keyboard {

    type EventType = "keydown" | "keypress" | "keyup";
    
    export interface KeyActionContext {
        count: number,
        currentTimeStamp: number,
        lastTimeStamp: number,
        [ key: string ]: any,
    }

    export type ProxyAction = (context: KeyActionContext, e: KeyboardEvent) => (boolean | void);
    
    export type ProxyRule = [
        keyBinding: KeyBinding,
        action: { trigger?: ProxyAction, finish?: ProxyAction },
        condition?: () => boolean,
    ];
    
    type Action = ((e: KeyboardEvent) => boolean);
    type ActionMap = Record<KeyBinding, Action[]>;
    
    export class Proxy {
    
        eventMap = {
            keydown: {} as ActionMap,
            keypress: {} as ActionMap,
            keyup: {} as ActionMap,
        }
    
        contextMap = new Map<number, KeyActionContext>();
        
        /**
         * 键盘代理，用于监听键盘代理事件
         * @param proxyRules 代理规则集
         */
        constructor(proxyRules: ProxyRule[]) {
            proxyRules.forEach((rule) => {
                this.addRule(rule);
            })
        }
    
        emit(type: EventType, e: KeyboardEvent) {
            const keyBinding = computeKeybinding(e);
            const actions = this.eventMap[type][keyBinding];
            if (!actions) return;
            for (const action of actions) {
                if (!action(e)) {
                    break;
                }
            }
            // 放开键时，要销毁现有的上下文
            if (type === "keyup") {
                this.contextMap.clear();
            }
        }
    
        addAction(type: EventType, keyBinding: KeyBinding, action: Action) {
            if (!this.eventMap[type][keyBinding]) {
                this.eventMap[type][keyBinding] = [];
            }
            this.eventMap[type][keyBinding].push(action);
        }
    
        private id = 0;
    
        /**
         * 添加键盘代理规则，具体规则释义参见构造函数
         * @param param0 代理规则
         */
        addRule([ keyBinding, { trigger, finish }, condition ]: ProxyRule) {
            const id = this.id++;
            const getContext = () => {
                if (!this.contextMap.has(id)) {
                    this.contextMap.set(id, {
                        count: 0, currentTimeStamp: 0, lastTimeStamp: 0,
                    });
                }
                return this.contextMap.get(id)!;
            }
            const updateContext = (context: KeyActionContext) => {
                context.count++;
                context.lastTimeStamp = context.currentTimeStamp;
                context.currentTimeStamp = Date.now();
                return context;
            }
            if (trigger) {
                this.addAction("keydown", keyBinding, (e) => {
                    if (condition && !condition()) return true;
                    const context = getContext();
                    return trigger(updateContext(context), e) ?? false;
                });
            }
            if (finish) {
                this.addAction("keydown", keyBinding, (e) => {
                    if (condition && !condition()) return true;
                    const context = getContext();
                    return finish(updateContext(context), e) ?? false;
                });
            }
        }
    
        /**
         * 代理弹出时，要清空按键上下文
         */
        eject() {
            this.contextMap.clear();
        }
    }

    export function noLongPress(action: ProxyAction): ProxyRule[1] {
        return { trigger: (context, e) => {
            if (context.count !== 1) return;
            action(context, e);
        } };
    }

    export function throttleLongPress(action: ProxyAction, time: number): ProxyRule[1] {
        return { trigger: (context, e) => {
            if (context.currentTimeStamp - context.lastTimeStamp < time) return;
            action(context, e);
        } };
    }
    
    export class Manager {
    
        focusStack: [number, Proxy][] = [];
    
        constructor() {
            this.push(new Proxy([]));
        }
    
        listen() {
            document.addEventListener("keydown", (e) => {
                last(this.focusStack)![1].emit("keydown", e);
            });
            document.addEventListener("keyup", (e) => {
                last(this.focusStack)![1].emit("keyup", e);
            });
        }

        private id = 0;
    
        push(proxy: Proxy) {
            const id = this.id++;
            this.focusStack.push([ id, proxy ]);
            return id;
        }
    
        /**
         * 将代理从管理器中弹出
         * @param id 要弹出的代理的id，特别的，传入-1可以弹出当前栈顶的代理(不推荐)
         * @returns 
         */
        pop(id: number) {
            if (id === -1) {
                this.focusStack.pop();
                return;
            }
            while (true) {
                if (isEmpty(this.focusStack)) {
                    console.warn("[KeyboardManager] 尝试执行弹出代理时，未能找到给定的代理");
                    break;
                }
                const top = this.focusStack.pop()!;
                top[1].eject();
                if (top[0] === id) {
                    break;
                }
            }
        }
    }  
}
    
export const keyboardManager = new Keyboard.Manager();

keyboardManager.listen();