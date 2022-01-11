main.floors.MT30=
{
    "floorId": "MT30",
    "title": "西北冻原",
    "name": "西北冻原",
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
    "events": {},
    "changeFloor": {
        "12,6": {
            "floorId": "MT27",
            "loc": [
                0,
                5
            ]
        },
        "6,0": {
            "floorId": "MT31",
            "loc": [
                6,
                12
            ]
        }
    },
    "afterBattle": {
        "5,9": [
            {
                "type": "setValue",
                "name": "flag:door_MT30_6_8",
                "operator": "+=",
                "value": "1"
            }
        ],
        "7,9": [
            {
                "type": "setValue",
                "name": "flag:door_MT30_6_8",
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
                "condition": "flag:door_MT30_6_8==2",
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
                        "name": "flag:door_MT30_6_8",
                        "operator": "=",
                        "value": "null"
                    }
                ]
            }
        }
    },
    "cannotMove": {},
    "map": [
    [80007, 32,80007,80007, 32,80007, 91,80007, 32, 22, 32,418, 81],
    [80007,  0, 31, 31,  0,418,  0,80007,80007,80007,80007,80007,  0],
    [80007,416,80007,80007,80007,80007, 21,80007, 33,80007, 33,80007, 31],
    [ 28,  0, 27,80007,  0, 21,  0, 82, 33,80007, 33,418, 81],
    [ 81,80007,80007,80007,30037,30038,30038,30038,30039,80007,80007,80007, 32],
    [  0,416, 21,80007,30045, 27, 33, 27,30047,  0, 27,80007,416],
    [ 34,80007, 29,80007,30045, 28,350, 28,30047, 28,  0,416, 94],
    [ 81,80007,80007,80007,30053,30054,  0,30054,30055,80007,80007,80007,416],
    [ 34,80007, 29,80007,30061,30062, 85,30062,30063,80007, 33,80007, 32],
    [  0,418, 21,80007, 27,418,  0,418, 27,80007, 31,418, 81],
    [ 81,80007,80007,80007, 81,80007,347,80007, 81,80007,80007,80007, 31],
    [  0,80007,  0,418,  0, 32,416, 32,  0,418,  0,80007,  0],
    [416,  0, 27,80007,80007,80007, 33,80007,80007,80007, 27,416, 81]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,20016,  0,20011,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047],
    [  0,20016,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20016,  0,20003],
    [  0,  0,  0,  0,  0,  0,30116,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,30131,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,20017,  0,20016,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047],
    [  0,  0,20016,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,30047]
],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}