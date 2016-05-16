$(document).ready(function(){

  // $( "#left_upper_arc" ).click(function() {
  //   console.log("left upper");
  // });

  var started = false;
  var counter = "--";
  var userSeq = [];

  function displayCounts(num){
    var html = "<p id=\"counter_display\">" + num + "</p>";
    $("#counter_display").html(html);
  };

  // function timer(buttonColor, lightCode){
  //   var id = "#".concat(buttonColor);
  //   var color = "#".concat(lightCode)
  //   $(id).css({"border-color":color});
  // }


  $(".button").click(function() {
    var hasStopped = false;
    // if (started){
    //   // if (val === "start_button"){
    //   console.log("started");
    //   started = false;
    //   counter = "--";
    //   hasStopped = true;
    //   //}  else {
    //   //   started = true;
    //   //   counter = 0;
    //   //   hasStopped = false;
    //   //   console.log("STOP");
    //   // }
    // }
    var val = $(this).attr("id");
    console.log("val: " + val);
    if (val === "left_upper_arc"){
      console.log("left upper");
      // $("#left_upper_arc").css({"border-color":"#A9F5A9"});
      $("#left_upper_arc").effect("pulsate", {times:1}, 40 );
      // interval = setInterval(timer("left_upper_arc", "#A9F5A9"), 100);
    } else if (val === "left_bottom_arc"){
      console.log("left bottom");
      $("#left_bottom_arc").css({"border-color":"#F2F5A9"});
    } else if (val === "right_upper_arc"){
      console.log("right upper");
      $("#right_upper_arc").css({"border-color":"#F78181"});
    } else if (val === "right_bottom_arc"){
      console.log("right bottom");
      $("#right_bottom_arc").css({"border-color":"#A9A9F5"});
    }


    userSeq.push(val);
    console.log("userSeq: " + userSeq);
    console.log("started: " + started);
    console.log("counter: " + counter);
    console.log("--------");
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
