var position = 0;
var views = ['#/', '#/facts', '#/purpose', '#/legal', '#/contact'];

$("body").bind("mousewheel", function(e) {
  var $indicator = $(".currentposition");
  if (position < 4) {
    TweenLite.to($indicator, 0.75, {scale: 0.5, backgroundColor: "#d0e8f9"});
  }
  if (e.originalEvent.wheelDelta /120 > 0 && position == 4) {
    TweenLite.to($indicator, 0.75, {scale: 0.5, backgroundColor: "#d0e8f9"});
    var $footer = $('.footer');
    TweenLite.to($footer, 0.75, {bottom: "-100px"});
  }
  if(e.originalEvent.wheelDelta /120 < 0) {
    var $mouse = $('#scrollanim');
    TweenLite.to($mouse, 0.75, {bottom: "-100px", delay: 0.25});
  };
});

$("body").bind("mousewheel", function(e) {
  if(e.originalEvent.wheelDelta /120 < 0) {
    enter(views[position]);
  };
  if (e.originalEvent.wheelDelta /120 > 0) {
    exit(views[position]);
  };
}, 50);

var enter = function(partial) {
  var tween = true;
  switch(partial) {
    case '#/':
      var $view = $('#landing');
      position++;
      break;
    case '#/facts':
      var $view = $('#facts');
      position++;
      break;
    case '#/purpose':
      var $view = $('#purpose');
      position++;
      break;
    case '#/legal':
      var $view = $('#legal');
      position++;
      break;
    default:
      tween = false;
  };
  if (!tween) {
    return;
  };
  TweenLite.to($view, 1, {position: "absolute", top: "-1000px", backgroundColor: "rgba(255, 255, 255, 0)",ease: Power3.easeInOut});
  setTimeout(function() {
    window.location.href = views[position];
  }, 1050);
};

var exit = function(partial) {
  var tween = true;
  switch(partial) {
    case '#/facts':
      var $view = $('#facts');
      position--;
      break;
    case '#/purpose':
      var $view = $('#purpose');
      position--;
      break;
    case '#/legal':
      var $view = $('#legal');
      position--;
      break;
    case '#/contact':
      var $view = $('#contact');
      position--;
      break;
    default:
      tween = false;
  };
  if (!tween) {
    return;
  };
  TweenLite.to($view, 1, {position: "absolute", top: "1000px", backgroundColor: "rgba(255, 255, 255, 0)",ease: Power3.easeInOut});
  setTimeout(function() {
    window.location.href = views[position];
  }, 2050);
};

/*$("body").bind("mousewheel", function(e){
  var $indicator = $(".currentposition");
  if (position < 4) {
    TweenLite.to($indicator, 0.75, {scale: 0.5, backgroundColor: "#d0e8f9"});
  }
  if (e.originalEvent.wheelDelta /120 > 0 && position == 4) {
    TweenLite.to($indicator, 0.75, {scale: 0.5, backgroundColor: "#d0e8f9"});
    var $footer = $('.footer');
    TweenLite.to($footer, 0.75, {bottom: "-100px"});
  }
  if(e.originalEvent.wheelDelta /120 < 0) {
    var $mouse = $('#scrollanim');
    TweenLite.to($mouse, 0.75, {bottom: "-100px", delay: 0.5});
  };
  if (e.originalEvent.wheelDelta /120 > 0) {
    if (position > 0) {
      animate(views[position]);
    };
  }
  else {
    if (position < 4) {
      animate(views[position]);
    }
  };
});


$("body").on("mousewheel", function(e) {
  if(e.originalEvent.wheelDelta /120 > 0) {
    if (position > 0) {
      position--;
      window.location.href = views[position];
    }
  }
  if(e.originalEvent.wheelDelta /120 < 0){
    if (position < 4) {
      position++;
      window.location.href = views[position];
    }
  }
}, 750);*/

$(".homelink").on("click", function() {
  position = 0;
});

var resetPosition = function() {
  position = 0;
};

var animate = function(input) {
  switch(input) {
    case '#/':
      var $view = $('#landing');
      var tween = true;
      break;
    case '#/facts':
      var $view = $('#facts');
      var tween = true;
      break;
    case '#/purpose':
      var $view = $('#purpose');
      var tween = true;
      break;
    case '#/legal':
      var $view = $('#legal');
      var tween = true;
      break;
    case '#/contact':
      var $view = $('#contact');
      var tween = true;
      break;
    default:
      alert("ok");
  }
  if (tween) {
    TweenLite.to($view, 1, {position: "absolute", top: "1000px", backgroundColor: "rgba(255, 255, 255, 0)",ease: Power3.easeInOut});
  }
};
