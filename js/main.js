/*! 
 * Copyright 2022 JiangNanGame. All rights reserved.
 * Use of this source code is governed by The-Changjiang-River-License. 
 * The link of our license: https://github.com/jiangnangame/The-Changjiang-River-License/
 */
 'use strict';
const BlankPNG = 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAIAAAAAAFZQOCAYAAAAMAEAnQEqAQABAAFAJiWkAANwAP789AAA', WIN = window, DOC = document, EBody = DOC['body'], EElement = DOC['documentElement'], RESPATH = 'images/interface/', dSurface = $('dSurface'), PKindUpperLimit = 0x5, PKindTraverseOrder = [
        0x5,
        0x0,
        0x1,
        0x2,
        0x3,
        0x4
    ], WaterShadowImg = 'images/Zombies/WaterShadow.webp', WaterSplashImg = 'images/Zombies/Drop_Water.webp', EVENT_STARTGAME = new Event('jng-event-startgame'), EVENT_ENDGAME = new Event('jng-event-endgame');
//multi variable declaration



    let $User = { //multi variable
        'NowStep': 0x1,
        'TimeStep': 0xa, //0x11
        'AutoSun': Number(localStorage['JNG_TR_AUTOSUN']) || 0x0,
        'Tag': localStorage['tag'] ? localStorage['tag'] : 'local',
        'Name': localStorage['name'] ? localStorage['name'] : 'local',
        'LowPerformanceMode': ![],//false
        'Async_GIFS_Animate': !![],//true
        'Coins': 0x0,
        'Achievement': localStorage['JNG_TR_Achievement'] ? JSON['parse'](localStorage['JNG_TR_Achievement']) : {}//parse or empty obj
    }, oSym = {
        'Init'(a, b = []) {
            const c = this;//refernce to current properties
            c['Now'] = 0x0, c['Timer'] = null, (c['TQ'] = new Set())['add']({ //this.Now
                'T': 0x0,//add obj to set
                'f': a,
                'ar': b
            }), c['NowStep'] = 0x1,
             c['TimeStep'] = 0xa,//10
              c['NowSpeed'] = 0x1,
               $User['NowSpeed']
                && CSpeed($User['NowSpeed'], ![]),
                 c['Start'](); //run func CSPEED of NOWSPEED is truth
        },
        'Start'() {
            const a = this;//create refernce
            if (a['Timer'] === null) {
                const b = a['TQ'], c = () => { //Task queu
                        let d = a['Now'] += a['NowStep'];
                        b['forEach'](e => {
                            if (d >= e['T']) {
                                try {
                                    e['f'](...e['ar']);//run function
                                } catch (f) {
                                    console['error'](f);
                                }
                                b['delete'](e);//delete task
                            }
                        });
                    };
                a['Timer'] = setInterval(c, a['TimeStep']);//repeat everytimestep
            }
        },
        'addTask'(a, b, c = []) {
            const d = this;
            return d['TQ']['add']({//task queue
                'T': d['Now'] + a,
                'f': b,
                'ar': c
            }), d;
        },
        'Stop'() {
            clearInterval(oSym['Timer']), oSym['Timer'] = null;
        },
        'Clear'() { //clear queue
            this['TQ']['clear']();
        }
    }, LevelConfig = {
        'config': {
            'Tutorial': { 'backgroundMask': 'BgMask-Tutorial' },
            'Forest': {
                'DynamicDifficulty': !![],//true
                'backgroundImage': 'images/interface/Forest.webp',
                'backgroundMask': 'BgMask-Forest',
                'AllowUserCard': !![],
                'CoinRatio': 0x1
            },
            'Forestjx': {
                'backgroundImage': 'images/interface/ForestJx.webp',
                'backgroundMask': 'BgMask-Forest',
                'AllowUserCard': !![],
                'CoinRatio': 1.5
            },
            'Marsh': {
                'DynamicDifficulty': !![],
                'backgroundImage': 'images/interface/Marsh.webp',
                'backgroundMask': 'BgMask-Marsh',
                'LoadMusic': 'Bgm_Marsh_Ready',
                'StartGameMusic': 'Bgm_Marsh_Fight',
                'DKind': 0x0,
                'AllowUserCard': !![],
                'CoinRatio': 0x1
            },
            'Marshjx': {
                'backgroundImage': 'images/interface/MarshJx.webp',
                'backgroundMask': 'BgMask-Marsh',
                'AllowUserCard': !![],
                'CoinRatio': 1.5
            },
            'Polar': { //level name for Polar level
                get 'DKind'() {//getter function
                    return oS['Lvl']['replace'](/[^0-9]/ig, '') <= 0xf ? 0x1 : 0x0; //get os level number nad compare them
                },
                get 'SunNum'() { //sun nuumber
                    return oS['DKind'] ? 0x25 : 0x25; //if this exist Difficulty kind
                },
                get 'LoadMusic'() { //load music
                    return 'Bgm_Polar_Ready_' + (oS['DKind'] ? 0x1 : 0x2);//
                },
                get 'StartGameMusic'() {
                    return 'Bgm_Polar_Fight_' + (oS['DKind'] ? 0x1 : 0x2 + Math['round'](Math['random']() * 0x2)); //rturn0,1or 2
                },
                get 'backgroundImage'() {
                    return 'images/interface/Polar' + (oS['DKind'] ? '' : '2') + '.webp';
                },
                get 'LoadAccess'() {
                    return b => {
                        PlayAudio('Bgm_Polar_Noise', 0x1), NewImg('imgKK', 'images/interface/Polar_Mask' + (oS['DKind'] ? '2' : '4') + '.webp', 'left:' + (oS['DKind'] ? 0x46b : 0x44c) + 'px;', EDAll), NewImg('imgKK', 'images/interface/Polar_Mask' + (oS['DKind'] ? '1' : '3') + '.webp', 'left:167px;top:546px;', EDAll), !oS['DKind'] && (NewEle('PolarFire2', 'div', null, { 'className': 'PolarFire' }, $('tGround')), NewEle('PolarFire', 'div', null, { 'className': 'PolarFire' }, $('tGround'))), oSym['addTask'](0x5a, b);
                    };
                },
                'DynamicDifficulty': !![],
                'AllowUserCard': !![],
                'CoinRatio': 0x1,
                'SummonZombieArea': [
                    0x46,
                    0xbe,
                    0xf0,
                    0x172
                ]
            },
            'Polarjx': {
                get 'SunNum'() {
                    return oS['DKind'] ? 0x96 : 0x12c;
                },
                get 'backgroundImage'() {
                    return 'images/interface/Polar' + (oS['DKind'] ? '' : '2') + '.webp';
                },
                'SummonZombieArea': [
                    0x46,
                    0xbe,
                    0xf0,
                    0x172
                ],
                'AllowUserCard': !![],
                'CoinRatio': 1.5
            },
            'Industry': {
                'PicArr': [
                    'images/interface/Industry.webp',
                    'images/interface/Industry_Mask.png'
                ],
                'backgroundImage': 'images/interface/Industry.webp',
                'LoadMusic': 'Bgm_Industry_Ready',
                'DynamicDifficulty': !![],
                'AllowUserCard': !![],
                get 'StartGameMusic'() {
                    return oS['Lvl']['replace'](/[^0-9]/ig, '') < 0x15 ? 'Bgm_Industry_Fight' : 'Bgm_Industry_Fight_2';
                },
                'LoadAccess'(a) {
                    NewImg('BgMask' + Math['random'](), 'images/interface/Industry_Mask.png', 'left:0;top:469px;position:absolute;z-index:23;', EDAll), oSym['addTask'](0x5a, a);
                },
                'CoinRatio': 1.5,
                'SummonZombieArea': [
                    undefined,
                    undefined,
                    0x96
                ]
            },
            'Industryjx': {
                'PicArr': [
                    'images/interface/Industry',
                    'images/interface/Industry_Mask.png'
                ],
                'backgroundImage': 'images/interface/Industry',
                'LoadMusic': 'Bgm_Industry_Ready_JX',
                'AllowUserCard': !![], //boolean truthy 
                'DKind': 0x0,
                get 'StartGameMusic'() {
                    return 'Bgm_Industry_Fight_JX';
                },
                'LoadAccess'(a) {
                    NewImg('BgMask' + Math['random'](), 'images/interface/Industry_Mask.png', 'left:0;top:469px;position:absolute;z-index:23;', EDAll), oSym['addTask'](0x5a, a);
                },
                'CoinRatio': 1.7,
                'SummonZombieArea': [
                    undefined,
                    undefined,
                    0x96
                ]
            },
            'SeasonA': {
                'backgroundImage': 'images/interface/Fuben_Autumn.webp',
                'backgroundMask': 'BgMask-Forest',
                'LF': [
                    0x0,
                    0x1,
                    0x1,
                    0x3,
                    0x1,
                    0x1
                ],
                'CoinRatio': 1.2,
                'LoadMusic': 'Fuben_Autumn_Ready',
                'AllowUserCard': !![],
                'StartGameMusic': 'Fuben_Autumn_Fight'
            },
            'SeasonW': {
                'backgroundImage': 'images/interface/Fuben_Winter.webp',
                'LoadMusic': 'Fuben_Winter_Ready',
                'StartGameMusic': 'Fuben_Winter_Fight',
                'SunNum': 0xc8,
                'CoinRatio': 1.2,
                'DKind': 0x0,
                'AllowUserCard': !![]
            }
        },
        'query'() { //remove everything except lettters from string and obtain its all properties
            let a = ('' + oS['Lvl'])['replace'](/[^a-zA-Z]+/g, '');
            if (this['config'][a])
                return this['config'][a];
            return {};
        }
    }, oS = { //obj stage or object scene //set up critical game flow
        'W': 0x384,//900
        'H': 0x258,
        'C': 0x9,//9 columns
        'LawnMowerX': 0x46,//70 is  x position
        'Lvl': 0x0,//0
        'DefaultStartGame'() {//$ get element by id
           
            StopMusic(),
             PlayMusic(oS['StartGameMusic']),
             SetVisible($('tdShovel'),
              $('dFlagMeter'),
              $('dTop')),
               oS['ControlFlagmeter'] && oFlagContent['init']({
                'fullValue': oP['FlagNum'] - 0x1,//1
                'curValue': 0x0//0
            }),
            oS['InitLawnMover'](),
             PrepareGrowPlants(a => {
                oP['Monitor'](),
                 BeginCool(),
                 oS['DKind'] && AutoProduceSun(0x32),
                  oSym['addTask'](0x5dc, b => {
                    oP['AddZombiesFlag'](), oS['ControlFlagmeter'] && oFlagContent['show']();
                });
            });
        },
        'DefaultFlagToEnd'() {
            ShowWinItem(NewImg('imgSF', 'images/interface/Clearance_reward.png', 'left:535px;top:200px;width:116px;height:119px;', EDAll, { 'onclick': a => oS['Lvl']['indexOf']('jx') < 0x0 ? GetNewProp(a['target'], 'Clearance_reward', $__language_Array__['39e48d7169def8d11f6bfab216eb7455'], $__language_Array__['d28efa2f99e9c27571354eccb0991caf'], NextLevel(), '30%', '43%') : GetWin(a['target'], Exitlevel(oS['Lvl'], 0x1)) }));
        },
        'GlobalVariables': {},
        'SelfVariables': [],
        'warmStart': 0x0,//// 0 = normal start, 1 = resume from paused
        'Init': function (a, f, g, h) {//g is global override like custom end flag function //h is sentinal value undefined
            let j = this;
            for (let l in g) {
                j['GlobalVariables'][l] = WIN[l], WIN[l] = g[l];//window mutates its state whenever mutated to all refrences
            }//EDPZ is element with id dpz.
            WIN['ArCard'] = [], WIN['ArPCard'] = { 'SelNum': 0x0 }, 
            WIN['ArSun'] = {}, WIN['$Z'] = {}, WIN['$P'] = {}, WIN['EDAll'] = $('dAll'),
             WIN['FightingScene'] = $('dFightingScene'), WIN['Ground'] = $('tGround'),
              WIN['EDPZ'] = $('dPZ'), WIN['EDPZ_Spare1'] = $('dPZ_Spare1'),
               WIN['EDPZ_Spare2'] = $('dPZ_Spare2'), WIN['EDAlloffsetLeft'] = EDAll['offsetLeft'],
                WIN['EDNewAll'] = EDAll['cloneNode'](!![]), WIN['ESSunNum'] = $('sSunNum'),
                 WIN['IsGaming'] = m => !!((m ? oGd === null || oGd === void 0x0 ? void 0x0 : oGd['$']['4_-2_1'] : oS['PName']['length'] > 0x0) && oSym['Timer']),
                  j['PicArr'] = [], j['Coord'] = null, j['LF'] = null, j['ZF'] = null, j['isScroll'] = !![],
                   j['backgroundImage'] = j['backgroundMask'] = null, j['AudioArr'] = [],
                    j['InitLawnMover'] = null, j['SummonZombieArea'] = null, j['ChoseCard'] = j['MPID'] = '',
                     j['PicNum'] = j['AccessNum'] = 0x0, j['MCID'] = null, j['Chose'] = 0x0,
                      j['SunNum'] = null, j['ArCard'] = null, j['HaveFog'] = null,
                       j['AllowUserCard'] = null, j['DynamicDifficulty'] = null, 
                       j['FixedProps'] = {}, j['ControlFlagmeter'] = 0x1,
                        j['isStartGame'] = 0x0, j['CoinRatio'] = undefined,
                         j['CanSelectCard'] = undefined, j['DKind'] = undefined;
            for (let m in a) {//a is self variables //key obj
                j['SelfVariables']['push'](m), j[m] = a[m];
            };
            Object['assignWithoutOverwrite'](j, LevelConfig['query']()),//copies only missing properties into j from query result
             j['LoadMusic'] && PlayMusic(j['LoadMusic']), j['CanSelectCard'] === h && (j['CanSelectCard'] = 0x1),
              j['StaticCard'] === h && (j['StaticCard'] = 0x1), !j['CoinRatio'] && (j['CoinRatio'] = 0x0),
               j['DynamicDifficulty'] === null && (j['DynamicDifficulty'] = ![]),
               !j['AllowUserCard'] && (j['AllowUserCard'] = ![]),
                !j['SummonZombieArea'] && (j['SummonZombieArea'] = []), !j['PicArr'] && (j['PicArr'] = []);
            if (j['AllowUserCard']) {
                if (!j['PName'])
                    j['PName'] = [];
                else {
                    if (j['PName']['length'] > 0x0 && !localStorage['JNG_DEV'] && j['StaticCard'] === 0x1 && j['CanSelectCard'] === 0x1) {
                        var k;
                        let n = [ //base plants
                                oPeashooter,
                                oSunFlower,
                                oPotatoMine,
                                oWallNut,
                                oStoneFlower,
                                oRadish,
                                oSnowPea,
                                oRepeater,
                                oCherryBomb,
                                oTallNut,
                                oSunShroom,
                                oPuffShroom,
                                oScaredyShroom,
                                oFumeShroom,
                                oSporeShroom,
                                oBambooUncle,
                                oDoomShroom,
                                oBegonia,
                                oIceAloe,
                                oPepper,
                                oImitater,
                                oMonotropa,
                                oSpikeweed,
                                oTorchwood,
                                oKiwibeast,
                                oFlowerPot,
                                oCabbage,
                                oKernelPult,
                                oPlantern,
                                oBlover,
                                oShiitake,
                                oCranberry,
                                oMelonPult,
                                oElecTurnip
                            ]['concat'](j['PName'])['unique'](), o = function () {
                                let q = [];
                                for (let r of j['PName']) {
                                    q['push'](r['prototype']['EName']);//ENAME of platn in clas
                                }
                                return q;
                            }()['concat'](JSON['parse']((k = localStorage['JNG_TR_GotPlants']) !== null && k !== void 0x0 ? k : '[]'))['unique'](), p = {};
                        for (let q of o) {
                            p[q] = 0x1;
                        }
                        for (let r = n['length'] - 0x1; r >= 0x0; r--) {
                           const plantName = n[r].prototype.EName;
    // if (plantName === "oMelonPult") continue; // never remove MelonPult
    if (!p[plantName]) n.splice(r, 1);
                        }
                        j['PName'] = n;
                    }
                }
                j['PName']['length'] <= 0xa && j['CanSelectCard'] === 0x1 && (j['CanSelectCard'] = 0x0);
            } else
                !j['PName'] && (j['PName'] = []);//use can't select catds 
            !j['ZName'] && (j['ZName'] = []), !j['LF'] && (j['LF'] = [//Lawn flags
                0x0,
                0x1,
                0x1,
                0x1,
                0x1,
                0x1
            ]), !j['ZF'] && (j['ZF'] = j['LF']),
             !j['LoadAccess'] && (j['LoadAccess'] = null),//after resoirces are loaded
              !j['SunNum'] && (j['SunNum'] = 0x96),
               !j['ArCard'] && (j['ArCard'] = j['PName']), //array of cards
               j['DKind'] === h && (j['DKind'] = 0x1),
                j['ProduceSun'] === h && (j['ProduceSun'] = !![]),
                 j['Coord'] == h && (j['Coord'] = 0x1), 
               oP['FlagToMonitor'] = g && g['FlagToMonitor'] || {},//which flag have spawned zombies
                oP['FlagToEnd'] = g && g['FlagToEnd'] || j['DefaultFlagToEnd'],//end flag
  /*/managers         /**call cord function */      oCoord[j['Coord']](), oP['Init'](f), oT['Init'](j['R']),//R might be rows
                  oZ['Init'](j['R']), oGd['Init'](), oBu['Init'](),
                   oCoinContent['Init'](), j['LoadProgress']();
        },
        'LoadProgress': function (e, f, g, j, k) {
            let m = oS, n = m['PicArr'], o = m['PName'], s = m['ZName'], v = GetX(0xb), w = oGd['$ZF'], x = oS['R'] + 0x1, y = m['CheckImg'];
            for (let A of o) {
                let B = A['prototype'], C = B['PicArr']['slice']();
                for (let D in C) {
                    C[D] && !/base64/['test'](C[D]) && (C[D] = {
                        'img': C[D],
                        'randomPic': !![]
                    });
                }
                n = n['concat'](C), m['AudioArr'] = m['AudioArr']['concat'](B['AudioArr']);
            }
            for (let E of s) {
                let F = E['prototype'], G = F['PicArr']['slice']();
                for (let H in G) {
                    G[H] && !/base64/['test'](G[H]) && (G[H] = {
                        'img': G[H],
                        'randomPic': !![]
                    });
                }
                n = n['concat'](G), m['AudioArr'] = m['AudioArr']['concat'](F['AudioArr']), F['Init'](v, F, w, x);
            }
            m['PicNum'] = n['length'];
            let z = ![];
            $('loadju')['onclick'] = function () {
                z = !![], oS['AccessNum'] = oS['PicNum'] - 0x1, oS['CheckImg']();
            }, loadRes({
                'img': [
                    I => {
                        !z && y();
                    },
                    ...n
                ],
                'au': m['AudioArr']
            });
        },
        'CheckImg': function () {
            const a = oS;
            (a['PicNum'] === 0x0 || ++a['AccessNum'] === a['PicNum']) && (SetNone($('loading')), a['LoadReady'](a), $('loadju')['onclick'] = null);
        },
        'LoadReady': function (a) {
            oSym['NowStep'] = $User['NowStep'], oSym['TimeStep'] = $User['TimeStep'], $('sFlagMeterTitleF')['innerHTML'] = a['LevelName'], SetHidden($('dFlagMeterContent'), $('dFlagMeter'));
            let b = {
                'background': a['backgroundImage'] ? 'url(' + a['backgroundImage'] + ')\x20no-repeat' : '',
                'visibility': 'visible'
            };
            SetStyle($('tGround'), b), a['backgroundMask'] && FightingScene['classList']['add'](a['backgroundMask']);
            const c = function (d) {
                NewImg('imgGrowSoil', 'images/interface/GrowSoil.gif', 'visibility:hidden;z-index:50', FightingScene), NewEle('dTitle', 'div', 0x0, 0x0, EDAll), innerText(ESSunNum, a['SunNum']), InitPCard(), DisplayZombie(...a['SummonZombieArea']), oS['isScroll'] ? oSym['addTask'](!d ? 0x5a : d, e => requestAnimationFrame(f => oS['ScrollScreen']())) : oS['NoScroll']();
            };
            a['LoadAccess'] ? a['LoadAccess'](c) : c();
        },
        'NoScroll'() {
            SetVisible($('dMenu')), AutoSelectCards();
            const a = $('dCardList');
            EDAll['scrollLeft'] = 0x73, a['style']['left'] = '115px', oSym['addTask'](0x1e, LetsGO);
        },
        'ScrollScreen'(a = 0x1, b = 0x0) {
            b < 0xfa ? a += 0.3 : a -= 0.3;
            if ((b += a) <= 0x1f4)
                EDAll['scrollLeft'] = b, requestAnimationFrame(c => oS['ScrollScreen'](a, b));
            else {
                SetVisible($('dMenu'));
                if (oS['CanSelectCard']) {
                    const c = $('dSelectCard');
                    SetVisible(c, $('dCardList')), SelectLockedCards(), oEffects['Animate'](c, { 'top': '0px' }, 0.225, 'cubic-bezier(0.0,\x200.0,\x200.2,\x201)', d => {
                        c['style']['pointer-events'] = 'auto', $User['_tmpARCARD'] && ($User['_tmpARCARD'][0x0] == oS['Lvl'] && ResetCards($User['_tmpARCARD'][0x1]), delete $User['_tmpARCARD']);
                    }, 0.3), oPropSelectGUI['Init']()['show']();
                } else
                    AutoSelectCards(), oSym['addTask'](0xc8, oS['ScrollBack'], [
                        LetsGO,
                        a
                    ]);
            }
        },
        'ScrollBack'(a, b = 0x1) {
            const c = $('dCardList');
            (function d() {
                let e = EDAll['scrollLeft'];
                EDAll['scrollLeft'] > 0xc0 + 0x73 ? b += 0.3 : b = Math['max'](b - 0.3, 0.3), (e -= b) > 0x73 ? (EDAll['scrollLeft'] = Math['floor'](e), c['style']['left'] = Math['floor'](e) + 'px', requestAnimationFrame(d)) : (EDAll['scrollLeft'] = 0x73, c['style']['left'] = '115px', oSym['addTask'](0x0, a));
            }());
        }
    }, oCoord = {
        ['1']() {
            oS['R'] = 0x5, WIN['ChosePlantX'] = a => {
                let b = GetC(a);
                return [
                    GetX(b),//center of column
                    b
                ];
            }, WIN['ChosePlantY'] = a => {
                let b = GetR(a);
                return [
                    GetY(b),
                    b
                ];
            }, WIN['GetC'] = a => $SSml(a, [//get column number ofmouse X position
                -0x32,//threshold
                0x64,
                0x8c,
                0xdc,
                0x127,
                0x17b,
                0x1cc,
                0x21c,
                0x271,
                0x2b7,
                0x307,
                0x357,
                0x3a7,
                0x407
            ], [//output//1-9
                -0x2, //-2 to 12
                -0x1,
                0x0,
                0x1,
                0x2,
                0x3,
                0x4,
                0x5,
                0x6,
                0x7,
                0x8,
                0x9,
                0xa,
                0xb,
                0xc
            ]), WIN['GetR'] = a => $SSml(a, [
                0x56,//range
                0xb5,
                0x119,
                0x182,
                0x1dc
            ], [
                0x0,
                0x1,//output
                0x2,
                0x3,
                0x4,
                0x5
            ]), WIN['GetX'] = a => $SEql(a, { //column to pixel lookup table
                '-2': -0x32,
                '-1': 0x64,
                0x0: 0x8c,
                0x1: 0xbb,
                0x2: 0x10b,
                0x3: 0x15b,
                0x4: 0x1ab,
                0x5: 0x1fb,
                0x6: 0x24b,
                0x7: 0x29b,
                0x8: 0x2eb,
                0x9: 0x33b,
                0xa: 0x361,
                0xb: 0x3b6,
                0xc: 0x41a
            }), WIN['GetY'] = a => [
                0x4b,
                0xaf,
                0x10e,
                0x17c,
                0x1d6,
                0x23f
            ][a], WIN['GetY1Y2'] = a => $SEql(a, {
                0x0: [
                    0x0,
                    0x4b
                ],
                0x1: [
                    0x4c,
                    0xb4
                ],
                0x2: [
                    0xb5,
                    0x118
                ],
                0x3: [
                    0x119,
                    0x181
                ],
                0x4: [
                    0x182,
                    0x1db
                ],
                0x5: [
                    0x1dc,
                    0x238
                ]
            }), !oS['InitLawnMover'] && (oS['InitLawnMover'] = a => {//if lawn mover is not
                for (let b = 0x1; b < 0x6; b++)
                    oSym['addTask'](b * 0xa, CustomSpecial, [//10 sec difference
                        oLawnCleaner,
                        b,//column
                        -0x1 //row
                    ]);
            }), oS['HaveFog'] && oFog['init']()['render']();
        },
        ['2']() {
            oS['R'] = 0x6;
            let a = (f, g, h, i, j) => (j = f < g ? g : f > h ? h : f, i ? [
                i(j),
                j
            ] : [j]);
            WIN['ChosePlantX'] = b => a(GetC(b), 0x1, oS['C'], GetX), WIN['ChosePlantY'] = b => $SSml(b, [
                0x56,
                0xab,
                0x108,
                0x170,
                0x1b8,
                0x214
            ], [
                [
                    0x4b,
                    0x0
                ],
                [
                    0xa1,
                    0x1
                ],
                [
                    0xfe,
                    0x2
                ],
                [
                    0x166,
                    0x3
                ],
                [
                    0x1ae,
                    0x4
                ],
                [
                    0x20c,
                    0x5
                ],
                [
                    0x251,
                    0x6
                ]
            ]), WIN['GetC'] = b => $SSml(b, [//paramter b is passed
                -0x32,
                0x64,
                0x8c,
                0xdc,
                0x127,
                0x17b,
                0x1cc,
                0x21c,
                0x271,
                0x2b7,
                0x307,
                0x357,
                0x3a7,
                0x407
            ], [
                -0x2,
                -0x1,
                0x0,
                0x1,
                0x2,
                0x3,
                0x4,
                0x5,
                0x6,
                0x7,
                0x8,
                0x9,
                0xa,
                0xb,
                0xc
            ]), WIN['GetR'] = b => $SSml(b, [//b is pixel left its a in function
                0x56,
                0xab,
                0x108,
                0x170,
                0x1b8,
                0x214
            ], [
                0x0,
                0x1,
                0x2,
                0x3,
                0x4,
                0x5,
                0x6
            ]), WIN['GetX'] = b => $SEql(b, {
                '-2': -0x32,
                '-1': 0x64,
                0x0: 0x8c,
                0x1: 0xbb,
                0x2: 0x10b,
                0x3: 0x15b,
                0x4: 0x1ab,
                0x5: 0x1fb,
                0x6: 0x24b,
                0x7: 0x29b,
                0x8: 0x2eb,
                0x9: 0x33b,
                0xa: 0x361,
                0xb: 0x3b6,
                0xc: 0x41a
            }), WIN['GetY'] = b => [
                0x4b,
                0xa5,
                0xfd,
                0x163,
                0x1ae,
                0x20a,
                0x24b
            ][b], WIN['GetY1Y2'] = b => $SEql(b, {
                0x0: [
                    0x0,
                    0x55
                ],
                0x1: [
                    0x56,
                    0xaa
                ],
                0x2: [
                    0xab,
                    0x107
                ],
                0x3: [
                    0x108,
                    0x16f
                ],
                0x4: [
                    0x170,
                    0x1b7
                ],
                0x5: [
                    0x1b8,
                    0x213
                ],
                0x6: [
                    0x214,
                    0x258
                ]
            }), !oS['InitLawnMover'] && (oS['InitLawnMover'] = () => {
                for (let b = 0x1; b < 0x7; b++)
                    oSym['addTask'](b * 0xa, CustomSpecial, [
                        b > 0x2 && b < 0x5 && WIN['oPoolCleaner'] ? oPoolCleaner : oLawnCleaner,
                        b,
                        -0x1
                    ]);
            }), oS['HaveFog'] && oFog['init']()['render']();
        }
    }, oP = {
        'MonitorZombiePosition'(a) {
           //a is zombie obj
            a['ZX'] && a['R'] && (oP['LastDeathPosition'] = {
                'x': a['ZX'] + 0x73,//add 115
                'y': GetY(a['R'])//center of row //get Y //this will pick element in context of row
            }); //create LastDeathPosition for some objects and events
        },
        'Init'(a) {
            oP['LastDeathPosition'] = { //last death position
                'x': 0x217,// 535
                'y': 0xc8//200
            },
            oP['SpecialJudgment'] = {},//empty obj
            oP['NumZombies'] = oP['FlagZombies'] = 0x0;//assign to both zombies and flag zombies
            if (a) {
                Object['assign'](oP, a), oP['SpecialJudgment'] = { //copy all from obj a to oP
                    'delays': {},//delays
                    'checks': {},//conditional checks validations
                    'maxTimes': {},// times the action run
                    'MonPrgsDelay': 0x1f4//delay 500
                }, Object['assign'](oP['SpecialJudgment'], a['SpecialJudgment']);//assign again for data structure
                let b = oP['FlagToEnd'];//assign to b save original function
                oP['FlagToEnd'] = e => {//declare runs when level complete
                    var f;
                    b['bind'](oP)();//call function in contxt of OP a this
                    oS['DynamicDifficulty'] && operateDynamicDifficulty(0x1); //1
                    let g = JSON['parse']((f = localStorage['JNG_TR_WON']) !== null && f !== void 0x0 ? f : '{}');//empty obj if void else parse obj
               /*  assign new level*/     g[oS['Lvl']] = 0x1, localStorage['JNG_TR_WON'] = JSON['stringify'](g), DataManager['CheckAchievement']('lvl', g);//pass g which contains completed level data
                };
                if (oS['DynamicDifficulty']) {//if key exists
                    let e = operateDynamicDifficulty();//get dynamic diffculty
                    function f(g, h) {//g is first step h is last step
                        
                        if (e == 0x0 || !g || !h)//return 0
                            return 0x0;
                        let k = [//weight pattern this one wave not all
                                0x0, //0,1,2,1,0
                                0x1,
                                0x2,
                                0x1,
                                0x0
                            ], l = 0x0, m = g + 0x1;//g+1   //l accumnlatorfor totla influence
                        h = Math['min'](h, g + 0x1e);//g+30  //h should not go beyoon g+30
//10 is base as iteration would be too much // 1.5 decrease 1.5 increase smoothness
                        let n = 0xa - 1.5 * Math['floor'](Math['abs'](e / 1.5));//limiting factor decrease as dificult increases staaysbewteen 1-10
            //smaall divisor more iteration more increase
                        for (let o = 0x0; o < g / n; o++) {// his pattern is typically used to gradually increase values in k by 0.2 proportionally to g/n.
                            for (let p in k) {
                                k[p] = k[p] + 0.2;
                            }
                        }
                        for (let q = g + 0x1; q <= h; q++) {//This could be a progressive scoring or influence calculation where the impact (l) changes over a range [g+1, h] with patterns of weights that grow over time.
                            e > 0x0 ? l += k[(q - 0x1) % 0x5] : l -= k[(q - 0x1) % 0x5]; //%5 for looping to elements in array
                            if (q - m > n) { //steps have passed
                                for (let r in k) {
                                    k[r] = Math['min'](0x10, Math['floor'](k[r] + 0x1));//increase k by 1 but not above 10
                                }
                                m = q;
                            }
                        }
                        return l = Math['round'](l / Math['max'](0x1, h - g)), l;//The code computes the average of l per unit of range length between g and h. It rounds that average to the nearest whole number.
                    }
                    for (let g = 0x0; g < oP['FlagToSumNum']['a2']['length']; g++) {//g is 0 - 
                        let h = oP['FlagToSumNum']['a2'][g];
                        oP['FlagToSumNum']['a2'][g] += f(g - 0x1 >= 0x0 ? oP['FlagToSumNum']['a1'][g - 0x1] : 0x0
                        , g >= oP['FlagToSumNum']['a1']['length'] ? oP['FlagNum'] : oP['FlagToSumNum']['a1'][g])
                        , oP['FlagToSumNum']['a2'][g] = Math['round'](oP['FlagToSumNum']['a2'][g] * (0x1 + operateDynamicDifficulty() / 0xf))
                        , oP['FlagToSumNum']['a2'][g] = Math['max'](oP['FlagToSumNum']['a2'][g], 0x1)
                        , h == 0x0 && oP['FlagToSumNum']['a2'][g] > 0x0 && (oP['FlagToSumNum']['a2'][g] = 0x0);
                    }//for f g is 0 or some value ,
                }
                if (oP['AZ']) {
                    let j = oP['AZ']['sort']((n, o) => n[0x2] - o[0x2]), k = j['length'], l = [], m = {};

                    
                    oP['ArZ'] = [];
                    while (k--) {
                        let n = j[k], o = n[0x0], p = n[0x1], q = n[0x2], r = n[0x3];
                        while (p--)
                            l['push']([
                                o,
                                q
                            ]);
                        r && r['forEach'](s => m[s] ? m[s]['push'](o) : m[s] = [o]);
                    }


                    oP['AZ'] = l, oP['MustShowAtFlag'] = m;
                }
                let c = oP['FlagNum'], d;
                c ? oP['MonPrgs'] = s => {
                    (--oP['NumZombies'] <= 0x0 || oP['SpecialJudgment']['checks'][oP['FlagZombies']] && oP['NumZombies'] <= oP['SpecialJudgment']['checks'][oP['FlagZombies']]) && (d = oP['FlagZombies'],
                     d < c ? (oP['ReadyFlag'] = ++d,
                     oSym['addTask'](0x1f4, oP['FlagPrgs'])) : toWin());
                } : oP['MonPrgs'] = s => {
                };
            }
        },
        'AddZombiesFlag'() {
            let a = oP, b = a['FlagNum'];
            PlayAudio('awooga'), oS['ControlFlagmeter'] && SetVisible($('dFlagMeterContent')), a['ReadyFlag'] = 0x1, a['FlagPrgs']();
        },
        'SelectFlagZombie'(a, b) {
            let c = oP, d = c['ArZ'], e = c['AZ'], f = [], g = 0x96;
            c['SpecialJudgment']['delays'][b] && (g = c['SpecialJudgment']['delays'][b]);
            let h = ![], i = e['length'];
            while (i--) {
                let n = e[i];
                if (n[0x1] > b)
                    break;
                else
                    e['pop'](), d['push'](n[0x0]), h = !![];
            }
            h && d['sort']((o, p) => o['prototype']['Lvl'] - p['prototype']['Lvl']);
            let j = c['MustShowAtFlag'][b];
            if (j)
                for (let o of j) {
                    f['push'](o), a -= o['prototype']['Lvl'];
                }
            let k = d['length'];
            if (k < 0x1)
                return;
            let l = k - 0x1, m = d[l]['prototype']['Lvl'];
            while (a > 0x0) {
                if (l && m > a) {
                    while (--l && d[l]['prototype']['Lvl'] > a);
                    k = l + 0x1, m = d[l]['prototype']['Lvl'];
                }
                let p = d[Math['floor'](Math['random']() * k)];
                a -= p['prototype']['Lvl'], f['push'](p);
            }
            c['NumZombies'] += f['length'], c['SetTimeoutZombie'](f, g);
        },
        'AppearUP'(a, b, c = !![], d = ![]) {
            b['forEach'](f => f['isCounted'] && oP['NumZombies']++);
            let e = f => {
                f['Birth']();
                let g = f['height'], h = f['EleBody'];
                c ? (h['style']['top'] = g + 'px', oEffects['Animate'](h, {
                    'top': '0px',
                    'clip': 'rect(0,auto,' + g + 'px,0)'
                }, 'slow', 'ease-out', i => {
                    i['style']['clip'] = 'rect(0,auto,auto,0)';
                })) : SetStyle(h, { 'clip': 'rect(0,auto,auto,0)' });
            };
            d ? syncInnerHTML(a['join'](''), f => {
                EDPZ['appendChild'](f), b['forEach'](e);
            }) : asyncInnerHTML(a['join'](''), f => {
                EDPZ['appendChild'](f), b['forEach'](e);
            });
        },
        'SetTimeoutZombie'(a, b) {
            let c = [], d = [], e = 0x0;
            a['forEach']((f, g) => {
                d[g] = (c[g] = new f())['prepareBirth'](e), e += b * (Math['random']() * 0.2 + 0.9);
            }), asyncInnerHTML(d['reverse']()['join'](''), f => {
                EDPZ['insertBefore'](f, EDPZ['firstChild']), c['forEach'](g => g['Birth']());
            });
        },
        'FlagPrgs'() {
            let a = oP['FlagZombies'], b = oP['FlagToSumNum'], c = $SSml(a, b['a1'], b['a2']), d;
            oP['FlagNum'] > (a = ++oP['FlagZombies']) && ((d = $SEql(a, oP['FlagToMonitor'])) && oSym['addTask'](oP['SpecialJudgment']['maxTimes'][a] ? Math['max'](oP['SpecialJudgment']['maxTimes'][a] - 0x12c, 0x1) : 0x69a, e => !d[0x1] && (d[0x0](), d[0x1] = 0x1)), oSym['addTask'](oP['SpecialJudgment']['maxTimes'][a] ? Math['max'](oP['SpecialJudgment']['maxTimes'][a], 0x1) : 0x7c6, e => oP['ReadyFlag'] === a && (oP['ReadyFlag'] = ++a, oP['FlagPrgs']()))), oS['ControlFlagmeter'] && oFlagContent['update']({ 'curValue': a - 0x1 }), oP['SelectFlagZombie'](c, a);
        },
        'Monitor'(a) {
            a && a['f'](...a['ar']);
            const b = oZ['traversalOf'], c = oBu['traversalOf']['bind'](oBu);
            (function d() {
                b(), oSym['addTask'](0xa, d);
            }(), function e() {
                c(), oSym['addTask'](0x1, e);
            }());
        }
    }, oGd = {//game object grid manager or grid cells manipulation
        'Init'() {//creates a grid inittializing
            let a = this;//refernce captured
/*assigning properties*/ a['$'] = {}, a['$Crater'] = [], a['$LockingGrid'] = {}, a['$Sculpture'] = {}, a['$Torch'] = {}, a['$TrafficLights'] = {}, a['$Plantern'] = {}, a['$Obstacle'] = {}, a['$LF'] = oS['LF'], a['$ZF'] = oS['ZF'], a['$Ice'] = [], a['$GdType'] = [], a['$WaterDepth'] = [], a['$JackinTheBox'] = 0x0;
            for (let b = 0x0; b < oS['R'] + 0x1; b++) { //bis 0 and less than R+1
                a['$GdType'][b] = [], a['$WaterDepth'][b] = [];//create row array for ground and water
                for (let c = 0x1; c < oS['C'] + 0x1; c++) {//for each column in row c starts from 1
                    a['$GdType'][b][c] = a['$LF'][b], a['$WaterDepth'][b][c] = 0x1e;//water depth 30
                }
            }
        },
        'add'(a, b) {
            let c = this['$'], d = c[b];
            d && d['Die'] && d['Die'](), c[b] = a;
        },
        'del'(a) {
            delete this['$'][a['R'] + '_' + a['C'] + '_' + a['PKind']];
        },
        'killAll'(a, b, c = 'JNG_TICKET_ShovelPlant') {
            const d = this['$'];
            for (let e = 0x0; e <= PKindUpperLimit; e++) {
                let f = a + '_' + b + '_' + e;
                d[f] && d[f]['Die'](c);
            }
        }
    }, oBu = {
        'Init'() {
            let a = this;//self
            a['$Bullets'] = {}, a['deleteList'] = [];//setting properties
        },
        'del'(a) {
            let b = this;//self
            b['deleteList']['push'](a['id']);//set id to delete
        },
        'add'(a, b) { //add 
            let c = this;
            c['$Bullets'][b] = a;// add in bullet id and assign it its self
        },
        'traversalOf'() {//delete bullet marked
            let a = this, b = a['$Bullets'], c = a['deleteList'];
            for (let d in b) {
                b[d]['Update'](b[d]);
            }
            for (let e = c['length'] - 0x1; e >= 0x0; e--) {
                delete b[c[e]];
            }
            c['length'] > 0x0 && (a['deleteList'] = []);
        }
    }, oZ = {//zombie manager
        'Init': function (a) {//set properties
            this['$'] = [], this['$R'] = [];
            var b;
            for (b = a; b; this['$'][b] = [], this['$R'][b--] = []);//create array for each row
        },
        'add'(a) {//a is a zombie object
            let b = oZ['$'][a['R']];//t
            b['push'](a), b['sort']((c, d) => c['AttackedLX'] - d['AttackedLX']), b['RefreshTime'] = oSym['Now'];//sort zombies form right to left with their attackedLX
        },
        'getZ0'(a, b, c = h => !![]) { //c is callback fnction dfault to h //a is xcoordinate where attack is happending //b is row index
            if (b < 0x1 || b > oS['R'])//row out of bound
                return;
            let d = 0x0, e = this['$'][b], f, g = e['length'];//g is zombies length
        
            while (d < g && (f = e[d++])['AttackedLX'] <= a) {//more zonmbies than 0 and post increment //hit box range is  greater than or equal to X coord
                if (f['PZ'] && f['HP'] && f['AttackedRX'] >= a && c(f)) //PZ active zombie //right hotbox is greater than a //c(f) tre by default
                    return f; //return zombie object
            }
        },//
        'getZ1': function (b, c, d = m => !![]) {//from right 
            if (c < 0x1 || c > oS['R'])
                return;
            var e = 0x0, f = this['$'][c], g = this['$R'][c], h, j, k, l;
            (k = f['RefreshTime']) == g['RefreshTime'] ? h = g : (h = (this['$R'][c] = f['slice'](0x0))['sort'](function (m, n) {
                return n['AttackedRX'] - m['AttackedRX'];
            }))['RefreshTime'] = k, l = h['length'];
            while (e < l && (j = h[e++])['AttackedRX'] >= b)
                if (j['PZ'] && j['HP'] && j['AttackedLX'] <= b && d(j))
                    return j;
        },
        'getArZ'(a, b, c, d = f => !![]) {
            let e = [];
            for (let f of this['$'][c]) {
                const g = f['AttackedLX'];
                if (g >= b)
                    break;
                f['PZ'] && f['HP'] && (f['AttackedRX'] > a || f['AttackedLX'] > a) && d(f) && e['push'](f);
            }
            return e;
        },
        'getRangeLeftZ'(a, b, c, d = ![], e = ![], f) {
            if (c < 0x1 || c > oS['R'])
                return;
            let g = this['$'][c], h;
            for (let i of g) {
                const {
                    AttackedLX: j,
                    AttackedRX: k
                } = i;
                if (j > b)
                    break;
                if (i['PZ'] && i['HP'] && (a < j || a < k)) {
                    if (d && i['isPuppet']) {
                        !h && (h = i);
                        continue;
                    }
                    if (e && i['HP'] <= i['BreakPoint'])
                        continue;
                    if (f && !f(i))
                        continue;
                    return i;
                }
            }
            return d ? h : null;
        },
        'moveTo'(a, b, c) {
            var d = this['$'][b], e = this['$'][c], f = d['length'], g;
            while (f--) {
                let h = d[f];
                h && h['id'] == a && e && (d['splice'](f, 0x1), h['R'] = c, e['push'](h), e['sort'](function (j, k) {
                    return j['AttackedLX'] - k['AttackedLX'];
                })['RefreshTime'] = d['RefreshTime'] = oSym['Now'], f = 0x0);
            }
        },
        'traversalOf'() {
            let a = oZ['$'], b = [
                    g => {
                        d = 0x1;
                    },
                    g => {
                        (f = g['AttackedLX']) > e && (c = d = 0x1), e = f;
                    }
                ], c = 0x0, d = 0x0, e = 0x3e8, f;
            for (let g = 0x1, h = a['length']; g < h; g++) {
                let j = a[g], k = j['length'];
                while (k--) {
                    let l = j[k];
                    l['HP'] ? (l['PZ'] && l['ZX'] < 0x385 && oT['chkD' + l['WalkDirection']](l, g, oT['$'][g], oT['$L'][g]), b[l['ChkActs'](l, g, j, k)](l)) : (j['splice'](k, 0x1), b[0x0](l));
                }
                e = 0x3e8, c ? (c = d = 0x0, j['sort']((m, n) => m['AttackedLX'] - n['AttackedLX']), j['RefreshTime'] = oSym['Now']) : d && (d = 0x0, j['RefreshTime'] = oSym['Now']);
            }
        }
    }, oT = {
        'Init'(a) {
            this['$'] = [], this['$L'] = [];//two arrays are created
            for (let b = a; b;) {//b be true 
                this['$'][b] = [], this['$L'][b--] = [];//asign arrays to elements //2d arrays first element is always emoty
            }
        },
        'add'(a, b, c) {
            if (a <= 0x0 || a > oS['R'])//if a is 0 and a greater than oS Rows return
                return;
            let d = this['$'][a];//d is an array from $
            for (let e of b) {
                d['push']([//push in d
                    ...e,//each property and id
                    c
                ]);
            }
            d['sort']((f, g) => g[0x1] - f[0x1]), d['RefreshTime'] = new Date();
        },
        'chkD0'(a, b, c, d) {
            let e = a['AttackedLX'], f = 0x0, g;
            while (f < c['length'] && (g = c[f])[0x1] >= e) {
                let h = $P[g[0x3]];
                h['canTrigger'] && g[0x0] <= e && h['TriggerCheck'](a, g[0x2], f), ++f;
            }
        },
        'chkD1'(a, b, c, d) {
            let e = a['AttackedRX'], f = 0x0, g = c['RefreshTime'], h, j;
            g === d['RefreshTime'] ? h = d : (d = this['$L'][b] = c['slice'](0x0), h = d['sort']((k, l) => k[0x0] - l[0x0]), h['RefreshTime'] = g);
            while (f < h['length'] && (j = h[f])[0x0] <= e) {
                let k = $P[j[0x3]];
                k['canTrigger'] && j[0x1] >= e && k['TriggerCheck'](a, j[0x2], f), ++f;
            }
        },
        'delP'(a) {
            let b = a['id'], c = Object['keys'](a['oTrigger']);
            for (let d of c) {
                let e = this['$'][d];
                for (let f = 0x0; f < e['length']; f++) {
                    e[f][0x3] === b && e['splice'](f, 0x1);
                }
                e['RefreshTime'] = new Date();
            }
        }
    }, ResetGame = function (a) {
        AllAudioPauseCanceled(), oSym['Start']();
    }, PauseGame = function () {
        AllAudioPaused(), oSym['Stop']();
    }, RewriteGlobalVariables = function (a, b) {
        for (let c in a) {
            b ? (!oS['GlobalVariables'][c] && (oS['GlobalVariables'][c] = WIN[c]), WIN[c] = a[c]) : !oS['GlobalVariables'][c] && (oS['GlobalVariables'][c] = WIN[c], WIN[c] = a[c]);
        }
    }, SelectModal = function (a, b) {
        ClearEventListeners(window, 'jng-event-startgame'), ClearEventListeners(window, 'jng-event-endgame'), StopMusic(), PausedAudioArr = [], oSelectionMap['_lastMusic_'] = oS['LoadMusic'] = oS['StartGameMusic'] = null;
        let c = oS['GlobalVariables'], d = oS['SelfVariables'];
        for (let e in c) {
            WIN[e] = c[e];
        }
        oS['GlobalVariables'] = {};
        for (let f of d) {
            try {
                delete oS[f];
            } catch {
            }
        }
        if (oImage['garbage'])
            for (let g of oImage['garbage']) {
                try {
                    URL['revokeObjectURL'](g), g = null;
                } catch {
                }
                ;
            }
        oImage = {}, oS['SelfVariables']['length'] = 0x0, CancelShovel(), SetBlock($('loading')), SetHidden($('dCardList'), $('tGround'), $('dSelectCard'), $('dTop'), $('dMenu'), $('dNewPlant')), SetNone($('Menu'), $('shade'), $('SelectionMap'), $('labMap')), dSurface['style']['display'] = a === 'Service/index.js' || a === 'index' && b === 'Service' ? 'block' : 'none', EDAll = EBody['replaceChild'](EDNewAll, EDAll), LoadModal(a, b);
    }, LoadModal = function (a, b = 'Level') {
        let c = 'modal/' + (/\w+?\/\w+?.js$/['test'](a) ? a : b + '/' + a + '.js');
        oS['Lvl'] = c['substring'](c['lastIndexOf']('/') + 0x1, c['indexOf']('.js')), /blob/['test'](a) && (c = a, oS['Lvl'] = 'Fanmade', oS['OriginLvl'] = c), oSym['Timer'] && oSym['Stop'](), oSym['Init'](d => {
            ClearChild($('JSPVZ')), NewEle('JSPVZ', 'script', null, { 'src': c }, document['querySelector']('head'));
        });
    }, NewMusic = function (b, c = 'mp3') {
        return NewAudio({
            'autoplay': !![],
            'loop': !![],
            'source': b,
            'suffix': c
        });
    }, PauseMusic = function () {
        var b = oAudio[oS['LoadMusic']];
        b['currentTime'] = 0x0, b['pause']();
    }, oAudio = {}, oAudioLink = {}, oImage = {}, PausedAudioArr = [], NewAudio = function (a) {
        const b = a['source'];
        if (!b)
            return null;
        let c = 'audio/' + b + '.' + (a['suffix'] ? a['suffix'] : 'mp3');
        if (oAudio[b])
            return oAudio[b];
        let d = new Audio();
        d['autoplay'] = !!a['autoplay'];
        function e() {
            d['src'] = c;
        }
        return d['preload'] = a['preload'] === undefined ? 'auto' : [
            'auto',
            'meta',
            'none'
        ][a['preload']], d['muted'] = oS['Silence'], a['loop'] ? d['loop'] = 'loop' : d['volume'] = 0.8, a['callback'] && d['addEventListener']('canplaythrough', a['callback'], ![]), !a['loop'] && d['addEventListener']('ended', f => {
            d['remove'](), d['src'] = '', delete oAudio[b];
        }, { 'once': !![] }), e(), !!a['autoplay'] ? oAudio[b] = d : null;
    }, PlayMusic = function (c, d = 'mp3') {
        let e = oAudio[c];
        if (e)
            e['currentTime'] = 0x0, e['play']();
        else {
            var f;
            (f = NewMusic(c, d)) === null || f === void 0x0 ? void 0x0 : f['play']();
        }
    }, PlayAudio = function (a, b = ![], c = 'mp3', d = 0x1) {
        let e = a;
        return typeof a === 'string' && (e = oAudio[a] || NewAudio({
            'source': a,
            'suffix': c,
            'autoplay': !![]
        })), e['currentTime'] = 0x0, e['volume'] = d, e['loop'] = b, e['play'](), e;
    }, PauseAudio = function (b) {
        oAudio[b]['pause']();
    }, StopMusic = function () {
        [
            oS['LoadMusic'],
            oS['StartGameMusic']
        ]['forEach'](b => {
            oAudio[b] && (oAudio[b]['pause'](), oAudio[b]['remove'](), oAudio[b]['src'] = '', delete oAudio[b]);
        });
    }, StopAudio = function (a) {
        oAudio[a] && function (c) {
            var d = oAudio[c];
            d['pause'](), d['remove'](), d['src'] = '', delete oAudio[c];
        }(a);
    }, AllAudioPaused = function () {
        var c, d;
        for (c in oAudio) {
            d = oAudio[c], !(d['paused'] || d['ended']) && (PausedAudioArr['push'](c), d['pause']());
        }
    }, AllAudioPauseCanceled = function () {
        var b = PausedAudioArr['length'];
        while (b--) {
            var c;
            (c = oAudio[PausedAudioArr[b]]) === null || c === void 0x0 ? void 0x0 : c['play']();
        }
        PausedAudioArr['length'] = 0x0;
    }, AllAudioMuted = function () {
        var b;
        for (b in oAudio) {
            oAudio[b]['muted'] = !![];
        }
    }, AllAudioMuteCanceled = function () {
        var b;
        for (b in oAudio) {
            oAudio[b]['muted'] = ![];
        }
    }, loadRes = function (a, b) {
        let c = NewAudio, e = document['getElementsByTagName']('head')[0x0];
        if (a['js']) {
            let f = a['js'][0x0], g = 0x0;
            typeof f === 'string' && (g = -0x1), a['js']['forEach'](function (h, i) {
                if (i > g) {
                    let j = NewEle(![], 'script', ![], { 'src': h }, e);
                    g === 0x0 && (j['onload'] = f);
                }
            });
        }
        if (a['css']) {
            let h = a['css'][0x0], i = 0x0;
            typeof h === 'string' && (i = -0x1), a['css']['forEach'](function (j, k) {
                if (k > i) {
                    let l = NewEle(![], 'link', ![], {
                        'href': j,
                        'rel': 'stylesheet'
                    }, e);
                    i === 0x0 && (l['onload'] = h);
                }
            });
        }
        if (a['img']) {
            let j = a['img'][0x0], k = 0x0;
            typeof j !== 'function' && (k = -0x1);
            if (a['img']['length'] < 0x2 && k === 0x0) {
                j && j();
                return;
            }
            let l = 0x0, m = [];
            a['img']['forEach'](function (n, p) {
                if (p > k) {
                    let q;
                    typeof n !== 'string' && (q = n, n = q['img']);
                    if (/mp4|webm/['test'](n['substring'](n['lastIndexOf']('.') + 0x1, n['length']))) {
                        m['push'](n);
                        return;
                    }
                    let r = new Image();
                    r['src'] = n, r['complete'] ? (function () {
                        k === 0x0 && j(r);
                    }()) : r['onload'] = r['onerror'] = function () {
                        k === 0x0 && j(r);
                    };
                }
            }), m['length'] > 0x0 && (m['splice'](0x0, 0x0, j), loadRes({ 'video': m }));
        }
        if (a['video']) {
            let n = a['video'][0x0], p = 0x0;
            typeof n !== 'function' && (p = -0x1);
            if (a['video']['length'] < 0x2 && p === 0x0) {
                n && n();
                return;
            }
            a['video']['forEach'](function (q, r) {
                r > p && NewEle('', 'video', '', {
                    'src': q,
                    'preload': 'auto',
                    'oncanplaythrough'() {
                        p === 0x0 && n();
                    }
                });
            });
        }
        a['au'] && a['au']['forEach'](function (q) {
            let r = q['lastIndexOf']('.'), s = q['substring'](r + 0x1, q['length']), t = q['substring'](0x0, r);
            r == -0x1 ? NewAudio({ 'source': q }) : NewAudio({
                'source': t,
                'suffix': s
            });
        });
    }, NewO = (a, b) => {
        let c = b || function () {
        };
        return c['prototype'] = a, Object['defineProperty'](c['prototype'], 'constructor', {
            'value': c,
            'configurable': ![],
            'enumerable': ![]
        }), c;
    }, InheritO = function (a, b) {
        let c = function () {
        };
        return c['prototype'] = new a(), b && Object['assign'](c['prototype'], b), Object['defineProperty'](c['prototype'], 'constructor', {
            'value': c,
            'configurable': ![],
            'enumerable': ![]
        }), c;
    }, $SEql = (a, b) => b[a] || b['default'], $SSml = function (a, b, c) {
        let d = 0x0, e = b['length'];//d is 0
        while (d < e) {//length is greater than 0
            if (a < b[d])//if  a is less than b first element
                break; //breaj
            d++; //else increase d by 1
        }
        return c[d];//return c with [d]
    };