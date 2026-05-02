
 'use strict';

oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oStoneFlower, oRadish],
  ZName: [oZombie, oNewspaperZombie, oBalloonZombie, oConeheadZombie, oBucketheadZombie],
  SunNum: 150,
  LevelName: $__language_Array__["660263d0cf9850d93bea593129cac36f"],
  LoadMusic: "Bgm_Forest_Ready",
  StartGameMusic: "Bgm_Forest_Fight"
}, {
  AZ: [[oZombie, 2, 1], [oNewspaperZombie, 2, 1], [oBalloonZombie, 2, 1], [oConeheadZombie, 2, 1], [oBucketheadZombie, 2, 1]],
  FlagNum: 15,
  FlagToSumNum: {
    a1: [1, 2, 6, 9, 10],
    a2: [2, 1, 3, 4, 6, 11]
  }
});