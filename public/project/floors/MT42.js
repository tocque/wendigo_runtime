main.floors.MT42=
{
    "floorId": "MT42",
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
    "firstArrive": [
        {
            "type": "showImage",
            "code": 2,
            "image": "morningconutry.png",
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
        "\t[盾卫]\f[shibing.png,0,0]吊死他们，如果爱国者在这里的话，一定会这么做。",
        "\t[盾卫]\f[shibing.png,0,0]这是军队的纪律。",
        "\t[塔露拉]\f[tll.png,0,0]不行，我们不是军队，至少现在不是。",
        "\t[塔露拉]\f[tllb.png,0,0]我们本来就没有兑现全部承诺，他们产生怀疑和动摇......是应该的。",
        "\t[盾卫]\f[shibing.png,0,0]那你打算怎么办？",
        "\t[塔露拉]\f[tllb.png,0,0]让他们走。",
        "\t[塔露拉]\f[tllb.png,0,0]给他们一周的口粮。",
        "\t[盾卫]\f[shibing.png,0,0]不可能！我们的战士都没有这个待遇！",
        "\t[盾卫]\f[shibing.png,0,0]这点上无法让步，他们根本就不配！",
        "\t[塔露拉]\f[tllb.png,0,0]......",
        "\t[塔露拉]\f[tllb.png,0,0]好，但是赶走他们的时候请言辞不要那么激烈。",
        "\t[盾卫]\f[shibing.png,0,0]......好吧，西边现在感染者活动比较频繁，不能让他们被发现，所以我们应该——",
        {
            "type": "pauseBgm"
        },
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
            "type": "playSound",
            "name": "door.wav",
            "pitch": 100
        },
        {
            "type": "playBgm",
            "name": "buan.mp3",
            "keep": true
        },
        "\t[感染者战士]\f[grzzs.png,-100,0]不好了！",
        "\t[盾卫]\f[shibing.png,100,0]请先敲门再进来，就算有什么急事——",
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
        "\t[塔露拉]\f[tllf.png,100,0]有什么事情？这么着急？",
        "\t[感染者战士]\f[grzzs.png,-100,0]是......是纠察队！",
        "\t[感染者战士]\f[grzzs.png,-100,0]他们在搜查和我们交易了粮食的那个村庄！",
        "\t[感染者战士]\f[grzzs.png,-100,0]现在要撤走吗？只要及时撤走，我们可以避开——",
        "\t[塔露拉]\f[tlln.png,100,0]不行！要把纠察队引到这里然后消灭他们，即使会留下痕迹，我们也要让纠察队认为是我们干的！",
        "\t[感染者战士]\f[grzzs.png,-100,0]塔露拉，附近十公里就是第四集团军的据点，再想想吧！",
        "\t[塔露拉]\f[tllf.png,100,0]如果有任何一个村庄因我们而被袭击，之后就没有村庄会和我们交易了！",
        "\t[塔露拉]\f[tlln.png,100,0]\r[red]攻击这支部队，这是命令！",
        "\t[塔露拉]\f[tlln.png,100,0]保护好据点所有的非战斗人员，特别是孩子们！",
        "\t[塔露拉]\f[tlln.png,100,0]我先去前线，这里你和他先负责！",
        "\t[感染者战士]\f[grzzs.png,-100,0]明白了，我这就去组织。",
        {
            "type": "hideImage",
            "code": 4,
            "time": 1000
        },
        {
            "type": "pauseBgm"
        },
        "\t[盾卫]\f[shibing.png,100,0]孩子，妇女，还有一些老年的感染者，据点的人应该都差不多在这里。",
        {
            "type": "hideImage",
            "code": 3,
            "time": 0
        },
        "\t[感染者战士]\f[grzzs.png,0,0]我们今天也没有什么和外部村庄交易的计划——应该都到齐了。",
        {
            "type": "hideImage",
            "code": 2,
            "time": 0
        },
        {
            "type": "hideImage",
            "code": 1,
            "time": 0
        },
        {
            "type": "setValue",
            "name": "flag:bgm",
            "value": "5"
        },
        {
            "type": "playBgm",
            "name": "xisheng.mp3",
            "keep": true
        },
        "\t[塔露拉]\f[tllf.png,100,0]这是一场硬仗。",
        {
            "type": "if",
            "condition": "(flag:h<=2)",
            "true": [
                "普通以及简单难度福利",
                {
                    "type": "setValue",
                    "name": "status:def",
                    "operator": "+=",
                    "value": "5"
                },
                {
                    "type": "setValue",
                    "name": "status:hp",
                    "operator": "+=",
                    "value": "5000"
                },
                {
                    "type": "setValue",
                    "name": "item:yellowKey",
                    "operator": "+=",
                    "value": "1"
                },
                {
                    "type": "setValue",
                    "name": "item:blueKey",
                    "operator": "+=",
                    "value": "1"
                }
            ]
        },
        {
            "type": "if",
            "condition": "(flag:h<=1)",
            "true": [
                "简单难度福利",
                {
                    "type": "setValue",
                    "name": "status:def",
                    "operator": "+=",
                    "value": "10"
                },
                {
                    "type": "setValue",
                    "name": "status:hp",
                    "operator": "+=",
                    "value": "20000"
                },
                {
                    "type": "setValue",
                    "name": "item:yellowKey",
                    "operator": "+=",
                    "value": "3"
                },
                {
                    "type": "setValue",
                    "name": "item:blueKey",
                    "operator": "+=",
                    "value": "2"
                },
                {
                    "type": "hide",
                    "loc": [
                        [
                            3,
                            11
                        ]
                    ],
                    "floorId": "MT20",
                    "remove": true
                }
            ]
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {
        "6,0": {
            "floorId": "MT43",
            "loc": [
                6,
                12
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
    [141,141,141,141,141, 82, 91, 82,141,141,141,141,141],
    [141, 34, 21, 28,141,  0,218,  0,141, 27, 21, 30,141],
    [141,271,141, 81,141,254,141, 81,141, 82,141,272,141],
    [141,  0, 27,  0,141,  0,141,  0,141,  0, 28,  0,141],
    [141,141,141,254,141, 32,141, 32,141,224,141,141,141],
    [141, 30,  0,  0,  0, 29,141, 29,  0,  0,  0, 30,141],
    [141,141,224,141,141,141,141,141,141,141,218,141,141],
    [141, 31,  0,  0, 32,  0,141,  0, 32,  0,  0, 34,141],
    [141,141,141, 81,141, 81,141,224,141,254,141,141,141],
    [141,393, 31,  0,141, 31,  0, 31,141,  0, 31,393,141],
    [141,141,141,224,141,141, 22,141,141, 81,141,141,141],
    [141, 27, 21, 32,141, 34,  0, 34,141, 31, 21, 28,141],
    [141,141,141,141,141,141,141,141,141,141,141,141,141]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30004,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,30005,  0,  0,  0,30004,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,30005,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,30004,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,30004,  0,  0,  0,  0,  0,  0,30005,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,30005,  0,  0,  0,  0,  0,  0],
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