const TitleScene = {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    var label = Label('Hello, phina.js!').addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center());
  }
};

export default TitleScene;