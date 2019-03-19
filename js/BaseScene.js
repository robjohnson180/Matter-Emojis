class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
        this.emojiCount = 0;
        this.emojiTime = 0;
    }
    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
    }
    create() {
        const map = this.make.tilemap({ key: this.tileDataKey });
        const tileset = map.addTilesetImage('kenney-tileset');
        this.background = map.createStaticLayer('background', tileset, 0, 0);
        this.land = map.createStaticLayer('platforms', tileset, 0, 0);
        this.foreground = map.createStaticLayer('foreground', tileset, 0, 0);
        this.land.setCollisionByProperty({ collides: true });
        const myLand = this.matter.world.convertTilemapLayer(this.land); //TODO
        this.player = new Player(this, 64, map.heightInPixels - 128);
        //this.player = new Player(this, 350, 128);
        this.player.sprite.label = 'player';
        this.exit = this.matter.add.sprite(450, 288, 'exit');
        this.exit.setStatic(true);
        this.exit.label = 'exit';
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
        this.matter.world.on('collisionstart', this.handleCollision, this);
        this.matter.world.on('collisionactive', this.handleCollision, this);
        this.createEmoji();
    }
    createEmoji() {
        const frameNames = Object.keys(this.cache.json.get('emoji').frames);
        const frame = Phaser.Utils.Array.GetRandom(frameNames);
        let emoji = this.matter.add.image(150, 32, 'emoji', frame, {
            restitution: 1,
            friction: 0.5,
            density: 0.01,
            shape: 'circle',
        });
        //Randomise tint of emojis
        let values = '0123456789abcdef';
        let str = '0x';
        for (let i = 0; i < 5; i++) {
            str = str.concat(values.charAt(Math.floor(Math.random() * 16)).toString());
        }
        console.log(str);
        emoji.setTint(str);
        emoji.setScale(0.5);
    }
    update(time, delta) {

        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            switch (this.id) {
                case 'sceneA':
                    this.scene.switch('sceneB');
                    break;
                case 'sceneB':
                    this.scene.switch('sceneA');
                    break;
            }
        }
        if (this.emojiCount < 9000 && this.emojiTime == 0) {
            this.createEmoji();
            this.emojiCount++;
            this.emojiTime = time;
        }
        else if (time > this.emojiTime + 500) {
            this.emojiTime = 0;
        }
        this.player.update();
    }
    handleCollision(event) {
        event.pairs.forEach(this.matchCollisionPair, this);
    }
    matchCollisionPair(pair) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        let myPair = [null, null];
        if (bodyA.gameObject && bodyA.gameObject.label) {
            this.sortCollisionObjects(bodyA.gameObject.label, myPair);
        }
        if (bodyB.gameObject && bodyB.gameObject.label) {
            this.sortCollisionObjects(bodyB.gameObject.label, myPair);
        }
        if (myPair[0] === 'player' && myPair[1] === 'exit') {
            console.log('player touched exit');
            this.changeScene();
        }
    }
    sortCollisionObjects(label, arr) {
        switch (label) {
            case 'player':
                arr[0] = 'player';
                break;
            case 'exit':
                arr[1] = 'exit';
                break;
        }
    }
    changeScene() {
        switch (this.id) {
            case 'sceneA':
                this.scene.start('sceneB');
                break;
            case 'sceneB':
                this.scene.start('sceneA');
                break;
        }
    }
}
