class SceneA extends BaseScene {
    constructor(){
      super('sceneA');
      this.tileDataKey = 'slopes';
      this.tileDataSource = 'assets/tiles/slopes.json';
    }

    preload() {
        super.preload();
        this.load.image('kenney-tileset', 'assets/tiles/kenney-tileset-64px-extruded.png');
        this.load.image('exit', 'assets/sprites/exit.png');
        this.load.spritesheet(
            'player',
            'assets/sprites/0x72-industrial-player-32px-extruded.png', {
                frameWidth: 32,
                frameHeight: 32,
                margin: 1,
                spacing: 2
            }
        );
        this.load.atlas('emoji', 'assets/sprites/emoji.png', 'assets/sprites/emoji.json');
    }

    create() {
      super.create();
        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }


    update(time, delta) {
      super.update(time, delta);
    }
}
