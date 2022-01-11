main.floors.MT7=
{
    "floorId": "MT7",
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
        "6,7": {
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
                    "type": "showImage",
                    "code": 1,
                    "image": "tlla.png",
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
                    "image": "jcda.png",
                    "loc": [
                        100,
                        0
                    ],
                    "opacity": 1,
                    "time": 500
                },
                "\t[纠察队队长]\b[down,null]\f[jcd.png,100,0]你已经打伤我好几个人了，你到底想干嘛？",
                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]滚出这里！",
                "\t[纠察队队长]\b[down,null]\f[jcd.png,100,0]虫豸一样的人，竟敢命令队长我？",
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
                    "type": "battle",
                    "id": "E330"
                },
                {
                    "type": "pauseBgm"
                },
                {
                    "type": "showImage",
                    "code": 3,
                    "image": "tlla.png",
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
                    "image": "jcda.png",
                    "loc": [
                        100,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                "\t[纠察队队长]\b[down,null]\f[jcd.png,100,0]呃...",
                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]我还没有砍掉你的手，爬起来！",
                "\t[纠察队队长]\b[down,null]\f[jcd.png,100,0]......别以为事情就这么完了！",
                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]我现在就剐了你的舌头。",
                {
                    "type": "hideImage",
                    "code": 4,
                    "time": 0
                },
                {
                    "type": "hideImage",
                    "code": 3,
                    "time": 0
                },
                {
                    "type": "playSound",
                    "name": "run.wav"
                },
                {
                    "type": "move",
                    "loc": [
                        6,
                        7
                    ],
                    "time": 400,
                    "steps": [
                        "up:7"
                    ]
                },
                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]他跑了......我也该回去了",
                {
                    "type": "playSound",
                    "name": "d_gen_walk_n.wav"
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
                    "time": 500
                },
                {
                    "type": "showImage",
                    "code": 2,
                    "image": "country.png",
                    "loc": [
                        0,
                        0
                    ],
                    "opacity": 1,
                    "time": 500
                },
                {
                    "type": "hideImage",
                    "code": 1,
                    "time": 500
                },
                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]爷爷，您没事......",
                {
                    "type": "showImage",
                    "code": 4,
                    "image": "tlla.png",
                    "loc": [
                        -100,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                "\t[老汉]\b[down,null]\f[lh.png,100,0]你都做了啥！啊呀，塔露拉......你看看你都做了啥！",
                "\t[老汉]\b[down,null]\f[lh.png,100,0]塔露拉，再过两天我们就要迁村子了。你看看你这样......！",
                "\t[老汉]\b[down,null]\f[lh.png,100,0]你打了纠察队啊！这可惹上大麻烦了！",
                {
                    "type": "showImage",
                    "code": 3,
                    "image": "lha.png",
                    "loc": [
                        100,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                "\t[塔露拉]\b[down,null]\f[tllb.png,-100,0]继续让他打你更不是办法。现在已经晚了，他们逃了。我如果现在杀光他们，其他人发现踪迹的时候，我们就已经迁走了。",
                "\t[塔露拉]\b[down,null]\f[tllb.png,-100,0]可那样死活是避不过的，纠察队一旦集结起来，一定还会找上我们。说不定还会报复我们。",
                "\t[老汉]\b[down,null]\f[lh.png,100,0]那你还动手！这该怎么办！",
                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]放心，爷爷，他们是找感染者。现在他们还不知道。",
                "\t[老汉]\b[down,null]\f[lh.png,100,0]......",
                "\t[老汉]\b[down,null]\f[lh.png,100,0]不知道什么？",
                "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]不知道我接下来要做的事。",
                "\t[老汉]\b[down,null]\f[lh.png,100,0]哎......塔露拉！",
                "\t[塔露拉]\b[down,null]\f[tllx.png,-100,0]爷爷，没事的。来，我扶你回去。",
                {
                    "type": "showImage",
                    "code": 3,
                    "image": "lh.png",
                    "loc": [
                        100,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                {
                    "type": "showImage",
                    "code": 4,
                    "image": "tllx.png",
                    "loc": [
                        -100,
                        0
                    ],
                    "opacity": 1,
                    "time": 0
                },
                {
                    "type": "moveImage",
                    "code": 4,
                    "to": [
                        10,
                        0
                    ],
                    "time": 1000
                },
                {
                    "type": "moveImage",
                    "code": 3,
                    "to": [
                        -50,
                        0
                    ],
                    "time": 1000
                },
                {
                    "type": "moveImage",
                    "code": 4,
                    "to": [
                        10,
                        50
                    ],
                    "time": 500
                },
                {
                    "type": "moveImage",
                    "code": 4,
                    "to": [
                        10,
                        0
                    ],
                    "time": 1000
                },
                "\t[塔露拉]\b[down,null]\f[tllx.png,10,0]你这条腿......可有得治了。",
                "\t[老汉]\b[down,null]哈。没想到我也到了被你搀着这天。我一直觉得我的身体还好着，只是没想到还是没逃过去。",
                "\t[老汉]\b[down,null]塔露拉，我有件事，你一定要听。",
                "\t[塔露拉]\b[down,null]又是什么事，爷爷？",
                "\t[老汉]\b[down,null]......",
                "\t[老汉]\b[down,null]啊，是什么来着？唔，哈哈，对不住，我忘啦。你看看，你看我这记性......",
                "\t[塔露拉]\b[down,null]......",
                "\t[塔露拉]\b[down,null]您那忘性还真够大的。",
                {
                    "type": "showImage",
                    "code": 5,
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
                    "type": "hideImage",
                    "code": 4,
                    "time": 0
                },
                {
                    "type": "changeFloor",
                    "floorId": "MT8",
                    "loc": [
                        6,
                        12
                    ]
                }
            ]
        }
    },
    "changeFloor": {},
    "afterBattle": {
        "4,10": [
            {
                "type": "setValue",
                "name": "flag:door_MT7_6_8",
                "operator": "+=",
                "value": "1"
            }
        ],
        "8,10": [
            {
                "type": "setValue",
                "name": "flag:door_MT7_6_8",
                "operator": "+=",
                "value": "1"
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "6,8": {
            "0": {
                "condition": "flag:door_MT7_6_8==2",
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
                        "name": "flag:door_MT7_6_8",
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
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20072,20073,20074,20075,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20080,20081,20082,20083,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20088,20089,20090,20091,  0,  0,  0,  0,  0,20072,20073,20074,20075],
    [20096,20097,20098,20099,  0,  0,  0,  0,  0,20080,20081,20082,20083],
    [20104,20105,20106,20107,  0,  0,  0,  0,  0,20088,20089,20090,20091],
    [20076,20077,20078,20079,  0,  0,  0,  0,  0,20096,20097,20098,20099],
    [20084,20085,20086,20087,  0,30017,330,  0,  0,20104,20105,20106,20107],
    [20092,20093,20094,20095,  0,20030, 85,20030,  0,  0,  0,20108,20109],
    [20100,20101,20102,20103,20030,  0,332,  0,20030,  0,  0,  0,  0],
    [20108,20109,20110,20030,332,  0,  0,  0,332,20030,  0,  0,  0],
    [  0,  0,20030, 32, 81,  0, 34,  0, 81, 32,20030,  0,  0],
    [  0,20030, 33, 81, 32,20030,  0,20030, 32, 81, 33,20030,  0]
],
    "bgmap": [
    [  0,  0,20040,  0,  0,  0,  0,  0,30136,30137,30138,30139,30139],
    [  0,  0,  0,  0,30005,  0,30004,  0,30144,30145,30146,30147,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,30152,30153,30154,30155,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,30160,30161,30162,30163,  0],
    [  0,  0,  0,  0,30004,  0,  0,  0,30168,30169,30170,30171,  0],
    [  0,  0,  0,  0,  0,  0,  0,30029,  0,  0,  0,  0,  0],
    [  0,30004,20040,  0,  0,  0,  0,  0,  0,  0,  0,  0,20040],
    [  0,  0,  0,  0,  0,  0,  0,  0,20040,30004,  0,  0,30004],
    [  0,  0,  0,30029,  0,  0,  0,  0,  0,  0,  0,30005,  0],
    [  0,30004,  0,  0,  0,  0,  0,  0,  0,  0,30005,  0,  0],
    [  0,  0,  0,  0,  0,  0,30005,  0,  0,  0,  0,  0,  0],
    [30004,  0,  0,  0,  0,30004,  0,  0,  0,  0,  0,  0,30029],
    [  0,  0,  0,  0,  0,  0,30004,  0,  0,  0,  0,  0,30004]
],
    "fgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,20079,  0,  0,  0,  0,  0,  0],
    [  0,  0,20076,20077,20078,20079,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,20084,20085,20086,20087,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,20092,20093,20094,20095,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,20100,20101,20102,20103,  0,  0,  0,  0,20076,20077,20078],
    [  0,  0,20108,20109,20110,20111,  0,  0,  0,  0,20084,20085,20086],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20092,20093,20094],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20100,20101,20102],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20108,20109,20110],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "beforeBattle": {},
    "cannotMoveIn": {}
}