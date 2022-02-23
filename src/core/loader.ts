import { bgmPlayer } from "@/modules/audio/bgm";
import { sePlayer } from "@/modules/audio/se";
import { preloader } from "@/modules/preloader";
import { loadByGet, unzip } from "@/modules/preloader/helper";
import { createImageFromBlob } from "@/utils/image";
import { BlobWriter, TextWriter } from "@zip.js/zip.js";
import axios from "axios";
import { ControlMethods } from "./control";
import { core, MATERIALS } from "./core";
import { Data } from "./data";
import { Enemy, EnemyMethods } from "./enemys";
import { EventData, EventMethods } from "./events";
import { IconData } from "./icons";
import { ItemData } from "./items";
import { MapData } from "./maps";

const guidMap = {
    data:      "a1e2fb4a_e986_4524_b0da_9b7ba7c0874d",
    enemys:    "fcae963b_31c9_42b4_b48c_bb48d09f3f80",
    events:    "c12a15a8_c380_4b28_8144_256cba95f760",
    functions: "d6ad677b_427a_4623_b50f_a445a3b0ef8a",
    icons:     "4665ee12_3a1f_44a4_bea3_0fccba634dc1",
    items:     "296f5d02_12fd_4166_a7c1_b5e830c9ee3a",
    maps:      "90f36752_8815_4be8_b32b_d7fad1d0542e",
    // plugins:   "bb40132b_638b_4a9f_b028_d3fe47acc8d1",
} as const;

interface PureData {
    data: Data,
    enemys: Record<string, Enemy>,
    events: EventData,
    functions: {
        events: EventMethods,
        enemys: EnemyMethods,
        control: ControlMethods,
    },
    icons: IconData,
    items: ItemData,
    maps: MapData
};

type TextHandler = (filename: string, data: string) => void | Promise<void>;
type BlobHandler = (filename: string, data: Blob) => void | Promise<void>;
interface AddTaskOption {
    suffix?: string
}

export class Loader {

    async loadData() {
        await this.loadPureData();
        await this.loadFloor();
    }

    async addPreloadTask() {
        const menifest = core.data.main;
        this.loadAnimates(menifest.animates);
        this.loadAutotiles(Object.keys(core.icons.icons.autotile));
        this.loadBGMs(menifest.bgms);
        this.loadFonts(menifest.fonts);
        this.loadImages(menifest.images);
        this.loadMaterials(MATERIALS.map(e => e));
        this.loadSEs(menifest.sounds);
        this.loadTilesets(menifest.tilesets);
        await preloader.finalize();
    }

    private async loadFloor() {
        core.floorIds = core.data.main.floorIds;
        const dataString = await (async () => {
            if (main.useCompress) {
                const { data } = await axios.get<string>(`./project/floor.min.js?v=${ main.version }`);
                return data;
            } else {
                const tasks = core.floorIds.map(async (name) => {
                    const { data } = await axios.get<string>(`./project/floors/${ name }.js?v=${ main.version }`);
                    return data;
                });
                return (await Promise.all(tasks)).join("\n");
            }
        })();
        return (() => {
            const main = {
                floors: {}
            };
            eval(`
                ${ dataString };
            `);
            core.floors = main.floors;
        })();
    }

    private async loadPureData() {
        const dataString = await (async () => {
            if (main.useCompress) {
                const { data } = await axios.get<string>(`./project/project.min.js?v=${ main.version }`);
                return data;
            } else {
                const tasks = Object.keys(guidMap).map(async (name) => {
                    const { data } = await axios.get<string>(`./project/${ name }.js?v=${ main.version }`);
                    return data;
                });
                return (await Promise.all(tasks)).join("\n");
            }
        })();
        const fetchString = Object.entries(guidMap)
            .map(([ key, guid ]) => `${ key }: ${key}_${ guid }`)
            .join(",");
        const puredata = eval(`
            ${ dataString };
            ({ ${ fetchString } })
        `) as PureData;
        core.data = puredata.data;
        core.enemys.init(puredata.enemys, puredata.functions.enemys);
        core.events.init(puredata.events, puredata.functions.events);
        core.icons.init(puredata.icons);
        core.items.init(puredata.items);
        core.maps.init(puredata.maps);
    }

    addTaskFromList(module: string, list: string[], type: 'text', dataHandler: TextHandler, options?: AddTaskOption): Promise<void>
    addTaskFromList(module: string, list: string[], type: 'blob', dataHandler: BlobHandler, options?: AddTaskOption): Promise<void>
    addTaskFromList(
        module: string, list: string[], type: 'text' | 'blob',
        dataHandler: TextHandler | BlobHandler, { suffix = "" }: AddTaskOption = {}
    ) {
        console.log(`[loader] 加载 ${module }/`)
        const dict = Object.fromEntries(list.map(e => [ e + suffix, e ]));
        if (main.useCompress) {
            return preloader.addTask(async (progress, finish) => {
                const { data } = await loadByGet(`./project/${ module }/${ module }.h5data?v=${ main.version }`, progress);
                await unzip(data, async (entry) => {
                    if (!(entry.filename in dict)) return;
                    if (entry.getData) {
                        const data = await entry.getData(
                            type === 'text' ? new TextWriter() : new BlobWriter()
                        );
                        await dataHandler(dict[entry.filename], data);
                    }
                });
                finish();
            });
        } else {
            return Promise.all(list.map((filename) => {
                return preloader.addTask(async (progress, finish) => {
                    const { data } = await loadByGet(`./project/${ module }/${ filename + suffix }?v=${ main.version }`, progress);
                    if (type === 'text') {
                        await (dataHandler as TextHandler)(filename, await data.text());
                    } else {
                        await (dataHandler as BlobHandler)(filename, data);
                    }
                    console.debug(`[loader] 加载${ module }/${ filename }`);
                    finish();
                });
            }));
        }
    }

    loadAnimates(list: string[]) {
        this.addTaskFromList("animates", list, "text", (filename, rawdata: string) => {
            try {
                const { ratio, se, pitch, bitmaps, frame_max, frames } = JSON.parse(rawdata);
                const images = (bitmaps as any[]).map((t2: any) => {
                    if (!t2) return null;
                    try {
                        const image = new Image();
                        image.src = t2;
                        return image;
                    } catch (e) {
                        console.error(e);
                        return null;
                    }
                });
                const resolvedFrames = (frames as any[]).map((t2: any[]) => {
                    return t2.map((t3) => ({
                        index: t3[0],
                        x: t3[1],
                        y: t3[2],
                        zoom: t3[3],
                        opacity: t3[4],
                        mirror: t3[5] || 0,
                        angle: t3[6] || 0,
                    }));
                });
                core.material.animates[filename] = {
                    ratio, se, pitch, images,
                    frame: frame_max, frames: resolvedFrames
                };
            } catch (e) {
                console.error(`[loader.animateTask] 解析${ filename }失败`);
                main.log(e);
            }
        }, {
            suffix: ".animate"
        });
    }

    async loadAutotiles(list: string[]) {
        const autotiles = {} as Record<string, HTMLImageElement>;
        const loadTask = this.addTaskFromList("autotiles", list, "blob", async (filename, data) => {
            autotiles[filename] = await createImageFromBlob(data);
        }, {
            suffix: ".png"
        });
        preloader.addTask(async (_, finish) => {
            await loadTask;
            // autotile需要保证顺序
            list.forEach((filename) => {
                core.material.images.autotile[filename] = autotiles[filename];
            });
            setTimeout(() => {
                core.maps._makeAutotileEdges();
                finish();
            });
        });
    }

    loadBGMs(list: string[]) {
        bgmPlayer.addPlaylist(list.map(
            (filename) => [ filename, `./project/music/${ filename }` ])
        );
    }
    loadFonts(list: string[]) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = list.map((font) => 
            /* CSS */`@font-face { font-family: ${ font }; src: url("project/fonts/${ font }.ttf") format("truetype"); }`
        ).join();
        document.body.appendChild(style);
    }
    loadImages(list: string[]) {
        this.addTaskFromList("images", list, "blob", async (filename, data) => {
            core.material.images.images[filename] = await createImageFromBlob(data);
        });
    }
    async loadMaterials(list: string[]) {
        await this.addTaskFromList("materials", list, "blob", async (filename, data) => {
            core.material.images[filename as typeof MATERIALS[number]] = await createImageFromBlob(data);
        }, {
            suffix: ".png"
        });
    }

    loadSEs(list: string[]) {
        this.addTaskFromList("sounds", list, "blob", (filename, data) => {
            sePlayer.load(filename, data);
        });
    }

    loadTilesets(list: string[]) {
        this.addTaskFromList("tilesets", list, "blob", async (filename, data) => {
            const image = await createImageFromBlob(data);
            if (image.width % 32 !== 0 || image.height % 32 !== 0) {
                console.warn(`[loader.tilesetTask] ${ filename }(${ image.width } * ${ image.height })的宽或高不是32的倍数！`);
            }
            if (image.width * image.height > 32 * 32 * 3000) {
                console.warn(`[loader.tilesetTask] ${ filename }上的图块素材个数大于3000！`);
            }
            core.material.images.tilesets[filename] = image;
        });
    }
}
