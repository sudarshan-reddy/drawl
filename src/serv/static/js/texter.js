function Texter() {

  var _this = this;

  // Application variables
  position = {x: 0, y: window.innerHeight/2};
  textIndex = 0;
  this.textColor = "#ffffff";
  this.bgColor = "#e13618";
  this.minFontSize = 25;
  this.maxFontSize = 80;
  this.angleDistortion = 0.01;

  this.text = 'Sofie is an amazing person and this is to certify that I will buy her 10 bags of Gummy Bears. ';

  // Drawing Variables
  canvas = null;
  context = null;
  mouse = {x: 0, y: 0, down: false};

  bgCanvas = null;
  bgContext = null;

  this.initialize = function() {
    
    canvas = document.getElementById( 'canvas' );
    context = canvas.getContext( '2d' );
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup',   mouseUp,   false);
    canvas.addEventListener('mouseout',  mouseUp,  false);
    canvas.addEventListener('touchmove', mouseMove, false);
    canvas.addEventListener('touchstart', mouseDown, false);
    canvas.addEventListener('touchend',   mouseUp,   false);   
    
    bgCanvas = document.createElement( 'canvas' );
    bgContext = bgCanvas.getContext( '2d' );
    bgCanvas.width = canvas.width;
    bgCanvas.height = canvas.height;
    _this.setBackground( _this.bgColor );

    window.onresize = function(event) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
      _this.setBackground( _this.bgColor );
      _this.clear();
    }

    update();
  };

  var mouseMove = function( event ) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    draw();
  };

  var update = function() {
    requestAnimationFrame( update );
    draw();
  }

  var draw = function() { 
    if ( mouse.down ) {
      var newDistance = distance( position, mouse );
      var fontSize = _this.minFontSize + newDistance/2;

      if ( fontSize > _this.maxFontSize ) {
        fontSize = _this.maxFontSize;
      }

      var letter = _this.text[textIndex];
      var stepSize = textWidth( letter, fontSize );
      
      if (newDistance > stepSize) {
        var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
        
        context.font = fontSize + "px Georgia";
      
        context.save();
        context.translate( position.x, position.y);
        context.rotate( angle + ( Math.random() * ( _this.angleDistortion * 2 ) - _this.angleDistortion ) );
        context.fillText(letter,0,0);
        context.restore();

        textIndex++;
        if (textIndex > _this.text.length-1) {
          textIndex = 0;
        }
      
        position.x = position.x + Math.cos(angle) * stepSize;
        position.y = position.y + Math.sin(angle) * stepSize;

      }
    }
  };

  var distance = function( pt, pt2 ){
    var xs = 0;
    var ys = 0;
   
    xs = pt2.x - pt.x;
    xs = xs * xs;
   
    ys = pt2.y - pt.y;
    ys = ys * ys;
   
    return Math.sqrt( xs + ys );
  };

  var mouseDown = function( event ){
    mouse.down = true;
    position.x = event.pageX;
    position.y = event.pageY;
  }

  var mouseUp = function( event ){
    mouse.down = false;
  }

  var textWidth = function( string, size ) {
    context.font = size + "px Georgia";
    
    if ( context.fillText ) {
      return context.measureText( string ).width;

    } else if ( context.mozDrawText) {
      return context.mozMeasureText( string );

    }
  };

  this.clear = function() {
    canvas.width = canvas.width;
    context.fillStyle = _this.textColor;
  }

  this.applyNewColor = function( value ) {
    _this.textColor = value;
    context.fillStyle = _this.textColor;
  }

  this.setBackground = function( value ) {
    _this.bgColor = value;
    canvas.style.backgroundColor = value;

  };

  this.onTextChange = function() {
    textIndex = 0;
  }

  this.save = function() {

    // Prepare the background canvas's color
    bgContext.rect( 0, 0, bgCanvas.width, bgCanvas.height );
    bgContext.fillStyle = _this.bgColor;
    bgContext.fill();

    // Draw the front canvas onto the bg canvas
    bgContext.drawImage( canvas, 0, 0 );

    // Open in a new window
    window.open( bgCanvas.toDataURL('image/png'), 'mywindow' );

  }

};
