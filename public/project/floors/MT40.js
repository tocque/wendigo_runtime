main.floors.MT40=
{
    "floorId": "MT40",
    "title": "移动城市外围",
    "name": "PRTS",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "ratio": 3,
    "defaultGround": "X20000",
    "bgm": "bg.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,8": {
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
                    "condition": "core.hasEnemyLeft(undefined,[\"MT35\",\"MT36\",\"MT37\",\"MT38\",\"MT39\"]);",
                    "true": [
                        "同步率未达到100%，仍有敌人未清除"
                    ],
                    "false": [
                        "同步率已达到100%，继续前进吧",
                        "\t[塔露拉]\f[tll.png,0,0]前面似乎埋伏的有敌人，我最好提前放置源石冰晶之类的东西，以防万一。",
                        {
                            "type": "if",
                            "condition": "(flag:h<=2)",
                            "true": [
                                "\t[塔露拉]\f[tll.png,0,0]哦？是信号。",
                                "\t[塔露拉]\f[tll.png,0,0]——看来雪怪小队已经提前放置了，干得漂亮。",
                                {
                                    "type": "setBlock",
                                    "number": "E388",
                                    "loc": [
                                        [
                                            6,
                                            5
                                        ]
                                    ],
                                    "time": 0
                                }
                            ],
                            "false": [
                                {
                                    "type": "if",
                                    "condition": "(item:I393>=1)",
                                    "true": [
                                        "\t[塔露拉]\f[tll.png,0,0]——嘿！",
                                        {
                                            "type": "setValue",
                                            "name": "item:I393",
                                            "operator": "-=",
                                            "value": "1"
                                        },
                                        {
                                            "type": "setBlock",
                                            "number": "E388",
                                            "loc": [
                                                [
                                                    6,
                                                    5
                                                ]
                                            ],
                                            "time": 0
                                        },
                                        "\t[塔露拉]\f[tll.png,0,0]放置好了。"
                                    ],
                                    "false": [
                                        "\t[塔露拉]\f[tll.png,0,0].....！该死",
                                        "\t[塔露拉]\f[tll.png,0,0]源石冰晶用完了......",
                                        "\t[塔露拉]\f[tll.png,0,0]只能硬着头皮上了。"
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "hide",
                            "remove": true
                        }
                    ]
                }
            ]
        },
        "6,7": [
            {
                "type": "playBgm",
                "name": "buan.mp3",
                "keep": true
            },
            "\t[赤红盾卫]\f[shibing.png,-120,0]到此为止了，感染者",
            "\t[塔露拉]\f[tllf.png,100,0]哦？你觉得你为什么可以阻止我？",
            "\t[赤红盾卫]\f[shibing.png,-120,0]（举起盾牌）执行任务，清除感染者。",
            "\t[塔露拉]\f[tllf.png,100,0]正合我意，来吧！",
            {
                "type": "if",
                "condition": "(core.getBlockId(6,5) !=  null)",
                "true": [
                    "\t[赤红盾卫]\f[shibing.png,-120,0]Scheisse！我的速度怎么......变慢了！？",
                    "\t[赤红盾卫]\f[shibing.png,-120,0]——卑鄙的感染者！",
                    "\t[塔露拉]\f[tllf.png,100,0]对敌人没有卑鄙不卑鄙的说法。",
                    {
                        "type": "battle",
                        "loc": [
                            6,
                            6
                        ]
                    }
                ],
                "false": [
                    "\t[赤红盾卫]\f[shibing.png,-120,0]我等乌萨斯军人镇守乌萨斯疆域数百年，你一个感染者又岂能打倒我们！",
                    {
                        "type": "battle",
                        "loc": [
                            6,
                            6
                        ]
                    },
                    "啥？你竟然不用冰晶打死了？",
                    "那....你是真的勇，如果你没有开挂的话。",
                    {
                        "type": "lose",
                        "reason": "开挂是吧"
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "6,12": {
            "floorId": "MT39",
            "loc": [
                6,
                0
            ]
        }
    },
    "beforeBattle": {},
    "afterBattle": {
        "6,6": [
            {
                "type": "setValue",
                "name": "flag:door_MT40_6_3",
                "operator": "+=",
                "value": "1"
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "6,3": {
            "0": {
                "condition": "flag:door_MT40_6_3==1",
                "currentFloor": true,
                "priority": 0,
                "delayExecute": false,
                "multiExecute": false,
                "data": [
                    {
                        "type": "openDoor"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:door_MT40_6_3",
                        "value": "null"
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                6,
                                5
                            ]
                        ],
                        "remove": true
                    },
                    {
                        "type": "setBlock",
                        "number": "redGateKeeper",
                        "loc": [
                            [
                                6,
                                6
                            ]
                        ]
                    },
                    {
                        "type": "move",
                        "loc": [
                            6,
                            6
                        ],
                        "time": 500,
                        "keep": true,
                        "steps": [
                            "up:1"
                        ]
                    },
                    "\t[赤红盾卫]\f[shibing.png,0,0]咳咳！",
                    "\t[赤红盾卫]\f[shibing.png,0,0]想不到这次遇到的感染者这么强——不过，还在可控范围内。",
                    "\t[塔露拉]\f[tllf.png,0,0]虚张声势罢了，你的包围圈早就被我......",
                    {
                        "type": "setBlock",
                        "number": "redGateKeeper",
                        "loc": [
                            [
                                4,
                                4
                            ]
                        ],
                        "time": 500,
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "redGateKeeper",
                        "loc": [
                            [
                                8,
                                4
                            ]
                        ],
                        "time": 500,
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "blueGateKeeper",
                        "loc": [
                            [
                                5,
                                4
                            ]
                        ],
                        "time": 500,
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "blueGateKeeper",
                        "loc": [
                            [
                                7,
                                4
                            ]
                        ],
                        "time": 500
                    },
                    "\t[赤红盾卫]你们很强，这也确实是最后一层包围圈。",
                    "\t[赤红盾卫]\\c[25]但是，在皇帝的荣光下，所有乌萨斯的敌人都是渣滓！",
                    "\t[塔露拉]\f[tllf.png,0,0]\\c[25]！",
                    {
                        "type": "setBlock",
                        "number": "N",
                        "loc": [
                            [
                                6,
                                1
                            ]
                        ],
                        "time": 0
                    },
                    "\t[塔露拉]\f[tllf.png,0,0]雪怪小队，你们先撤——",
                    {
                        "type": "pauseBgm"
                    },
                    {
                        "type": "move",
                        "loc": [
                            6,
                            1
                        ],
                        "time": 500,
                        "keep": true,
                        "async": true,
                        "steps": [
                            "down:3"
                        ]
                    },
                    {
                        "type": "sleep",
                        "time": 1000
                    },
                    {
                        "type": "animate",
                        "name": "xr",
                        "loc": [
                            7,
                            4
                        ],
                        "async": true
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                7,
                                4
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T413",
                        "loc": [
                            [
                                8,
                                4
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "animate",
                        "name": "xr",
                        "loc": [
                            5,
                            4
                        ],
                        "async": true
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                4,
                                4
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T413",
                        "loc": [
                            [
                                5,
                                4
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "animate",
                        "name": "js",
                        "loc": [
                            6,
                            5
                        ]
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                6,
                                5
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "waitAsync"
                    },
                    {
                        "type": "move",
                        "loc": [
                            6,
                            4
                        ],
                        "time": 1000,
                        "keep": true,
                        "steps": [
                            "down:1"
                        ]
                    },
                    "\t[博卓卡斯替]\f[fl.png,100,0]这是他们为了围捕你刻意设下的包围，你却没有看破。",
                    "\t[塔露拉]\f[tllx.png,-100,0]因为我算准了您会来帮我。",
                    "\t[博卓卡斯替]\f[fl.png,100,0]好好说说具体的事吧。",
                    "\t[塔露拉]\f[tllx.png,-100,0]......",
                    {
                        "type": "showImage",
                        "code": 1,
                        "image": "dark.png",
                        "loc": [
                            0,
                            0
                        ],
                        "opacity": 1,
                        "time": 1000
                    },
                    {
                        "type": "showImage",
                        "code": 2,
                        "image": "snow.png",
                        "loc": [
                            0,
                            0
                        ],
                        "opacity": 1,
                        "time": 1000
                    },
                    {
                        "type": "playBgm",
                        "name": "kuchu.mp3",
                        "keep": true
                    },
                    "\t[博卓卡斯替]\f[fl.png,0,0]你把城市，拱手让人？",
                    "\t[博卓卡斯替]\f[fl.png,0,0]他们的行为可以称作是背叛。你的准许令他们得到正当理由。你毁坏了纪律的执行。",
                    "\t[塔露拉]\f[tllb.png,0,0]从他们要求要走的那一刻开始，我们就留不住他们。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]没有信念之人，无毅力之人，从头至尾，不应战斗。",
                    "\t[塔露拉]\f[tllf.png,0,0]按照这个标准，没有人在最初就有参加战斗的资格。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]纪律胜过铁。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]杀死他们，夺回城市。这是你应为你的队伍和你的同胞做的。",
                    "\t[塔露拉]\f[tllf.png,0,0]让他们知道感染者为了一座破败的城市，可以杀掉一群走投无路的人，可以用同胞的血去润滑它的齿轮？",
                    "\t[博卓卡斯替]\f[fl.png,0,0]你可以号召其他感染者，宣称他们背叛了感染者的事业，他们的行径会被公之于众，他们会被很快的处死。",
                    "\t[塔露拉]\f[tllb.png,0,0]我......我不能。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]你犹豫了，你觉得处死一个感染者是不荣誉的。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]记住，塔露拉，你可能并不热爱谋杀，也并不执着权力，这自然好，但是你需要人去做这件事。",
                    "\t[塔露拉]\f[tllf.png,0,0]先生，我敢这样做，而且我也并不自封比他人道德。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]那么，如果你还不愿意的话，我和游击队去办。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]我自然也并不是什么纯粹而崇高的人，这种人在战争发生时，会是第一个死去的。",
                    "\t[塔露拉]\f[tllb.png,0,0]——这座城市缺乏维护，最多只有三年的寿命。",
                    "\t[塔露拉]\f[tllb.png,0,0]你我都知道，他们的最终命运依然是在冰原上停步，他们依然要自己找到出路。即使只有这三年时间，他们依然为自己点燃了一个希望。",
                    "\t[塔露拉]\f[tllb.png,0,0]我不想掐灭这个希望。",
                    "\t[塔露拉]\f[tllb.png,0,0]更何况，他们本来就不属于我的部队，让他们走，是最合适的方法。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]你的确是算得上一个正直的人。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]城市附近驻扎着一支更加训练有素的商道守军。不幸必然会发生。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]是他们让你们陷入苦战。",
                    "\t[塔露拉]\f[tllb.png,0,0]没错，从移动城市里发出了讯息，投给了这个区域里的乌萨斯驻军，把我们的位置暴露给了他们......",
                    "\t[塔露拉]\f[tllb.png,0,0]......他们在利用我们去引开乌萨斯军。",
                    {
                        "type": "setCurtain",
                        "color": [
                            12,
                            11,
                            11,
                            1
                        ],
                        "time": 500,
                        "keep": true
                    },
                    "\t[塔露拉]他们为了自己而牺牲我们，但我不会去牺牲别人。",
                    "\t[博卓卡斯替]那么，你有准备好因此而继续受苦吗。",
                    "\t[塔露拉]我没有准备。因为我们必定受苦，而且——",
                    "\t[塔露拉]我相信自私和残忍不会是乌萨斯人的天性。",
                    {
                        "type": "setValue",
                        "name": "item:I393",
                        "value": "0"
                    },
                    {
                        "type": "changeFloor",
                        "floorId": "MT41",
                        "loc": [
                            6,
                            6
                        ],
                        "time": 0
                    }
                ]
            },
            "1": null
        }
    },
    "cannotMove": {},
    "cannotMoveIn": {},
    "map": [
    [90182,90183,90182,90183,90167,90204,  0,  0,90200,90194,90195,90194,90195],
    [90190,90191,90190,90191,90175,  0,  0,90205,90208,90202,90203,90202,90203],
    [90182,90183,90182,90183,90167,  0,  0,  0,90200,90194,90195,90194,90195],
    [90190,90191,90190,90191,90175,90162, 85,90163,90208,90202,90203,90202,90203],
    [90174,90175,90174,90175,  0,  0,  0,  0,  0,90208,90209,90208,90209],
    [90164,  0,90204,90179,90166,90167,  0,90200,90201,  0,90181,90204,  0],
    [  0,90171,  0,90205,90174,90175,223,90208,90209,  0,90189,  0,90162],
    [90198,90199,90171,  0,90204,  0,  0,  0,  0,90205,  0,90180,  0],
    [90200,90201,90200,90201,90205,90180,168,90179,90204,90166,90167,90166,90167],
    [90194,90195,90194,90209, 33, 81,232, 81, 33,90174,90183,90182,90183],
    [90202,90203,90202,90201, 32,90179,  0,90180, 32,90166,90191,90190,90191],
    [90194,90195,90194,90195,90201,90164,  0,90165,90166,90182,90183,90182,90183],
    [90202,90203,90202,90203,90209,90163, 93,90162,90174,90190,90191,90190,90191]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,20011,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,20016,  0,  0,  0,  0,  0,  0,20016,  0,  0,  0],
    [  0,  0,  0,  0,  0,20017,  0,  0,  0,  0,  0,  0,20016],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,20016,  0,  0,  0,  0],
    [  0,  0,  0,  0,20017,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,20011,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "fgmap": [

],
    "weather": [
        "snow",
        6
    ]
}