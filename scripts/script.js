// alert("hello")
var player1 = "player 1";
var player2 = "player 2";
var clickCount = 0;
indexArray = [];

for (var i=0; i<=20; i++){
  $( "main" ).append( "<div class = 'card'><img class = 'underCard' src='images/cage1.JPG'></div>" );
  $(".underCard").hide();
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
  clickCount = 0;
  turnClick=0;
  indexArray=[0,1,2,3,4,5,6,7,8];
  $(".win").remove();
})

$(".card").each(function (){
  $(this).on("click",function(){
    // if (clickCount %2 === 0 ){
      indexArray[$(this).index()] = player1;
      $(this).children(".underCard").show().delay(3000).queue(function(n) {
        $(this).hide(); n();
      });
      clickCount++
      // checkForWinner();
      $("header div").text("Player turn: ")
  })
})



//
// $(".card").each(function (){
//   $(this).on("click",function(){
//     if (clickCount %2 === 0 ){
//       indexArray[$(this).index()] = player1;
//       $(this).children(".underCard").show();
//       setTimeout(function() {
//         $(this).children(".underCard").hide(); }, 5000);
//       });
//       clickCount++
//       // checkForWinner();
//       $("header div").text("Player turn: "+player2)
//
//     } else {
//       indexArray[$(this).index()] = player2;
//       $(this).children(".underCard").hide();
//       clickCount++
//       // checkForWinner();
//       $("header div").text("Player turn: "+player1)
//     }
//   })
// })
