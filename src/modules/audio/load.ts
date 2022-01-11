import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";
import { CHUNK_MAP } from "../../constant";
import { preloader } from "../preloader";
import { loadByGet, unzip } from "../preloader/helper";
import { sePlayer } from "./se";

async function readBuffer(data: Blob) {
    const blobReader = new BlobReader(data);
    await blobReader.init();
    const uint8Array = await blobReader.readUint8Array(0, blobReader.size);
    return uint8Array.buffer;
}

export function addSETasks(list: string[]) {
    // 使用压缩时，加载压缩包，否则分批加载SE文件
    if (main.useCompress) {
        for (let i = 0; i < CHUNK_MAP.se; i++) {
            preloader.addTask(async (progress, finish) => {
                const url = `project/sounds/sounds.chunk${ i+1 }.h5data`;
                const { data } = await loadByGet(url, progress);
                await unzip(data, async (entry) => {
                    if (!list.includes(entry.filename)) return;
                    if (entry.getData) {
                        const data = await entry.getData(new BlobWriter());
                        sePlayer.load(await readBuffer(data));
                    }
                });
                finish();
            });
        }
    } else {
        list.forEach((name) => {
            preloader.addTask(async (progress, finish) => {
                const url = `project/sounds/${ name }`;
                const { data } = await loadByGet(url, progress);
                sePlayer.load(await readBuffer(data));
                finish();
            });
        });
    }
}
