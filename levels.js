var levels = [
	{
		level: [
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                                                                  x',
		    'x                      x                                           x',
		    'x                     xxx                      $                  Dx',
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		],
		onCreate: function(){
			 game.add.bitmapText(100, 100, 'carrier_command','WASD or arrow keys to move', 24);
			 game.add.bitmapText(1320, 100, 'carrier_command','Click to attack', 24);
		}
	},

	{
		level: [
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		    'x                                  x',
		    'x                                  x',
		    'x                                  x',
		    'x                                  x',
		    'x                                  x',
		    'x                        $        Dx',
		    'x                        xxxxxxxxxxx',
		    'x                        xxxxxxxxxxx',
		    'x                        xxxxxxxxxxx',
		    'x                        xxxxxxxxxxx',
		    'x                        xxxxxxxxxxx',
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		],
		onCreate: function(){
			 game.add.bitmapText(100, 100, 'carrier_command','R to restart', 24);
			 game.add.bitmapText(100, 150, 'carrier_command','ESC for menu', 24);
		}
	},

		{
		level: [
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		    'x                                   x',
		    'x                                   x',
		    'x                                   x',
		    'x                                  Dx',
		    'x                              xxxxxx',
		    'x                              xxxxxx',
		    'x                              xxxxxx',
		    'x                              xxxxxx',
		    'x                              xxxxxx',
		    'x                              xxxxxx',
		    'x                           $  xxxxxx',
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
		],
		onCreate: function(){
			 game.add.bitmapText(100, 100, 'carrier_command','Every attack gives', 24);
			 game.add.bitmapText(100, 140, 'carrier_command','you a double jump', 24);
		}
	},

	{
		level: [
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
		    'x     $                             x',
		    'x                                  Dx',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx                     xxxxxxxx',
		    'xxxxxxxx!!!!!!!!!!!!!!!!!!!!!xxxxxxxx',
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		]
	},

	{
		level: [
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		    'x                                         x',
		    'x                                         x',
		    'x                       $           $     x',
		    'x                >D     <                 x',
		    'x                xxxxxxxx                 x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x                            >      <     x',
		    'x                            xxxxxxxx     x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x           $                             x',
		    'x           >      <                      x',
		    'x           xxxxxxxx                      x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x                                         x',
		    'x 0                                    $  x',
		    'x>                                      < x',
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		]
	},

	{
		level: [
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'x                             x',
		    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		],
		onCreate: function(){
			 game.add.bitmapText(150, 100, 'carrier_command','Congratulations', 40);
			 game.add.bitmapText(350, 200, 'carrier_command','You win!', 32);
		}
	}
];