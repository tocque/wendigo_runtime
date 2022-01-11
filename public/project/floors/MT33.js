main.floors.MT33=
{
    "floorId": "MT33",
    "title": "西北冻原",
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
        "6,10": {
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
                    "condition": "core.hasEnemyLeft(undefined,[\"MT27\",\"MT28\",\"MT29\",\"MT30\",\"MT31\",\"MT32\"]);",
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
                }
            ]
        },
        "6,9": [
            "\t[塔露拉]\f[tll.png,100,0]你们的部队原来如此不堪一击，我还以为乌萨斯的正规军能有多少实力呢。",
            "\t[冻原部队分队长]\f[shibing.png,-100,0]感染者，现在投降，你还有生还的机会。",
            "\t[冻原部队分队长]\f[shibing.png,-100,0]你很强，你是我见过的感染者中数一数二的存在。",
            "\t[冻原部队分队长]\f[shibing.png,-100,0]但是，在乌萨斯帝国的荣光下，你们的实力如同蝼蚁一般。",
            "\t[塔露拉]\f[tll.png,100,0]那就让我看看吧，所谓“乌萨斯的荣光”到底有多强？",
            {
                "type": "playSound",
                "name": "door.wav"
            },
            {
                "type": "closeDoor",
                "id": "specialDoor",
                "loc": [
                    6,
                    10
                ]
            },
            "\t[冻原部队分队长]\f[shibing.png,-100,0]是吗？",
            {
                "type": "setEnemy",
                "id": "E350",
                "name": "atk",
                "value": "250"
            },
            {
                "type": "setEnemy",
                "id": "E350",
                "name": "def",
                "value": "200"
            },
            {
                "type": "setEnemy",
                "id": "E416",
                "name": "hp",
                "value": "4000"
            },
            {
                "type": "setEnemy",
                "id": "E416",
                "name": "atk",
                "value": "250"
            },
            {
                "type": "setEnemy",
                "id": "E416",
                "name": "def",
                "value": "180"
            },
            {
                "type": "setEnemy",
                "id": "E347",
                "name": "atk",
                "value": "120"
            },
            {
                "type": "setEnemy",
                "id": "E347",
                "name": "def",
                "value": "150"
            },
            "\t[塔露拉]\f[tllf.png,100,0]......！",
            "\t[塔露拉]\f[tllf.png,100,0]你们，在隐藏实力？但是为什么？",
            "\t[冻原部队分队长]\f[shibing.png,-100,0]感染者小队，亦或者说，整合运动？",
            "\t[冻原部队分队长]\f[shibing.png,-100,0]你们盘踞在乌萨斯的时间已久，我们奉命除掉你们。",
            "\t[冻原部队分队长]\f[shibing.png,-100,0]你们是乌萨斯的毒瘤，你们在玷污乌萨斯皇帝的荣光。",
            "\t[塔露拉]\f[tll.png,100,0]......切！",
            {
                "type": "setValue",
                "name": "item:poisonWine",
                "operator": "+=",
                "value": "1"
            },
            "\t[塔露拉]\f[tll.png,100,0]先抑制一下我的感染......看来要用全力了。",
            {
                "type": "useItem",
                "id": "poisonWine"
            },
            {
                "type": "hide",
                "loc": [
                    [
                        6,
                        9
                    ]
                ],
                "remove": true
            }
        ]
    },
    "changeFloor": {
        "6,12": {
            "floorId": "MT32",
            "loc": [
                6,
                1
            ]
        }
    },
    "beforeBattle": {},
    "afterBattle": {
        "5,8": [
            {
                "type": "setValue",
                "name": "flag:door_MT33_6_5",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "if",
                "condition": "(flag:door_MT33_6_5!==0)",
                "true": [
                    "\t[冻原部队·突击]\f[shibing.png,-150,0]就连军队中最下等的术士，也比你强上百倍。"
                ]
            }
        ],
        "7,8": [
            {
                "type": "setValue",
                "name": "flag:door_MT33_6_5",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "if",
                "condition": "(flag:door_MT33_6_5!==0)",
                "true": [
                    "\t[冻原部队·法卫]\f[shibing.png,-150,0]与你战斗，有辱我等法卫之名。"
                ]
            }
        ],
        "6,7": [
            {
                "type": "setValue",
                "name": "flag:door_MT33_6_5",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "if",
                "condition": "(flag:door_MT33_6_5!==0)",
                "true": [
                    "\t[冻原部队分队长]\f[shibing.png,-150,0]反抗毫无意义。"
                ]
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "6,5": {
            "0": {
                "condition": "flag:door_MT33_6_5==3",
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
                        "name": "flag:door_MT33_6_5",
                        "value": "0"
                    },
                    {
                        "type": "pauseBgm"
                    },
                    "\t[塔露拉]\f[tllf.png,100,0]呼.....呼......",
                    {
                        "type": "moveHero",
                        "steps": [
                            "up:0"
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "E416",
                        "loc": [
                            [
                                5,
                                5
                            ]
                        ],
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "E350",
                        "loc": [
                            [
                                6,
                                4
                            ]
                        ],
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "E347",
                        "loc": [
                            [
                                7,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "playBgm",
                        "name": "buan.mp3",
                        "keep": true
                    },
                    "\t[冻原部队分队长]只有这种实力，也妄想与皇帝斗争。",
                    "\t[冻原部队·突击]天真。",
                    "\t[冻原部队·法卫]痴心妄想。",
                    "\t[塔露拉]\f[tllf.png,100,0]这就是乌萨斯正规军的力量吗？",
                    "\t[塔露拉]\f[tllf.png,100,0]白兔子，你到底是想让我......",
                    {
                        "type": "animate",
                        "name": "ice",
                        "loc": [
                            6,
                            10
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N407",
                        "loc": [
                            [
                                6,
                                10
                            ]
                        ]
                    },
                    "\t[霜星]\f[sx.png:x,-100,0]不好意思，我来晚了。",
                    "\t[塔露拉]\f[tllf.png,100,0]我就知道，那么你的计划是什么？",
                    "\t[霜星]\f[sx.png:x,-100,0]打败他们。",
                    "\t[塔露拉]\f[tllf.png,100,0]......你打得过？",
                    "\t[霜星]\f[sx.png:x,-100,0]我打不过，他们是乌萨斯的正规军，更何况......",
                    {
                        "type": "setBlock",
                        "number": "E416",
                        "loc": [
                            [
                                4,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "E416",
                        "loc": [
                            [
                                3,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "E416",
                        "loc": [
                            [
                                5,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "E347",
                        "loc": [
                            [
                                8,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "E347",
                        "loc": [
                            [
                                9,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "E347",
                        "loc": [
                            [
                                7,
                                3
                            ]
                        ]
                    },
                    "\t[霜星]\f[sx.png:x,-100,0]这个矿区，有一个连队。",
                    "\t[塔露拉]\f[tllf.png,100,0]那我们不就是送......",
                    {
                        "type": "move",
                        "loc": [
                            6,
                            4
                        ],
                        "time": 500,
                        "keep": true,
                        "steps": [
                            "down:1"
                        ]
                    },
                    "\t[冻原部队分队长]寒暄到此结束了，感染者们。",
                    "\t[冻原部队分队长]现在，我将以皇帝的名义，把你们......",
                    {
                        "type": "playSound",
                        "name": "d_gen_surfacefrozen.wav"
                    },
                    {
                        "type": "vibrate",
                        "direction": "random",
                        "time": 2000,
                        "speed": 10,
                        "power": 15
                    },
                    "\t[冻原部队分队长]？发生什么了？",
                    "\t[冻原部队分队长]是源石技艺吗？没用的，感染者。",
                    {
                        "type": "pauseBgm"
                    },
                    "\t[霜星]\f[sx.png:x,-100,0]塔露拉，这是你的当时计划，消灭这支连队，而我在侦察之后，认为可行。",
                    "\t[霜星]\f[sx.png:x,-100,0]但是显然的，光靠我们两个人和我们的小队，是远远不够的。",
                    "\t[塔露拉]\f[tllf.png,120,0]那你是怎么判断我们可以——",
                    {
                        "type": "vibrate",
                        "direction": "random",
                        "time": 1000,
                        "speed": 10,
                        "power": 15,
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "T419",
                        "loc": [
                            [
                                5,
                                7
                            ]
                        ],
                        "time": 1000,
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "T420",
                        "loc": [
                            [
                                5,
                                8
                            ]
                        ],
                        "time": 1000,
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "T419",
                        "loc": [
                            [
                                7,
                                7
                            ]
                        ],
                        "time": 1000,
                        "async": true
                    },
                    {
                        "type": "setBlock",
                        "number": "T420",
                        "loc": [
                            [
                                7,
                                8
                            ]
                        ],
                        "time": 1000
                    },
                    {
                        "type": "waitAsync"
                    },
                    {
                        "type": "playBgm",
                        "name": "xisheng.mp3",
                        "keep": true
                    },
                    "\t[塔露拉]\f[tllf.png,120,0]——这几个奇怪的源石装饰品，是？",
                    "\t[霜星]\f[sx.png:x,-100,0]啊，看来已经到了。",
                    "\t[霜星]\f[sx.png:x,-100,0]那是为我父亲设置的。",
                    "\t[塔露拉]\f[tllf.png,120,0]那些乌萨斯军人没有再靠近我们了。他们似乎很忌惮那东西。",
                    "\t[塔露拉]\f[tllf.png,120,0]等等，这是不是......是不是什么萨卡兹的东西？",
                    "\t[霜星]\f[sx.png:x,-100,0]他的萨卡兹仪式。现在这两个，已经算是手头材料能做出来最好的了。",
                    "\t[塔露拉]\f[tllf.png,120,0]爱国者......爱国者在这里？",
                    "\t[霜星]\f[sx.png:x,-100,0]你也说了，我们想要让其他人夺取矿区，我们这些佯攻队伍被袭击是意料中的事。但既然你说要在这里消灭这个连队，那光靠我们的小队当然是不够的。",
                    "\t[霜星]\f[sx.png:x,-100,0]......看来敌人已经开始骚动不安了。",
                    "\t[霜星]\f[sx.png:x,-100,0]你见过我父亲战斗的样子吗，塔露拉......？",
                    {
                        "type": "setBlock",
                        "number": "N3",
                        "loc": [
                            [
                                6,
                                6
                            ]
                        ]
                    },
                    "\t[冻原部队·突击]\f[shibing.png,-120,0]那......他......是他......你们怎么没说......没说他在这！",
                    "\t[冻原部队分队长]\f[shibing.png,-120,0]撤退！撤退！！别管了，别管了！",
                    "\t[冻原部队分队长]\f[shibing.png,-120,0]等等！他是从队伍尾部来的？那我们面前这些是什么？",
                    "\t[冻原部队分队长]\f[shibing.png,-120,0]喂？喂？！说话！说话！！",
                    "\t[博卓卡斯替]\f[fl.png,0,0]......",
                    {
                        "type": "showImage",
                        "code": 1,
                        "image": "snow.png",
                        "loc": [
                            -200,
                            0
                        ],
                        "opacity": 1,
                        "time": 0
                    },
                    "直至本地驻军向他发动猛攻前，众人面前矗立着的高大萨卡兹没有做出任何动作，没有发出任何声音。",
                    "但塔露拉仿佛听见冻原的北风中夹杂着哭叫，那是这片大地本身的颤抖，它的邪恶在温迪戈面前节节退缩。",
                    "爱国者站定，向冻原投出了手中长戟。",
                    "只懂如何吞食活物生命的阴郁天空忽地被刺出一个空洞。",
                    "这并不是战斗，而是力量上的绝对碾压。",
                    "这就是最后的温迪戈，博卓卡斯替。",
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
                        "type": "hide",
                        "loc": [
                            [
                                5,
                                5
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                7,
                                5
                            ]
                        ],
                        "remove": true,
                        "time": 0
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
                        "type": "hide",
                        "loc": [
                            [
                                3,
                                3
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                5,
                                3
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                8,
                                4
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                9,
                                3
                            ]
                        ],
                        "remove": true,
                        "time": 0
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                7,
                                3
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
                                4,
                                4
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T413",
                        "loc": [
                            [
                                8,
                                3
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T413",
                        "loc": [
                            [
                                3,
                                2
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T414",
                        "loc": [
                            [
                                2,
                                5
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T414",
                        "loc": [
                            [
                                10,
                                5
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T415",
                        "loc": [
                            [
                                9,
                                2
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "setBlock",
                        "number": "T415",
                        "loc": [
                            [
                                4,
                                3
                            ]
                        ],
                        "time": 0
                    },
                    {
                        "type": "playSound",
                        "name": "boat.wav"
                    },
                    {
                        "type": "pauseBgm"
                    },
                    {
                        "type": "hideImage",
                        "code": 1,
                        "time": 1000
                    },
                    "\t[塔露拉]\f[tllx.png,0,0]谢谢您的支援，先生......",
                    {
                        "type": "move",
                        "loc": [
                            6,
                            6
                        ],
                        "time": 500,
                        "keep": true,
                        "steps": [
                            "down:0"
                        ]
                    },
                    "\t[博卓卡斯替]\f[fl.png,0,0]——塔露拉。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]你想离开雪原？你会被乌萨斯的铁甲碾碎。",
                    "\t[霜星]\f[sx.png,0,0]爸？为什么是现在——",
                    "\t[博卓卡斯替]\f[fl.png,0,0]盾卫已经去增援前方部队，你带领你的小队，负责收集这只军队的资源。",
                    "\t[霜星]\f[sx.png,0,0]......是。",
                    {
                        "type": "hide",
                        "loc": [
                            [
                                6,
                                10
                            ]
                        ],
                        "remove": true
                    },
                    "\t[博卓卡斯替]\f[fl.png,0,0]你和你的计划会让所有人都送命。",
                    "塔露拉意识到，面前的巨人是第一次对自己发表他的意见。即使这意见不可撼动，伤人入骨。",
                    "\t[塔露拉]\f[tllf.png,0,0]西北冻原也不能让我们活下去。我们的队伍越壮大，就越需要食物与能源补给，厌恶我们的聚落远比支持我们的村庄更多。",
                    "\t[塔露拉]\f[tllf.png,0,0]我们的田地会不会被纠察队毁掉？游击队能够轻松地战胜他们，但其他的感染者做不到。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]你在加速他们的死亡。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]你要怎么样生存下去？ 你要怎样让我们这么多人生存下去？",
                    "\t[博卓卡斯替]\f[fl.png,0,0]游击队是在救人。游击队绝不会牺牲游击队之外的人。只有战士才牺牲。",
                    "\t[塔露拉]\f[tllf.png,0,0]在各个城市和城市周边生活的感染者，远比在冻原上的更多。",
                    "\t[塔露拉]\f[tllf.png,0,0]您常驻守北方，对北方感染者的遭遇深恶痛绝......所以您也不太有机会了解到，南方的感染者是怎样生活的。",
                    "\t[博卓卡斯替]\f[fl.png,0,0]他们过得很好？",
                    {
                        "type": "showImage",
                        "code": 1,
                        "image": "snow.png",
                        "loc": [
                            -200,
                            0
                        ],
                        "opacity": 1,
                        "time": 0
                    },
                    "\t[塔露拉]他们过得很糟。",
                    "\t[塔露拉]我想吸纳他们。",
                    "\t[塔露拉]我要团结他们。",
                    "\t[塔露拉]不是团结在我身边。不。是团结在同一个理念周围。",
                    "\t[塔露拉]我会获得我的朋友，我们为同一个理想而奋斗。",
                    "\t[塔露拉]为了感染者不再被压迫的未来。",
                    "\t[博卓卡斯替]\f[fl.png,100,0]——",
                    "\t[博卓卡斯替]\f[fl.png,100,0]我女儿也许会相信你。",
                    "\t[博卓卡斯替]\f[fl.png,100,0]但我不相信一个从没因事实而失望，一直只是在陈托某种假大空的学说的人。",
                    "\t[博卓卡斯替]\f[fl.png,100,0]谁是你的朋友？",
                    "\t[博卓卡斯替]\f[fl.png,100,0]生物趋利避害，生物自私无情。",
                    "\t[塔露拉]\f[tll.png,0,0]正因如此，我们感染者之间才不能有这么多的猜忌。",
                    "\t[塔露拉]\f[tll.png,0,0]所有被压迫的人需要相互理解，共同进退。",
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
                    "\t[塔露拉]\r[gold]我确信。",
                    {
                        "type": "changeFloor",
                        "floorId": "MT34",
                        "loc": [
                            6,
                            11
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
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0, 85,  0,  0,  0,  0,  0,  0],
    [30049,30049,30049,30049,30050,30057,  0,30057,30048,30049,30049,30049,30049],
    [  0,  0,  0,  0,30058,  0,350,  0,30056,  0,  0,  0,  0],
    [30065,30065,30065,30065,30066,416,  0,347,30064,30065,30065,30065,30065],
    [30073,30073,30073,30073,30074,  0,  0,  0,30072,30073,30073,30073,30073],
    [30073,30073,30073,30073,30074,30057,168,30057,30072,30073,30073,30073,30073],
    [30081,30081,30081,30081,30082, 33,  0, 33,30080,30081,30081,30081,30081],
    [ 29, 21, 27, 27, 33,  0, 93,  0, 33, 28, 28, 21, 29]
],
    "bgmap": [
    [  0,  0,  0,  0,20017,  0,20016,  0,  0,  0,20016,  0,  0],
    [20017,  0,20016,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,20016,  0,  0,  0,  0,20016,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,20016,  0,  0,  0,  0,20017],
    [20016,  0,  0,20016,  0,  0,  0,  0,  0,  0,20016,  0,  0],
    [  0,20017,  0,  0,  0,20017,  0,  0,  0,  0,  0,  0,20016],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "fgmap": [

]
}