// alert("hello")
function startGame (){

  var player1 = "player 1";
  var player2 = "player 2";
  var player1Points = 0;
  var player2Points = 0;
  var clickCount = 0;
  var turnCount = 0;
  var indexArray = [];
  var imageArray = [];
  var matchArray = [];
  var totalScore = 0;
  var totalMiss = 0;
  var playerCount = 0;

  // for (var i=0; i<=3; i++){
  //   $( "main" ).append( "<div class = 'row'></div>" );
  // };

  for (var j=0; j<=9; j++){
    $( "main" ).append( "<div class = 'card'><img class = 'underCard' src='images/cage/cage"+j+".jpg'></div>" );
    $(".underCard").hide();
  };

  for (var j=0; j<=9; j++){
    $( "main" ).append( "<div class = 'card'><img class = 'underCard' src='images/cage/cage"+j+".jpg'></div>" );
    $(".underCard").hide();
  };


  $(".keanu").on("click", function () {
    $(".changeCards").hide();
    for (var i =0; i <=9; i++) {
      $(".underCard").eq(i).attr("src",'images/keanu/keanu'+i+'.jpg')
    }
    for (var j =10; i <=19; i++) {
      $(".underCard").eq(i).attr("src",'images/keanu/keanu'+(i-10)+'.jpg')
    }
  })

  $(".twoPlayerButton").on("click", function () {
    playerCount = 2;
    $(".introPage").hide();
    $("header input").show();
    $(".playerSet").show();
    $(".playerTurn").show();
  })

  $(".playAloneButton").on("click", function () {
    playerCount = 1;
    $(".introPage").hide();
    $("header input").show();
    $(".playerSet").show();
    $("header input").eq(1).hide();
    $(".playerTurn").show();
  })

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
      $(".points").eq(0).html(player1+" Points:")
      $(".points").eq(1).html(player2+" Points:")
      $(".points").show();
    } else {
      $(".points").eq(0).html(player1+" Points:")
      $(".points").eq(0).show();
      $(".misses").eq(0).html(player1+" Misses:")
      $(".misses").eq(0).show();
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
      if (clickCount < 1){
        $(this).addClass("active1")
        $(this).children(".underCard").show();
        matchArray[0] = $(this).children(".underCard").attr("src");
        clickCount++
        // checkForWinner();
      } else {
        // indexArray[$(this).index()] = player1;
        $(this).addClass("active2")
        matchArray[1] = $(this).children(".underCard").attr("src");
        // this will show both cards for 1 second, then hide them
        $(this).children(".underCard").show().delay(1000).queue(function(n) {
          $(".underCard").hide(); n();
        });

        if (playerCount === 2){
          checkForMatch();
          turnCount++;
          clickCount = 0;
          // checkForWinner();
          playerTurn();
        } else {
          checkForMatch1P();
          $(".playerTurn").text("Player turn: "+player1);
          clickCount = 0;
        }
      }
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
    if (turnCount%2===0) {
      if (matchArray[0] === matchArray[1]) {
        totalScore ++;
        player1Points++;
        hideMatchedSquares();
      } else {
        totalMiss ++;
        $(".active1").removeClass("active1");
        $(".active2").removeClass("active2");
      }
      $(".points").eq(0).html(player1+" Points: "+player1Points)
    } else {
      if (matchArray[0] === matchArray[1]) {
        totalScore ++;
        player2Points++;
        hideMatchedSquares();
      } else {
        totalMiss ++;
        $(".active1").removeClass("active1");
        $(".active2").removeClass("active2");
      }
      $(".points").eq(1).html(player2+" Points: "+player2Points)
    }
  }

  var hideMatchedSquares = function () {
    $(".active1").hide();
    $(".active2").hide();
    $(".active1").removeClass(".active1");
    $(".active2").removeClass(".active2");
  }

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

  var checkForMatch1P = function () {
    if (matchArray[0] === matchArray[1]) {
      totalScore ++;
      player1Points++;
      hideMatchedSquares();
    } else {
      totalMiss ++;
      $(".active1").removeClass("active1");
      $(".active2").removeClass("active2");
    }
    $(".points").eq(0).html(player1+" Points: "+player1Points)
    $(".misses").eq(0).html(player1+" Misses: "+totalMiss)
  };

  $(".changeCardsButton").on("click", function () {
    $(".changeCards").show();
  });

};

startGame();
