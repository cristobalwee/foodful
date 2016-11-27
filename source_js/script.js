var position = 0;
var views = ['#/', '#/facts', '#/purpose', '#/legal', '#/contact'];

$("body").bind("mousewheel", function(e){
  if(e.originalEvent.wheelDelta /120 < 0) {
    var $mouse = $('#scrollanim');
    TweenLite.to($mouse, 0.75, {bottom: "-100px", delay: 0.5});
    animate(views[position]);
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
}, 750);

$(".homelink").on("click", function() {
  position = 0;
});

$(".link").on("click", function() {
  alert("link clicked");
  return true;
});

var animate = function(input) {
  switch(input) {
    case '#/':
      var $view = $('#landing');
      break;
    case '#/facts':
      var $view = $('#facts');
      break;
    case '#/purpose':
      var $view = $('#purpose');
      break;
    case '#/legal':
      var $view = $('#legal');
      break;
    case '#/contact':
      break;
    default:
      alert("ok");
  }
  TweenLite.to($view, 1, {position: "absolute", top: "1000px", backgroundColor: "rgba(255, 255, 255, 0)",ease: Power3.easeInOut});
};
