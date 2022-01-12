import { TOWER_ID } from "@/constant";
import localforage from "localforage";

enum WorkMode {
    Localforage,
    LocalforageWithCompress,
    JSInterface
}

/**
 * 大文件存储
 * 兼容多种工作模式
 */
class LargeFileStorage {

    workmode: WorkMode;

    constructor() {
        this.workmode = [
            WorkMode.LocalforageWithCompress, WorkMode.JSInterface
        ].find((mode) => {
            return this.test(mode);
        }) ?? WorkMode.Localforage;
    }

    /**
     * 测试功能是否正常运作
     * @param mode 
     */
    private test(mode: WorkMode) {
        const prevMode = this.workmode;
        this.workmode = mode;

        try {

        } catch (e) {
            
        }
    }

    private static getRealName(name: string) {
        return `${ TOWER_ID }_${ name }`;
    }
}

export const largeFileStorage = new LargeFileStorage();