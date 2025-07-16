export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }


    create() {
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Arial Black', 
            fontSize: 64, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 435, 'Press Space to Rest Game', { 
            fontSize: 16, 
            fill: '#ffffff', 
            stroke: '#000000',
            strokeThickness: 3,
            align: 'left'
        }).setOrigin(0.5);

        this.cursors = this.input.keyboard.createCursorKeys(); // gets input from user's keyboard

    }    
    update() {
        if (this.cursors.space.isDown) {
            this.scene.start('Game');
        }
   } 
}