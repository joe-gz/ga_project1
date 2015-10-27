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

  $(".changeCards").each(function (){
    $(this).on("click",function(){
      var name = $(this).attr("name")
      $("h1").html(name+" Concentration!");
      $("h2").html("Welcome to the" +name+ "Memory Game!");
      $(".changeSettings").hide();
      for (var i =0; i <=9; i++) {
        $(".underCard").eq(i).attr("src",'images/'+name+'/'+name+i+'.jpg')
      }
      for (var j =10; i <=19; i++) {
        $(".underCard").eq(i).attr("src",'images/'+name+'/'+name+(i-10)+'.jpg')
      }
      randomize();
    })
  });

  $(".twoPlayerButton").on("click", function () {
    playerCount = 2;
    showInputs();
  })

  $(".playAloneButton").on("click", function () {
    playerCount = 1;
    showInputs();
    $(".points").eq(0).html(player1+" Points: 0")
    $(".points").eq(0).show();
    $(".misses").eq(0).html(player1+" Misses: 0")
    $(".misses").eq(0).show();
    $("header input").eq(1).hide();
  })

  var showInputs = function () {
    $(".introPage").hide();
    $("header input").show();
    $(".playerSet").show();
    $(".playerTurn").show();
    $(".level").show()
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

  // Reset the board
  $(".reset").on("click",function() {
    $(".card").css("background","blue");
    $(".underCard").hide();
    $(".playerTurn").hide();
    $(".playerTurn").text("Please set players");
    $(".card").css("display","")
    $(".introPage").show();
    playerSetHide();
    playerScoreboardHide();
    setBoard();
    playerCount = 0;
    clickCount = 0;
    $(".winnerPage").hide()
    // $(".win").remove();
  })

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
      if (clickCount < 1){
        matchArray[0] = $(this).children(".underCard").attr("src");
        clickCount++
      } else {
        matchArray[1] = $(this).children(".underCard").attr("src");
        // this will show both cards for 1 second, then hide them
        setTimeout(function () {
          $(".underCard").hide();
        },500);
        // .delay(500).queue(function() {
        // $(".underCard").hide();
        // console.log("Is this being hit by the bug?");
        // });
        clickCount = 0;
        if (playerCount === 2){
          checkForMatch();
          turnCount++;
          playerTurn();
        } else {
          checkForMatch1P();
          $(".playerTurn").text("Player turn: "+player1);
        }
      }
      checkForWinner();
    })
  });

  var playerTurn = function() {
    if (turnCount%2 === 0){
      $(".playerTurn").text("Player turn: "+player1)
    } else {
      $(".playerTurn").text("Player turn: "+player2)
    }
  };

  var checkForMatch = function () {
    if (matchArray[0] === matchArray[1]) {
      if (turnCount%2===0) {
        totalScore ++;
        player1Points++;
        hideMatchedSquares();
        $(".points").eq(0).html(player1+" Points: "+player1Points)
      } else {totalScore ++;
        player2Points++;
        hideMatchedSquares();
        $(".points").eq(1).html(player2+" Points: "+player2Points)
      }
    } else {
      totalMiss ++;
    }
    removeActiveClass();
  }

  var hideMatchedSquares = function () {
    $(".active").hide();
    removeActiveClass();
  }

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
};

startGame();
