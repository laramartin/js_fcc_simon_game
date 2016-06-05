$(document).ready(function(){

  var counter = 0;
  //var machineSeq = ["left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc","left_upper_arc"];
  var machineSeq = [];
  var userSeq = [];
  var buttonOrder = ["left_upper_arc", "right_upper_arc", "left_bottom_arc", "right_bottom_arc"];
  
  // user    -> waiting for input (user turn)
  // machine -> playing sequence
  // initial -> initial state
  var state = 'initial';

  var numGuesses = 0;
  var strict = false;
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

  function startGame(){
    counter = 0;
    machineSeq = [];
    userSeq = [];
    clearTimeout();
    state = 'machine';
    setTimeout(function() { machinePick(); }, 1000);
  }

  function buttonLedColor(button){
    var str = "#".concat(button);
    if (strict || state !== 'initial'){
      $(str).css("box-shadow", "6px 6px 6px green");
    } else {
      $(str).css("box-shadow", "6px 6px 6px red");
    }
  }

  // number of success guesses displayed on game
  function displayCounts(num){
    var html = "<p id=\"counter_display\">" + num + "</p>";
    $("#counter_display").html(html);
  };

  // make button pulsation effect when tapped
  function buttonEffect(button){
    var str = "#".concat(button);
    var index = buttonOrder.indexOf(button) + 1;
    var sound = new Audio(buttonSoundArr[index - 1]);
    $(str).effect("pulsate", {times:1}, 40);
    sound.play();
  }

  // get random number between 1-4 for machine guesses
  function randomButton(){
    var num = Math.floor((Math.random() * 4) + 1);
    return num;
  }

  // iterate through machine picks and make button effect
  function loop(index){
    state = 'machine';
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
    state = 'user';
    userSeq = [];
  }

  // machine picks a button;
  function machinePick(){
    state = 'machine';
    var pick = buttonOrder[randomButton() - 1];
    // push of machine's pick and do button effect of every item in array
    machineSeq.push(pick);
    loop(0);
    console.log("machineSeq: " + machineSeq);
  }

  // compare machine & user picks
  function checkGuess(button, index){
    if (machineSeq[index - 1] !== button){
      errorSound.play();
      return false;
    }
    return true;
  }

  function userPick(button){
    if (state !== 'user') {
      // Ignore user pick outside the waiting for input
      return;
    }
    // max times user can tap a button
    var maxPicks = machineSeq.length;
    numGuesses++;
    userSeq.push(button);
    console.log("userseq: " + userSeq);
    buttonEffect(button);
    var correct = checkGuess(button, numGuesses);
    // if wrong and playing strict, restart
    if (!correct && strict){
      startGame();
    } else if (!correct && !strict) {
      // repeat machine picks again, no adding a new one!!!!!!!!
      state = 'machine';
      console.log("wrong");
      loop(0);
    } else if (correct && numGuesses == 20) {
      // End of game
      alert("YOU WIN!!!!");
    } else if (correct && numGuesses >= maxPicks) {
      // End of user turn
      counter++;
      state = 'machine';
      setTimeout(function() { machinePick(); }, 1000);
    }
  }

  $(".button").click(function() {
    var val = $(this).attr("id");
    if (val === "start_button"){
      startGame();
      buttonLedColor(val);
    } else if (val === "strict_button") {
      strict = !strict;
      if (strict){
        buttonLedColor(val);
      } else {
        buttonLedColor(val);
      }
    } else if (state === 'user') {
      userPick(val);
    }
    displayCounts(counter);
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
