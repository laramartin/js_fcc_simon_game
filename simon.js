$(document).ready(function(){

  var started = false;
  var counter = 0;
  var machineSeq = [];
  var userSeq = [];
  var buttonOrder = ["left_upper_arc", "right_upper_arc", "left_bottom_arc", "right_bottom_arc"];
  var iLoop = 0;
  var userTurn = false; // if false, it's machine's turn
  var val = "";

  function displayCounts(num){
    var html = "<p id=\"counter_display\">" + num + "</p>";
    $("#counter_display").html(html);
  };

  function buttonEffect(button){
    var str = "#".concat(button);
    var index = buttonOrder.indexOf(button) + 1;
    var url = "https://s3.amazonaws.com/freecodecamp/simonSound" + index + ".mp3";
    var sound = new Audio(url);
    $(str).effect("pulsate", {times:1}, 40 );
    sound.play();
  }

  function randomButton(){
    var num = Math.floor((Math.random() * 4) + 1);
    return num;
  }

  function loop(){
    // 1 second setTimeout
    setTimeout(function () {
      buttonEffect(machineSeq[iLoop]);
      iLoop++;
      //if counter < machineSeq.length, call function again
      if (iLoop < machineSeq.length) {
         loop();
      }
      console.log("seq: " + machineSeq);
    }, 1000)
    console.log("out function");
    console.log("iloop: " + iLoop);
    console.log("-----------");
  }

  // machine picks a button;
  function machinePick(){
    var pick = buttonOrder[randomButton() - 1];
    userSeq = [];
    console.log("machineSeq: " + machineSeq);
    console.log("length: " + machineSeq.length);
    if (machineSeq.length == 0){
      // if the game just started, machine makes first pick
      buttonEffect(pick);
      console.log("empty");
      machineSeq.push(pick);
    } else {
      machineSeq.push(pick);
      loop();
      iLoop = 0;
      console.log("not empty");
    }
    console.log("pick: " + pick);
    console.log("machineSeq: " + machineSeq);
    userTurn = true;
  }

  function userPick(){
    var maxPicks = machineSeq.length;
    var count = 0;
    console.log("MAX PICKS: " + maxPicks);
    if (count < maxPicks){
      buttonEffect(val);
      userSeq.push(val);
      count++;
    } else {
      userTurn = false;
    }
  }

  $(".button").click(function() {
    val = $(this).attr("id");
    if (val === "start_button"){
      started = !started;
    }
    if (started){
      if (!userTurn){
        setTimeout(function() { machinePick(); }, 2000);
      } else {
        userPick();
      }
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

    //userSeq.push(val);
    console.log("userSeq: " + userSeq);
    console.log("started: " + started);
    console.log("counter: " + counter);
    console.log("--------");
    displayCounts(counter);
  });


  displayCounts("--");
});
