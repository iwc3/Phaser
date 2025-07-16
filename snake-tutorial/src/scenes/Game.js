import {Player} from '../gameObjects/Player.js';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {

        //Background ###################
        this.add.image(400, 300, 'sky');
        // #############################
        
        // Platform locations and phyisics ######
        this.platforms = this.physics.add.staticGroup(); // static means doesnt move
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        // ######################################

        // Player object init #######################
        this.player = new Player(this, 100, 400);
        this.physics.add.collider(this.player, this.platforms); // prevents player object from phasing through platform object
        this.cursors = this.input.keyboard.createCursorKeys(); // gets input from user's keyboard
        // ##########################################

        // Stars init code ##############
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70}
        });
        
        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6))

        });
        
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null , this);
        // #############################



        // Score init ####
        this.score = 0;
        this.scoreText = this.add.text(16, 50, 'Score: 0', { fontSize: '20px', fill: '#000'});
        this.level = 0;
        this.levelText = this.add.text(16, 16, 'Level 0' , { fontSize: '32px', fill: '#000'})
        // ###############


        // Bomb init ####
        this.bombs = this.physics.add.group();
        
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        // ##############
    
    
    
    }

    update() {

        // Movement of player ##########
        if (this.cursors.left.isDown){
            this.player.moveLeft();
        } 
        else if (this.cursors.right.isDown) {
            this.player.moveRight();
        }
        else {
            this.player.idle();
        }

        if (this.cursors.up.isDown) {
            this.player.jump();
        }
        // ############################
    }

    // Collect star logic ##########
    collectStar(player, star) {
        star.disableBody(true, true);
        //1st true - object physics disabled
        //2nd true - game object in scene inactive and invisible

        // increment score when collect star
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score)

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function(child){ 
                child.enableBody(true,child.x, 0, true, true);
            });
            this.level += 1
            this.levelText.setText("Level: " + this.level);
            this.releaseBombs();
        }
    }
    // #############################

    // Player hits a bomb logic ####
    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');

        this.time.delayedCall(200, () => {
            this.scene.start('GameOver');
        });
    }

    // Spawn the bombs ####
    releaseBombs() {
        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);


        var bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
    /** 
    levelUp() {
        (this.level % 5 === 0)
        ? levelText.setText("Level: " + this.level)

    }
    */

}