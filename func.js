var imagesList = document.querySelectorAll(".hidden-face");
var movesLeftContainer = document.querySelector('.moves-extract');
var levelContainer = document.querySelector('.level-extract');
var cards = document.querySelectorAll('.card');
var gridContainer = document.querySelector('.gridContainer');

var imagesArray = ['cat-solid.svg', 'cat-solid.svg', 'dragon-solid.svg', 'dragon-solid.svg',
 'cheese-solid.svg', 'cheese-solid.svg', 'frog-solid.svg', 'frog-solid.svg',
'hamburger-solid.svg', 'hamburger-solid.svg', 'kiss-wink-heart-solid.svg', 'kiss-wink-heart-solid.svg',
'skull-solid.svg', 'skull-solid.svg', 'apple-alt-solid.svg', 'apple-alt-solid.svg',
'dizzy-solid.svg', 'dizzy-solid.svg', 'grin-tongue-wink-solid.svg', 'grin-tongue-wink-solid.svg',
'hotdog-solid.svg', 'hotdog-solid.svg', 'ice-cream-solid.svg', 'ice-cream-solid.svg',
'lemon-solid.svg', 'lemon-solid.svg', 'pizza-slice-solid.svg', 'pizza-slice-solid.svg',
'bicycle-solid.svg', 'bicycle-solid.svg'];

var countOpenContainers = 0;
var nrOfContainers;
var nrOfMoves;
var nrOfPairs = 0;
var pairsChecked = 0;
var openContainers = [];
var level = 1;
const maxLevels = 5;
var widthOfCard = 150;
var cardMargin = 10;
var levelImages = [];
openContainers.length = 2;


var s = '<div class="container">'
  +'<div class="card"><div class="card-face front-face"></div><div class="card-face hidden-face"> </div>'
  +'</div></div>';


function addContainers(){

  gridContainer.style.width = (widthOfCard + cardMargin * 2) * (level + 1) + "px";
  console.log();

  if((level%2) == 1){
    for(var i = 0; i < (level + 1) * level; i++){
      gridContainer.innerHTML += s;
      console.log("adding new container");
    }
  }else{
    for(var i = 0; i < level * level; i++){
      gridContainer.innerHTML += s;
      console.log("adding new container");
    }
  }

  imagesList = document.querySelectorAll(".hidden-face");
  cards = document.querySelectorAll('.card');
  nrOfContainers = cards.length;
  console.log(nrOfContainers);
  nrOfMoves = nrOfContainers * 3;
  levelContainer.innerHTML = level;
  assignImages();
  addListeners();
}
addContainers();

function assignImages(){
  levelImages.length = nrOfContainers;
  for(var i = 0; i < nrOfContainers; i++){
    levelImages[i] = imagesArray[i];
  }
  for(var i = 0; i < nrOfContainers; i++){
    let imageIndex = Math.floor(Math.random() * Math.floor(levelImages.length));
    imagesList[i].style.backgroundImage = "url(images/" + levelImages[imageIndex] + ")";

    removeElement(imageIndex);
  }
  movesLeftContainer.innerHTML = nrOfMoves;
}


function addListeners(){
  for(const card of cards){
    card.addEventListener( 'click', function() {
      if(nrOfMoves <= 0){
        exitGame(false);
      }
      if(card.classList.contains('is-flipped') == false){

        if(countOpenContainers == 2){
          clearOpenContainers(checkForMatch());
          countOpenContainers = 0;
        }
        openContainers[countOpenContainers] = card;
        card.classList.add('is-flipped');
        countOpenContainers++;
        nrOfMoves--;
        movesLeftContainer.innerHTML = nrOfMoves;
        if(document.querySelectorAll('.is-flipped').length == cards.length){
          if(level >= maxLevels){
            exitGame(true);
          }
          else{
            newLevel();
          }
        }
      }
    });
  }
}

function newLevel(){
  level++;
  setTimeout(function(){
    gridContainer.innerHTML = '';
    addContainers();
  }, 500);
}

function exitGame(gameWon){
  var finalMessage = document.querySelector('.end-screen');
  setTimeout(function(){
    if(gameWon){
      finalMessage.querySelector('.end-content').innerHTML = "Congratulations,<br>You won";
    }else{
      finalMessage.querySelector('.end-content').innerHTML = "Woops, You lost";
    }
    finalMessage.style.display = "block";
  }, 500);
}

function checkForMatch(){
  var value = false;
  var image1 = openContainers[0].querySelector(".hidden-face").style.backgroundImage;
  var image2 = openContainers[1].querySelector(".hidden-face").style.backgroundImage;
  if(image1.localeCompare(image2) == 0){
    value = true;
    nrOfPairs++;
  }
  return value;
}

function clearOpenContainers(value){
  for (var i = 0; i < openContainers.length; i++){
    if(!value){
      openContainers[i].classList.remove('is-flipped');
    }else{
      openContainers[i].style.display = "none";
      console.log("they match");
    }
    openContainers[i] = '';
  }
}

function removeElement(index){
  for(var i = index; i < levelImages.length - 1; i++){
    levelImages[i] = levelImages[i + 1];
  }
  levelImages.length--;

}



var startGame = document.querySelector('.begin-content');

startGame.addEventListener('click', function(){
  startGame.parentNode.style.display = "none";
});
