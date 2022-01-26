import { isEmpty } from "lodash-es";
import { platform } from "./platform";

class FilePicker {
    
    private fileReader: FileReader | null;
    private input;

    constructor() {
        this.fileReader = window.FileReader ? new FileReader() : null;
        this.input = document.createElement("input");
        this.input.style.opacity = "0";
        this.input.type = 'file';
    }

    private async readFile(accept: string, transformer: (blob: Blob) => any) {
        // @ts-ignore
        if (window.jsinterface) {
            // @ts-ignore
            if (!window.core) window.core = {};
            // @ts-ignore
            if (!core.utils) core.utils = {};
            return new Promise<string>((res) => {
                // @ts-ignore
                core.utils.readFileContent = (content: string) => {
                    res(content);
                };
                // @ts-ignore
                window.jsinterface.readFile();
            });
        }
        // step 0: 不为http/https，直接不支持
        if (!platform.isOnline) {
            alert("离线状态下不支持文件读取！");
            throw new Error();
        }

        // Step 1: 如果不支持FileReader，直接不支持
        if (this.fileReader === null) {
            alert("当前浏览器不支持FileReader！");
            throw new Error();
        }
        if (accept) {
            this.input.accept = accept;
        }
        const file = await new Promise<File>((res, rej) => {
            this.input.onchange = () => {
                const files = this.input.files;
                if (isEmpty(files)) {
                    rej();
                } else {
                    res(files![0]);
                }
                this.input.value = '';
            }
            this.input.click();
        });
        return new Promise<string>((res, rej) => {
            if (!this.fileReader) throw new Error();
            this.fileReader.readAsText(file);
            this.fileReader.onload = (e) => {
                res(this.fileReader!.result as string)
            };
            this.fileReader.onerror = () => {
                rej();
            }
        });
    }

    async readText(accept: string) {
        return this.readFile(accept, (file: Blob) => {
            this.fileReader!.readAsText(file);
        });
    }

    async readDataURL(accept: string) {
        return this.readFile(accept, (file: Blob) => {
            this.fileReader!.readAsDataURL(file);
        });
    }
}
export const filePicker = new FilePicker();