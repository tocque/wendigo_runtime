/**
 * 返回光标的抽象逻辑
 */

import { KeyCode } from "@/utils/keycode";
import { readonly, ref, Ref } from "vue";
import { KeyBinding, Keyboard } from "../keyboard";

interface SelectorOption {
    initPosition: number,
    bordered: boolean,
    onMoveFailed?: (nowpos: number) => any,
}

const defaultSelectorOption: SelectorOption = {
    initPosition: 0,
    bordered: false,
}

export class LogicSelector {

    private readonly _position = ref(0);
    private bordered: boolean;
    private onMoveFailed?: (nowpos: number) => any;
    private readonly size;

    position = readonly(this._position);

    constructor(size: number | any[], options: Partial<SelectorOption> = {}) {
        const { initPosition, bordered, onMoveFailed } = {
            ...defaultSelectorOption,
            ...options,
        };
        this._position.value = initPosition;
        this.bordered = bordered;
        this.onMoveFailed = onMoveFailed;
        this.size = Array.isArray(size) ? size.length : size; 
    }
    
    /**
     * 移动到上一个选项
     */
    prev() {
        if (this.position.value === 0) {
            if (this.bordered) {
                this.onMoveFailed?.(this.position.value);
                return;
            }
            this.position.value = this.size - 1;
        } else {
            this.position.value--;
        }
    }

    /**
     * 移动到下一个选项
     */
    next() {
        if (this.position.value === this.size - 1) {
            if (this.bordered) {
                this.onMoveFailed?.(this.position.value);
                return;
            }
            this.position.value = 0;
        } else {
            this.position.value--;
        }
    }

    /**
     * 直接指定要选择的选项
     */
    select(position: number) {
        this.position.value = position;
    }
}

interface SelectorKeyboardRuleOption {
    prevKeyBinding: KeyBinding | KeyBinding[] | null,
    nextKeyBinding: KeyBinding | KeyBinding[] | null,
}

const defaultSelectorKeyboardRuleOption: SelectorKeyboardRuleOption = {
    prevKeyBinding: KeyCode.UpArrow,
    nextKeyBinding: KeyCode.DownArrow,
}

export function createSelectorKeyBinding(selector: LogicSelector, options: Partial<SelectorKeyboardRuleOption> = {}) {
    const { prevKeyBinding, nextKeyBinding } = {
        ...defaultSelectorKeyboardRuleOption,
        ...options,
    };
    const rules: Keyboard.ProxyRule[] = [];
    const bindPrevKey = (keyBinding: KeyBinding): Keyboard.ProxyRule => {
        return [ keyBinding, Keyboard.throttleLongPress(() => {
            selector.prev();
        }, 300), ];
    }
    const bindNextKey = (keyBinding: KeyBinding): Keyboard.ProxyRule => {
        return [ keyBinding, Keyboard.throttleLongPress(() => {
            selector.next();
        }, 300), ];
    }
    if (prevKeyBinding !== null) {
        if (!Array.isArray(prevKeyBinding)) bindPrevKey(prevKeyBinding);
        else prevKeyBinding.forEach((keyBinding) => bindPrevKey(keyBinding));
    }
    if (nextKeyBinding !== null) {
        if (!Array.isArray(nextKeyBinding)) bindNextKey(nextKeyBinding);
        else nextKeyBinding.forEach((keyBinding) => bindNextKey(keyBinding));
    }
    return rules;
}
