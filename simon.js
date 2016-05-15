$(document).ready(function(){

  // $( "#left_upper_arc" ).click(function() {
  //   console.log("left upper");
  // });

  var started = false;
  var counter = "--";

  function displayCounts(num){
    var html = "<p id=\"counter_display\">" + num + "</p>";
    $("#counter_display").html(html);
  };

  $(".button").click(function() {
    var val = $(this).val();
    console.log("val: " + val);
    if (val === "start_button"){
      // when pressing start, if already started, stop
      if (started){
        started = false;
        counter = "--";
        console.log("counter: " + counter);
      } else {
        started = true;
        counter = 0;
        console.log("else counter: " + counter);
      }
    }
    if (val === "left_upper_arc"){
        console.log("left upper");
      }
    displayCounts(counter);
  });


  // $("button").click(function() {
  //   var val = $(this).attr("value");
  //   if (val === "left_upper_arc"){
  //     console.log("left upper");
  //   } else {console.log("else");}
  // });
  displayCounts(counter);
});
