main.floors.MT2=
{
    "floorId": "MT2",
    "title": "prts内部",
    "name": "2",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "ratio": 1,
    "defaultGround": "X10000",
    "firstArrive": [
        {
            "type": "hideImage",
            "code": 1,
            "time": 0
        },
        {
            "type": "setValue",
            "name": "status:hp",
            "value": "1000"
        },
        {
            "type": "setValue",
            "name": "status:def",
            "value": "10"
        },
        {
            "type": "setValue",
            "name": "status:atk",
            "value": "10"
        },
        {
            "type": "setValue",
            "name": "status:mdef",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "item:book",
            "value": "1"
        },
        "\t[prts.png]欢迎来到PRTS记忆系统的进阶教程",
        "\t[prts.png]在这里，你将了解到各种你可能需要的进阶内容",
        "\t[prts.png]当然，这里的内容并不是全部，如果博士你需要了解新的信息时，我会随时待命！",
        "\t[prts.png]那么，请先捡拾前方的角色核心吧"
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "10,5": [
            "技能测试中心"
        ],
        "2,5": [
            "感染防控介绍"
        ],
        "2,7": [
            "特化敌人中心",
            "接触这些虚拟敌人便会开始讲解"
        ],
        "10,7": [
            "核心敌人中心"
        ],
        "1,7": [
            "你的各项属性越高就一定越好吗？",
            "这个地方会给你答案",
            "先打开敌人资料，然后继续点击相应敌人便可查看其特殊能力",
            "试着捡拾这里的宝石，看看敌人的伤害是否有变化，是变多了还是变少了",
            {
                "type": "openDoor",
                "loc": [
                    6,
                    5
                ]
            },
            {
                "type": "hide",
                "loc": [
                    [
                        1,
                        7
                    ]
                ],
                "remove": true
            }
        ],
        "1,5": [
            "源石感染与避免源石感染是这个世界的基本法则",
            "目前来讲，与\r[gold]感染生物\r作战会增加你的感染值",
            "你的感染值每增加100，你的感染等级便会提高一级",
            "感染等级会增加你战斗中受到的伤害，约为10%",
            "但同时，你也可以通过利用身上的源石施法来恢复你的源石技艺值",
            "这里有一个很重要的信息，\r[red]每级感染会使你在战斗结束时恢复2点源石技艺值",
            "而另一边，你可以通过使用源石抑制剂来消除感染等级",
            {
                "type": "openDoor",
                "loc": [
                    6,
                    4
                ]
            },
            {
                "type": "hide",
                "loc": [
                    [
                        1,
                        5
                    ]
                ],
                "remove": true
            }
        ],
        "11,5": [
            "面对强敌，技能永远是你致胜的法宝",
            "由于权限原因，博士您现在仅可试着使用凯尔希的1技能",
            "（十字提示：对于所有角色来讲，永远是1技能的快捷键是1，二技能的快捷键是2，三技能的快捷键是3，如果博士您是用手机登录的本系统，您可以点击下方道具栏的右端来弹出技能按键）",
            "（十字提示：同时，你随时可以在你的道具栏查看你的所有技能及人物核心）",
            "试试看技能的效果吧",
            {
                "type": "openDoor",
                "loc": [
                    6,
                    3
                ]
            },
            {
                "type": "hide",
                "loc": [
                    [
                        11,
                        5
                    ]
                ],
                "remove": true
            }
        ],
        "11,7": [
            "团结就是力量",
            "有些敌人的技能使得他们聚在一起可以变得更强",
            "也有敌人的技能可以强化其他的敌人",
            "以下展示了“支援”这一属性",
            {
                "type": "openDoor",
                "loc": [
                    6,
                    2
                ]
            },
            {
                "type": "hide",
                "loc": [
                    [
                        11,
                        7
                    ]
                ],
                "remove": true
            }
        ],
        "6,1": [
            {
                "type": "choices",
                "text": "\t[PRTS]那么，博士，你准备好了吗?",
                "choices": [
                    {
                        "text": "开始吧",
                        "action": [
                            {
                                "type": "showImage",
                                "code": 0,
                                "image": "dark.png",
                                "loc": [
                                    0,
                                    0
                                ],
                                "opacity": 1,
                                "time": 0
                            },
                            {
                                "type": "playSound",
                                "name": "bottom.wav"
                            },
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png]正在载入角色",
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png]主对象确认——博卓卡斯替 ",
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png]时间信息对照中",
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png]泰拉1085年",
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png].......",
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png]警告，外部正在干扰系统的记忆读取",
                            {
                                "type": "hideImage",
                                "code": 100,
                                "time": 0
                            },
                            "\t[熟悉的女声]......没错，医生，我认为博士应该看看我读取到的内容，“她”也同意了",
                            "\t[熟悉的女声]是的，先让博士看看那个吧...",
                            "\t[熟悉的女声]prts，请确认分对象",
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png]......",
                            {
                                "type": "playSound",
                                "name": "prts.wav"
                            },
                            "\t[prts.png]分对象已确认——Talulah",
                            {
                                "type": "pauseBgm"
                            },
                            {
                                "type": "function",
                                "function": "function(){\ncore.setFlag('skill', 0)\n}"
                            },
                            {
                                "type": "setGlobalAttribute",
                                "name": "statusLeftBackground",
                                "value": "url(project/materials/tt.png) repeat"
                            },
                            {
                                "type": "setGlobalAttribute",
                                "name": "statusTopBackground",
                                "value": "url(project/materials/tth.png) repeat"
                            },
                            {
                                "type": "function",
                                "function": "function(){\ncore.changeHero(3)\n}"
                            },
                            {
                                "type": "setValue",
                                "name": "flag:hero",
                                "value": "4"
                            },
                            {
                                "type": "setValue",
                                "name": "status:mana",
                                "value": "0"
                            },
                            {
                                "type": "changeFloor",
                                "floorId": "MT3",
                                "loc": [
                                    6,
                                    6
                                ]
                            }
                        ]
                    },
                    {
                        "text": "我再看看这里",
                        "action": [
                            {
                                "type": "playSound",
                                "name": "bottom.wav"
                            }
                        ]
                    }
                ]
            }
        ],
        "1,10": {
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
                "源石技艺-碎盾",
                "这个源石技艺可以让你的护盾值成为你的负面效果",
                "因此，面对会这类法术的敌人，\r[gold]护盾值并非越低越好",
                "（ps：简单难度下，护盾值高低并不影响碎盾敌人的伤害值）"
            ]
        },
        "2,10": {
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
                "防御力是越高越好吗？",
                "剥壳敌人便是最显著的例子",
                "他们在战斗开始时会先\r[gold]根据你的防御值造成伤害"
            ]
        },
        "3,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "data": [
                "术士类敌人会造成\r[blue]法术伤害",
                "法术伤害无视防御，因此你无法通过增加防御力来减少其对你造成的伤害"
            ]
        },
        "4,10": {
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
                "磐石类敌人无论你的攻击力与否",
                "你每次只能对其造成一点伤害",
                "同时，某些会格斗技巧的敌人会根据你的攻击力来进行攻击，这个你在之后会遇到"
            ]
        }
    },
    "changeFloor": {},
    "afterBattle": {
        "3,2": [
            "感染值下方的红色数字表示的是你的感染等级",
            "感染等级越高，你受到的伤害越高",
            "每级感染等级会增加你10%受到的伤害"
        ]
    },
    "afterGetItem": {
        "6,6": [
            "提示：你可以点击状态栏的第二个按钮来快速使用角色核心",
            "\t[prts.png]博士，你现在有角色核心了",
            "\t[prts.png]你可以通过它来查看角色的各种属性及特性",
            "\t[prts.png]那么就让我来为博士简单介绍一下吧",
            {
                "type": "hideImage",
                "code": 2,
                "time": 0
            },
            {
                "type": "showImage",
                "code": 1,
                "image": "kt.png",
                "loc": [
                    0,
                    34
                ],
                "opacity": 1,
                "time": 0
            },
            "\t[PRTS]\b[down,null]这是基本界面",
            "\t[PRTS]\b[down,null]这里面你可以看到角色的各种数据倾向以及定位",
            "\t[PRTS]\b[down,null]不过由于记忆系统中博士您只能操控一个角色，所以这些东西博士你看看就好~",
            {
                "type": "moveImage",
                "code": 1,
                "to": [
                    -278,
                    34
                ],
                "time": 1000
            },
            "\t[PRTS]\b[down,null]这是角色的技能及天赋界面",
            "\t[PRTS]\b[down,null]在这里，博士你可以观看角色的特性及天赋，点击相应位置即可",
            "\t[PRTS]\b[down,null]为什么你捡拾一个100血的血瓶会恢复150？这就是因为其天赋“渊博医术”导致的",
            "\t[PRTS]\b[down,null]不同角色有不同的天赋，对天赋的掌握往往会影响整个战斗的走向",
            "\t[PRTS]\b[down,null]还有相应的技能信息，例如“指令:结构加固”",
            "\t[PRTS]\b[down,null]其后面的闪电符号为其使用的源石技艺值需求",
            {
                "type": "showImage",
                "code": 2,
                "image": "ks1.png",
                "loc": [
                    0,
                    160
                ],
                "opacity": 1,
                "time": 0
            },
            "\t[PRTS]\b[down,null]这个则是其具体作用及目前的等级，没错，有的技能可以进行升级",
            {
                "type": "hideImage",
                "code": 2,
                "time": 0
            },
            "\t[PRTS]\b[down,null]具体的东西博士你可以一会自行点击观看~",
            "\t[PRTS]\b[down,null]点击道具栏的第二个按钮即可",
            {
                "type": "hideImage",
                "code": 1,
                "time": 0
            },
            "\t[prts.png]\b[down,null]俗话说百闻不如一见",
            "\t[prts.png]\b[down,null]这个空间有很多有意思的有用的知识，请博士自行探索"
        ],
        "10,4": [
            "普适源石",
            "可以恢复角色20的源石技艺值"
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [10052,10052,10052,10052,10052,10052,10052,10052,10052,10052,10052,10052,10052],
    [10052, 86,  0, 86,  0,10052,104,10052,  0, 86,  0, 86,10052],
    [10052,  0, 86,248, 86,10052, 85,10052, 86,208, 86,  0,10052],
    [10052,  0,  0, 81,  0,10052, 85,10052,  0, 82,  0,  0,10052],
    [10052,  0,  0,  0, 21,10052, 85,10052, 22, 72, 30,  0,10052],
    [10052,  0,10163,10052,10052,103, 85,103,10052,10052,10163,  0,10052],
    [10052,  0,  0,  0,  0,  0, 73,  0,  0,  0,  0,  0,10052],
    [10052,  0,10163,10052,10052,103,  0,103,10052,10052,10163,  0,10052],
    [10052, 29, 28, 28, 27,10052,  0,10052,  0,  0,  0,  0,10052],
    [10052, 93, 93, 93, 93,10052,  0,10052,10052,10052,10052,10052,10052],
    [10052,219,225,217,215,10052,  0,10052,220,201,10052,201,10052],
    [10052,10052,10052,10052,10052,10052,  0,10052,10052,10052,10052,10052,10052],
    [10052,10052,10052,10052,10052,10052,10052,10052,10052,10052,10052,10052,10052]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,10052,  0,  0,10052,  0,10052,  0,  0,10052,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,10052,  0,  0,10052,  0,10052,  0,  0,10052,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}