main.floors.MT25=
{
    "floorId": "MT25",
    "title": "西北冻原",
    "name": "西北冻原",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "ratio": 2,
    "defaultGround": "X70000",
    "bgm": "bg.mp3",
    "firstArrive": [
        {
            "type": "playSound",
            "name": "e_aoe_frostnovaice_h2.wav"
        },
        "\t[塔露拉]\f[tllf.png,-100,0]甚至加大了影响的范围，有意思......",
        "\t[塔露拉]\f[tllf.png,-100,0]那么，就开始吧。",
        "击破四个敌对的“寒霜冰晶”！",
        "tips：进入冰晶领域时会受到1000点法术伤害，而每击破一个冰晶则会获得50点源石技艺和2000点生命值的奖励。",
        "ps：本类对战楼层并非需要清空所有敌人！",
        {
            "type": "setValue",
            "name": "flag:bgm",
            "value": "3"
        },
        {
            "type": "setValue",
            "name": "flag:ice",
            "value": "0"
        },
        {
            "type": "if",
            "condition": "(flag:h<=2)",
            "true": [
                {
                    "type": "setValue",
                    "name": "status:mana",
                    "operator": "+=",
                    "value": "100"
                },
                {
                    "type": "setValue",
                    "name": "status:hp",
                    "operator": "+=",
                    "value": "5000"
                }
            ]
        },
        {
            "type": "if",
            "condition": "(flag:h<=1)",
            "true": [
                {
                    "type": "setValue",
                    "name": "status:mana",
                    "operator": "+=",
                    "value": "100",
                    "norefresh": true
                },
                {
                    "type": "setValue",
                    "name": "status:hp",
                    "operator": "+=",
                    "value": "10000"
                }
            ]
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,7": [
            {
                "type": "if",
                "condition": "(flag:ice===1)",
                "true": [
                    "现在会对源石技艺值进行一个清的除，溢出的源石技艺值作为通关分数加成之一。",
                    "约为1：500",
                    "\t[塔露拉]\f[tll.png,-100,0]呼......",
                    "\t[塔露拉]\f[tll.png,-100,0]在击破四个冰晶后，她的源石冰晶屏障似乎削弱了一点。",
                    "\t[塔露拉]\f[tll.png,-100,0]那么，就让我的火焰来进行最后的步骤吧。",
                    {
                        "type": "setValue",
                        "name": "flag:point",
                        "value": "(status:mana-100)"
                    },
                    {
                        "type": "choices",
                        "text": "\t[塔露拉]我大约需要100点及以上的源石技艺值就可以了......",
                        "choices": [
                            {
                                "text": "融化（需要100点源石技艺值）",
                                "color": [
                                    252,
                                    18,
                                    18,
                                    1
                                ],
                                "action": [
                                    {
                                        "type": "playSound",
                                        "name": "bottom.wav"
                                    },
                                    {
                                        "type": "if",
                                        "condition": "(status:mana>=100)",
                                        "true": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "playSound",
                                                "name": "Fire1.ogg"
                                            },
                                            {
                                                "type": "animate",
                                                "name": "fire",
                                                "loc": "hero"
                                            },
                                            {
                                                "type": "setValue",
                                                "name": "status:mana",
                                                "value": "0"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]呼...呼...看来消耗了所有的源石技艺......",
                                            {
                                                "type": "function",
                                                "function": "function(){\ncore.setFlag('skill', 0)\n}"
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        7,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        6,
                                                        7
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        5,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
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
                                            }
                                        ],
                                        "false": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "animate",
                                                "name": "ice",
                                                "loc": "hero"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]可恶，看来我的源石技艺......还不够",
                                            {
                                                "type": "lose",
                                                "reason": "蓝零亡"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "5,6": [
            {
                "type": "if",
                "condition": "(flag:ice===1)",
                "true": [
                    "现在会对源石技艺值进行一个清的除，会以当前的源石技艺值作为通关分数加成之一。",
                    "约为1：1000",
                    "\t[塔露拉]\f[tll.png,-100,0]呼......",
                    "\t[塔露拉]\f[tll.png,-100,0]在击破四个冰晶后，她的源石冰晶屏障似乎削弱了一点。",
                    "\t[塔露拉]\f[tll.png,-100,0]那么，就让我的火焰来进行最后的步骤吧。",
                    {
                        "type": "setValue",
                        "name": "flag:point",
                        "value": "status:mana"
                    },
                    {
                        "type": "choices",
                        "text": "\t[塔露拉]我大约需要100点及以上的源石技艺值就可以了......",
                        "choices": [
                            {
                                "text": "融化（需要100点源石技艺值）",
                                "color": [
                                    252,
                                    18,
                                    18,
                                    1
                                ],
                                "action": [
                                    {
                                        "type": "playSound",
                                        "name": "bottom.wav"
                                    },
                                    {
                                        "type": "if",
                                        "condition": "(status:mana>=100)",
                                        "true": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "playSound",
                                                "name": "Fire1.ogg"
                                            },
                                            {
                                                "type": "animate",
                                                "name": "fire",
                                                "loc": "hero"
                                            },
                                            {
                                                "type": "setValue",
                                                "name": "status:mana",
                                                "value": "0"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]呼...呼...看来消耗了所有的源石技艺......",
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        7,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        6,
                                                        7
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        5,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
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
                                            }
                                        ],
                                        "false": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "animate",
                                                "name": "ice",
                                                "loc": "hero"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]可恶，看来我的源石技艺......还不够",
                                            {
                                                "type": "lose",
                                                "reason": "蓝零亡"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "6,5": [
            {
                "type": "if",
                "condition": "(flag:ice===1)",
                "true": [
                    "现在会对源石技艺值进行一个清的除，会以当前的源石技艺值作为通关分数加成之一。",
                    "约为1：1000",
                    "\t[塔露拉]\f[tll.png,-100,0]呼......",
                    "\t[塔露拉]\f[tll.png,-100,0]在击破四个冰晶后，她的源石冰晶屏障似乎削弱了一点。",
                    "\t[塔露拉]\f[tll.png,-100,0]那么，就让我的火焰来进行最后的步骤吧。",
                    {
                        "type": "setValue",
                        "name": "flag:point",
                        "value": "status:mana"
                    },
                    {
                        "type": "choices",
                        "text": "\t[塔露拉]我大约需要100点及以上的源石技艺值就可以了......",
                        "choices": [
                            {
                                "text": "融化（需要100点源石技艺值）",
                                "color": [
                                    252,
                                    18,
                                    18,
                                    1
                                ],
                                "action": [
                                    {
                                        "type": "playSound",
                                        "name": "bottom.wav"
                                    },
                                    {
                                        "type": "if",
                                        "condition": "(status:mana>=100)",
                                        "true": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "playSound",
                                                "name": "Fire1.ogg"
                                            },
                                            {
                                                "type": "animate",
                                                "name": "fire",
                                                "loc": "hero"
                                            },
                                            {
                                                "type": "setValue",
                                                "name": "status:mana",
                                                "value": "0"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]呼...呼...看来消耗了所有的源石技艺......",
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        7,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        6,
                                                        7
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        5,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
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
                                            }
                                        ],
                                        "false": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "animate",
                                                "name": "ice",
                                                "loc": "hero"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]可恶，看来我的源石技艺......还不够",
                                            {
                                                "type": "lose",
                                                "reason": "蓝零亡"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "7,6": [
            {
                "type": "if",
                "condition": "(flag:ice===1)",
                "true": [
                    "现在会对源石技艺值进行一个清的除，会以当前的源石技艺值作为通关分数加成之一。",
                    "约为1：1000",
                    "\t[塔露拉]\f[tll.png,-100,0]呼......",
                    "\t[塔露拉]\f[tll.png,-100,0]在击破四个冰晶后，她的源石冰晶屏障似乎削弱了一点。",
                    "\t[塔露拉]\f[tll.png,-100,0]那么，就让我的火焰来进行最后的步骤吧。",
                    {
                        "type": "setValue",
                        "name": "flag:point",
                        "value": "status:mana"
                    },
                    {
                        "type": "choices",
                        "text": "\t[塔露拉]我大约需要100点及以上的源石技艺值就可以了......",
                        "choices": [
                            {
                                "text": "融化（需要100点源石技艺值）",
                                "color": [
                                    252,
                                    18,
                                    18,
                                    1
                                ],
                                "action": [
                                    {
                                        "type": "playSound",
                                        "name": "bottom.wav"
                                    },
                                    {
                                        "type": "if",
                                        "condition": "(status:mana>=100)",
                                        "true": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "playSound",
                                                "name": "Fire1.ogg"
                                            },
                                            {
                                                "type": "animate",
                                                "name": "fire",
                                                "loc": "hero"
                                            },
                                            {
                                                "type": "setValue",
                                                "name": "status:mana",
                                                "value": "0"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]呼...呼...看来消耗了所有的源石技艺......",
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        7,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        6,
                                                        7
                                                    ]
                                                ],
                                                "remove": true
                                            },
                                            {
                                                "type": "hide",
                                                "loc": [
                                                    [
                                                        5,
                                                        6
                                                    ]
                                                ],
                                                "remove": true
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
                                            }
                                        ],
                                        "false": [
                                            "\t[塔露拉]\f[tll.png,-100,0]......！",
                                            {
                                                "type": "animate",
                                                "name": "ice",
                                                "loc": "hero"
                                            },
                                            "\t[塔露拉]\f[tll.png,-100,0]可恶，看来我的源石技艺......还不够",
                                            {
                                                "type": "lose",
                                                "reason": "蓝零亡"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "6,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
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
                {
                    "type": "setText",
                    "position": "down",
                    "offset": 0,
                    "align": "left",
                    "text": [
                        255,
                        255,
                        255,
                        1
                    ],
                    "background": "Black.png",
                    "time": 20
                },
                "\t[霜星]\f[sx.png,100,0]嘁！",
                "\t[塔露拉]\f[tll.png,-100,0]来吧，白兔子",
                "\t[霜星]\f[sx.png,100,0]你的源石技艺已经在融化我的冰晶时全部消耗掉了，你还能，呼，打败我吗？",
                "\t[塔露拉]\f[tll.png,-100,0]你维持冰晶的时候也消耗了巨大的体力吧，我们俩，半斤八两。",
                "\t[塔露拉]\f[tll.png,-100,0]那么，来吧！",
                {
                    "type": "showImage",
                    "code": 1,
                    "image": "dark.png",
                    "loc": [
                        0,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                "\t[塔露拉&霜星]现在，我可以和你互相帮助了吗！/不自量力的家伙！",
                {
                    "type": "battle",
                    "id": "E390"
                },
                {
                    "type": "pauseBgm"
                },
                {
                    "type": "showImage",
                    "code": 1,
                    "image": "dark.png",
                    "loc": [
                        0,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                {
                    "type": "if",
                    "condition": "(flag:t2===1)",
                    "true": [
                        {
                            "type": "showImage",
                            "code": 2,
                            "image": "ts1.png",
                            "loc": [
                                0,
                                150
                            ],
                            "opacity": 1,
                            "time": 0
                        },
                        "......",
                        {
                            "type": "playSound",
                            "name": "levelup.wav"
                        },
                        {
                            "type": "showImage",
                            "code": 2,
                            "image": "ts11.png",
                            "loc": [
                                0,
                                150
                            ],
                            "opacity": 1,
                            "time": 0
                        },
                        {
                            "type": "setValue",
                            "name": "flag:t1",
                            "value": "1"
                        },
                        "火焰终究融化了冰霜"
                    ],
                    "false": [
                        {
                            "type": "showImage",
                            "code": 2,
                            "image": "ts2.png",
                            "loc": [
                                0,
                                150
                            ],
                            "opacity": 1,
                            "time": 0
                        },
                        "......",
                        {
                            "type": "playSound",
                            "name": "levelup.wav"
                        },
                        {
                            "type": "showImage",
                            "code": 2,
                            "image": "ts21.png",
                            "loc": [
                                0,
                                150
                            ],
                            "opacity": 1,
                            "time": 0
                        },
                        {
                            "type": "setValue",
                            "name": "flag:t2",
                            "value": "1"
                        },
                        "火焰终究融化了冰霜"
                    ]
                },
                {
                    "type": "hideImage",
                    "code": 2,
                    "time": 0
                },
                {
                    "type": "changeFloor",
                    "floorId": "MT16",
                    "loc": [
                        6,
                        6
                    ],
                    "time": 1000
                }
            ]
        }
    },
    "changeFloor": {},
    "afterBattle": {
        "3,5": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_2_6",
                "operator": "+=",
                "value": "1"
            }
        ],
        "3,7": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_2_6",
                "operator": "+=",
                "value": "1"
            }
        ],
        "9,5": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_10_6",
                "operator": "+=",
                "value": "1"
            }
        ],
        "9,7": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_10_6",
                "operator": "+=",
                "value": "1"
            }
        ],
        "2,2": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_6_7",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "setValue",
                "name": "status:mana",
                "operator": "+=",
                "value": "50"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "2000"
            },
            {
                "type": "animate",
                "name": "ice",
                "loc": "hero"
            },
            {
                "type": "function",
                "function": "function(){\nfor(var x=(core.status.event.data.x-3) ; x<=(core.status.event.data.x+3) ; ++x) {   for(var y=(core.status.event.data.y-3) ; y<=(core.status.event.data.y+3) ; ++y){     if (x<0 || x>12)continue;     if (y<0 || y>12)continue;     core.hideBgFgMap('bg' ,[x,y]);   } }\n}"
            }
        ],
        "10,2": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_6_7",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "setValue",
                "name": "status:mana",
                "operator": "+=",
                "value": "50"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "2000"
            },
            {
                "type": "animate",
                "name": "ice",
                "loc": "hero"
            },
            {
                "type": "function",
                "function": "function(){\nfor(var x=(core.status.event.data.x-3) ; x<=(core.status.event.data.x+3) ; ++x) {   for(var y=(core.status.event.data.y-3) ; y<=(core.status.event.data.y+3) ; ++y){     if (x<0 || x>12)continue;     if (y<0 || y>12)continue;     core.hideBgFgMap('bg' ,[x,y]);   } }\n}"
            }
        ],
        "2,10": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_6_7",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "setValue",
                "name": "status:mana",
                "operator": "+=",
                "value": "50"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "2000"
            },
            {
                "type": "animate",
                "name": "ice",
                "loc": "hero"
            },
            {
                "type": "function",
                "function": "function(){\nfor(var x=(core.status.event.data.x-3) ; x<=(core.status.event.data.x+3) ; ++x) {   for(var y=(core.status.event.data.y-3) ; y<=(core.status.event.data.y+3) ; ++y){     if (x<0 || x>12)continue;     if (y<0 || y>12)continue;     core.hideBgFgMap('bg' ,[x,y]);   } }\n}"
            }
        ],
        "10,10": [
            {
                "type": "setValue",
                "name": "flag:door_MT25_6_7",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "setValue",
                "name": "status:mana",
                "operator": "+=",
                "value": "50"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "2000"
            },
            {
                "type": "animate",
                "name": "ice",
                "loc": "hero"
            },
            {
                "type": "function",
                "function": "function(){\nfor(var x=(core.status.event.data.x-3) ; x<=(core.status.event.data.x+3) ; ++x) {   for(var y=(core.status.event.data.y-3) ; y<=(core.status.event.data.y+3) ; ++y){     if (x<0 || x>12)continue;     if (y<0 || y>12)continue;     core.hideBgFgMap('bg' ,[x,y]);   } }\n}"
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "6,7": {
            "0": {
                "condition": "flag:door_MT25_6_7==4",
                "currentFloor": true,
                "priority": 0,
                "delayExecute": false,
                "multiExecute": false,
                "data": [
                    {
                        "type": "setBlock",
                        "number": "X70006",
                        "loc": [
                            [
                                6,
                                7
                            ]
                        ],
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "X70006",
                        "loc": [
                            [
                                5,
                                6
                            ]
                        ],
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "X70006",
                        "loc": [
                            [
                                7,
                                6
                            ]
                        ],
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "X70006",
                        "loc": [
                            [
                                6,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "waitAsync"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:door_MT25_6_7",
                        "value": "null"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:ice",
                        "value": "1"
                    }
                ]
            },
            "1": null
        },
        "2,6": {
            "0": {
                "condition": "flag:door_MT25_2_6==2",
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
                        "name": "flag:door_MT25_2_6",
                        "operator": "=",
                        "value": "null"
                    }
                ]
            },
            "1": null
        },
        "10,6": {
            "0": {
                "condition": "flag:door_MT25_10_6==2",
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
                        "name": "flag:door_MT25_10_6",
                        "operator": "=",
                        "value": "null"
                    }
                ]
            },
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [ 33, 33, 81, 33,  0,  0, 33,  0,  0, 33,402,  0,  0],
    [70007,70007,70007,372,70007, 33,  0, 33,70007,70007,70007,70007,  0],
    [70007,  0,398,  0,70007,70007,402,70007,  0,  0,398,70007,  0],
    [70007, 33,70007,70007,70007, 34,  0, 34,402,70007, 29,  0,402],
    [70007,402,70007,70001,  0,  0, 33,372,70007,70007,70007,70007,70007],
    [  0, 33,70007,402,  0,  0,70014,  0,  0,402,70007, 28,  0],
    [ 27,  0, 85,  0, 33,70014,390,70014, 33,  0, 85,  0, 33],
    [  0, 33,70007,402,  0,  0,70014,  0,  0,402,70007, 28,  0],
    [70007,70007,70007,  0,70027,70028, 31,402,  0,70007, 32,  0, 32],
    [ 34,70007, 29,70007,70007,  0,  0,  0,  0,70007,70007,70007, 81],
    [ 32,70007,398,  0, 81,70007,372,70007,70007,70007,398,70007, 33],
    [ 33,70007,  0,70007,402, 33,  0, 33,  0,70007,  0,  0,  0],
    [ 81, 32,372,  0, 32,  0, 34,  0, 32,  0,402,70007, 33]
],
    "bgmap": [
    [  0,143,143,143,  0,  0,  0,  0,  0,143,143,143,  0],
    [143,143,143,143,143,  0,  0,  0,143,143,143,143,143],
    [143,143,143,143,143,143,  0,143,143,143,143,143,143],
    [143,143,143,143,143,  0,  0,  0,143,143,143,143,143],
    [  0,143,143,143,  0,  0,  0,  0,  0,143,143,143,  0],
    [  0,  0,143,  0,  0,  0,  0,  0,  0,  0,143,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,143,  0,  0,  0,  0,  0,  0,  0,143,  0,  0],
    [  0,143,143,143,  0,  0,  0,  0,  0,143,143,143,  0],
    [143,143,143,143,143,  0,  0,  0,143,143,143,143,143],
    [143,143,143,143,143,143,  0,143,143,143,143,143,143],
    [143,143,143,143,143,  0,  0,  0,143,143,143,143,143],
    [  0,143,143,143,  0,  0,  0,  0,  0,143,143,143,  0]
],
    "fgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,70019,70020,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "beforeBattle": {},
    "cannotMoveIn": {}
}