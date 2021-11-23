// import pixi from "pixi.js";
import * as phina from "phina.js";

import config from './config';

import TitleScene from './scenes/title';
import MainScene from './scenes/main';

phina.globalize();

const ASSETS = {
  image: {
    'player': '../../res/assets/img/player.png',
    'btn_jump': '../../res/assets/img/btn_jump.png',
    'yu_red': '../../res/assets/img/yu/red.png',
    'yu_orange': '../../res/assets/img/yu/red.png',
    'yu_yellow': '../../res/assets/img/yu/red.png',
    'yu_green': '../../res/assets/img/yu/red.png',
    'yu_blue': '../../res/assets/img/yu/red.png',
    'yu_dark-blue': '../../res/assets/img/yu/red.png',
    'yu_purple': '../../res/assets/img/yu/red.png',
    'yu_rainbow': '../../res/assets/img/yu/red.png',
  },
};

phina.define('TitleScene', TitleScene);

phina.define('MainScene', MainScene);

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    assets: ASSETS,
    width: config.window.width,
    height: config.window.height,
  });
  app.run();
});
