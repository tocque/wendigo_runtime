class _FileReader {
    
    private fileReader: FileReader | null;
    private input = document.createElement("input");

    constructor() {
        this.fileReader = window.FileReader ? new FileReader() : null;
    }

    async readText(accept: string) {
        if (this.fileReader) {
            this.fileReader.onload = () => {
                core.readFileContent(this.fileReader.result);
            };
            this.fileReader.onerror = () => {
                if (core.platform.errorCallback)
                    core.platform.errorCallback();
            }
        }
    }

    async readBlob(accept: string) {
        
    }
}
export const fileReader = new _FileReader();