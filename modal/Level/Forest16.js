
 'use strict';

oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oStoneFlower, oRadish, oSnowPea],
  ZName: [oZombie, oConeheadZombie, oBucketheadZombie, oStrollZombie, oCigarZombie, oNewspaperZombie],
  PicArr: ['images/interface/GameOver.png'],
  SunNum: 150,
  LevelName: $__language_Array__["1dc2855978fb461851c81d8a45ea5ee8"],
  LoadMusic: "Bgm_Forest_Ready",
  StartGameMusic: "Bgm_Forest_Fight_Challenge",
  LoadAccess: function (a) {
    for (let i = 1; i < 6; i++) {
      CustomSpecial(oApple, i, 1);
      NewEle(0, "div", `left: 140px;top: ${80 + 100 * (i - 1)}px;`, {
        className: 'sos'
      }, FightingScene);
    }

    oSym.addTask(90, a);
  },
  StartGame: _ => oMiniGames.ProtectPlants({
    'oApple': 5
  })
}, {
  AZ: [[oZombie, 2, 1], [oConeheadZombie, 1, 2], [oBucketheadZombie, 1, 18], [oStrollZombie, 1, 5, [5, 6, 7]], [oCigarZombie, 1, 5, [5, 6, 7]], [oNewspaperZombie, 1, 8]],
  FlagNum: 10,
  FlagToSumNum: {
    a1: [5, 7, 9],
    a2: [1, 3, 6, 8]
  }
});