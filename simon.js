$(document).ready(function(){

  // $( "#left_upper_arc" ).click(function() {
  //   console.log("left upper");
  // });

  var started = false;
  var counter = 0;
  var machineSeq = [];
  var userSeq = [];
  var buttonOrder = ["left_upper_arc", "right_upper_arc", "left_bottom_arc", "right_bottom_arc"];

  function displayCounts(num){
    var html = "<p id=\"counter_display\">" + num + "</p>";
    $("#counter_display").html(html);
  };

  // function timer(buttonColor, lightCode){
  //   var id = "#".concat(buttonColor);
  //   var color = "#".concat(lightCode)
  //   $(id).css({"border-color":color});
  // }

  function buttonEffect(button){
    var str = "#".concat(button);
    $(str).effect("pulsate", {times:1}, 40 );
  }

  function randomButton(){
    var num = Math.floor((Math.random() * 4) + 1);
    return num;
  }

  // machine picks a button;
  function machinePick(){
    var pick = buttonOrder[randomButton() - 1];
    buttonEffect(pick);
    machineSeq.push(pick);
    console.log("pick: " + pick);
    console.log("machineSeq: " + machineSeq);
  }

  $(".button").click(function() {
    var val = $(this).attr("id");
    if (val === "start_button"){
      started = !started;
    }
    if (started){
      setTimeout(function() { machinePick(); }, 1500);
      console.log("val: " + val);
      if (val === "left_upper_arc"){
        counter +=1;
        // $("#left_upper_arc").css({"border-color":"#A9F5A9"});
        buttonEffect("left_upper_arc");
        // interval = setInterval(timer("left_upper_arc", "#A9F5A9"), 100);
      } else if (val === "left_bottom_arc"){
        //$("#left_bottom_arc").css({"border-color":"#F2F5A9"});
        buttonEffect("left_bottom_arc");
        counter += 1;
      } else if (val === "right_upper_arc"){
        // $("#right_upper_arc").css({"border-color":"#F78181"});
        buttonEffect("right_upper_arc");
        counter += 1;
      } else if (val === "right_bottom_arc"){
        counter += 1;
        // $("#right_bottom_arc").css({"border-color":"#A9A9F5"});
        buttonEffect("right_bottom_arc");
      } else if (val === "start_button"){
        started = true;
      }
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
  displayCounts("--");
});
