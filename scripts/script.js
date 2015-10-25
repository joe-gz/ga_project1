// alert("hello")
function startGame (){

  var player1 = "player 1";
  var player2 = "player 2";
  var clickCount = 0;
  var turnCount = 0;
  indexArray = [];
  imageArray = [];

  for (var i=0; i<=3; i++){
    $( "main" ).append( "<div class = 'row'></div>" );
  };

  for (var j=0; j<=4; j++){
    $( ".row" ).append( "<div class = 'card'><img class = 'underCard' src='images/cage"+j+".jpg'></div>" );
    $(".underCard").hide();
    console.log(j);
  };


  $("button").eq(0).on("click", function () {
    player1 = $("input[name='1']").val();
    player2 = $("input[name='2']").val();
    $("header div").text("Player turn: "+player1)
    console.log(player1);
    console.log(player2);
  })

  $("button").on("click",function() {
    $(".card").css("background","blue");
    $(".underCard").hide();
    $("header div").text("Player turn: "+player1)
    clickCount = 0;
    indexArray=[];
    // $(".win").remove();
  })

  $(".card").each(function (){
    $(this).on("click",function(){
      if (clickCount < 1){
        indexArray[$(this).index()] = player1;
        $(this).children(".underCard").show();
        clickCount++
        // checkForWinner();
      } else {
        turnCount++
        indexArray[$(this).index()] = player1;
        // $(this).children(".underCard").show();
        $(this).children(".underCard").show().delay(1000).queue(function(n) {
          $(".underCard").hide(); n();
        });
        clickCount = 0
        // checkForWinner();
        if (turnCount%2 === 0){
          $("header div").text("Player turn: "+player1)
        } else {
          $("header div").text("Player turn: "+player2)
        }
      }
    })
  });


};

startGame();
