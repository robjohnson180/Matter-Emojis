class SceneB extends BaseScene {
    constructor(){
      super('sceneB');
      this.tileDataKey = 'slopes2';
      this.tileDataSource = 'assets/tiles/slopes2.json';
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        this.exit.y = 96;
    }

    update(time, delta) {
      super.update(time, delta)
    }
}
