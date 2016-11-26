$("body").bind("mousewheel", function(e){
    if(e.originalEvent.wheelDelta /120 > 5) {
      alert("scrolled up");
    }
    if(e.originalEvent.wheelDelta /120 < -5){
      window.location.href = '#/facts';
    }
});
