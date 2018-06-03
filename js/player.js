var game = new Phaser.Game(800,600);



var speed  = 500;

var player = {
    preload: function(){
        //Load images
        game.load.image('background', 'assets/sky.png');
        game.load.image('penguin', 'assets/peng.png');
        game.load.image('burger', 'assets/burger.png');
        game.load.image('poison', 'assets/poison.png');


    },
    create: function(){
        //Setup + show game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'background');

        this.player = game.add.sprite(400,550,'penguin');
        this.player.anchor.set(0.5);

        game.physics.arcade.enable(this.player);

        this.cursors = game.input.keyboard.createCursorKeys();

        //Create burger group
        this.burgers = game.add.group();

        //Poison group
        this.poisons = game.add.group();

        this.timer = game.time.events.loop(100,this.createBurger, this);
        this.timer = game.time.events.loop(100,this.createPoison, this);

        //Score
        this.score = 0;
        this.scoreLabel = game.add.text(20,20, "0", {font: "100px Arial", fill: "#fff"});
    },
    update: function(){
        //Logic
        game.physics.arcade.overlap(this.player, this.burgers, this.eatBurger, null, this);
        game.physics.arcade.overlap(this.player, this.poisons, this.restartGame, null, this);
        this.player.body.velocity.x=0;
        this.player.body.velocity.y=0;

        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -speed;
        }else if(this.cursors.right.isDown){
            this.player.body.velocity.x = speed;
        }
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -speed;
        }else if(this.cursors.down.isDown){
            this.player.body.velocity.y = speed;
        }
        if(this.player.inWorld == false){
            this.restartGame();
        }

    },
    restartGame: function(){
        game.state.start('player');
    },
    createBurger: function(){
        var randomPosition = Math.floor(Math.random() * 800) + 1;
        var burger = game.add.sprite(randomPosition,0,'burger');
        game.physics.arcade.enable(burger);
        burger.body.gravity.y=200;
        this.burgers.add(burger);

        burger.checkWorldBounds = true;
        burger.outOfBoundsKill = true;
    },
    eatBurger: function(player, burger){
        burger.kill();
        this.score +=10;
        this.scoreLabel.text = this.score;
    },
    createPoison: function(){
        var randomPosition = Math.floor(Math.random() * 800);
        var poison = game.add.sprite(randomPosition,0,'poison');
        game.physics.arcade.enable(poison);
        poison.body.gravity.y=300;
        this.poisons.add(poison);

        poison.checkWorldBounds = true;
        poison.outOfBoundsKill = true;
    }

};



game.state.add('player', player);
game.state.start('player');