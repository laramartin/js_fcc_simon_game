$(document).ready(function(){

  var started = false;
  var counter = 0;
  //var machineSeq = ["left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc"];
  var machineSeq = [];
  var userSeq = [];
  var buttonOrder = ["left_upper_arc", "right_upper_arc", "left_bottom_arc", "right_bottom_arc"];
  var userTurn = false; // if false, it's machine's turn
  var numGuesses = 0;
  var errorSound = new Audio("https://raw.githubusercontent.com/laramartin/js_fcc_simon_game/master/src/button-10.wav");
  errorSound.volume = 0.3;
  // var buttonSoundArr = [
  //   "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  //   "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  //   "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  //   "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
  // ];
  var buttonSoundArr = [
    "https://raw.githubusercontent.com/laramartin/js_fcc_simon_game/master/src/simonSound1.mp3",
    "https://raw.githubusercontent.com/laramartin/js_fcc_simon_game/master/src/simonSound2.mp3",
    "https://raw.githubusercontent.com/laramartin/js_fcc_simon_game/master/src/simonSound3.mp3",
    "https://raw.githubusercontent.com/laramartin/js_fcc_simon_game/master/src/simonSound4.mp3",
  ];

  function reset(){
    started = false;
    counter = 0;
    machineSeq = [];
    userSeq = [];
  }

  function displayCounts(num){
    var html = "<p id=\"counter_display\">" + num + "</p>";
    $("#counter_display").html(html);
  };

  function buttonEffect(button){
    var str = "#".concat(button);
    var index = buttonOrder.indexOf(button) + 1;
    var sound = new Audio(buttonSoundArr[index - 1]);
    $(str).effect("pulsate", {times:1}, 40);
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
    }, 1000)
  }

  function startUserTurn(){
    numGuesses = 0;
    userTurn = true;
    userSeq = [];
  }

  // machine picks a button;
  function machinePick(){
    var pick = buttonOrder[randomButton() - 1];
    // push of machine's pick and do button effect of every item in array
    machineSeq.push(pick);
    loop(0);
    console.log("machineSeq: " + machineSeq);
  }

  function checkGuess(button, index){
    if (machineSeq[index - 1] !== button){
      errorSound.play();
      return false;
    }
    return true;
  }

  function userPick(button){
    var maxPicks = machineSeq.length;
    numGuesses++;
    userSeq.push(button);
    buttonEffect(button);
    var correct = checkGuess(button, numGuesses);
    if (!correct){
      reset();
    } else if (correct && numGuesses == 20) {
      alert("YOU WIN!!!!");
    }
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
      if (userTurn){
        userPick(val);
      }
      if (!userTurn){
        if (machineSeq.length !== 0){
          counter += 1;
        }
        setTimeout(function() { machinePick(); }, 1000);
      }
      if (val === "start_button"){
        started = true;
      }
      displayCounts(counter);
    }

    console.log("--------");

  });

  displayCounts("\n");


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78227272-1', 'auto');
  ga('send', 'pageview');

});
