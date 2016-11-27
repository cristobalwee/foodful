var position = 0;
var views = ['#/', '#/facts', '#/purpose', '#/legal', '#/contact'];

$("body").bind("mousewheel", function(e){
  var $mouse = $('#scrollanim');
  TweenLite.to($mouse, 0.5, {bottom: "-100px", delay: 0.75});
  animate(views[position]);
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
}, 1000);

var animate = function(view) {
  switch(view) {
    case '#/':
      console.log("tweening...");
      var $landing = $('#landing');
      console.log($landing);
      TweenLite.to($landing, 0.75, {position: "absolute", top: "500px", backgroundColor: "rgba(255, 255, 255, 0)",ease: Power2.easeInOut});
      console.log("twoned");
      break;
    default:
      alert("ok");
  }
};
