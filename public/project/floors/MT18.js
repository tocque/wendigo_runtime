main.floors.MT18=
{
    "floorId": "MT18",
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
            "type": "hide",
            "loc": [
                [
                    6,
                    12
                ]
            ]
        },
        {
            "type": "playBgm",
            "name": "piaobo.mp3",
            "keep": true
        },
        "泰拉1088年",
        "科西切死后第六年",
        "感染者组织驻扎地",
        {
            "type": "hideImage",
            "code": 1,
            "time": 0
        },
        "\t[塔露拉]\f[tll.png:x,100,0]经过了多日的努力，我们的队伍总算称得上是一个“队伍”了。",
        "\t[塔露拉]\f[tllb.png:x,100,0]即便如此，我们的处境依然艰难",
        "\t[塔露拉]\f[tllb.png:x,100,0]没有人会为感染者提供援助。我们不是义军，不是大耳米哈伊尔时期的“勇敢的大锅”，没有自己的城市，也没有多少培土和田地。",
        "\t[塔露拉]\f[tllb.png:x,100,0]“我们身上长着源石，手里握着没几把武器。雪在嘴里融化了就是水，肚子里装满了草籽和树皮。”",
        "\t[塔露拉]\f[tllb.png:x,100,0]他们就是这么唱的。我最近学了不少。",
        "\t[塔露拉]\f[tllb.png:x,100,0]我们只是一些无处可去的感染者。",
        "\t[塔露拉]\f[tll.png:x,100,0]我越来越觉得，先来北原这件事是对的。这里到处都是无处可归，无处可去的人。",
        "\t[塔露拉]\f[tll.png:x,100,0]城市中的感染者和民众会被分化，各个国家也会因为种族不同而互相怀疑。只有在雪原上，人才会变得简单一些。",
        "\t[塔露拉]\f[tll.png:x,100,0]我想回去南方。不过这趟回去，我应该不会是一个人。",
        "\t[塔露拉]\f[tll.png:x,100,0]感染者在雪原上冻死饿死，和感染者在自己的土地上病死，是不一样的。",
        "\t[塔露拉]\f[tll.png:x,100,0]感染者应该开拓自己的城市。如果乌萨斯不允许，这个乌萨斯就该被改变。",
        "\t[塔露拉]\f[tll.png:x,100,0]流亡，逃窜，离开这个国家，最后也只是流离失所。这大地上说的那些接纳感染者的地方，只是些童话。",
        "\t[塔露拉]\f[tll.png:x,100,0]感染者想要重拾尊严，需要力量，需要团结，需要改变现状。",
        "\t[塔露拉]\f[tll.png:x,100,0]重要的是重拾感染者的信心。关键的是让我们的生命有意义。",
        {
            "type": "show",
            "loc": [
                [
                    6,
                    12
                ]
            ],
            "time": 500,
            "async": true
        },
        "\t[塔露拉]\f[tll.png:x,100,0]如果我们能找到感染者游击队......",
        {
            "type": "waitAsync"
        },
        {
            "type": "pauseBgm"
        },
        {
            "type": "move",
            "loc": [
                6,
                12
            ],
            "time": 1000,
            "keep": true,
            "steps": [
                "up:1"
            ]
        },
        {
            "type": "playSound",
            "name": "knock.wav"
        },
        {
            "type": "changePos",
            "loc": [
                5,
                8
            ]
        },
        "\t[塔露拉]\f[tll.png:x,100,0]谁？",
        {
            "type": "playBgm",
            "name": "warm.mp3",
            "keep": true
        },
        "\t[阿丽娜]\f[aln.png,-100,0]是我，阿丽娜。",
        {
            "type": "moveHero",
            "time": 1000,
            "steps": [
                "right:1",
                "down:1"
            ]
        },
        {
            "type": "openDoor",
            "loc": [
                6,
                10
            ]
        },
        {
            "type": "moveHero",
            "time": 1000,
            "steps": [
                "left:1"
            ]
        },
        {
            "type": "changePos",
            "loc": [
                5,
                9
            ],
            "direction": "right"
        },
        {
            "type": "move",
            "loc": [
                6,
                11
            ],
            "time": 1000,
            "keep": true,
            "steps": [
                "up:2"
            ]
        },
        {
            "type": "setBlock",
            "number": "N381",
            "loc": [
                [
                    6,
                    9
                ]
            ]
        },
        {
            "type": "showImage",
            "code": 2,
            "image": "tlla.png",
            "reverse": ":x",
            "loc": [
                100,
                0
            ],
            "opacity": 1,
            "time": 500
        },
        {
            "type": "showImage",
            "code": 3,
            "image": "alna.png",
            "loc": [
                -100,
                0
            ],
            "opacity": 1,
            "time": 500
        },
        "\t[塔露拉]\f[tllx.png:x,100,0]有什么事？",
        "\t[阿丽娜]\f[aln.png,-100,0]来看看我们的领袖在干嘛",
        "\t[阿丽娜]\f[aln.png,-100,0]这画的是......一个哨站？",
        "\t[塔露拉]\f[tllx.png:x,100,0]只是记录我的所想罢了",
        "\t[阿丽娜]\f[aln.png,-100,0]顺便，这是今天的晚餐，今天运气真好，找到了许多可以吃的东西",
        "\t[塔露拉]\f[tllx.png:x,100,0]他们的份呢？",
        "\t[阿丽娜]\f[aln.png,-100,0]他们的份都有，这是余下——",
        "\t[塔露拉]\f[tll.png:x,100,0]......",
        "\t[阿丽娜]\f[aln.png,-100,0]怎么不吃？",
        "\t[塔露拉]\f[tllf.png:x,100,0]你受伤了",
        {
            "type": "animate",
            "name": "jy",
            "loc": [
                6,
                9
            ]
        },
        "\t[阿丽娜]\f[alnj.png,-100,0]——",
        "\t[阿丽娜]\f[aln.png,-100,0]我觉得我应该藏的挺好的......",
        "\t[阿丽娜]\f[aln.png,-100,0]没关系的，只是不小心从树上掉下来了！",
        "\t[塔露拉]\f[tllb.png:x,100,0]这里四周是平原，根本没有那么高的树——",
        "\t[塔露拉]\f[tll.png:x,100,0]你......走了多远的路",
        "\t[阿丽娜]\f[alnj.png,-100,0]唔......",
        "\t[塔露拉]\f[tll.png:x,100,0]阿丽娜，别再这样了，万一你遇见纠察队，万一你遇到野熊，万一......",
        "\t[阿丽娜]\f[alnj.png,-100,0]你已经两天没吃像样的东西了。",
        "\t[塔露拉]\f[tll.png:x,100,0]大家都是如此。",
        "\t[阿丽娜]\f[alnj.png,-100,0]你把干粮都留给了其他的感染者。",
        "\t[塔露拉]\f[tll.png:x,100,0]我有留给自己——",
        "\t[阿丽娜]\f[alnj.png,-100,0]拜托了，我们都不想看见你倒下......",
        "\t[塔露拉]\f[tll.png:x,100,0]你先吃。",
        "\t[阿丽娜]\f[alnj.png,-100,0]我......吃过了。",
        "这时，一声不合时宜的声音从阿丽娜的肚子中传了出来",
        "\t[塔露拉]\f[tlln.png:x,100,0]阿丽娜！",
        "\t[阿丽娜]\f[aln.png,-100,0]——我们一起吃吧。",
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
        "\t[阿丽娜]所以，你明天打算带我们干嘛？",
        "\t[塔露拉]去附近的一个纠察队建立的哨站。",
        "\t[阿丽娜]哨站？可是，我们的力量......",
        "\t[塔露拉]并不是我们，我们显然没有这个本事",
        "\t[塔露拉]另一支部队要攻击那个哨站",
        "\t[阿丽娜]啊？难道是......",
        {
            "type": "pauseBgm"
        },
        "\t[塔露拉]“盾”",
        {
            "type": "waitAsync"
        },
        {
            "type": "changeFloor",
            "floorId": "MT19",
            "loc": [
                7,
                11
            ],
            "direction": "up"
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025],
    [10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025],
    [10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025],
    [10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025],
    [10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025],
    [10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025,10025],
    [10025,10025,10025,10025,10028,10033,10033,10033,10027,10025,10025,10025,10025],
    [10025,10025,10025,10025,10026,10160,10161,10162,10024,10025,10025,10025,10025],
    [10025,10025,10025,10025,10026,10176,10152,10154,10024,10025,10025,10025,10025],
    [10025,10025,10025,10025,10026,  0,  0,  0,10024,10025,10025,10025,10025],
    [10025,10025,10025,10025,10020,10018, 85,10016,10019,10025,10025,10025,10025],
    [10025,10025,10025,10025,10028,10034,  0,10032,10027,10025,10025,10025,10025],
    [10025,10025,10025,10025,10026,  0,383,  0,10024,10025,10025,10025,10025]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10006,10006,10006,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10006,10006,10006,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,10026,10006,10006,10006,10024,  0,  0,  0,  0],
    [  0,  0,  0,  0,10025,10025,30000,10025,10025,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,20011,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,20011,  0,  0,  0,  0,  0,  0]
],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}