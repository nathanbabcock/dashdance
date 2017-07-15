var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });

var floor, player;

function preload() {
}

function create() {
    // Game
    game.stage.backgroundColor = '#ffffff';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    game.physics.arcade.gravity.y = 250;

    // Map
    floor = game.add.graphics();
    floor.beginFill(0x000000);
    floor.drawRect(0, 500, game.width, 100);
    floor.endFill();
    floor.body.immovable = true;
    floor.body.moves = false;
    floor.body.width = game.width;
    floor.body.height = 100;
    floor.body.x = 0;
    floor.body.y = 500;

    // Player
    player = game.add.graphics();
    player.beginFill(0x111111);
    player.drawRect(100, 100, 50, 75);
    player.endFill();
    player.enableBody = true;
    player.body.width = 100;
    player.body.height = 100;
    player.body.x = 50;
    player.body.y = 75;

}

function update() {
    game.physics.arcade.collide(player, floor, function(player){
        console.log("collision");
        player.body.velocity.y = 0;
    });
}

function render(){
    //spawners.forEachAlive(function(member){ game.debug.body(member); }, this);
}