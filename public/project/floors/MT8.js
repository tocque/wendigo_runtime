main.floors.MT8=
{
    "floorId": "MT8",
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
            "type": "hideHero",
            "time": 0
        },
        {
            "type": "setText",
            "position": "down"
        },
        {
            "type": "pauseBgm"
        },
        {
            "type": "playSound",
            "name": "soldiers.wav"
        },
        {
            "type": "showImage",
            "code": 1,
            "image": "country.png",
            "loc": [
                -200,
                0
            ],
            "opacity": 1,
            "time": 1000
        },
        {
            "type": "playBgm",
            "name": "buan.mp3",
            "keep": true
        },
        {
            "type": "playSound",
            "name": "d_gen_walk_n.wav"
        },
        {
            "type": "hideImage",
            "code": 5,
            "time": 0
        },
        "\t[感染者纠察队]\f[jcd.png,0,0]上一次的例行检查中，我们有一个队伍遭到了袭击。",
        "\t[感染者纠察队]\f[jcd.png,0,0]现在，每一户都要接受搜查。不仅是感染者，一旦我们发现袭击者，我们会立刻击杀他们，而窝藏他们的村户，也会受到惩罚。",
        "\t[感染者纠察队]\f[jcd.png,0,0]不想服苦役的话，就告发他们。没人会因为你们光荣的报告受到伤害，而罪犯和感染者将得到他们应有的下场。",
        "\t[感染者纠察队]\f[jcd.png,0,0]接下来，从第一户开始。",
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
            "code": 1,
            "image": "home.png",
            "loc": [
                -100,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "hideImage",
            "code": 2,
            "time": 1000
        },
        "\t[塔露拉]\f[tllf.png,0,0]老奶奶，这一天还是来了。我肯定是躲不过的。",
        "\t[老妇]\f[lfj.png,0,0]别出去，塔露拉！藏在草棚后面......他们不会查的！我们就说你害怕受到惩罚，逃跑了！没有人会怪你的！",
        "\t[塔露拉]\f[tllb.png,0,0]可你们会被伤害的。这不该是我报答你们的方式。",
        "\t[塔露拉]\f[tllb.png,0,0]我留下了一点金币......这些是维多利亚金币，你们省着点花，一定够你们这辈子吃饱穿暖的。",
        "\t[老妇]\f[lfj.png,0,0]塔露拉，塔露拉！你要去哪？我的塔露拉......不可以，你不可以和他们见面啊！这些纠察队的黑虫子吃人不眨眼！",
        "\t[塔露拉]\f[tllb.png,0,0]所以不能让他们再压榨村子里的叔叔阿姨了。这种事应该有个结束。我会引开他们，警醒他们，我会让他们知道后果。",
        "\t[塔露拉]\f[tllb.png,0,0]我知道分寸的，老奶奶。我可不会让他们借机报复，再杀害村子里的人......",
        "\t[塔露拉]\f[tll.png,0,0]我还记得隔壁的弟弟只是因为扔了个石头就被活活打死。我忘不掉。",
        "\t[老妇]\f[lfj.png,0,0]塔露拉......塔露拉！别这么说......别这么说！",
        {
            "type": "playSound",
            "name": "knock.wav"
        },
        "\t[老妇]\f[lfj.png,0,0]谁！谁在敲门......是纠察队吗！走开！",
        "\t[阿丽娜]老妈妈，是我！",
        "\t[老妇]\f[lfj.png,0,0]阿丽娜！快进来，快进来！",
        {
            "type": "playSound",
            "name": "door1.wav"
        },
        "\t[老妇]\f[lfj.png,0,0]怎么了？发生什么事了？有消息吗？",
        "\t[阿丽娜]\f[alnj.png,0,0]......有人告密了。",
        {
            "type": "showImage",
            "code": 2,
            "image": "lfa.png",
            "loc": [
                -100,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "showImage",
            "code": 3,
            "image": "alna.png",
            "loc": [
                100,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        "\t[老妇]\f[lfj.png,-100,0]啊？什么？什么告密？",
        "\t[阿丽娜]\f[alnj.png,100,0]纠察队知道我们村子里有一个感染者。",
        "\t[老妇]\f[lfj.png,-100,0]怎么可能，不会这样的......啊！",
        {
            "type": "hideImage",
            "code": 3,
            "time": 0
        },
        {
            "type": "hideImage",
            "code": 2,
            "time": 0
        },
        "\t[阿丽娜]\f[alnj.png,0,0]我不知道他们从哪里得来的消息，但是我们都明白包藏感染者的下场是怎么个样子。",
        "\t[塔露拉]\f[tll.png,0,0]......",
        "\t[阿丽娜]\f[alnj.png,0,0]老妈妈，我爸爸去世得早，妈妈也全赖你们照顾，我把你们就当是我自己的爷爷奶奶一样。",
        "\t[阿丽娜]\f[alnj.png,0,0]到现在这个关头，我也没什么好隐瞒的......",
        "\t[塔露拉]\f[tllf.png,0,0]——等等。",
        "\t[塔露拉]\f[tll.png,0,0]奶奶，爷爷他去了哪里？",
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
            "code": 1,
            "image": "country.png",
            "loc": [
                -200,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "hideImage",
            "code": 2,
            "time": 1000
        },
        "\t[感染者纠察队]\f[jcd.png,0,0]臭老头子，你是来做什么的？",
        "\t[老汉]\f[lh.png,0,0]我犯了罪！",
        {
            "type": "showImage",
            "code": 2,
            "image": "jcda.png",
            "loc": [
                -100,
                0
            ],
            "opacity": 1,
            "time": 1000
        },
        {
            "type": "showImage",
            "code": 3,
            "image": "lha.png",
            "loc": [
                100,
                0
            ],
            "opacity": 1,
            "time": 1000
        },
        "\t[感染者纠察队]\f[jcd.png,-100,0]自首？啊，对，我记得了。我们那个队员是被一个老头拦下了。看你这一瘸一拐的，你就是当时的袭击者之一吧！",
        "\t[老汉]\f[lh.png,100,0]对！",
        "\t[感染者纠察队]\f[jcd.png,-100,0]......看你也没什么油水可敲。有多远滚多远吧。那些个小崽子也是不知好歹，跟穷农民犟什么？",
        "\t[老汉]\f[lh.png,100,0]不止。老爷，你看看我身上这块，你看像什么？",
        "\t[感染者纠察队]\f[jcd.png,-100,0]——",
        "\t[感染者纠察队]\f[jcd.png,-100,0]感染者！感染者就是你？",
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
            "code": 1,
            "image": "home.png",
            "loc": [
                -100,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "hideImage",
            "code": 2,
            "time": 1000
        },
        "\t[塔露拉]\f[tlln.png,0,0]你说什么？！",
        "\t[老妇]\f[lfj.png,0,0]我当时给你换衣服的时候，都看到啦......塔露拉，你是感染者，我和老头子知道很久了。",
        "\t[塔露拉]\f[tll.png,0,0]那——",
        "\t[老妇]\f[lfj.png,0,0]老头子去矿场赚点钱，也是染了矿石病才回来的！你看他一直穿着他那个夹克不肯脱掉......",
        "\t[老妇]\f[lfj.png,0,0]老头子是要替你顶罪啊，塔露拉......！",
        "\t[塔露拉]\f[tlln.png,0,0]不行！",
        "\t[塔露拉]\f[tlln.png,0,0]这岂不是说爷爷他......",
        "\t[老妇]\f[lfj.png,0,0]村子里那些人都信不过的！只要是为了钱，为了保命，他们什么事儿都能往外说！",
        "\t[老妇]\f[lfj.png,0,0]这两年，塔露拉，我们真的很欢喜你！你是个好孩子......是个好孩子！",
        "\t[老妇]\f[lfj.png,0,0]我们也没几天好活了，但是你，塔露拉，就算得了病，你也是能再多活几年的！你得好好活着才行......",
        "\t[老妇]\f[lfj.png,0,0]塔露拉，别去！别去啊......！",
        {
            "type": "playSound",
            "name": "run.wav"
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
            "code": 1,
            "image": "country.png",
            "loc": [
                -200,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "hideImage",
            "code": 2,
            "time": 1000
        },
        "\t[老汉]\f[lh.png,0,0]抓我走。",
        "\t[老汉]\f[lh.png,0,0]老爷，抓我走吧！",
        "\t[老汉]\f[lh.png,0,0]你看我这身上！我才是那个得了病的！",
        {
            "type": "showImage",
            "code": 2,
            "image": "lha.png",
            "loc": [
                100,
                0
            ],
            "opacity": 1,
            "time": 1000
        },
        {
            "type": "showImage",
            "code": 3,
            "image": "jcda.png",
            "loc": [
                -100,
                0
            ],
            "opacity": 1,
            "time": 1000
        },
        "\t[感染者纠察队]\f[jcd.png,-100,0]......",
        "\t[老汉]\f[lh.png,100,0]不信的话，你就看看这个吧！",
        "\t[感染者纠察队]\f[jcd.png,-100,0]刀？把刀放下。老头，你伤不到我们。",
        "\t[老汉]\f[lh.png,100,0]不，老爷，你看看我的法术......你看看我的法术！",
        "老人切开了自己的手腕，红色没有流进雪地，而是像雾一样弥散在空气中。",
        "\t[老汉]\f[lh.png,100,0]你看，你看......老爷！我是货真价实的感染者！",
        {
            "type": "pauseBgm"
        },
        {
            "type": "showImage",
            "code": 3,
            "image": "jcd.png",
            "loc": [
                -100,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "showImage",
            "code": 2,
            "image": "lh.png",
            "loc": [
                100,
                0
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "moveImage",
            "code": 3,
            "to": [
                50,
                0
            ],
            "time": 500
        },
        "\t[感染者纠察队]啊，我相信",
        {
            "type": "playSound",
            "name": "sword.wav"
        },
        {
            "type": "showImage",
            "code": 4,
            "image": "dark.png",
            "loc": [
                0,
                0
            ],
            "opacity": 1,
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
        "\t[感染者纠察队]\f[jcd.png,0,0]感谢你的合作，感染者。",
        "\t[老汉]\f[lh.png,0,0]唔......唔......！",
        "\t[老汉]\f[lh.png,0,0]塔露......拉......",
        {
            "type": "playSound",
            "name": "fall.wav"
        },
        "\t[阿丽娜]塔露拉！回来！别去！",
        "\t[阿丽娜]这是......火？",
        "\t[阿丽娜]这是什么？！为什么房子烧起来了——",
        "\t[阿丽娜]塔露拉！这是你——",
        "\t[阿丽娜]不要去！！塔露拉！！这样整个村子都会遭殃的！！",
        {
            "type": "playSound",
            "name": "d_gen_walk_n.wav"
        },
        {
            "type": "showImage",
            "code": 2,
            "image": "s.png",
            "loc": [
                0,
                150
            ],
            "opacity": 1,
            "time": 500
        },
        "\t[塔露拉]......",
        {
            "type": "showImage",
            "code": 3,
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
            "image": "ts2.png",
            "loc": [
                0,
                150
            ],
            "opacity": 1,
            "time": 0
        },
        {
            "type": "playSound",
            "name": "levelup.wav"
        },
        {
            "type": "hideImage",
            "code": 3,
            "time": 1000
        },
        "\t[塔露拉]\r[red]火",
        {
            "type": "playSound",
            "name": "bottom.wav"
        },
        {
            "type": "setValue",
            "name": "item:I324",
            "value": "1"
        },
        {
            "type": "hideImage",
            "code": 2,
            "time": 1000,
            "async": true
        },
        {
            "type": "hideImage",
            "code": 1,
            "time": 1000
        },
        {
            "type": "waitAsync"
        },
        {
            "type": "setValue",
            "name": "flag:jq1",
            "value": "1"
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "0,12": {
            "0": {
                "condition": "flag:jq1===1",
                "currentFloor": true,
                "priority": 0,
                "delayExecute": false,
                "multiExecute": false,
                "data": [
                    {
                        "type": "pauseBgm"
                    },
                    "\t[感染者纠察队队长]\f[jcd.png:x,100,0]那么，我们就暂时收队......",
                    {
                        "type": "showHero"
                    },
                    {
                        "type": "playBgm",
                        "name": "yinmou.mp3",
                        "keep": true
                    },
                    "\t[感染者纠察队队长]\f[jcd.png:x,100,0]嗯？",
                    "\t[感染者纠察队队长]\f[jcd.png:x,100,0]这是哪来的小姐？",
                    "\t[塔露拉]\f[tll.png,-100,0]杂碎！",
                    "\t[感染者纠察队队长]\f[jcd.png:x,100,0]这是哪来的小姐？等等......",
                    {
                        "type": "moveHero",
                        "time": 1000,
                        "steps": [
                            "up",
                            "up"
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A336",
                        "loc": [
                            [
                                6,
                                11
                            ]
                        ],
                        "time": 500
                    },
                    "\t[感染者纠察队队长]\f[jcd.png:x,100,0]......火？这是...源石技艺？",
                    {
                        "type": "moveHero",
                        "time": 1000,
                        "steps": [
                            "up",
                            "up"
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A336",
                        "loc": [
                            [
                                6,
                                9
                            ]
                        ],
                        "time": 500
                    },
                    "\t[感染者纠察队队员]\f[jcd.png,-100,0]长官，检测到强大的源石脉冲反应",
                    "\t[塔露拉]\f[tll.png,-100,0]！",
                    "\t[感染者纠察队队长]\f[jcd.png:x,100,0]她要攻击了，大家散开！",
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
                        "type": "playSound",
                        "name": "p_skill_jueying_2.wav"
                    },
                    {
                        "type": "animate",
                        "name": "zone",
                        "loc": "hero"
                    },
                    {
                        "type": "playSound",
                        "name": "118-Fire02.ogg"
                    },
                    {
                        "type": "changeFloor",
                        "floorId": "MT9",
                        "loc": [
                            6,
                            8
                        ]
                    }
                ]
            },
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [142,  0,  0,332,  0,332,  0,332,20040,332,  0,  0,142],
    [142,332,  0,  0,332,  0,332,30057,332,  0,  0,332,142],
    [142,  0,332,  0,  0,  0,332,  0,  0,  0,332,  0,142],
    [142,  0,  0,330,  0,330,  0,330,  0,330,  0,  0,142],
    [142,20040,  0,  0,330,  0,330,  0,330,  0,  0,  0,142],
    [142,  0,  0,  0,  0,340,  0,340,  0,  0,  0,  0,142],
    [142,20044,20044,20044,20044,20044,342,20044,20044,20044,20044,20044,142],
    [142,  0,103,  0,20040,  0,  0,  0,  0,  0,103,  0,142],
    [142,  0,  0,20018,  0,  0,  0,20040,20018,  0,  0,20015,142],
    [142,  0,  0,20026,  0,  0,  0,  0,20026,  0,  0,  0,142],
    [142,  0,  0,  0,  0,20030,  0,20030,  0,  0,  0,  0,142],
    [20160,20161,20162,20163,20164,  0,  0,  0,20160,20161,20162,20163,20164],
    [20168,20169,20170,20171,20172,  0,  0,  0,20168,20169,20170,20171,20172]
],
    "bgmap": [
    [  0,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,20016,  0,  0,20017,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,20016,  0,20017,  0,  0,  0,  0,  0,  0,20016,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,20016,  0,  0,  0],
    [  0,  0,  0,20016,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,20017,  0,  0,  0],
    [  0,20017,  0,  0,  0,  0,20016,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "fgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,20060,20060,20060,20060,20060,  0,20060,20060,20060,20060,20060,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,20007,  0],
    [20136,20137,20138,20139,20140,  0,  0,20136,20136,20137,20138,20139,20140],
    [20144,20145,20146,20147,20148,  0,  0,  0,20144,20145,20146,20147,20148],
    [20152,20153,20154,20155,20156,  0,  0,  0,20152,20153,20154,20155,20156],
    [  0,  0,  0,10290,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "weather": [
        "snow",
        1
    ],
    "beforeBattle": {},
    "cannotMoveIn": {}
}