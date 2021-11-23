import * as phina from "phina.js";
import * as Box2d from 'box2dweb';

import config from '../config';

import COURSE from '../course'

const currentCourse = COURSE[0];
const currentStage = [];

const RECTANGLE_SIZE = 32;

const GRAVITY = 0.9;

const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 128;

function isHit(srcX, srcY, srcW, srcH, destX, destY, destW, destH) {
  if (((srcX + srcW) >= (destX)) && ((srcX) <= (destX))) {
    if (((srcY + srcH) >= (destY)) && ((srcY) <= (destY))) {
      return true;
    }
    else if (((srcY + srcH) >= (destY + destH)) && ((srcY) <= (destY + destH))) {
      return true;
    }
  }
  else if (((srcX + srcW) >= (destX + destW)) && ((srcX) <= (destX + destW))) {
    if (((srcY + srcH) >= (destY)) && ((srcY + _r1.t) <= (destY))) {
      return true;
    }
    else if (((srcY + srcH) >= (destY + destH)) && ((srcY) <= (destY + destH))) {
      return true;
    }
  }

  return false;
}

function isHitWall(srcX, srcY, srcW, srcH, destX, destY, destW, destH) {
  if (((srcX + srcW) >= (destX)) && ((srcX) <= (destX))) {
    if (((srcY + srcH) >= (destY)) && ((srcY) <= (destY))) {
      return true;
    }
  }
  else if (((srcX + srcW) >= (destX + destW)) && ((srcX) <= (destX + destW))) {
  }

  return false;
}

const MainScene = {
  superClass: 'DisplayScene',
  init: function () {
    this.superInit();
    
    for (const row in currentCourse) {
      const arr = [];
      for (const col in currentCourse[row]) {
        switch (currentCourse[row][col]) {
          case 0:
            arr.push(0);
            break;
          case 1:
            arr.push(
              RectangleShape({
                width: RECTANGLE_SIZE,
                height: RECTANGLE_SIZE,
                fill: '#000'
              }).addChildTo(this)
                .setPosition(col * RECTANGLE_SIZE, row * RECTANGLE_SIZE)
            );
            break;
          case 2:
            arr.push(
              Sprite('yu_red', 128, 128).addChildTo(this)
                .setPosition(col * RECTANGLE_SIZE, row * RECTANGLE_SIZE)
                .setScale(0.5, 0.5)
            );
        }
      }

      currentStage.push(arr);
    }
    this.player = Sprite('player', PLAYER_WIDTH, PLAYER_HEIGHT)
      .addChildTo(this)
      .setPosition(this.gridX.center(), 400);

    // 画面操作定義

    // ksk
    this.onpointstay = function(e) {
      //this.jumpVel = -10;
    };

    // jump
    this.onpointend = function(e) {
      if (this.jumpVel >= 0) {
        let isHit = false;
        for (const row in currentStage) {
          for (const col in currentStage[row]) {
            if (currentStage[row][col] === 0) {
              continue;
            }

            isHit = this.player.hitTestElement(currentStage[row][col]);
            if (isHit) {
              break;
            }
          }
          if (isHit) {
            break;
          }
        }

        if (isHit) {
          console.error('jump!!!!!!!!!!!');
          this.jumpVel = -16;
        }
      }
    };

    this.jumpTime = 0;
    this.isJumping = false;
    this.jumpVel = 30;
    this.canFall = true;
    this.isHittingWall = false;
    this.isHittingFloor = false;
  },
  update: function () {
    // ステージのスクロール
    this.canFall = true;
    this.isHittingWall = false;
    this.isHittingFloor = false;
    for (const row in currentCourse) {
      for (const col in currentCourse[row]) {
        if (currentStage[row][col] === 0) {
          continue;
        }

        currentStage[row][col].moveBy(-10, 0);

        // ついでにプレイヤーオブジェクトとコリジョンチェック
        const isHit = this.player.hitTestElement(currentStage[row][col]);

        if (!isHit) {
          continue;
        }

        // スプライトと当たったらゆ玉と当たった判定にしてcollectする
        if (currentStage[row][col] instanceof Sprite) {
          currentStage[row][col].hide();
          continue;
        }

        // ゆ玉じゃなかったら壁や床の判定なのでプレイヤーの移動を制限する
        // 壁
        if (isHitWall(
          this.player.x,
          this.player.y,
          PLAYER_WIDTH + 10,
          PLAYER_HEIGHT,
          currentStage[row][col].x,
          currentStage[row][col].y,
          RECTANGLE_SIZE,
          RECTANGLE_SIZE
          )) {
          this.isHittingWall = true;
          continue;
        }
        // 床
        if (
        !this.isHittingFloor
        &&  this.player.y + PLAYER_HEIGHT/2 > currentStage[row][col].y - RECTANGLE_SIZE/2) {
          if (this.jumpVel >= 0) {
            this.canFall = false;
            this.jumpVel = -1;
          }
          this.player.y = parseInt(currentStage[row][col].y - RECTANGLE_SIZE/2 - PLAYER_HEIGHT/2);
          this.isHittingFloor = true;
        }
      }
    }

    console.log((this.player.y));

    if (this.canFall) {
      if (this.jumpVel !== 30) {
        this.jumpVel++;
      }
      this.player.moveBy(0, this.jumpVel);
    }
    if (this.isHittingWall) {
      this.player.moveBy(-10, 0);
    } else if (this.player.x < this.gridX.center()) {
      this.player.moveBy(2, 0);
    }
  }
}

export default MainScene;