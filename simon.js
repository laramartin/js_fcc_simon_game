$(document).ready(function(){

  var started = false;
  var counter = 0;
  var machineSeq = [];
  var userSeq = [];
  var buttonOrder = ["left_upper_arc", "right_upper_arc", "left_bottom_arc", "right_bottom_arc"];
  var userTurn = false; // if false, it's machine's turn
  var numGuesses = 0;

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

  function loop(index){
    userTurn = false;
    // 1 second setTimeout
    setTimeout(function () {
      buttonEffect(machineSeq[index]);
      index++;
      //if counter < machineSeq.length, call function again
      if (index < machineSeq.length) {
         loop(index);
      } else {
        startUserTurn();
      }
      console.log("seq: " + machineSeq);
    }, 1000)
    console.log("out function");
    console.log("iloop: " + index);
    console.log("-----------");
  }

  function startUserTurn(){
    numGuesses = 0;
    userTurn = true;
    userSeq = [];
  }

  // machine picks a button;
  function machinePick(){
    var pick = buttonOrder[randomButton() - 1];
    console.log("machineSeq: " + machineSeq);
    console.log("length: " + machineSeq.length);
    // hacer push de pick a machineSeq y hacer el efecto de todos los botones del array
    machineSeq.push(pick);
    loop(0);
    console.log("pick: " + pick);
    console.log("machineSeq: " + machineSeq);
  }

  function userPick(button){
    var maxPicks = machineSeq.length;
    numGuesses++;
    userSeq.push(button);
    buttonEffect(button);
    console.log("MAX PICKS: " + maxPicks);
    if (numGuesses >= maxPicks){
      userTurn = false;
    }
  }

  $(".button").click(function() {
    var val = $(this).attr("id");
    if (val === "start_button"){
      started = !started;
    }
    if (started){
      //setTimeout(function() { machinePick(); }, 2000);
      if (userTurn){
        userPick(val);
      }
      if (!userTurn){
        setTimeout(function() { machinePick(); }, 1000);
      }
      console.log("val: " + val);
      // if (val === "left_upper_arc"){
      //   counter +=1;
      //   // $("#left_upper_arc").css({"border-color":"#A9F5A9"});
      //   buttonEffect("left_upper_arc");
      //   // interval = setInterval(timer("left_upper_arc", "#A9F5A9"), 100);
      // } else if (val === "left_bottom_arc"){
      //   //$("#left_bottom_arc").css({"border-color":"#F2F5A9"});
      //   buttonEffect("left_bottom_arc");
      //   counter += 1;
      // } else if (val === "right_upper_arc"){
      //   // $("#right_upper_arc").css({"border-color":"#F78181"});
      //   buttonEffect("right_upper_arc");
      //   counter += 1;
      // } else if (val === "right_bottom_arc"){
      //   counter += 1;
      //   // $("#right_bottom_arc").css({"border-color":"#A9A9F5"});
      //   buttonEffect("right_bottom_arc");
      // } else
      if (val === "start_button"){
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
