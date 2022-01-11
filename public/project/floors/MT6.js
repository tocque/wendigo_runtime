main.floors.MT6=
{
    "floorId": "MT6",
    "title": "",
    "name": "西北冻原",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "ratio": 1,
    "defaultGround": "X20000",
    "bgm": "bg.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,11": {
            "trigger": null,
            "enable": true,
            "noPass": true,
            "displayDamage": true,
            "data": [
                "\t[prts.png]看到这个闪闪发光的碎片了吗",
                "\t[prts.png]这就是记忆碎片，也是我们窥探这个记忆所处时代其他信息的重要手段",
                "\t[prts.png]在你捡到一个记忆碎片后，你可以直接观看，或者之后在你的碎片记录装置中观看",
                {
                    "type": "setValue",
                    "name": "item:I335",
                    "value": "1"
                },
                {
                    "type": "setValue",
                    "name": "flag:j1",
                    "value": "1"
                },
                {
                    "type": "choices",
                    "text": "\t[记忆装置]捡拾到记忆碎片剧情“亡命者的家”，是否观看？",
                    "choices": [
                        {
                            "text": "是",
                            "action": [
                                {
                                    "type": "playSound",
                                    "name": "bottom.wav"
                                },
                                {
                                    "type": "pauseBgm"
                                },
                                {
                                    "type": "hideStatusBar"
                                },
                                {
                                    "type": "playBgm",
                                    "name": "piaobo.mp3",
                                    "keep": true
                                },
                                {
                                    "type": "showImage",
                                    "code": 1,
                                    "image": "forest.png",
                                    "loc": [
                                        -100,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 500
                                },
                                "连日大雪，雪层封住了山谷",
                                "树丛莓还没抽芽，春天简直像是永远也不会到来",
                                "我自从逃离了所谓的“家”之后，便东躲西藏",
                                "也许正如同龙门人所说一样，我就是个灾星，在我身边不会发生什么好事情",
                                "缺衣少食，冷风扑面",
                                "等待春天的日子是如此漫长，以至于我的精神开始出现波动",
                                "但我一直坚信着自己的使命，我命不该绝于此",
                                "\t[塔露拉]\b[down,null]\f[tll.png,0,0]我......",
                                {
                                    "type": "playSound",
                                    "name": "fall.wav"
                                },
                                {
                                    "type": "showImage",
                                    "code": 2,
                                    "image": "dark.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 1000
                                },
                                {
                                    "type": "hideImage",
                                    "code": 2,
                                    "time": 500
                                },
                                {
                                    "type": "showImage",
                                    "code": 2,
                                    "image": "dark.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 500
                                },
                                {
                                    "type": "hideImage",
                                    "code": 2,
                                    "time": 1000
                                },
                                {
                                    "type": "showImage",
                                    "code": 2,
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
                                    "image": "dark.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 0.7,
                                    "time": 1000
                                },
                                "\t[塔露拉]\b[down,null]\f[tll.png,0,0]......又昏倒了吗",
                                "\t[塔露拉]\b[down,null]\f[tll.png,0,0]现在...已经是夜晚了",
                                {
                                    "type": "playSound",
                                    "name": "heart.ogg"
                                },
                                "\t[塔露拉]\b[down,null]\f[tll.png,0,0]呼...哈...呼...哈...",
                                "\t[塔露拉]\b[down,null]\f[tll.png,0,0]等等，这是？",
                                {
                                    "type": "pauseBgm"
                                },
                                "有一道光",
                                {
                                    "type": "showImage",
                                    "code": 2,
                                    "image": "dark.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 500
                                },
                                "温暖的光",
                                {
                                    "type": "showImage",
                                    "code": 1,
                                    "image": "country.png",
                                    "loc": [
                                        -100,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 0
                                },
                                {
                                    "type": "playSound",
                                    "name": "run.wav"
                                },
                                "希望的光",
                                {
                                    "type": "playSound",
                                    "name": "run.wav"
                                },
                                "\t[塔露拉]\b[down,null]！",
                                {
                                    "type": "showImage",
                                    "code": 2,
                                    "image": "dark.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 0.7,
                                    "time": 1000
                                },
                                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]（咽了咽口水）",
                                {
                                    "type": "playSound",
                                    "name": "knock.wav"
                                },
                                {
                                    "type": "showImage",
                                    "code": 2,
                                    "image": "dark.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 0.6,
                                    "time": 500
                                },
                                {
                                    "type": "playSound",
                                    "name": "door1.wav"
                                },
                                {
                                    "type": "showImage",
                                    "code": 2,
                                    "image": "dark.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 500
                                },
                                {
                                    "type": "showImage",
                                    "code": 1,
                                    "image": "home.png",
                                    "loc": [
                                        0,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 0
                                },
                                {
                                    "type": "playBgm",
                                    "name": "warm.mp3",
                                    "keep": true
                                },
                                {
                                    "type": "hideImage",
                                    "code": 2,
                                    "time": 1000
                                },
                                "\t[塔露拉]\b[down,null]唔唔...",
                                "\t[老妇]\b[down,null]\f[lf.png,0,0]你这小姑娘，吃慢点，没人和你抢",
                                {
                                    "type": "showImage",
                                    "code": 3,
                                    "image": "lha.png",
                                    "loc": [
                                        -100,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 500
                                },
                                {
                                    "type": "showImage",
                                    "code": 2,
                                    "image": "lfa.png",
                                    "loc": [
                                        100,
                                        0
                                    ],
                                    "opacity": 1,
                                    "time": 0
                                },
                                "\t[农民]\b[down,null]\f[lh.png,-100,0]我说老婆子，她都吃多少东西了，我们家可养不了这种人",
                                "\t[老妇]\b[down,null]\f[lf.png,100,0]沙皇在上，你说什么呢？我们可不能减死不救，你难道不想要帮帮这个孩子吗？",
                                "\t[老妇]\b[down,null]\f[lf.png,100,0]而且，刚才是谁被她那个满是血的衣服吓到了，但却坚持要帮她的？",
                                "\t[农民]\b[down,null]\f[lh.png,-100,0]......那也要让她学会干活",
                                "\t[老妇]\b[down,null]\f[lf.png,100,0]真是的，刚看见她的这身打扮，我还以为她是什么贵族的大小姐呢",
                                "\t[老妇]\b[down,null]\f[lf.png,100,0]她刚才说的是什么？",
                                "\t[农民]\b[down,null]\f[lh.png,-100,0]这衣服是一个贵族老爷送她的，她的家人都死了，就剩这一身打扮了",
                                {
                                    "type": "hideImage",
                                    "code": 2,
                                    "time": 0
                                },
                                {
                                    "type": "hideImage",
                                    "code": 3,
                                    "time": 0
                                },
                                "\t[老妇]\b[down,null]\f[lf.png,0,0]可怜的孩子，让我为你做祈祷......",
                                "\t[老妇]\b[down,null]\f[lf.png,0,0]（喃喃自语）一起吃过了这顿饭，我们便是一家人了......",
                                {
                                    "type": "playBgm",
                                    "name": "bg.mp3",
                                    "keep": true
                                },
                                {
                                    "type": "hideImage",
                                    "code": 1,
                                    "time": 0
                                },
                                {
                                    "type": "hideImage",
                                    "code": 2,
                                    "time": 0
                                },
                                {
                                    "type": "hideImage",
                                    "code": 3,
                                    "time": 0
                                },
                                {
                                    "type": "showStatusBar"
                                }
                            ]
                        },
                        {
                            "text": "否",
                            "action": [
                                {
                                    "type": "playSound",
                                    "name": "bottom.wav"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "hideBgFgMap",
                    "name": "bg",
                    "loc": [
                        [
                            6,
                            11
                        ]
                    ]
                },
                {
                    "type": "hide",
                    "loc": [
                        [
                            6,
                            11
                        ]
                    ],
                    "remove": true
                }
            ]
        },
        "6,1": {
            "trigger": null,
            "enable": true,
            "noPass": true,
            "displayDamage": true,
            "data": [
                "PRTS正在检测同步率",
                {
                    "type": "if",
                    "condition": "core.hasEnemyLeft(undefined,[\"MT4\",\"MT5\",\"MT6\"]);",
                    "true": [
                        "同步率未达到100%，仍有敌人未清除"
                    ],
                    "false": [
                        "同步率已达到100%，继续前进吧",
                        "温馨提示:如需要开技能打boss，请提前开启",
                        "\t[塔露拉]\b[down,null]\f[tll.png,0,0]他们的队长就在前面，我今天就要为村民讨一个公道",
                        "\t[塔露拉]\b[down,null]\f[tll.png,0,0]不过经历了这么激烈的运动......我的感染似乎加深了一点",
                        "\t[塔露拉]\b[down,null]\f[tll.png,0,0]这个东西...可以暂时治疗感染加深...",
                        {
                            "type": "setValue",
                            "name": "item:poisonWine",
                            "value": "1"
                        },
                        "\t[塔露拉]\b[down,null]\f[tll.png,0,0]呼...先用了吧",
                        {
                            "type": "useItem",
                            "id": "poisonWine"
                        },
                        {
                            "type": "hide",
                            "remove": true
                        }
                    ]
                }
            ]
        }
    },
    "changeFloor": {
        "6,12": {
            "floorId": "MT5",
            "loc": [
                6,
                0
            ]
        },
        "6,0": {
            "floorId": "MT7",
            "loc": [
                6,
                12
            ]
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [ 27,  0, 28,  0, 30,30007, 91,20030,  0, 27,20021,20022, 28],
    [ 31,30057,332, 81,30031,30015,168,30007, 31,  0,  0, 32,  0],
    [20019,20020,  0, 31,  0,20030, 82,30015,  0,  0,30028,20021,20022],
    [  0,30028, 81,  0,203,30030, 33,  0,332,30028, 31,  0, 27],
    [  0,  0, 33,20006,  0, 31,20019,20020,203,  0,30030, 21,  0],
    [  0,  0,  0,20014,  0,  0,30028,  0, 81, 21,  0,30007, 81],
    [  0,  0,  0,30029,30028,  0,30030,  0,30007,  0, 31,30015,  0],
    [20108,20109,20110,  0, 27,332,  0,  0,30015, 32,  0,  0,332],
    [20021,20022,30031,  0, 33,20021,20022,204, 81,  0, 31,  0,30028],
    [ 27,  0, 31,20021,20022,  0, 33,  0,  0,204,30057,203, 29],
    [  0, 30,332,  0,30030, 34,  0, 32,  0,30028, 29,30031,30007],
    [20021,20022, 81,  0, 81,  0, 90,  0, 81,332,  0, 28,30015],
    [ 32, 21, 34,20030,  0,30057, 93,30057,  0,20021,20022,  0, 27]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,  0,30011,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,20017,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20016,  0,  0,  0,  0,  0,  0,  0,20017,  0,20016,  0,  0],
    [20017,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0],
    [30024,30025,30025,30026,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [30032,30033,30033,30034,  0,  0,  0,20017,  0,  0,20017,  0,  0],
    [30040,30041,30041,30042,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,20016,  0,  0,  0,  0,  0,  0,  0,  0,20016,  0,  0],
    [  0,  0,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,20016],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,20017,  0,30011,  0,  0,  0,  0,  0,  0]
],
    "fgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20076,20077,20078,20079,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20084,20085,20086,20087,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20092,20093,20094,20095,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20100,20101,20102,20103,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20108,20109,20110,20111,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
]
}