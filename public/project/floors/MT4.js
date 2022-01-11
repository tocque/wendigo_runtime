main.floors.MT4=
{
    "floorId": "MT4",
    "title": "prts内部",
    "name": "4",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "ratio": 1,
    "defaultGround": "X20000",
    "firstArrive": [
        {
            "type": "playBgm",
            "name": "bg.mp3",
            "keep": true
        },
        {
            "type": "hideImage",
            "code": 0,
            "time": 0
        },
        {
            "type": "setValue",
            "name": "item:coin",
            "value": "1"
        },
        "\t[塔露拉]\b[down,null]\f[tll.png,0,0]你们要为你们的行为付出代价",
        {
            "type": "playSound",
            "name": "atk.wav"
        },
        {
            "type": "animate",
            "name": "sword",
            "loc": "hero",
            "alignWindow": true
        },
        "\t[纠察队]\b[down,null]\f[jcd.png,0,0]可恶，区区一个平民，怎么会剑术？",
        "\t[纠察队]\b[down,null]\f[jcda.png,0,0](先撤再说)",
        {
            "type": "jump",
            "from": [
                6,
                11
            ],
            "to": [
                6,
                0
            ],
            "time": 500
        },
        "\t[塔露拉]\b[down,null]\f[tlla.png,0,0]（他们训练的源石虫,还有纠察队自身的装甲...）",
        "\t[塔露拉]\b[down,null]\f[tlla.png,0,0]（对于百姓可能有点麻烦，但是有人教过我怎么对付）",
        {
            "type": "setValue",
            "name": "item:lifeWand",
            "value": "1"
        },
        "\t[塔露拉]\b[down,null]\f[tll.png,-100,0]就用我的源石技艺",
        {
            "type": "hideImage",
            "code": 100,
            "time": 0
        },
        {
            "type": "setValue",
            "name": "item:book",
            "value": "1"
        },
        {
            "type": "setEnemy",
            "id": "greenSlime",
            "name": "hp",
            "value": "150"
        },
        {
            "type": "setEnemy",
            "id": "greenSlime",
            "name": "atk",
            "value": "50"
        },
        {
            "type": "setEnemy",
            "id": "greenSlime",
            "name": "def",
            "value": "5"
        },
        {
            "type": "if",
            "condition": "(flag:h<=2)",
            "true": [
                {
                    "type": "setValue",
                    "name": "status:hp",
                    "operator": "+=",
                    "value": "3000"
                },
                {
                    "type": "setValue",
                    "name": "status:mdef",
                    "operator": "+=",
                    "value": "50"
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
                    "value": "1"
                },
                {
                    "type": "setGlobalValue",
                    "name": "purify",
                    "value": 2
                },
                {
                    "type": "hide",
                    "loc": [
                        [
                            6,
                            9
                        ]
                    ],
                    "floorId": "MT7",
                    "remove": true
                }
            ]
        },
        {
            "type": "if",
            "condition": "(flag:h<=1)",
            "true": [
                {
                    "type": "setValue",
                    "name": "status:hp",
                    "operator": "+=",
                    "value": "5000"
                },
                {
                    "type": "setValue",
                    "name": "status:mdef",
                    "operator": "+=",
                    "value": "150"
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
                    "value": "1"
                },
                {
                    "type": "setGlobalValue",
                    "name": "purify",
                    "value": 1
                }
            ]
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {
        "6,0": {
            "floorId": "MT5",
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
    [30018, 32,  0, 27,20040,30017, 91, 28,20028, 32, 22,  0,20021],
    [  0,  0, 34,20030,  0,  0,204,20019,20020,204,  0,30018, 31],
    [20030,202,  0,  0,204,30029, 31,30030,  0,  0, 81, 34, 28],
    [ 28,  0,20021,20022,  0, 29,30018,  0,203,  0,30007,  0, 31],
    [ 81,  0,30030,  0, 31,  0,  0, 21,30046,  0,30015,204,20030],
    [  0,30018,  0,201,30030,  0,20030,  0,20021,20022,  0, 21,  0],
    [ 21, 30,204, 34,20006, 29,  0, 33, 82,  0,203,  0, 33],
    [20006, 81,20019,20020,20014, 81,20030,30057,30018,  0,  0,20019,20020],
    [20014, 29,  0,30018,  0,203,  0,  0,  0,202,30018, 31, 27],
    [ 31,203, 81,  0, 21,30046, 81,30057, 21,  0, 81,202,20030],
    [30018, 31, 29,20006, 81,  0,201,  0,20021,20022,  0,20040, 31],
    [20007, 28,  0,20014,201,  0,332,  0,201,  0,201, 29, 32],
    [20015,  0,202,  0,  0,20027,  0,30031,  0, 21,  0, 81,20006]
],
    "bgmap": [
    [  0,  0,  0,  0,20016,  0,30011,  0,  0,  0,  0,  0,  0],
    [20016,  0,  0,  0,30011,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,20017,  0,  0,  0,  0,  0,  0,20016,  0],
    [  0,30011,  0,  0,  0,30019,  0,  0,  0,30003,  0,  0,  0],
    [  0,  0,20016,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30011],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,30011,  0,  0,  0],
    [  0,30011,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [20016,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20016,  0],
    [  0,  0,30011,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,20016,  0,  0,  0,  0,  0,  0,20017,  0,  0,  0]
],
    "fgmap": [

],
    "bgm": "bg.mp3"
}