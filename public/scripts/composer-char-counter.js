$(document).ready(function() {
  var maxChar = 140;


  $(".new-tweet textarea").on("keyup", function() {
    var remaining = (maxChar - this.textLength);
    var counter = $(this).parent().find('.counter');
    if(remaining >= 0) {
     counter.text(remaining);
    }
    else {
      counter.text("");
    }
  });

 $(".new-tweet textarea").on("keyup", function() {
    var remaining = (maxChar - this.textLength);
    var counter = $(this).parent().find('.counter-negative');
    if(remaining < 0) {
     counter.text(remaining);
    }
    else {
      counter.text("");
    }
  });
});






// find counter
// calculate remaining
// update counter

// prevent typing more


