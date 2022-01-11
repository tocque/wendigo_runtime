main.floors.MT13=
{
    "floorId": "MT13",
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
    "firstArrive": [
        {
            "type": "pauseBgm"
        },
        {
            "type": "playSound",
            "name": "tear.wav"
        },
        "\t[塔露拉]\f[tll.png,0,0]——",
        "\t[塔露拉]\f[tll.png,0,0]有某种力量在引导我回忆起来什么东西......",
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
        "\t[？？？]等到你开始管理一支军队的时候，你就会了解，塔露拉",
        "\t[？？？]军队之所以称为军队，就代表了它不是1+1=2这么简单",
        "\t[？？？]而如何解决1+1>2,就是军队的指挥官需要考虑的事情",
        "\t[？？？]而反过来讲，只要你瘫痪了敌方的指挥，军队也可能变成1+1<2",
        {
            "type": "hideImage",
            "code": 1,
            "time": 0
        },
        {
            "type": "callBook"
        },
        "\t[塔露拉]\f[tll.png,0,0]......",
        "\t[塔露拉]\f[tll.png,0,0]看来这个区域存在有指挥官一类的角色",
        "\t[塔露拉]\f[tll.png,0,0]我需要优先解决指挥官，这样敌军的力量便会大幅削减"
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {
        "12,12": {
            "floorId": "MT12",
            "loc": [
                6,
                0
            ]
        },
        "6,0": {
            "floorId": "MT14",
            "loc": [
                5,
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
    [ 32, 30, 32,141,  0, 33, 91,141,  0, 27,141, 31,  0],
    [141,340,141,141, 81,141,141,141, 34,  0,141,  0, 32],
    [ 27, 21, 27,141,330,  0, 32,141,  0, 28,141, 34,  0],
    [141,202,141,141,141,141,267,141,332,141,141,141,332],
    [  0, 31,204,  0, 28,141,  0, 30,  0, 30,141,  0, 31],
    [  0,  0,141, 28,  0,202,  0,141,141,141,141, 30,  0],
    [141,332,141,141,141,  0,267, 27, 29, 31,141,  0, 31],
    [ 31,  0,141, 32, 81,203,141,141,141,141,141,267,141],
    [  0, 30,141, 34,141,  0, 31,  0, 32,203, 32,  0, 31],
    [203,141,141,141,141,141,141,141,141, 81,141,332,141],
    [ 31, 29, 32, 21,141, 31, 27,141, 21,  0,141, 34, 32],
    [141,141, 81,141,141,204,141,141,202,141,141,141,141],
    [ 32, 31,267, 27,141,  0, 21, 32,  0, 32, 30,  0, 93]
],
    "bgmap": [
    [  0,  0,20016,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,20017,  0,  0,  0,  0,  0,  0,  0,  0],
    [20016,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,20017,  0,  0,  0,  0,  0],
    [20017,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20016],
    [  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,20017,  0,  0,20016,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20016],
    [20016,  0,  0,  0,  0,  0,  0,  0,  0,20016,  0,  0,  0],
    [  0,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,20016,  0,  0,  0,  0,  0,20017,  0,  0,  0,  0]
],
    "fgmap": [

],
    "weather": [
        "snow",
        6
    ]
}