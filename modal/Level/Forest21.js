
 'use strict';

oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oStoneFlower, oRadish, oSnowPea, oRepeater, oCherryBomb],
  ZName: [oZombie, oConeheadZombie, oBalloonZombie, oNewspaperZombie, oFootballZombie, oStrollZombie, oCigarZombie, oBucketheadZombie],
  LevelName: $__language_Array__["137fd8ac42950cc8745f2e382b171b4c"],
  LoadMusic: "Bgm_Forest_Ready",
  StartGameMusic: "Bgm_Forest_Fight",
  LoadAccess: function (a) {
    oSym.addTask(90, function () {
      a(0);
    }, []);
  }
}, {
  AZ: [[oZombie, 2, 1, [1]], [oConeheadZombie, 2, 2], [oNewspaperZombie, 2, 7], [oFootballZombie, 2, 10], [oBalloonZombie, 2, 10], [oStrollZombie, 2, 8, [8]], [oCigarZombie, 2, 11, [11]]],
  FlagNum: 12,
  FlagToSumNum: {
    a1: [1, 5, 10, 12],
    a2: [1, 3, 10, 20]
  }
});