var isMobile = false;
if (screen.width <= 640) {
  isMobile = true;
};

$( window ).resize(function() {
  if (screen.width <= 640) {
    isMobile = true;
  }
  else {
    isMobile = false;
  };
});

var position = 0;
var views = ['#/', '#/facts', '#/purpose', '#/legal', '#/contact'];
var scrollflag = true;

if (!isMobile) {
  $("body").bind("mousewheel", function(e) {
    var $indicator = $(".currentposition");
    if (scrollflag && position >= 0) {
      if (e.originalEvent.wheelDelta /120 < 0 && position < 4) {
        TweenLite.to($indicator, 0.75, {scale: 0.5, backgroundColor: "#d0e8f9"});
      };
      if (e.originalEvent.wheelDelta /120 > 0) {
        TweenLite.to($indicator, 0.75, {scale: 0.5, backgroundColor: "#d0e8f9"});
        if (position == 4) {
          var $footer = $('.footer');
          TweenLite.to($footer, 0.75, {bottom: "-100px"});
        };
      };
      if(e.originalEvent.wheelDelta /120 < 0) {
        var $mouse = $('#scrollanim');
        TweenLite.to($mouse, 0.75, {bottom: "-100px", delay: 0.25});
      };

      if(e.originalEvent.wheelDelta /120 < 0) {
        enter(views[position]);
      };
      if (e.originalEvent.wheelDelta /120 > 0) {
        exit(views[position]);
      };
      scrollflag = false;
    };
  });

  $("body").bind("mousewheel", function(e) {
    if (!scrollflag) {
      scrollflag = true;
    };
  }, 150);

  var enter = function(partial) {
    var tween = true;
    var $delay = 0;
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

    if (position == 1) {
      $delay = 0.15;
    };

    TweenLite.to($view, 1, {position: "absolute", top: "-750px", autoAlpha: 0, ease: Power3.easeInOut, delay: $delay});
    setTimeout(function() {
      window.location.href = views[position];
    }, 950);
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

    TweenLite.to($view, 1, {position: "absolute", top: "750px", autoAlpha: 0, ease: Power3.easeInOut});
    setTimeout(function() {
      window.location.href = views[position];
    }, 950);
  };
};

/*var setPosition = function(idx) {
  position = idx;
  if (!isMobile) {
    if (position == -1) {
      document.body.style.overflow = "scroll";
    }
    else {
      document.body.style.overflow = "hidden";
    };
  };
};*/

var toggleMenu = function() {
  document.getElementsByClassName("menu")[0].style.display = "block";
  document.getElementsByClassName("menu")[0].style.opacity = 1;
  document.getElementsByClassName("menu")[0].style.zIndex = 4;
};

var closeMenu = function() {
  document.getElementsByClassName("menu")[0].style.display = "none";
  document.getElementsByClassName("menu")[0].style.opacity = 0;
  document.getElementsByClassName("menu")[0].style.zIndex = -1;
};

var dropDown = function() {
  document.getElementById("dropdown").style.height = "8rem";
  document.getElementById("dropdown").style.display = "block";
};

window.onclick = function(event) {
  if (!event.target.matches('.navprofile')) {
    document.getElementById("dropdown").style.height= "0";
    document.getElementById("dropdown").style.display = "none";
  };
};
