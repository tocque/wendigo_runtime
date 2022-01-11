var items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a = 
{
	"yellowKey": {
		"cls": "tools",
		"name": "黄钥匙",
		"text": "可以打开一扇黄门",
		"hideInToolbox": true
	},
	"blueKey": {
		"cls": "tools",
		"name": "蓝钥匙",
		"text": "可以打开一扇蓝门",
		"hideInToolbox": true
	},
	"redKey": {
		"cls": "tools",
		"name": "红钥匙",
		"text": "可以打开一扇红门",
		"hideInToolbox": true
	},
	"redGem": {
		"cls": "items",
		"name": "刺激性源石",
		"text": "攻击+${core.values.redGem}",
		"itemEffect": "core.status.hero.atk += core.values.redGem * core.status.thisMap.ratio",
		"itemEffectTip": "，攻击+${core.values.redGem * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.atk += core.values.redGem",
		"canUseItemEffect": "true"
	},
	"blueGem": {
		"cls": "items",
		"name": "温和型源石",
		"text": "，防御+${core.values.blueGem}",
		"itemEffect": "core.status.hero.def += core.values.blueGem * core.status.thisMap.ratio",
		"itemEffectTip": "，防御+${core.values.blueGem * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.def += core.values.blueGem",
		"canUseItemEffect": "true"
	},
	"greenGem": {
		"cls": "items",
		"name": "护盾型源石",
		"text": "，护盾+${core.values.greenGem}",
		"itemEffect": "core.status.hero.mdef += core.values.greenGem * core.status.thisMap.ratio",
		"itemEffectTip": "，护盾+${core.values.greenGem * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.mdef += core.values.greenGem",
		"canUseItemEffect": "true"
	},
	"yellowGem": {
		"cls": "items",
		"name": "普适源石",
		"text": "可以进行加点",
		"itemEffect": "core.status.hero.mana += 20;\nif (core.getFlag('hero', 0) == 4) { core.status.hero.mana += 20; }",
		"itemEffectTip": "，源石技艺值增加${(flag:hero==4)?(40):(20)}",
		"useItemEvent": null,
		"canUseItemEffect": "true"
	},
	"redPotion": {
		"cls": "items",
		"name": "红色止血粉",
		"text": "，生命+${core.values.redPotion}",
		"itemEffect": "if (core.getFlag('hero', 0) == 0)\n\tcore.status.hero.hp += core.values.redPotion * core.status.thisMap.ratio * 1.5;\nelse\n\tcore.status.hero.hp += core.values.redPotion * core.status.thisMap.ratio;",
		"itemEffectTip": ",生命+${(flag:hero==0)?(core.values.redPotion * core.status.thisMap.ratio * 1.5):(core.values.redPotion * core.status.thisMap.ratio)}",
		"useItemEffect": "core.status.hero.hp += core.values.redPotion",
		"canUseItemEffect": "true"
	},
	"bluePotion": {
		"cls": "items",
		"name": "蓝色止血粉",
		"text": "，生命+${core.values.bluePotion}",
		"itemEffect": "if (core.getFlag('hero', 0) == 0)\n\tcore.status.hero.hp += core.values.bluePotion * core.status.thisMap.ratio * 1.5;\nelse\n\tcore.status.hero.hp += core.values.bluePotion * core.status.thisMap.ratio;",
		"itemEffectTip": ",生命+${(flag:hero==0)?(core.values.bluePotion * core.status.thisMap.ratio * 1.5):(core.values.bluePotion * core.status.thisMap.ratio)}",
		"useItemEffect": "core.status.hero.hp += core.values.bluePotion",
		"canUseItemEffect": "true"
	},
	"yellowPotion": {
		"cls": "items",
		"name": "黄色止血粉",
		"text": "，生命+${core.values.yellowPotion}",
		"itemEffect": "if (core.getFlag('hero', 0) == 0)\n\tcore.status.hero.hp += core.values.yellowPotion * core.status.thisMap.ratio * 1.5;\nelse\n\tcore.status.hero.hp += core.values.yellowPotion * core.status.thisMap.ratio;",
		"itemEffectTip": ",生命+${(flag:hero==0)?(core.values.yellowPotion * core.status.thisMap.ratio * 1.5):(core.values.yellowPotion * core.status.thisMap.ratio)}",
		"useItemEffect": "core.status.hero.hp += core.values.yellowPotion",
		"canUseItemEffect": "true"
	},
	"greenPotion": {
		"cls": "items",
		"name": "绿色止血粉",
		"text": "，生命+${core.values.greenPotion}",
		"itemEffect": "if (core.getFlag('hero', 0) == 0)\n\tcore.status.hero.hp += core.values.greenPotion * core.status.thisMap.ratio * 1.5;\nelse\n\tcore.status.hero.hp += core.values.greenPotion * core.status.thisMap.ratio;",
		"itemEffectTip": ",生命+${(flag:hero==0)?(core.values.greenPotion * core.status.thisMap.ratio * 1.5):(core.values.greenPotion * core.status.thisMap.ratio)}",
		"useItemEffect": "core.status.hero.hp += core.values.greenPotion",
		"canUseItemEffect": "true"
	},
	"sword0": {
		"cls": "items",
		"name": "破旧的剑",
		"text": "一把已经生锈的剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 0
			}
		},
		"itemEffect": "core.status.hero.atk += 0",
		"itemEffectTip": "，攻击+0"
	},
	"sword1": {
		"cls": "items",
		"name": "铁剑",
		"text": "一把很普通的铁剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 10
			}
		},
		"itemEffect": "core.status.hero.atk += 10",
		"itemEffectTip": "，攻击+10"
	},
	"sword2": {
		"cls": "items",
		"name": "银剑",
		"text": "一把很普通的银剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 20
			}
		},
		"itemEffect": "core.status.hero.atk += 20",
		"itemEffectTip": "，攻击+20"
	},
	"sword3": {
		"cls": "items",
		"name": "骑士剑",
		"text": "一把很普通的骑士剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 40
			}
		},
		"itemEffect": "core.status.hero.atk += 40",
		"itemEffectTip": "，攻击+40"
	},
	"sword4": {
		"cls": "items",
		"name": "圣剑",
		"text": "一把很普通的圣剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 80
			}
		},
		"itemEffect": "core.status.hero.atk += 80",
		"itemEffectTip": "，攻击+80"
	},
	"sword5": {
		"cls": "items",
		"name": "神圣剑",
		"text": "一把很普通的神圣剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 160
			}
		},
		"itemEffect": "core.status.hero.atk += 100",
		"itemEffectTip": "，攻击+100"
	},
	"shield0": {
		"cls": "items",
		"name": "破旧的盾",
		"text": "一个很破旧的铁盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 0
			}
		},
		"itemEffect": "core.status.hero.def += 0",
		"itemEffectTip": "，防御+0"
	},
	"shield1": {
		"cls": "items",
		"name": "铁盾",
		"text": "一个很普通的铁盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 10
			}
		},
		"itemEffect": "core.status.hero.def += 10",
		"itemEffectTip": "，防御+10"
	},
	"shield2": {
		"cls": "items",
		"name": "银盾",
		"text": "一个很普通的银盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 20
			}
		},
		"itemEffect": "core.status.hero.def += 20",
		"itemEffectTip": "，防御+20"
	},
	"shield3": {
		"cls": "items",
		"name": "骑士盾",
		"text": "一个很普通的骑士盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 40
			}
		},
		"itemEffect": "core.status.hero.def += 40",
		"itemEffectTip": "，防御+40"
	},
	"shield4": {
		"cls": "items",
		"name": "圣盾",
		"text": "一个很普通的圣盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 80
			}
		},
		"itemEffect": "core.status.hero.def += 80",
		"itemEffectTip": "，防御+80"
	},
	"shield5": {
		"cls": "items",
		"name": "神圣盾",
		"text": "一个很普通的神圣盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 100,
				"mdef": 100
			}
		},
		"itemEffect": "core.status.hero.def += 100;core.status.hero.mdef += 100",
		"itemEffectTip": "，防御+100，护盾+100"
	},
	"superPotion": {
		"cls": "items",
		"name": "圣水",
		"itemEffect": "core.status.hero.hp *= 2",
		"itemEffectTip": "，生命值翻倍",
		"useItemEffect": "core.status.hero.hp *= 2;",
		"canUseItemEffect": "true",
		"text": "生命值翻倍"
	},
	"silverCoin": {
		"cls": "items",
		"name": "银币",
		"itemEffect": "core.status.hero.money += 500",
		"itemEffectTip": "，金币+500"
	},
	"book": {
		"cls": "constants",
		"name": "普瑞特斯之眼",
		"text": "这本不存在于世界的奇幻图书可以随时查看当前地区各敌人的信息及能力",
		"hideInToolbox": true,
		"useItemEffect": "core.ui.drawBook(0);",
		"canUseItemEffect": "true"
	},
	"fly": {
		"cls": "constants",
		"name": "霜星之核",
		"text": "这个东西代表着你现在正在操纵着霜星，你可以利用它来查看霜星的信息",
		"hideInReplay": true,
		"hideInToolbox": true,
		"useItemEffect": "",
		"canUseItemEffect": "true"
	},
	"coin": {
		"cls": "constants",
		"name": "塔露拉之核",
		"text": "这个东西代表着你现在正在操纵着塔露拉，你可以利用它来查看塔露拉的信息",
		"canUseItemEffect": "true",
		"useItemEvent": [
			{
				"type": "playSound",
				"name": "bottom.wav"
			},
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
				"type": "if",
				"condition": "(item:lifeWand===1)",
				"true": [
					{
						"type": "showImage",
						"code": 1,
						"image": "tt.png",
						"loc": [
							0,
							34
						],
						"opacity": 1,
						"time": 0
					}
				]
			},
			{
				"type": "if",
				"condition": "(item:I324===1)",
				"true": [
					{
						"type": "showImage",
						"code": 1,
						"image": "ttb.png",
						"loc": [
							0,
							34
						],
						"opacity": 1,
						"time": 0
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:X",
				"value": "1"
			},
			{
				"type": "dowhile",
				"condition": "(flag:X===1)",
				"data": [
					{
						"type": "while",
						"condition": "1",
						"data": [
							{
								"type": "wait",
								"data": [
									{
										"case": "mouse",
										"px": [
											6,
											78
										],
										"py": [
											40,
											64
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "keyboard",
										"keycode": "81",
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											84,
											146
										],
										"py": [
											40,
											64
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "moveImage",
												"code": 1,
												"to": [
													-278,
													34
												],
												"time": 1000
											},
											{
												"type": "break",
												"n": 1
											}
										]
									}
								]
							}
						]
					},
					{
						"type": "while",
						"condition": "1",
						"data": [
							{
								"type": "wait",
								"data": [
									{
										"case": "keyboard",
										"keycode": "81",
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											262,
											334
										],
										"py": [
											66,
											90
										],
										"break": true,
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											340,
											402
										],
										"py": [
											66,
											90
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "moveImage",
												"code": 1,
												"to": [
													0,
													34
												],
												"time": 1000
											},
											{
												"type": "break",
												"n": 1
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											224,
											400
										],
										"py": [
											128,
											160
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											"年轻的德拉克刚刚启程，她还有很长的路要走......"
										]
									},
									{
										"case": "mouse",
										"px": [
											274,
											308
										],
										"py": [
											176,
											210
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
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
												"time": 0
											},
											{
												"type": "if",
												"condition": "(flag:t1===0)",
												"true": [
													{
														"type": "showImage",
														"code": 3,
														"image": "ts1.png",
														"loc": [
															0,
															160
														],
														"opacity": 1,
														"time": 0
													}
												]
											},
											{
												"type": "if",
												"condition": "(flag:t1===1)",
												"true": [
													{
														"type": "showImage",
														"code": 3,
														"image": "ts11.png",
														"loc": [
															0,
															160
														],
														"opacity": 1,
														"time": 0
													}
												]
											},
											{
												"type": "while",
												"condition": "1",
												"data": [
													{
														"type": "wait",
														"data": [
															{
																"case": "mouse",
																"px": [
																	0,
																	416
																],
																"py": [
																	0,
																	416
																],
																"break": true,
																"action": [
																	{
																		"type": "playSound",
																		"name": "bottom.wav"
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
																		"type": "break",
																		"n": 1
																	}
																]
															}
														]
													}
												]
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											315,
											349
										],
										"py": [
											176,
											210
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
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
												"time": 0
											},
											{
												"type": "if",
												"condition": "(flag:t2===0)",
												"true": [
													{
														"type": "showImage",
														"code": 3,
														"image": "ts2.png",
														"loc": [
															0,
															160
														],
														"opacity": 1,
														"time": 0
													}
												]
											},
											{
												"type": "if",
												"condition": "(flag:t2===1)",
												"true": [
													{
														"type": "showImage",
														"code": 3,
														"image": "ts21.png",
														"loc": [
															0,
															160
														],
														"opacity": 1,
														"time": 0
													}
												]
											},
											{
												"type": "while",
												"condition": "1",
												"data": [
													{
														"type": "wait",
														"data": [
															{
																"case": "mouse",
																"px": [
																	0,
																	416
																],
																"py": [
																	0,
																	416
																],
																"break": true,
																"action": [
																	{
																		"type": "playSound",
																		"name": "bottom.wav"
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
																		"type": "break",
																		"n": 1
																	}
																]
															}
														]
													}
												]
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											222,
											400
										],
										"py": [
											312,
											368
										],
										"break": true,
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
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
												"time": 0
											},
											{
												"type": "showImage",
												"code": 3,
												"image": "tt1.png",
												"loc": [
													-208,
													0
												],
												"opacity": 1,
												"time": 0
											},
											{
												"type": "while",
												"condition": "1",
												"data": [
													{
														"type": "wait",
														"data": [
															{
																"case": "mouse",
																"px": [
																	0,
																	416
																],
																"py": [
																	0,
																	416
																],
																"break": true,
																"action": [
																	{
																		"type": "playSound",
																		"name": "bottom.wav"
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
																		"type": "break",
																		"n": 1
																	}
																]
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	},
	"freezeBadge": {
		"cls": "constants",
		"name": "冰冻徽章",
		"text": "可以将面前的熔岩变成平地",
		"useItemEffect": "(function () {\n\tvar success = false;\n\n\tvar snowFourDirections = false; // 是否四方向雪花；如果是将其改成true\n\tif (snowFourDirections) {\n\t\t// 四方向雪花\n\t\tfor (var direction in core.utils.scan) {\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (core.getBlockId(nx, ny) == 'lava') {\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t\tsuccess = true;\n\t\t\t}\n\t\t}\n\t} else {\n\t\tif (core.getBlockId(core.nextX(), core.nextY()) == 'lava') {\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t\tsuccess = true;\n\t\t}\n\t}\n\n\tif (success) {\n\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t} else {\n\t\tcore.drawTip(\"当前无法使用\" + core.material.items[itemId].name);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n})();",
		"canUseItemEffect": "true"
	},
	"cross": {
		"cls": "constants",
		"name": "十字架",
		"text": "持有后无视怪物的无敌属性"
	},
	"dagger": {
		"cls": "constants",
		"name": "屠龙匕首",
		"text": "该道具尚未被定义"
	},
	"amulet": {
		"cls": "constants",
		"name": "护符",
		"text": "持有时无视负面地形"
	},
	"bigKey": {
		"cls": "tools",
		"name": "大黄门钥匙",
		"text": "可以开启当前层所有黄门",
		"itemEffect": "core.addItem('yellowKey', 1);\ncore.addItem('blueKey', 1);\ncore.addItem('redKey', 1);",
		"itemEffectTip": "，全钥匙+1",
		"useItemEffect": "(function () {\n\tvar actions = core.searchBlock(\"yellowDoor\").map(function (block) {\n\t\treturn { \"type\": \"openDoor\", \"loc\": [block.x, block.y], \"async\": true };\n\t});\n\tactions.push({ \"type\": \"waitAsync\" });\n\tactions.push({ \"type\": \"tip\", \"text\": core.material.items[itemId].name + \"使用成功\" });\n\tcore.insertAction(actions);\n})();",
		"canUseItemEffect": "(function () {\n\treturn core.searchBlock('yellowDoor').length > 0;\n})();"
	},
	"greenKey": {
		"cls": "tools",
		"name": "绿钥匙",
		"text": "可以打开一扇绿门"
	},
	"steelKey": {
		"cls": "tools",
		"name": "铁门钥匙",
		"text": "可以打开一扇铁门"
	},
	"pickaxe": {
		"cls": "tools",
		"name": "破墙镐",
		"text": "可以破坏勇士面前的墙",
		"useItemEffect": "(function () {\n\tvar canBreak = function (x, y) {\n\t\tvar block = core.getBlock(x, y);\n\t\tif (block == null || block.disable) return false;\n\t\treturn block.event.canBreak;\n\t};\n\n\tvar success = false;\n\tvar pickaxeFourDirections = false; // 是否四方向破；如果是将其改成true\n\tif (pickaxeFourDirections) {\n\t\t// 四方向破\n\t\tfor (var direction in core.utils.scan) {\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (canBreak(nx, ny)) {\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t\tsuccess = true;\n\t\t\t}\n\t\t}\n\t} else {\n\t\t// 仅破当前\n\t\tif (canBreak(core.nextX(), core.nextY())) {\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t\tsuccess = true;\n\t\t}\n\t}\n\n\tif (success) {\n\t\tcore.playSound('pickaxe.mp3');\n\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t} else {\n\t\t// 无法使用\n\t\tcore.drawTip(\"当前无法使用\" + core.material.items[itemId].name);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n})();",
		"canUseItemEffect": "true"
	},
	"icePickaxe": {
		"cls": "tools",
		"name": "破冰镐",
		"text": "可以破坏勇士面前的一堵冰墙",
		"useItemEffect": "(function () {\n\tcore.removeBlock(core.nextX(), core.nextY());\n\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n})();",
		"canUseItemEffect": "(function () {\n\treturn core.getBlockId(core.nextX(), core.nextY()) == 'ice';\n})();"
	},
	"bomb": {
		"cls": "tools",
		"name": "炸弹",
		"text": "可以炸掉勇士面前的怪物",
		"useItemEffect": "(function () {\n\tvar canBomb = function (x, y) {\n\t\tvar block = core.getBlock(x, y);\n\t\tif (block == null || block.disable || block.event.cls.indexOf('enemy') != 0) return false;\n\t\tvar enemy = core.material.enemys[block.event.id];\n\t\treturn enemy && !enemy.notBomb;\n\t};\n\n\tvar bombList = []; // 炸掉的怪物坐标列表\n\tvar bombFourDirections = false; // 是否四方向可炸；如果是将其改成true。\n\tif (bombFourDirections) {\n\t\t// 四方向炸\n\t\tfor (var direction in core.utils.scan) {\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (canBomb(nx, ny)) {\n\t\t\t\tbombList.push([nx, ny]);\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t}\n\t\t}\n\t} else {\n\t\t// 仅炸当前\n\t\tif (canBomb(core.nextX(), core.nextY())) {\n\t\t\tbombList.push([core.nextX(), core.nextY()]);\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t}\n\t}\n\n\tif (bombList.length > 0) {\n\t\tcore.playSound('bomb.mp3');\n\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t} else {\n\t\tcore.drawTip('当前无法使用' + core.material.items[itemId].name);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n\n\t// 炸弹后事件\n\t// 这是一个使用炸弹也能开门的例子\n\t/*\n\tif (core.status.floorId=='xxx' && core.terrainExists(x0,y0,'specialDoor') // 某个楼层，该机关门存在\n\t\t&& !core.enemyExists(x1,y1) && !core.enemyExists(x2,y2)) // 且守门的怪物都不存在\n\t{\n\t\tcore.insertAction([ // 插入事件\n\t\t\t{\"type\": \"openDoor\", \"loc\": [x0,y0]} // 开门\n\t\t])\n\t}\n\t*/\n})();",
		"canUseItemEffect": "true"
	},
	"centerFly": {
		"cls": "tools",
		"name": "爱国者之核",
		"text": "这个东西代表着你现在正在操纵着最后的温迪戈—博卓卡斯替，你可以用它来查看博卓卡斯替的信息",
		"useItemEffect": "",
		"canUseItemEffect": "true"
	},
	"upFly": {
		"cls": "tools",
		"name": "上楼器",
		"text": "可以飞往楼上的相同位置",
		"useItemEffect": "(function () {\n\tvar floorId = core.floorIds[core.floorIds.indexOf(core.status.floorId) + 1];\n\tif (core.status.event.id == 'action') {\n\t\tcore.insertAction([\n\t\t\t{ \"type\": \"changeFloor\", \"loc\": [core.getHeroLoc('x'), core.getHeroLoc('y')], \"floorId\": floorId },\n\t\t\t{ \"type\": \"tip\", \"text\": core.material.items[itemId].name + '使用成功' }\n\t\t]);\n\t} else {\n\t\tcore.changeFloor(floorId, null, core.status.hero.loc, null, function () {\n\t\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t\t\tcore.replay();\n\t\t});\n\t}\n})();",
		"canUseItemEffect": "(function () {\n\tvar floorId = core.status.floorId,\n\t\tindex = core.floorIds.indexOf(floorId);\n\tif (index < core.floorIds.length - 1) {\n\t\tvar toId = core.floorIds[index + 1],\n\t\t\ttoX = core.getHeroLoc('x'),\n\t\t\ttoY = core.getHeroLoc('y');\n\t\tvar mw = core.floors[toId].width,\n\t\t\tmh = core.floors[toId].height;\n\t\tif (toX >= 0 && toX < mw && toY >= 0 && toY < mh && core.getBlock(toX, toY, toId) == null) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n})();"
	},
	"downFly": {
		"cls": "tools",
		"name": "下楼器",
		"text": "可以飞往楼下的相同位置",
		"useItemEffect": "(function () {\n\tvar floorId = core.floorIds[core.floorIds.indexOf(core.status.floorId) - 1];\n\tif (core.status.event.id == 'action') {\n\t\tcore.insertAction([\n\t\t\t{ \"type\": \"changeFloor\", \"loc\": [core.getHeroLoc('x'), core.getHeroLoc('y')], \"floorId\": floorId },\n\t\t\t{ \"type\": \"tip\", \"text\": core.material.items[itemId].name + '使用成功' }\n\t\t]);\n\t} else {\n\t\tcore.changeFloor(floorId, null, core.status.hero.loc, null, function () {\n\t\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t\t\tcore.replay();\n\t\t});\n\t}\n})();",
		"canUseItemEffect": "(function () {\n\tvar floorId = core.status.floorId,\n\t\tindex = core.floorIds.indexOf(floorId);\n\tif (index > 0) {\n\t\tvar toId = core.floorIds[index - 1],\n\t\t\ttoX = core.getHeroLoc('x'),\n\t\t\ttoY = core.getHeroLoc('y');\n\t\tvar mw = core.floors[toId].width,\n\t\t\tmh = core.floors[toId].height;\n\t\tif (toX >= 0 && toX < mw && toY >= 0 && toY < mh && core.getBlock(toX, toY, toId) == null) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n})();"
	},
	"earthquake": {
		"cls": "constants",
		"name": "记忆碎片储存装置",
		"text": "PRTS核心技术之一，可以浏览目前收集到的记忆碎片",
		"useItemEffect": null,
		"canUseItemEffect": "true"
	},
	"poisonWine": {
		"cls": "tools",
		"name": "感染抑制药片",
		"text": "乌萨斯量产的感染抑制药物，可以消除最高五级感染加深",
		"useItemEffect": null,
		"canUseItemEffect": "core.getFlag('gr') >= 1",
		"useItemEvent": [
			{
				"type": "if",
				"condition": "(flag:gr<=5)",
				"true": [
					{
						"type": "setValue",
						"name": "flag:gr",
						"value": "0"
					}
				],
				"false": [
					{
						"type": "setValue",
						"name": "flag:gr",
						"operator": "-=",
						"value": "5"
					}
				]
			}
		]
	},
	"weakWine": {
		"cls": "tools",
		"name": "解衰药水",
		"text": "可以解除衰弱状态",
		"useItemEffect": "core.triggerDebuff('remove', 'weak');",
		"canUseItemEffect": "core.hasFlag('weak');"
	},
	"curseWine": {
		"cls": "tools",
		"name": "解咒药水",
		"text": "可以解除诅咒状态",
		"useItemEffect": "core.triggerDebuff('remove', 'curse');",
		"canUseItemEffect": "core.hasFlag('curse');"
	},
	"superWine": {
		"cls": "tools",
		"name": "万能药水",
		"text": "可以解除所有不良状态",
		"useItemEffect": "core.triggerDebuff('remove', ['poison', 'weak', 'curse']);",
		"canUseItemEffect": "(function() {\n\treturn core.hasFlag('poison') || core.hasFlag('weak') || core.hasFlag('curse');\n})();"
	},
	"hammer": {
		"cls": "tools",
		"name": "圣锤",
		"text": "该道具尚未被定义"
	},
	"lifeWand": {
		"cls": "constants",
		"name": "德拉克之火",
		"text": "以德拉克最具象征性的火焰灼烧对手，使其每回合受到以其攻击力百分比计算的伤害。（快捷键1，详情属性见角色界面技能处）",
		"useItemEvent": null,
		"canUseItemEffect": "true",
		"useItemEffect": "(function () {\n\tvar skillValue = 4; // 技能的flag:skill值，可用于当前开启技能的判定；对于新技能可以依次改成2，3等等\n\tvar skillNeed = 15; // 技能的需求\n\tvar skillName = '德拉克之火'; // 技能的名称\n\n\tif (core.getFlag('skill', 0) != skillValue) { // 判断当前是否已经开了技能\n\t\tif (core.getStatus('mana') >= skillNeed) { // 这里要写当前能否开技能的条件判断，比如魔力值至少要多少\n\t\t\tcore.setFlag('skill', skillValue); // 开技能4\n\t\t\tcore.setFlag('skillName', skillName); // 设置技能名\n\t\t} else {\n\t\t\tcore.drawTip('源石技艺值不足，无法施展源石技艺');\n\t\t}\n\t} else { // 关闭技能\n\t\tcore.setFlag('skill', 0); // 关闭技能状态\n\t\tcore.setFlag('skillName', '无');\n\t}\n})();"
	},
	"jumpShoes": {
		"cls": "tools",
		"name": "跳跃靴",
		"text": "能跳跃到前方两格处",
		"useItemEffect": "core.playSound(\"jump.mp3\"); core.insertAction({ \"type\": \"jumpHero\", \"loc\": [core.nextX(2), core.nextY(2)] });",
		"canUseItemEffect": "(function () {\n\tvar nx = core.nextX(2),\n\t\tny = core.nextY(2);\n\treturn nx >= 0 && nx < core.bigmap.width && ny >= 0 && ny < core.bigmap.height && core.getBlockId(nx, ny) == null;\n})();"
	},
	"skill1": {
		"cls": "constants",
		"name": "指令:结构重构",
		"text": "凯尔希强化其与Mon3tr的防御力进行作战，每次消耗10点源石技艺值（快捷键1，具体属性见详细界面）",
		"hideInReplay": true,
		"useItemEffect": "(function () {\n\tvar skillValue = 1; // 技能的flag:skill值，可用于当前开启技能的判定；对于新技能可以依次改成2，3等等\n\tvar skillNeed = 10; // 技能的需求\n\tvar skillName = '指令:结构加固'; // 技能的名称\n\n\tif (core.getFlag('skill', 0) != skillValue) { // 判断当前是否已经开了技能\n\t\tif (core.getStatus('mana') >= skillNeed) { // 这里要写当前能否开技能的条件判断，比如魔力值至少要多少\n\t\t\tcore.setFlag('skill', skillValue); // 开技能1\n\t\t\tcore.setFlag('skillName', skillName); // 设置技能名\n\t\t} else {\n\t\t\tcore.drawTip('源石技艺值不足，无法施展源石技艺');\n\t\t}\n\t} else { // 关闭技能\n\t\tcore.setFlag('skill', 0); // 关闭技能状态\n\t\tcore.setFlag('skillName', '无');\n\t}\n})();",
		"canUseItemEffect": "true"
	},
	"wand": {
		"cls": "constants",
		"name": "凯尔希之核",
		"useItemEvent": [
			{
				"type": "playSound",
				"name": "bottom.wav"
			},
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
			{
				"type": "setValue",
				"name": "flag:X",
				"value": "1"
			},
			{
				"type": "dowhile",
				"condition": "(flag:X===1)",
				"data": [
					{
						"type": "while",
						"condition": "1",
						"data": [
							{
								"type": "wait",
								"data": [
									{
										"case": "mouse",
										"px": [
											6,
											78
										],
										"py": [
											40,
											64
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "keyboard",
										"keycode": "81",
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											84,
											146
										],
										"py": [
											40,
											64
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "moveImage",
												"code": 1,
												"to": [
													-278,
													34
												],
												"time": 1000
											},
											{
												"type": "break",
												"n": 1
											}
										]
									}
								]
							}
						]
					},
					{
						"type": "while",
						"condition": "1",
						"data": [
							{
								"type": "wait",
								"data": [
									{
										"case": "keyboard",
										"keycode": "81",
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											262,
											334
										],
										"py": [
											66,
											90
										],
										"break": true,
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "hideImage",
												"code": 1,
												"time": 0
											},
											{
												"type": "hideImage",
												"code": 0,
												"time": 0
											},
											{
												"type": "exit"
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											340,
											402
										],
										"py": [
											66,
											90
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "moveImage",
												"code": 1,
												"to": [
													0,
													34
												],
												"time": 1000
											},
											{
												"type": "break",
												"n": 1
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											224,
											400
										],
										"py": [
											128,
											160
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
											},
											{
												"type": "showImage",
												"code": 100,
												"image": "prts.png",
												"loc": [
													0,
													165
												],
												"opacity": 1,
												"time": 0
											},
											"           我认为该角色的潜能或精英程度已达最高级.....",
											{
												"type": "hideImage",
												"code": 100,
												"time": 0
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											274,
											308
										],
										"py": [
											176,
											210
										],
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
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
												"time": 0
											},
											{
												"type": "showImage",
												"code": 3,
												"image": "ks1.png",
												"loc": [
													0,
													160
												],
												"opacity": 1,
												"time": 0
											},
											{
												"type": "while",
												"condition": "1",
												"data": [
													{
														"type": "wait",
														"data": [
															{
																"case": "mouse",
																"px": [
																	0,
																	416
																],
																"py": [
																	0,
																	416
																],
																"break": true,
																"action": [
																	{
																		"type": "playSound",
																		"name": "bottom.wav"
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
																		"type": "break",
																		"n": 1
																	}
																]
															}
														]
													}
												]
											}
										]
									},
									{
										"case": "mouse",
										"px": [
											222,
											400
										],
										"py": [
											312,
											368
										],
										"break": true,
										"action": [
											{
												"type": "playSound",
												"name": "bottom.wav"
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
												"time": 0
											},
											{
												"type": "showImage",
												"code": 3,
												"image": "kt1.png",
												"loc": [
													-208,
													0
												],
												"opacity": 1,
												"time": 0
											},
											{
												"type": "while",
												"condition": "1",
												"data": [
													{
														"type": "wait",
														"data": [
															{
																"case": "mouse",
																"px": [
																	0,
																	416
																],
																"py": [
																	0,
																	416
																],
																"break": true,
																"action": [
																	{
																		"type": "playSound",
																		"name": "bottom.wav"
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
																		"type": "break",
																		"n": 1
																	}
																]
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		],
		"canUseItemEffect": "true",
		"text": "这个东西代表着你现在正在操纵着凯尔希，你可以利用它来查看凯尔希的信息"
	},
	"I319": {
		"cls": "items",
		"name": "新物品"
	},
	"I320": {
		"cls": "items",
		"name": "新物品"
	},
	"I321": {
		"cls": "items",
		"name": "新物品"
	},
	"I322": {
		"cls": "items",
		"name": "新物品"
	},
	"I323": {
		"cls": "items",
		"name": "新物品"
	},
	"I324": {
		"cls": "constants",
		"name": "日冕戮刃",
		"text": "将火焰附着于剑上并斩击敌人，可以增加自身一定的攻击力和火焰伤害，且可以消减敌人一定的防御力。（快捷键2，详情属性见角色界面技能处）",
		"useItemEffect": "(function () {\n\tvar skillValue = 5; // 技能的flag:skill值，可用于当前开启技能的判定；对于新技能可以依次改成2，3等等\n\tvar skillNeed = 25; // 技能的需求\n\tvar skillName = '日冕戮刃'; // 技能的名称\n\n\tif (core.getFlag('skill', 0) != skillValue) { // 判断当前是否已经开了技能\n\t\tif (core.getStatus('mana') >= skillNeed) { // 这里要写当前能否开技能的条件判断，比如魔力值至少要多少\n\t\t\tcore.setFlag('skill', skillValue); // 开技能4\n\t\t\tcore.setFlag('skillName', skillName); // 设置技能名\n\t\t} else {\n\t\t\tcore.drawTip('源石技艺值不足，无法施展源石技艺');\n\t\t}\n\t} else { // 关闭技能\n\t\tcore.setFlag('skill', 0); // 关闭技能状态\n\t\tcore.setFlag('skillName', '无');\n\t}\n})();",
		"canUseItemEffect": "true"
	},
	"I325": {
		"cls": "items",
		"name": "新物品"
	},
	"I326": {
		"cls": "items",
		"name": "新物品"
	},
	"I327": {
		"cls": "items",
		"name": "新物品"
	},
	"I328": {
		"cls": "items",
		"name": "新物品"
	},
	"I329": {
		"cls": "items",
		"name": "新物品"
	},
	"I335": {
		"cls": "constants",
		"name": "全息投影装置",
		"text": "PRTS核心技术之一，可以身临其境地复现记忆碎片的内容",
		"useItemEvent": [
			{
				"type": "playSound",
				"name": "prts.wav"
			},
			{
				"type": "hideStatusBar"
			},
			{
				"type": "choices",
				"text": "\t[记忆碎片读取装置,I335]选择你要放映的记忆碎片",
				"choices": [
					{
						"text": "亡命者的家",
						"condition": "flag:j1==1",
						"action": [
							{
								"type": "pauseBgm"
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
								"code": 2,
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
								"code": 3,
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
								"type": "showImage",
								"code": 3,
								"image": "dark.png",
								"loc": [
									0,
									0
								],
								"opacity": 1,
								"time": 0
							},
							{
								"type": "pauseBgm"
							},
							"我逃了很久，逃到一个小村子里。",
							"我当时没想那么多，只是想找个地方藏起来，没想到我真的找到了一个栖身之所。",
							"这一对老夫妇，可能是把我当做了他们的女儿。毕竟乌萨斯那么多场战争，他们的子女可能很早就牺牲了。",
							"就连我的秘密他们也帮忙藏住了。",
							"我想我怎么报答他们都不过分。",
							"遗憾的是，我没能好好报答他们。"
						]
					},
					{
						"text": "无欲之人",
						"condition": "flag:j2==1",
						"action": [
							{
								"type": "pauseBgm"
							},
							{
								"type": "playBgm",
								"name": "kuchu.mp3",
								"keep": true
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
								"type": "pauseBgm"
							},
							{
								"type": "playBgm",
								"name": "kuchu.mp3",
								"keep": true
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
							"泰拉673年",
							"\t[未知人物]我一直认为自己是一个无欲的人。",
							"\t[未知人物]我活着如同驮兽一般",
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
							"\t[未知人物]我出生于一个普通的农民家庭。",
							"\t[未知人物]在我十岁的那年，我的父亲，意外变成了一个源石病患者，而之后，他很快的死去了。",
							"\t[未知人物]我理所应当的，也感染了源石病。",
							"\t[未知人物]源石在我的体内生长，我貌似在这源石技艺方面有十分不错的天赋，我逐渐可以使用一些法术，起初我尝试用它来帮助他人。",
							"\t[未知人物]而这却让我招来了附近居民的唾骂。",
							"\t[未知人物]我当时根本就不懂，源石病是什么，我只知道它害死了我的父亲。",
							"\t[未知人物]他们对待我如同对待最下等的驮兽一般，如同瘟神一样避我而去。",
							"\t[未知人物]我不懂，我没做错任何事情，我只是存在于这个世界上，难道我的存在便是一个错误吗？",
							"\t[未知人物]我无法与人沟通，我也逐渐不喜欢与他人沟通。",
							{
								"type": "showImage",
								"code": 2,
								"image": "forest.png",
								"loc": [
									0,
									0
								],
								"opacity": 1,
								"time": 500
							},
							"\t[未知人物]在监狱的牢房中，四处都充满着阴暗与潮湿的气息。",
							"\t[未知人物]我被人诬陷偷了一个贵族的衣服，以此来顶替衙役没有抓到的那个大盗，给贵族一个交代。",
							"\t[未知人物]我开始思考我生而为人的意义，没有结果。",
							"\t[未知人物]讽刺的是，身为源石病患者的我，却貌似有着先天的抗体，我还能再活很久，但是作为人存在的意义而言，我已经无法找到活下去的意义。",
							"\t[未知人物]直到有一个人找到了我。",
							{
								"type": "playSound",
								"name": "soldiers.wav"
							},
							{
								"type": "sleep",
								"time": 500
							},
							{
								"type": "playSound",
								"name": "door.wav"
							},
							"\t[未知人物α]把他放出来。",
							"\t[未知人物]......",
							"\t[未知人物α]你就是比利·布里杰？",
							"\t[比利·布里杰]是我。",
							"\t[未知人物α]去用你的法术制造混乱吧，你是天生的恶魔。",
							"我此时非常激动，他竟然对我说，我是一个恶魔",
							"恶魔、恶魔，我不是一个野兽，是一个有思考能力的生物",
							"\t[比利·布里杰]我只是一个普通的人。",
							"没错，我只是一个比垃圾还垃圾的感染者，生命无足轻重的感染者。",
							"\t[未知人物α]足够了，为我的军队献上你的忠诚吧，你将成为最强大的源石术士。",
							"源石术士?那些在军队中趾高气扬，地位颇高的源石术士？",
							"\t[比利·布里杰]哈哈？",
							"\t[比利·布里杰]哈哈哈哈哈哈哈！",
							"一定是在监狱中关的太久，我已经不清醒了，我竟然产生了如此不切实际的幻觉。",
							"\t[比利·布里杰]如果你说的是真的，军官大人，请告诉我，我凭什么？",
							"\t[比利·布里杰]来啊！让我知道知道，我到底是有多大的能耐，可以被您看上？",
							{
								"type": "hideImage",
								"code": 2,
								"time": 0
							},
							"自从感染源石病之后，我便会使用那令人作呕的源石技艺。",
							"源石病是令人唾弃的，它产生的源石技艺自然也是。",
							"我是令人唾弃的存在。",
							"我昏了过去，隐约感觉自己被人带到了一个地方。",
							"我的身边出现了一些军队的人，他们递给了我一支简陋的源石法杖。",
							"\t[军队人员]现在，布里杰，试着对着前面的墙释放法术。",
							{
								"type": "playSound",
								"name": "p_skill_blacktimewand_shot.wav"
							},
							"我放出了法术。",
							{
								"type": "playSound",
								"name": "e_aoe_frostnovaice_h2.wav"
							},
							"墙壁应声倒塌。",
							"\t[军队人员]测试通过，布里杰长官，请您前往军队报道。",
							"原来，我始终都是清醒的。",
							"\t[哀嚎的人]胳膊...我的胳膊！好疼...不要...不要过来！你这个恶魔！",
							"而之后，杀人的快感逐渐让我开始明白了一件事。",
							"\r[red]原来，我始终都渴望着杀人。"
						]
					},
					{
						"text": "所谓救世主",
						"condition": "flag:j3==1",
						"action": [
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
									0,
									0
								],
								"opacity": 1,
								"time": 1000
							},
							"一个年轻人正在询问一个老者统治之道",
							"\t[浑厚的声音]——你有没有在丛林的深处，看到过被供奉起来的树木？",
							"\t[年轻的声音]有，但是，为什么？",
							"\t[年轻的声音]这种行为，有什么意义吗？",
							"\t[年轻的声音]供奉树木能带来什么，为什么不去供奉神灵大人？",
							"\t[浑厚的声音]你难道不明白吗，这个树，就是他们的神灵，他们的救世主。",
							"\t[年轻的声音]这？不可理喻......",
							"\t[浑厚的声音]他们是在森林中躲藏的氏族，对于他们来讲，一些树就是他们的神。",
							"\t[浑厚的声音]可能是这些树让他们躲避了猛兽的袭击，也可能是他们走头无路时看到了一颗硕果累累的树。",
							"\t[浑厚的声音]没错，只需要这么简单的方法，一棵树就能成为人们心中的神。",
							"\t[浑厚的声音]但是，如果这棵树不再给他们提供这些便利了呢，甚至，只是提供的东西变少了呢？",
							"\t[浑厚的声音]“这棵树为什么产出的果子变少了？一定是它的问题，它不爱我们了。”",
							"\t[年轻的声音].........神的地位会变吗？",
							"\t[浑厚的声音]会，而且他们会将之前视为神的树踩在脚下，将其砍伐。",
							"\t[年轻的声音]这些氏族......未免也太忘恩负义了点，不过话说回来，也就是一棵树，没什么大不了的。",
							"\t[浑厚的声音]你说的没错，因为那时，在他们眼中，只是一棵树而已......",
							{
								"type": "showImage",
								"code": 1,
								"image": "forest.png",
								"loc": [
									0,
									0
								],
								"opacity": 1,
								"time": 1000
							},
							"\t[模糊不清的声音]***只是\r[red]一个人而已\r，并不是我们的救世主。",
							"\t[模糊不清的声音]她给我们的东西越来越少了，却让我们干越来越危险的工作。",
							"\t[模糊不清的声音]拿下***后我们就要求分开，这次行动我们兄弟最多，就是不允许我们也能硬抢。",
							"\t[模糊不清的声音]物资留吗？",
							"\t[模糊不清的声音]他们当然可以拿一部分，就当是保护我们的慰问品了。",
							"\t[模糊不清的声音]城外的回防部队.......我们可消受不起。",
							{
								"type": "hideImage",
								"code": 1,
								"time": 0
							},
							{
								"type": "hideImage",
								"code": 2,
								"time": 0
							}
						]
					},
					{
						"text": "暂时不需要读取记忆碎片",
						"action": []
					}
				]
			},
			{
				"type": "if",
				"condition": "(flag:bgm<=1)",
				"true": [
					{
						"type": "playBgm",
						"name": "bg.mp3",
						"keep": true
					}
				],
				"false": [
					{
						"type": "if",
						"condition": "(flag:bgm<=2)",
						"true": [
							{
								"type": "playBgm",
								"name": "mosheng.mp3",
								"keep": true
							}
						],
						"false": [
							{
								"type": "if",
								"condition": "(flag:bgm<=3)",
								"true": [
									{
										"type": "playBgm",
										"name": "01.mp3",
										"keep": true
									}
								],
								"false": [
									{
										"type": "if",
										"condition": "(flag:bgm<=4)",
										"true": [
											{
												"type": "playBgm",
												"name": "xisheng.mp3",
												"keep": true
											}
										],
										"false": []
									}
								]
							}
						]
					}
				]
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
		],
		"canUseItemEffect": "true"
	},
	"I393": {
		"cls": "tools",
		"name": "寒霜冰晶",
		"text": "一个传送给雪怪小队的坐标，可以用来让雪怪小队召唤源石冰晶辅助你的进攻。（召唤一个寒霜冰晶在前方空地）",
		"canUseItemEffect": "(function () {\n\tvar nx = core.nextX(1),\n\t\tny = core.nextY(1);\n\treturn nx >= 0 && nx < core.bigmap.width && ny >= 0 && ny < core.bigmap.height && core.getBlockId(nx, ny) == null;\n})();",
		"useItemEvent": [
			{
				"type": "setBlock",
				"number": "E388",
				"loc": [
					"core.nextX(1)",
					"core.nextY(1)"
				]
			}
		]
	},
	"I394": {
		"cls": "items",
		"name": "新物品"
	}
}