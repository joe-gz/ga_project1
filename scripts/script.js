// alert("hello")
function startGame (){

  var setBoard = function () {
    clickCount = 0;
    turnCount = 0;
    indexArray=[];
    imageArray = [];
    matchArray = [];
    totalScore = 0;
    totalMiss = 0;
    player1Points = 0;
    player2Points = 0;
  }

  var player1 = "player 1";
  var player2 = "player 2";
  var player1Points = 0;
  var player2Points = 0;
  var playerCount = 0;
  var time = 30;
  var timerID;
  setBoard();

  var makeGamePieces = function () {
    for (var j=0; j<=7; j++){
      $( "main" ).append( "<div class = 'card'><img class = 'underCard' src='images/sherlock/sherlock"+j+".jpg'></div>" );
      $(".underCard").hide();
    };

    for (var j=0; j<=7; j++){
      $( "main" ).append( "<div class = 'card'><img class = 'underCard' src='images/sherlock/sherlock"+j+".jpg'></div>" );
      $(".underCard").hide();
    };

    randomize();
  }

  // used to randomize the placement of pieces on the board
  var randomize = function() {
    var card = $(".card");
    for (var i = 0; i < card.length; i++) {
      var target = Math.floor(Math.random() * card.length - 1) + 1;
      var target2 = Math.floor(Math.random() * card.length - 1) + 1;
      var target3 = Math.floor(Math.random() * card.length - 1) + 1;
      card.eq(target).before(card.eq(target2)).before(card.eq(target3));
    }
  }

  makeGamePieces();

  // used to replace board images with the selected person. ie. cage, ferrell
  var replaceImages = function (name) {
    for (var i =0; i <=7; i++) {
      $(".underCard").eq(i).attr("src",'images/'+name+'/'+name+i+'.jpg')
      $(".underCard").eq(8).attr("src",'images/'+name+'/'+name+6+'.jpg')
      $(".underCard").eq(9).attr("src",'images/'+name+'/'+name+7+'.jpg')
    }
    for (var j =10; j <=15; j++) {
      $(".underCard").eq(j).attr("src",'images/'+name+'/'+name+(j-10)+'.jpg')
    }
    randomize();
  }

  // this will change the images on the card based on who is selected
  $(".changeCards").each(function (){
    $(this).on("click",function(){
      var name = $(this).attr("name")
      $(".changeSettings").hide();
      replaceImages(name);
    })
  });

  $(".twoPlayerButton").on("click", function () {
    playerCount = 2;
    showInputs();
  })

  $(".playAloneButton").on("click", function () {
    playerCount = 1;
    showInputs();
    setPlayerOneToZero();
    $(".misses").eq(0).html(player1+" Misses: 0")
    $(".misses").eq(0).show();
    $("header input").eq(1).hide();
  })

  var setPlayerOneToZero = function () {
    $(".points").eq(0).html(player1+" Points: 0")
    $(".points").eq(0).show();
  }

  var showInputs = function () {
    $(".introPage").hide();
    $("header input").show();
    $(".playerSet").show();
    $(".playerTurn").show();
  }

  // Sets the players using the inputs, then hides input and procudes scoreboard
  $(".playerSet").on("click", function () {
    player1 = $("input[name='1']").val();
    player2 = $("input[name='2']").val();
    playerScoreboardShow();
    $(".playerTurn").text("Player turn: "+player1)
    playerSetHide();
  })

  var playerSetHide = function() {
    $(".playerSet").hide();
    $("header input").hide();
  }

  var playerScoreboardShow = function() {
    if (playerCount === 2) {
      $(".points").eq(0).html(player1+" Points: 0")
      $(".points").eq(1).html(player2+" Points: 0")
      $(".points").show();
    }
  }

  var playerSetShow = function() {
    $(".playerSet").show();
    $("header input").show();
  }

  var playerScoreboardHide = function() {
    $(".points").hide();
    $(".misses").hide();
  }

  // Reset the board. needs a lot of cleaning
  $(".reset").on("click",function() {
    $(".card").css("background","blue");
    hideOnReset();
    // $(".playerTurn").text("Please set players");
    $(".card").css("visibility","");
    replaceImages('sherlock');
    $(".introPage").show();
    setBoard();
    playerCount = 0;
    clickCount = 0;
    time = 30;
    $(".timerButton").show();
    clearInterval(timerID);
  })

  var hideOnReset = function () {
    $(".underCard").hide();
    $(".playerTurn").hide();
    playerSetHide();
    playerScoreboardHide();
    $(".winnerPage").hide()
    $("#timer").hide();
  }

  $(".helpButton").on("click", function() {
    $(".help").show();
  })

  $(".closeHelp").on("click", function () {
    $(".help").hide();
  })

  // This is the main click function on each card
  $(".card").each(function (){
    $(this).on("click",function(){
      $(this).children(".underCard").show()
      $(this).addClass("active")
      var srcImage = $(this).children(".underCard").attr("src");
      if (clickCount < 1){
        $(this).addClass("card1")
        matchArray[0] = srcImage;
        clickCount++
      } else {
        if ($(this).hasClass("card1")) {
          matchArray [0]=srcImage;
        } else {
          matchArray[1] = srcImage;
          // this will show both cards for .5 seconds, then hide them
          setTimeout(function () {
            $(".underCard").hide();
          },500);
          clickCount = 0;
          matchAndTurn();
        }
        $(".card1").removeClass("card1");
      }

      checkForWinner();
      checkTimerWinner();
    })
  });

  // runs checkForMatch for two player and one player, and adds to "turnCount"
  var matchAndTurn = function () {
    if (playerCount === 2){
      checkForMatch();
      turnCount++;
      playerTurn();
    } else {
      checkForMatch1P();
      $(".playerTurn").text("Player turn: "+player1);
    }
  };

  var playerTurn = function() {
    if (turnCount%2 === 0){
      $(".playerTurn").text("Player turn: "+player1)
    } else {
      $(".playerTurn").text("Player turn: "+player2)
    }
  };

  // matchArray is an array with 2 values that are added one the first and second picture clicks respectively
  // this will check if the two values within the array are equal to each other and add a point
  // this is done for the two player game
  var checkForMatch = function () {
    if (matchArray[0] === matchArray[1]) {
      totalScore ++;
      if (turnCount%2===0) {
        player1Points++;
      } else {
        player2Points++;
      }
      hideMatchesAddPoints();
    } else {
      totalMiss ++;
    }
    removeActiveClass();
  }

  var hideMatchesAddPoints = function () {
    hideMatchedSquares();
    $(".points").eq(0).html(player1+" Points: "+player1Points);
    hideMatchedSquares();
    $(".points").eq(1).html(player2+" Points: "+player2Points);
  }

  var hideMatchedSquares = function () {
    $(".active").css('visibility', 'hidden');
    removeActiveClass();
  }

  // this checks for match in a one-player situation
  var checkForMatch1P = function () {
    if (matchArray[0] === matchArray[1]) {
      totalScore ++;
      player1Points++;
      hideMatchedSquares();
    } else {
      totalMiss ++;
      removeActiveClass();
    }
    $(".points").eq(0).html(player1+" Points: "+player1Points)
    $(".misses").eq(0).html(player1+" Misses: "+totalMiss)
  };

  var removeActiveClass = function () {
    $(".active").removeClass("active");
  }

  $(".cardColor").on("click", function () {
    $(".colorChange").show();
  })

  $(".changeCardsButton").on("click", function () {
    $(".changeSettings").show();
  });

  $(".closeSettings,.changeColorBlue,.changeColorRed,.changeColorGreen").on("click", function () {
    $(".changeSettings").hide();
  })

  var backgroundColor = function (color) {
    $(".introPage,.card").css("background",color);
  }

  $(".changeColor").on("click", function () {
    backgroundColor($(this).html());
  })

  var checkForWinner = function () {
    if (totalScore === 8) {
      if (playerCount === 1) {
        $(".winnerPage").show()
      } else {
        if (player1Points > player2Points) {
          $(".winnerPage").show();
          $(".winnerPage h2").html("Congratulations " + player1 + "! You beat " + player2)
        } else if (player1Points < player2Points) {
          $(".winnerPage").show();
          $(".winnerPage h2").html("Congratulations " + player2 + "! You beat " + player1)
        } else {
          $(".winnerPage").show();
          $(".winnerPage h2").html("We have a draw!")
        }
      }
    }
  }

  // everything below is run for the timer game.
  // this will set and end the timer for 30 seconds
  var updateTime = function(){
    $("#timer").html("Time elapsed: " + time);
    time--;
    if (time <=0) {
      time = 0;
    }
  }

  function runTimer () {
    timerID = setInterval(updateTime, 1000);
  }

  $(".timerButton").on("click",function () {
    playerCount = 1;
    $("#timer").show();
    $(".timerButton").hide();
    $(".introPage").hide();
    setPlayerOneToZero();
    runTimer();
  })

  var checkTimerWinner = function () {
    if (totalScore === 8) {
      if (playerCount === 1) {
        $(".winnerPage").show();
      }
    } else if (time === 0) {
      // changes the text of the winners page to a "losers" page
      $(".winnerPage").show();
      $(".winnerPage h2").html("Sorry, you are out of time!");
    } if ( time <= 0) {
      clearInterval(timerID);
    }
  }
};

startGame();
