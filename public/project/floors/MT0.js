main.floors.MT0=
{
    "floorId": "MT0",
    "title": "PRTS内部",
    "name": "0",
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "defaultGround": "grass",
    "images": null,
    "ratio": 1,
    "map": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "firstArrive": [
        {
            "type": "setText",
            "align": "left",
            "title": [
                255,
                255,
                255,
                1
            ],
            "background": "Black.png",
            "textfont": 15
        },
        {
            "type": "playBgm",
            "name": "jm.mp3",
            "keep": true
        },
        {
            "type": "playSound",
            "name": "prts.wav"
        },
        "\t[prts.png]博士你好",
        {
            "type": "playSound",
            "name": "prts.wav"
        },
        "\t[prts.png]虽然不是初次见面，但请允许我进行自我介绍",
        {
            "type": "playSound",
            "name": "prts.wav"
        },
        "\t[prts.png]我是系统“PRTS”",
        {
            "type": "playSound",
            "name": "prts.wav"
        },
        "\t[prts.png]本次由我负责指导博士的记忆读取",
        {
            "type": "playSound",
            "name": "prts.wav"
        },
        "\t[prts.png]但是，离上一次记忆读取已经有一段时间",
        {
            "type": "playSound",
            "name": "prts.wav"
        },
        "\t[prts.png]是否允许我指导博士一些基本的东西呢？",
        {
            "type": "setValue",
            "name": "flag:hero",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "flag:gr",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "flag:s1",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "flag:s2",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "flag:t1",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "flag:t2",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "flag:b1",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "flag:b2",
            "value": "0"
        },
        {
            "type": "hideImage",
            "code": 100,
            "time": 0
        },
        {
            "type": "choices",
            "text": "那么...",
            "choices": [
                {
                    "text": "是（进入新手教程及机制讲解）",
                    "action": [
                        {
                            "type": "playSound",
                            "name": "bottom.wav"
                        },
                        {
                            "type": "playSound",
                            "name": "prts.wav"
                        },
                        "\t[prts.png]那么就开始吧",
                        {
                            "type": "setGlobalAttribute",
                            "name": "statusLeftBackground",
                            "value": "url(project/materials/kt.png) repeat"
                        },
                        {
                            "type": "playSound",
                            "name": "prts.wav"
                        },
                        "\t[prts.png]为了具体介绍，我将创造一个临时虚拟空间",
                        {
                            "type": "showStatusBar"
                        },
                        {
                            "type": "changeFloor",
                            "floorId": "MT1",
                            "loc": [
                                1,
                                11
                            ],
                            "time": 0
                        }
                    ]
                },
                {
                    "text": "否（仅进入机制讲解）",
                    "action": [
                        {
                            "type": "playSound",
                            "name": "bottom.wav"
                        },
                        {
                            "type": "setGlobalAttribute",
                            "name": "statusLeftBackground",
                            "value": "url(project/materials/kt.png) repeat"
                        },
                        {
                            "type": "showStatusBar"
                        },
                        {
                            "type": "playSound",
                            "name": "prts.wav"
                        },
                        "\t[prts.png]为了具体介绍，我将创造一个临时虚拟空间",
                        {
                            "type": "changeFloor",
                            "floorId": "MT2",
                            "loc": [
                                6,
                                11
                            ],
                            "time": 0
                        }
                    ]
                }
            ]
        }
    ],
    "parallelDo": "",
    "events": {},
    "changeFloor": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "bgmap": [
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311],
    [311,311,311,311,311,311,311,311,311,311,311,311,311]
],
    "fgmap": [

],
    "width": 13,
    "height": 13,
    "autoEvent": {},
    "bgm": "jm.mp3"
}