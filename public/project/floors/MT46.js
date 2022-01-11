main.floors.MT46=
{
    "floorId": "MT46",
    "title": "西北冻原",
    "name": "PRTS",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "ratio": 4,
    "defaultGround": "X20000",
    "bgm": "bg.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,0": {
            "trigger": null,
            "enable": true,
            "noPass": true,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                "PRTS正在检测同步率",
                {
                    "type": "if",
                    "condition": "core.hasEnemyLeft(undefined,[\"MT42\",\"MT43\",\"MT44\",\"MT45\",\"MT46\"]);",
                    "true": [
                        "同步率未达到100%，仍有敌人未清除"
                    ],
                    "false": [
                        "同步率已达到100%，继续前进吧",
                        {
                            "type": "hide",
                            "remove": true
                        }
                    ]
                },
                "\t[塔露拉]\f[tll.png,0,0]这应该就是最后一批敌人了。",
                {
                    "type": "showImage",
                    "code": 1,
                    "image": "dark.png",
                    "loc": [
                        0,
                        0
                    ],
                    "opacity": 1,
                    "time": 500
                },
                "\t[塔露拉]\f[tll.png,0,0]——",
                "\t[塔露拉]\f[tll.png,0,0]看来那边也结束了。",
                "\t[塔露拉]\f[tll.png,0,0]回程，整顿队伍。",
                {
                    "type": "showImage",
                    "code": 2,
                    "image": "dark.png",
                    "loc": [
                        0,
                        0
                    ],
                    "opacity": 1000,
                    "time": 500
                },
                {
                    "type": "showImage",
                    "code": 2,
                    "image": "morningconutry.png",
                    "loc": [
                        -100,
                        0
                    ],
                    "opacity": 1,
                    "time": 1000
                },
                "\t[感染者战士]\f[grzzs.png,0,0]你们竟然连援军也一并打垮了？不愧是塔露拉！",
                {
                    "type": "showImage",
                    "code": 3,
                    "image": "grzzsa.png",
                    "loc": [
                        -100,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                {
                    "type": "showImage",
                    "code": 4,
                    "image": "tlla.png",
                    "loc": [
                        100,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                "\t[塔露拉]\f[tll.png,100,0]感染者同胞呢？",
                "\t[感染者战士]\f[grzzs.png,-100,0]已经都安顿好了。我们找的那个备用据点有用了。",
                "\t[塔露拉]\f[tll.png,100,0]清点过人数没有？",
                {
                    "type": "hideImage",
                    "code": 3,
                    "time": 0
                },
                {
                    "type": "hideImage",
                    "code": 4,
                    "time": 0
                },
                {
                    "type": "pauseBgm"
                },
                "\t[感染者战士]\f[grzzs.png,0,0]清点过了，有几个孩子哭着说姐姐没回来之类的......",
                "\t[感染者战士]\f[grzzs.png,0,0]不过这种事甚至有些常见了，唉......",
                "\t[塔露拉]\f[tlls.png,-90,0]......",
                {
                    "type": "playSound",
                    "name": "run.wav"
                },
                {
                    "type": "sleep",
                    "time": 2000
                },
                "\t[盾卫]\f[shibing.png,0,0]塔露拉，残存的纠察队往东边去了，看来是一直在逃。",
                "\t[塔露拉]\f[tlln.png,0,0]\r[red]\\c[20]逃到哪里去了？？？",
                "\t[盾卫]\f[shibing.png,0,0]东边，和我们赶走的那些人是一个方向，不知道他们会不会找——",
                {
                    "type": "playSound",
                    "name": "run.wav",
                    "pitch": 120
                },
                {
                    "type": "sleep",
                    "time": 2000
                },
                "\t[盾卫]\f[shibing.png,0,0]——塔露拉？",
                "\t[感染者战士]\f[grzzs.png,0,0]等等，塔露拉，你要去哪？",
                {
                    "type": "hideImage",
                    "code": 2,
                    "time": 0
                },
                {
                    "type": "playSound",
                    "name": "run.wav",
                    "pitch": 120
                },
                {
                    "type": "sleep",
                    "time": 2000
                },
                {
                    "type": "showImage",
                    "code": 1,
                    "image": "dark.png",
                    "loc": [
                        0,
                        0
                    ],
                    "opacity": 0.7,
                    "time": 0
                },
                {
                    "type": "changeFloor",
                    "floorId": "MT47",
                    "loc": [
                        6,
                        12
                    ]
                }
            ]
        }
    },
    "changeFloor": {
        "6,12": {
            "floorId": "MT45",
            "loc": [
                6,
                0
            ]
        }
    },
    "beforeBattle": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "cannotMoveIn": {},
    "map": [
    [141,141,141,141,141,141,168,141,141,141,141,141,141],
    [141,141,141,141,141, 27,  0, 29,141,141,141,141,141],
    [141,141,141,141,141,141,241, 82,141,141,141,141,141],
    [141,141,141,141,141, 29,  0, 28,141,141,141,141,141],
    [141,141,141,141,141, 82,280,141,141,141,141,141,141],
    [141,141,141,141,141, 34,  0, 29,141,141,141,141,141],
    [141,141,141,141,141,141,253, 81,141,141,141,141,141],
    [141,141,141,141,141, 29,  0, 32,141,141,141,141,141],
    [141,141,141,141,141, 81,272,141,141,141,141,141,141],
    [141,141,141,141,141, 30,  0, 29,141,141,141,141,141],
    [141,141,141,141,141,141,254, 81,141,141,141,141,141],
    [141,141,141,141,141, 29,  0, 30,141,141,141,141,141],
    [141,141,141,141,141,141, 93,141,141,141,141,141,141]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,30004,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,30004,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,30005,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "fgmap": [

],
    "weather": [
        "snow",
        1
    ]
}