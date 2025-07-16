export class Player extends Phaser.Physics.Arcade.Sprite {
    
    // Construction for Player Class ####
    constructor(scene, x, y) {

        super(scene, x, y, 'dude'); // Adopts methods from Phaser arcade sprite class
        
        scene.add.existing(this); // Add player to the scene
        scene.physics.add.existing(this); // Add physics to the player

        
        this.setBounce(0.2); // Player bounces on impact
        this.setCollideWorldBounds(true); // Prevents player from leaving playing area
        this.initAnimations(); // Initiates animations
        

    }

    // Animations for Player class ####
    initAnimations() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ { key:'dude', frames: 4 } ],
            frameRate: 1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
    }

    moveLeft() {
        this.setVelocityX(-200);
        this.anims.play('left', true);
    }

    moveRight() {
        this.setVelocityX(200);
        this.anims.play('right', true);
    }

    idle() {
        this.setVelocityX(0);
        this.anims.play('turn', true)
    }

    jump() {
        if (this.body.blocked.down){
            this.setVelocityY(-500);
        }
    }
    // ##################################



}