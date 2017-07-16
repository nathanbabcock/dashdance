 // Create the state that will contain the whole game
var mainState = {  
    preload: function() {
        // Sprites
        game.load.image('player', 'assets/player_highres.png');
		game.load.image('wall', 'assets/brick.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('spike', 'assets/spike_up.png');
		game.load.image('enemy', 'assets/minotaur.png');
		game.load.image('blood', 'assets/blood.png');
		game.load.image('smoke', 'assets/smoke.png');
		game.load.image('bg', 'assets/bg.png');

		// Animation
		game.load.spritesheet('attack', 'assets/attack.png', 57, 63, 3);

		// Sound fx
		game.load.audio('kill', 'assets/audio/kill.wav');
		game.load.audio('hit', 'assets/audio/hit.wav');
		game.load.audio('nextlevel', 'assets/audio/nextlevel.wav');
		game.load.audio('death', 'assets/audio/death.wav');
		game.load.audio('jump', 'assets/audio/jump.wav');
    },

    // Statics
    jump_velocity: -400,
    walk_speed: 200,
    gravity: 1000,
    dash_speed: 2000,

    playerJump: function(){
    	if(!this.player.hasJump) return;
    	this.soundfx.jump.play();
		this.player.body.velocity.y = this.jump_velocity;
		this.player.hasJump = false;
    },

    playerDeath: function(){
    	this.soundfx.death.play();
    	this.restart();
    },

    attackSprite: null,
    attack: function(pointer) {
    	if(this.attackSprite && this.attackSprite.alive) return;
    	var xhair = new Phaser.Point(pointer.worldX, pointer.worldY);

    	var click_radius = 100,
    		attack_radius = 200,
    		clicked_enemy = null;
    	this.enemies.forEachAlive(function(enemy){
    		if(enemy.position.distance(xhair) <= click_radius 
    			&& enemy.position.distance(this.player.position) <= attack_radius
    			&& !clicked_enemy) {
    			clicked_enemy = enemy;
    		}
    	}, this);
    	if(!clicked_enemy) return;

    	// ADD DASH STUFF HERE
    	this.player.dashTarget = clicked_enemy;
    	this.player.dashVector = new Phaser.Point(clicked_enemy.position.x - this.player.position.x, clicked_enemy.position.y - this.player.position.y);   	
    	
    	// var playerleft = false;
    	// if(this.player.position.x < clicked_enemy.position.x)
    	// 	playerleft = true;

    	return;

		//clicked_enemy.kill();
    	this.player.position.setTo(clicked_enemy.position.x - this.player.width - 8, clicked_enemy.position.y + 12);
    	this.attackSprite = game.add.sprite(this.player.centerX, this.player.centerY, "attack");
    	this.attackSprite.alreadyHit = [];
    	this.attackSprite.anchor.setTo(0.5, 0.5);
    	this.positionAttackSprite();
    	this.attackSprite.animations.add("attack");
    	this.attackSprite.animations.play("attack", 15, false, true);
    	this.player.body.velocity.y = this.jump_velocity;

    	this.hitEnemy(this.player, clicked_enemy);

    	//asdf

    	return;

    },

    positionAttackSprite: function(){
    	if(this.player.facing === 'left'){
    		this.attackSprite.scale.x = -1;
    	} else {
    		this.attackSprite.scale.x = 1;
    	}
     	this.attackSprite.position.setTo(this.player.centerX + 35, this.player.centerY - 29);
     	if(this.player.facing === 'left'){
     		this.attackSprite.position.x -= 70;
     	}
    },

    // updateAttack: function (){
    // 	if(!attackSprite) return;
    // 	if(attackSprite.animations.getAnimation("attack").)
    // }

    create: function() {  
        // Here we create the game

        // Set the background color to blue
		game.stage.backgroundColor = '#ffffff';//'#3598db';

		// Start the Arcade physics system (for movements and collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Design the level. x = wall, o = coin, ! = lava, $ = enemy
/*		var level = [
		    'xxxxxxxxxxxxxxxxxxxxxx',
		    '!         !          x',
		    '!                 o  x',
		    '!         o          x',
		    '!                    x',
		    '!     o   !    x     x',
		    'xxxxxxxxxxxxxxxx!!!!!x',
		];*/
/*		var level = [
		    'xxxxxxxxxxxxxxxxxxxxxx',
		    'x                    x',
		    'x                    x',
		    'x                    x',
		    'x                    x',
		    'x                    x',
		    'x                    x',
		    'x              xxxxxxx',
		    'x              xxxxxxx',
		    'x              xxxxxxx',
		    'x              xxxxxxx',
		    'x        $     xxxxxxx',
		    'xxxxxxxxxxxxxxxxxxxxxx',
		];*/

		var level = [
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x     $                             x',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx!!!!!!!!!!!!!!!!!!!!!xxxxxxxx',
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		];

		// Add the physics engine to all game objects

		var tile_size = 32,
			world_width = level[0].length * tile_size,
			world_height = level.length * tile_size;
		game.world.enableBody = true;
		game.world.setBounds(0, 0, world_width, world_height);
		game.add.tileSprite(0, 0, world_width, world_height, 'bg');

		// Variable to store the arrow key pressed
		this.input = {
			cursor: game.input.keyboard.createCursorKeys(),
			SPACE: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			W: game.input.keyboard.addKey(Phaser.Keyboard.W),
			A: game.input.keyboard.addKey(Phaser.Keyboard.A),
			S: game.input.keyboard.addKey(Phaser.Keyboard.S),
			D: game.input.keyboard.addKey(Phaser.Keyboard.D),
			R: game.input.keyboard.addKey(Phaser.Keyboard.R)
		};
		this.input.W.onDown.add(this.playerJump.bind(this));
		this.input.R.onDown.add(this.playerDeath.bind(this));
		this.input.SPACE.onDown.add(this.playerJump.bind(this));
		this.input.cursor.up.onDown.add(this.playerJump.bind(this));
		game.input.onDown.add(this.attack.bind(this));

		// Create the player in the middle of the game
		this.player = game.add.sprite(70, 100, 'player');

		// Add gravity to make it fall
		this.player.body.gravity.y = this.gravity;
		this.player.hasJump = false;
		this.player.facing = 'right';
		this.player.anchor.setTo(0.5, 0.5);

		// Camera
		game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		// Create 3 groups that will contain our objects
		this.walls = game.add.group();
		this.coins = game.add.group();
		this.spikes = game.add.group();
		this.enemies = game.add.group();

		// Blood emitter
		this.bloodEmitter = game.add.emitter(0, 0, 500);
		this.bloodEmitter.makeParticles('blood');
		this.bloodEmitter.gravity = this.gravity;
		// this.bloodEmitter.minRotation = 0;
  //   	this.bloodEmitter.maxRotation = 0;
    	this.bloodEmitter.minParticleSpeed.setTo(-200, -200);
    	this.bloodEmitter.maxParticleSpeed.setTo(200, 200);
    	this.bloodEmitter.setScale(1.5, 0, 1.5, 0, 1000);
    	// this.bloodEmitter.minParticleScale = 0.5;
    	// this.bloodEmitter.minParticleScale = 1.25;
    	//this.bloodEmitter.maxParticleSpeed = 1000;

    	// Smoke emitter
    	this.smokeEmitter = game.add.emitter(0, 0, 100);
    	this.smokeEmitter.makeParticles('smoke');
    	this.smokeEmitter.gravity = 0;
        //this.smokeEmitter.minRotation = 0;
     	//this.smokeEmitter.maxRotation = 0;
    	//this.smokeEmitter.setAlpha(1, 0, 1000);
        this.smokeEmitter.setScale(1.25, 0, 1.25, 0, 500);
        this.smokeEmitter.minParticleSpeed.setTo(-50, -50);
    	this.smokeEmitter.maxParticleSpeed.setTo(50, 50);
    	//this.smokeEmitter.start(false, 1000, 1);
    	//this.smokeEmitter.on = false;

    	// Audio
    	this.soundfx = {
    		kill: game.add.audio('kill'),
    		hit: game.add.audio('hit'),
    		death: game.add.audio('death'),
    		nextlevel: game.add.audio('nextlevel'),
    		jump: game.add.audio('jump')
    	};

		// Create the level by going through the array
		for (var i = 0; i < level.length; i++) {
		    for (var j = 0; j < level[i].length; j++) {

		        // Create a wall and add it to the 'walls' group
		        if (level[i][j] == 'x') {
		            var wall = game.add.sprite(tile_size/2+tile_size*j, tile_size/2+tile_size*i, 'wall');
		            this.walls.add(wall);
		            wall.body.immovable = true;
		            wall.anchor.setTo(0.5, 0.5);
		        }

		        // Create a coin and add it to the 'coins' group
		        else if (level[i][j] == 'o') {
		            var coin = game.add.sprite(tile_size/2+tile_size*j, tile_size/2+tile_size*i, 'coin');
		            this.coins.add(coin);
		            coin.anchor.setTo(0.5, 0.5);
		        }

		        // Create a enemy and add it to the 'enemies' group
		        else if (level[i][j] == '!') {
		            var spike = game.add.sprite(tile_size/2+tile_size*j, tile_size/2+tile_size*i, 'spike');
		            this.spikes.add(spike);
		            spike.anchor.setTo(0.5, 0.5);
		        }

		        else if (level[i][j] == '$') {
		        	var enemy = game.add.sprite(tile_size+tile_size*j, tile_size+tile_size*i-32, 'enemy')
		        	this.enemies.add(enemy);
		        	enemy.health = 4;
		        	enemy.body.gravity.y = this.gravity;
		        	enemy.anchor.setTo(0.5, 0.5);
		        }
		    }
		}

		game.world.bringToTop(this.player);
    },

    bloodSpray: function(x, y, num = 15){
    	this.bloodEmitter.x = x;
    	this.bloodEmitter.y = y;
    	this.bloodEmitter.start(true, 2000, null, num);
    },

    hitEnemy: function(player, enemy){
    	// if(this.attackSprite.alreadyHit.includes(enemy))
    	// 	return;

    	
    	// enemy.body.velocity.x += 100 * (player.centerX < enemy.centerX ? 1 : -1)
    	// enemy.body.velocity.y = this.jump_velocity;//-this.gravity * 0.4;
    	// this.attackSprite.alreadyHit.push(enemy);

    	// Animation
    	this.attackSprite = game.add.sprite(this.player.centerX, this.player.centerY, "attack");
    	this.attackSprite.alreadyHit = [];
    	this.attackSprite.anchor.setTo(0.5, 0.5);
    	this.positionAttackSprite();
    	this.attackSprite.animations.add("attack");
    	this.attackSprite.animations.play("attack", 30, false, true);


    	//this.player.position.add(this.player.dashVector.clone().setMagnitude(-100));
		this.player.hasJump = true;

		// Enemy dies
		enemy.health--;
		if(enemy.health <= 0){
			enemy.body.velocity.setTo(0, 0);
			enemy.kill();
			this.player.body.velocity = this.player.dashVector.setMagnitude(600);
			this.soundfx.kill.play();
		} else {
			this.soundfx.hit.play();

			// Enemy knockback
			if(enemy.grounded){
				enemy.body.velocity.y = this.jump_velocity * 1;
				enemy.body.velocity.x = 0;
				enemy.grounded = false;

				this.player.body.velocity.y = 0;
				this.player.body.velocity.x = 0;
			} else {
				var FACTOR = 0.5;
				enemy.body.velocity = this.player.dashVector.setMagnitude(500);

				this.player.body.velocity.y = this.jump_velocity * 0.2;
	    		this.player.body.velocity.x *= 0.3;
			}
		}

		// blood
		this.bloodSpray(enemy.centerX, enemy.centerY);

		// camera shake
		game.camera.shake(0.0075, 100);

		this.player.dashTarget = null;
		this.player.dashVector = null;
    },

    update: function() {  

    	// Walls
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.collide(this.enemies, this.walls, function(enemy){ enemy.grounded = true; enemy.body.velocity.x = 0;});

		// Attack Hitbox
		// if(this.attackSprite && this.attackSprite.alive)
		// game.physics.arcade.overlap(this.attackSprite, this.enemies, this.hitEnemy, null, this);

		// Dash
        if(this.player.dashTarget){
        	this.player.body.velocity = new Phaser.Point(
        		this.player.dashTarget.position.x - this.player.position.x,
        		this.player.dashTarget.position.y - this.player.position.y
        	).setMagnitude(this.dash_speed);
        	// this.smokeEmitter.x = this.player.centerX;
        	// this.smokeEmitter.y = this.player.centerY;
        	// this.smokeEmitter.start(true, 1000, null, 5);
        	game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
        }
        // Enemies
        else {
        	//this.smokeEmitter.on = false;
        	game.physics.arcade.overlap(this.player, this.enemies, this.playerDeath, null, this);
        }
		
		// Spikes
    	game.physics.arcade.overlap(this.player, this.spikes, this.playerDeath, null, this);

    	// Movement
    	if(!this.player.dashTarget){
			if (this.input.cursor.left.isDown || this.input.A.isDown) {
			    this.player.body.velocity.x =  Math.min(-this.walk_speed, this.player.body.velocity.x);
			    if (this.player.facing != 'left'){
					this.player.facing = 'left';
					this.player.scale.x = -1;
		        }
			}
			else if (this.input.cursor.right.isDown || this.input.D.isDown) {
			    this.player.body.velocity.x = Math.max(this.walk_speed, this.player.body.velocity.x);

			    if (this.player.facing != 'right') {
		            //player.animations.play('right');
					this.player.facing = 'right';
					this.player.scale.x = 1;
				}
			}
			else if(this.player.body.touching.down)
			    this.player.body.velocity.x = 0;
			
			if(this.player.body.touching.down)
				this.player.hasJump = true;
		}

		// Attack hitbox
		if(this.attackSprite && this.attackSprite.alive)
			this.positionAttackSprite();
    },

    // Function to kill a coin
	takeCoin: function(player, coin) {
	    coin.kill();
	},

	// Function to restart the game
	restart: function() {
	    game.state.start('main');
	}
};

// Initialize the game and start our state
var game = new Phaser.Game(1024, 768);  
game.state.add('main', mainState);  
game.state.start('main');