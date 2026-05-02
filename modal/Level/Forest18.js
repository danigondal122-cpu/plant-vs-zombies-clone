
 'use strict';

oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oStoneFlower, oRadish, oSnowPea, oRepeater],
  ZName: [oZombie, oConeheadZombie, oBalloonZombie, oNewspaperZombie, oFootballZombie],
  SunNum: 150,
  LevelName: $__language_Array__["8542d72747aada01ecb6ed26b9b6113c"],
  LoadMusic: "Bgm_Forest_Ready",
  StartGameMusic: "Bgm_Forest_Fight",
  LoadAccess: function (a) {
    oSym.addTask(90, function () {
      a(0);
    }, []);
  }
}, {
  AZ: [[oZombie, 2, 2], [oConeheadZombie, 2, 2], [oNewspaperZombie, 2, 2], [oFootballZombie, 4, 1, [1]], [oBalloonZombie, 2, 2]],
  FlagNum: 13,
  FlagToSumNum: {
    a1: [5, 9],
    a2: [2, 8, 12]
  }
});