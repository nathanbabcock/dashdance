 // Create the state that will contain the whole game
var mainState = {  
    preload: function() {  
        // Here we preload the assets

        game.load.image('player', 'assets/player_highres.png');
		game.load.image('wall', 'assets/wall.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('spike', 'assets/spike.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.spritesheet('attack', 'assets/attack.png', 57, 63, 3);
    },

    jump_velocity: -400,
    gravity:1000,

    playerJump: function(){
    	if(!this.player.hasJump) return;
		this.player.body.velocity.y = this.jump_velocity;
		this.player.hasJump = false;
    },

    attackSprite: null,
    attack: function() {
    	if(this.attackSprite && this.attackSprite.alive) return;
    	this.attackSprite = game.add.sprite(this.player.centerX, this.player.centerY, "attack");
    	this.attackSprite.alreadyHit = [];
    	this.attackSprite.anchor.setTo(0.5, 0.5);
    	this.positionAttackSprite();
    	this.attackSprite.animations.add("attack");
    	this.attackSprite.animations.play("attack", 15, false, true);
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
		game.stage.backgroundColor = '#3598db';

		// Start the Arcade physics system (for movements and collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Add the physics engine to all game objects
		game.world.enableBody = true;

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
		this.input.R.onDown.add(this.restart);
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

		// Create 3 groups that will contain our objects
		this.walls = game.add.group();
		this.coins = game.add.group();
		this.spikes = game.add.group();
		this.enemies = game.add.group();

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

		// Create the level by going through the array
		var tile_size = 32;
		for (var i = 0; i < level.length; i++) {
		    for (var j = 0; j < level[i].length; j++) {

		        // Create a wall and add it to the 'walls' group
		        if (level[i][j] == 'x') {
		            var wall = game.add.sprite(tile_size+tile_size*j, tile_size+tile_size*i, 'wall');
		            this.walls.add(wall);
		            wall.body.immovable = true;
		            wall.anchor.setTo(0.5, 0.5);
		        }

		        // Create a coin and add it to the 'coins' group
		        else if (level[i][j] == 'o') {
		            var coin = game.add.sprite(tile_size+tile_size*j, tile_size+tile_size*i, 'coin');
		            this.coins.add(coin);
		            coin.anchor.setTo(0.5, 0.5);
		        }

		        // Create a enemy and add it to the 'enemies' group
		        else if (level[i][j] == '!') {
		            var spike = game.add.sprite(tile_size+tile_size*j, tile_size+tile_size*i, 'spike');
		            this.spikes.add(spike);
		            spike.anchor.setTo(0.5, 0.5);
		        }

		        else if (level[i][j] == '$') {
		        	var enemy = game.add.sprite(tile_size+tile_size*j, tile_size+tile_size*i-32, 'enemy')
		        	this.enemies.add(enemy);
		        	enemy.body.gravity.y = this.gravity;
		        	enemy.anchor.setTo(0.5, 0.5);
		        }
		    }
		}
    },

    hitEnemy: function(player, enemy){
    	if(this.attackSprite.alreadyHit.includes(enemy))
    		return;

    	this.player.hasJump = true;
    	enemy.body.velocity.x += 100 * (player.centerX < enemy.centerX ? 1 : -1)
    	enemy.body.velocity.y = this.jump_velocity;//-this.gravity * 0.4;
    	this.attackSprite.alreadyHit.push(enemy);
    },

    update: function() {  
        // Here we update the game 60 times per second

		// Make the player and the walls collide
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.collide(this.enemies, this.walls);

		if(this.attackSprite && this.attackSprite.alive)
		game.physics.arcade.overlap(this.attackSprite, this.enemies, this.hitEnemy, null, this);

		// Call the 'takeCoin' function when the player takes a coin
		game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

		// Call the 'restart' function when the player touches the enemy
		game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    	game.physics.arcade.overlap(this.player, this.spikes, this.restart, null, this);
		// Move the player when an arrow key is pressed
		if (this.input.cursor.left.isDown || this.input.A.isDown) {
		    this.player.body.velocity.x = -200;
		    if (this.player.facing != 'left'){
				this.player.facing = 'left';
				this.player.scale.x = -1;
	        }
		}
		else if (this.input.cursor.right.isDown || this.input.D.isDown) {
		    this.player.body.velocity.x = 200;

		    if (this.player.facing != 'right') {
	            //player.animations.play('right');
				this.player.facing = 'right';
				this.player.scale.x = 1;
			}
		}
		else 
		    this.player.body.velocity.x = 0;
		
		if(this.player.body.touching.down)
			this.player.hasJump = true;

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