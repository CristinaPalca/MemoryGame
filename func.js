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
'bicycle-solid.svg', 'bicycle-solid.svg', 'igloo-solid.svg', 'igloo-solid.svg'];

var countOpenContainers = 0;
var nrOfContainers;
var nrOfMoves;
var nrOfPairs = 0;
var pairsChecked = 0;
var openContainers = [];
var level = 3;
const maxLevels = 5;
var widthOfCard = 150;
var cardMargin = 10;
var levelImages = [];
openContainers.length = 2;

const nrOfCardsPerLevel = [2, 4, 6, 12, 16];
const nrOfMovesPerLevel = [2, 8, 15, 32, 40];

const lgGridWidthPerLevel = [70, 60, 60, 80, 80];
const smGridCardWidthPerLevel = [{
  width: 35,
  height: 50
},{
  width: 35,
  height: 50
},
{
  width: 25,
  height: 35
},{
  width: 20,
  height: 30
},{
  width: 20,
  height: 30
}];
const lgGridCardWidthPerLevel = [{
  width: 30,
  height: 50
},{
  width: 25,
  height: 35
},{
  width: 20,
  height: 30
},{
  width: 15,
  height: 20
},{
  width: 15,
  height: 20
}];

var s = '<div class="container">'
  +'<div class="card"><div class="card-face front-face"></div><div class="card-face hidden-face"> </div>'
  +'</div></div>';

window.addEventListener('resize', checkWidth);

function checkWidth(){
  if(window.innerWidth < 576){
    if(level > 1){
      let cards = document.querySelectorAll('.container');
      cards.forEach((item, i) => {
        item.style.width = smGridCardWidthPerLevel[level-1].width + 'vw';
        item.style.height = smGridCardWidthPerLevel[level-1].height + 'vw';
      });

    }
    console.log("sm screen");
  }else{
    if(level > 1){
      gridContainer.style.width = lgGridWidthPerLevel[level - 1] + 'vw';
      let cards = document.querySelectorAll('.container');
      cards.forEach((item, i) => {
        item.style.width = lgGridCardWidthPerLevel[level-1].width + 'vw';
        item.style.height = lgGridCardWidthPerLevel[level-1].height + 'vw';
      });
    }
    console.log("larger screen");
  }
}

function addContainers(){

  for(let i = 0; i < nrOfCardsPerLevel[level - 1]; i++){
    gridContainer.innerHTML += s;
  }
  imagesList = document.querySelectorAll(".hidden-face");
  cards = document.querySelectorAll('.card');
  nrOfContainers = cards.length;
  console.log(nrOfContainers);
  nrOfMoves = nrOfMovesPerLevel[level - 1];
  levelContainer.innerHTML = level;

  assignImages();
  addListeners();
  checkWidth();
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
