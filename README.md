# ga_project1

http://joe-gz.github.io/ga_project1

Concentration

Sometimes just called "Memory", it's a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. If you get all the matching cards, you've won!

Bonus:

Let the user choose from different 'decks'
Add timers / scoring based on timers
Think of some fun way to modify the rules of


User Stories:
As a player i should be able to make two card selections to determine if they match.
As a player I should be able to click on a card so that it flips and I can remember what is showing.
As a player I should be able to receive a point when i match cards so that a winner is eventually chosen.
As a player I should be able to change decks so that i have a better viewing experience.
As a player I should be able to play against a friend so that it is a competitive game.


Explanations:

During this project, I used mostly jQuery to set up and run my game board.  
I approached this with the understanding that almost everything would be set
through various "click" functions.  
Probably the most important methods I used here were .hide(), .show(), and visibility, as those allowed me to build the board on top of itself, and simply show/hide anything i needed to on clicks.

A couple issues I faced or still have unsolved:
1) creating an "easy" and "hard" level. With a little more time I feel confident I could figure this out, however, I am running into an issue with my loops building the divs.
2) Adding more CSS animations. Specifically, I could not get the cards to actually flip.  I believe that is due to the way I actually built the boards, but I am still investigating.
3) I have a lot of work to do in cleaning up my code.  indentation is fine, but there is a ton of repetition right now
