var GameLayer = cc.LayerColor.extend({
    init: function( bot ) {
        this.bot = bot;
        this._super( new cc.Color4B( 136, 136, 136, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.setKeyboardEnabled( true );
        this.isMusicPlaying = true;
        this.bgm = new cc.SimpleAudioEngine();
        this.bgm.init();
        this.bgm.playMusic( 'sounds/18.mp3', true );
        this.bgm.setMusicVolume( 0.3 );
        this.isGameStop = true;
        this.isReset = true;
        var backGround = new cc.Sprite;
        backGround.init( 'images2/backGround.png' );
        backGround.setPosition( new cc.p( 500, 300 ) );
        
        this.addChild( backGround );
        //field
        this.field = new Field();
        this.addChild( this.field );

        //rank
        this.rank = new RankStat( this.field );
        this.addChild( this.rank );

        //player
        this.player1 = new Player( 'red', 'poring' );
        this.addChild( this.player1 );

        //player2
        this.player2 = new Player( 'orange', 'drop' );
        this.addChild( this.player2 );

        //player3
        this.player3 = new Player( 'green', 'poporing' );
        this.addChild( this.player3 );

        //player4
        this.player4 = new Player( 'blue', 'marin' );
        this.addChild( this.player4 );

        //power
        this.power1 = new Power();
        this.addChild( this.power1 );
        this.power2 = new Power();
        this.addChild( this.power2 );

        //time
        this.timeEvent = new Time();
        this.addChild( this.timeEvent );

        if( this.bot[ 0 ] ) this.player1.setBot();
        if( this.bot[ 1 ] ) this.player2.setBot();
        if( this.bot[ 2 ] ) this.player3.setBot();
        if( this.bot[ 3 ] ) this.player4.setBot();

        return true;
    },

    BGM: function() {
        if ( this.isMusicPlaying == true ) {
            this.bgm.stopMusic();
            this.isMusicPlaying = false;
        }
        else  {
            this.bgm.playMusic( 'sounds/18.mp3', true );
            this.isMusicPlaying = true;
        }
    },

    onKeyDown: function( e ) {
        if( e == 32 ) { this.playAgain(); }
        if( e == 13 ) { this.startGame(); }
        if( e == 81 ) { this.BGM(); }
        if( this.isGameStop ) { return; }
        if( !this.bot[ 0 ] ) {
            switch( e ) {
                case 87:
                    //up
                    this.player1.setDir( Player.DIR.UP );
                    break;
                case 83:
                    //down
                    this.player1.setDir( Player.DIR.DOWN );
                    break;
                case 65:
                    //left
                    this.player1.setDir( Player.DIR.LEFT );
                    break;
                case 68:                                                   //w a s d
                    //right
                    this.player1.setDir( Player.DIR.RIGHT );
                    break; 
            }
        }      
//////////////////////////////////////////////////////////////////////////////////////////////////////////
        if( !this.bot[ 1 ] ) {
            switch( e ) {
                case 80:
                    //up
                    this.player2.setDir( Player.DIR.UP );
                    break;
                case 59:
                    //down
                    this.player2.setDir( Player.DIR.DOWN );
                    break;
                case 76:
                    //left
                    this.player2.setDir( Player.DIR.LEFT );
                    break;
                case 222:                                                   // p ; l '
                    //right
                    this.player2.setDir( Player.DIR.RIGHT );
                    break;
            }
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
        if( !this.bot[ 2 ] ) {
            switch( e ) {
                case 89:
                    //up
                    this.player3.setDir( Player.DIR.UP );
                    break;
                case 72:
                    //down
                    this.player3.setDir( Player.DIR.DOWN );
                    break;
                case 71:
                    //left
                    this.player3.setDir( Player.DIR.LEFT );
                    break;
                case 74:                                                   // y h g j
                    //right
                    this.player3.setDir( Player.DIR.RIGHT );
                    break;
            }
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
        if( !this.bot[ 3 ] ) {
            switch( e ) {
                case 38:
                    //up
                    this.player4.setDir( Player.DIR.UP );
                    break;
                case 40:
                    //down
                    this.player4.setDir( Player.DIR.DOWN );
                    break;
                case 37:
                    //left
                    this.player4.setDir( Player.DIR.LEFT );
                    break;
                case 39:                                                   // arrow key
                    //right
                    this.player4.setDir( Player.DIR.RIGHT );
                    break;
            }
        }
    },

    update: function() {
        this.field.changeMap( this.player1.getX(), this.player1.getY(), this.player1.getColor() );
        this.field.changeMap( this.player2.getX(), this.player2.getY(), this.player2.getColor() );
        this.field.changeMap( this.player3.getX(), this.player3.getY(), this.player3.getColor() );
        this.field.changeMap( this.player4.getX(), this.player4.getY(), this.player4.getColor() );
        if( this.timeEvent.isTimeUp() ) { this.stopGame(); this.rank.showWinner(); }
        var powerUp = this.power1.update( this.player1, this.player2, this.player3, this.player4 );
        if( powerUp !== -1 ) {
            this.runPower( powerUp );
        }
        powerUp = this.power2.update( this.player1, this.player2, this.player3, this.player4 );
        if( powerUp !== -1 ) {
            this.runPower( powerUp );
        }
    },

    stopGame: function() {
        this.isGameStop = true;
        this.player1.stop();
        this.player2.stop();
        this.player3.stop();
        this.player4.stop();
        this.power1.stop();
        this.power2.stop();
        this.rank.stop();
        this.timeEvent.stop();
        this.unscheduleUpdate();
    },

    startGame: function() {
        if( !this.isGameStop || !this.isReset ) { return; }
        this.isReset = false;
        this.isGameStop = false;
        this.timeEvent.start();
        this.player1.start();
        this.player2.start();
        this.player3.start();
        this.player4.start();
        this.power1.start();
        this.power2.start();
        this.rank.start();
        this.scheduleUpdate();
    },

    playAgain: function() {
        this.isReset = true;
        this.stopGame();
        this.timeEvent.setTime();
        this.timeEvent.removeScreen();
        this.field.reset();
        this.player1.reset();
        this.player2.reset();
        this.player3.reset();
        this.player4.reset();
        this.rank.reset();
    },

    runPower: function( data ) {
        if( data[0] == "p1" ) {
            this.player1.setPower( data[1], this.field );
        }
        else if( data[0] == "p2" ) {
            this.player2.setPower( data[1], this.field );
        }
        else if( data[0] == "p3" ) {
            this.player3.setPower( data[1], this.field );
        }
        else if( data[0] == "p4" ) {
            this.player4.setPower( data[1], this.field );
        }
    }
    
});

GameLayer.scene = function ( bot ) {
    var scene = cc.Scene.create();
    var layer = new GameLayer();
    layer.init( bot );
    scene.addChild( layer );
    return scene;
};