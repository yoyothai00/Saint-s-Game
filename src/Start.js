var Start = cc.Layer.extend({
    ctor : function(){
        this._super();

    },

    init:function(){
        this._super();

        this.setTouchEnabled( true );
        this.setTouchMode( 1 );

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var centerpos = cc.p( winsize.width / 2, winsize.height / 2 );

        var bg = cc.Sprite.create( 'images2/startgame1.png' );
        bg.setPosition( centerpos );

        this.addChild( bg );

        var color = cc.c3b( 255, 255, 255 );
        var textField = cc.LabelTTF.create( "CLICK TO START", "Arial", 50 );
        textField.setAnchorPoint( cc.p( 0.5, 0.5 ) );
        textField.setPosition( cc.p( screenWidth / 2, 100 ) );
        textField.setColor( color );
        textField.setOpacity( 0 );
        
        textField.enableStroke( cc.c3b( 0, 0, 0 ), 2, true );

        var fadeIn = cc.FadeIn.create( 1.0 );
        var fadeOut = cc.FadeOut.create( 1.0 );
        var delay = cc.DelayTime.create( 0.5 );
        textField.runAction(cc.RepeatForever.create( cc.Sequence.create( fadeIn, delay, fadeOut ) ) );
        this.addChild( textField,300 );
    },

    onTouchBegan:function( touch, event ) {
        this.onPlay();
    },

    onPlay : function(){
        var scene = Choose.scene();
        cc.Director.getInstance().replaceScene( cc.TransitionFade.create( 1.5, scene ) );
    }
});

var menuScene = cc.Scene.extend({
     ctor:function () {
        this._super();
        var layer = new Start();
        layer.init();
        this.addChild( layer );
    }
});
