 // Create the state that will contain the whole game
var mainState = {  
    preload: function() {  
        // Here we preload the assets

        game.load.image('player', 'assets/player.png');
		game.load.image('wall', 'assets/wall.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('enemy', 'assets/enemy.png');
    },

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

		// Create the player in the middle of the game
		this.player = game.add.sprite(70, 100, 'player');

		// Add gravity to make it fall
		this.player.body.gravity.y = 600;

		// Create 3 groups that will contain our objects
		this.walls = game.add.group();
		this.coins = game.add.group();
		this.enemies = game.add.group();

		// Design the level. x = wall, o = coin, ! = lava.
		var level = [
		    'xxxxxxxxxxxxxxxxxxxxxx',
		    '!         !          x',
		    '!                 o  x',
		    '!         o          x',
		    '!                    x',
		    '!     o   !    x     x',
		    'xxxxxxxxxxxxxxxx!!!!!x',
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
		        }

		        // Create a coin and add it to the 'coins' group
		        else if (level[i][j] == 'o') {
		            var coin = game.add.sprite(tile_size+tile_size*j, tile_size+tile_size*i, 'coin');
		            this.coins.add(coin);
		        }

		        // Create a enemy and add it to the 'enemies' group
		        else if (level[i][j] == '!') {
		            var enemy = game.add.sprite(tile_size+tile_size*j, tile_size+tile_size*i, 'enemy');
		            this.enemies.add(enemy);
		        }
		    }
		}
    },

    update: function() {  
        // Here we update the game 60 times per second

		// Make the player and the walls collide
		game.physics.arcade.collide(this.player, this.walls);

		// Call the 'takeCoin' function when the player takes a coin
		game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

		// Call the 'restart' function when the player touches the enemy
		game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    
		// Move the player when an arrow key is pressed
		if (this.input.cursor.left.isDown || this.input.A.isDown) 
		    this.player.body.velocity.x = -200;
		else if (this.input.cursor.right.isDown || this.input.D.isDown) 
		    this.player.body.velocity.x = 200;
		else 
		    this.player.body.velocity.x = 0;

		// Make the player jump if he is touching the ground
		if (this.input.cursor.up.isDown || this.input.W.isDown || this.input.SPACE.isDown /*&& this.player.body.touching.down */){
		    this.player.body.velocity.y = -250;
			console.log(this.player.body.velocity.y);
		}
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