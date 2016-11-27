var position = 0;
var views = ['#/', '#/facts', '#/purpose', '#/legal', '#/contact'];

$("body").bind("mousewheel", function(e){
    if(e.originalEvent.wheelDelta /120 > 0) {
      if (position > 0) {
        position--;
        window.location.href = views[position];
        e.stopPropation();
      }
    }
    if(e.originalEvent.wheelDelta /120 < 0){
      if (position < 4) {
        position++;
        window.location.href = views[position];
        e.stopPropation();
      }
    }
});
