var isFront = true;
var cardContainer = document.querySelector(".card-image");
var creditCard = document.querySelector(".card-background");
var cardFront = document.querySelector(".card-front");
var cardRear = document.querySelector(".card-rear");
var cardLogo = document.querySelector(".card-logo");

function flipCard(e) {
  if ((isFront && e.target.name == "security-code") || (!isFront && e.target.name != "security-code")) {
    setTimeout(() => {activateBorder(e);}, 500);
    if (isFront) {
      cardFront.style.transform = "perspective( 600px ) rotateY( -180deg )";
      cardRear.style.transform = "perspective( 600px ) rotateY( 0deg )";
    }
    else {
      cardFront.style.transform = "perspective( 600px ) rotateY( 0deg )";
      cardRear.style.transform = "perspective( 600px ) rotateY( 180deg )";
    }
    isFront = !isFront;
  }
  else activateBorder(e);
}
function activateBorder(e) {
  let borderBox = document.querySelector(".active-border");
  let focusedInput = document.querySelector(`.${e.target.name}`);
  let newRect = focusedInput.getBoundingClientRect();
  let removePadding = 4; //PADDING+BORDER OF .active-border

  borderBox.style.display = "inline-block";
  borderBox.style.opacity = "1";
  borderBox.style.height = newRect.height + "px";
  borderBox.style.width = newRect.width + "px";
  borderBox.style.top = (newRect.top - removePadding) + "px";
  borderBox.style.left = (newRect.left - removePadding) + "px";
}
function deactivateBorder(e) {
  let borderBox = document.querySelector(".active-border");
  borderBox.style.opacity = "0";
}
function traceNumberInput(e) {
  let focusedInput = document.querySelector(`.${e.target.name}`);
  let newString = "";
  let spaceCounter = [4, 9, 14];
  let initString = "XXXX XXXX XXXX XXXX";
  if (spaceCounter.some((val) => e.target.value.length == val))
    e.target.value += " ";
  if (e.target.value.length <= 19) {
    let userInput = e.target.value;
    for (let i = 0; i < 19; i++) {
      if (i < userInput.length) {
        newString += userInput[i];
      }
      else {
        newString += initString[i];
      }
    }
    focusedInput.innerHTML = newString;
  }
  else {
    e.target.value = e.target.value.substr(0, 19);
  }
}
function traceNameInput(e) {
  if (e.target.value.length > 11) activateBorder(e);

  let focusedInput = document.querySelector(`.${e.target.name}`);
  if (e.target.value == "") focusedInput.innerHTML = "NAME SURNAME";
  else focusedInput.innerHTML = e.target.value.toUpperCase();
}
function traceDateInput(e) {
  let focusedInput = document.querySelector(`.${e.target.name}`);
  let newString = "";
  let initString = "MM/YY";
  if (e.target.value.length == 2) e.target.value = e.target.value + "/";
  if (e.target.value.length < 6) {
    for (let i = 0; i < 5; i++) {
      if (i < e.target.value.length)
        newString += e.target.value[i];
      else
        newString += initString[i];
    }
    focusedInput.innerHTML = newString;
  }
  else {
    e.target.value = e.target.value.substr(0, 5);
  }
}
function traceCodeInput(e) {
  let focusedInput = document.querySelector(`.${e.target.name}`);
  if (e.target.value.length <= 3) {
    if (e.target.value == "") focusedInput.innerHTML = "123";
    else focusedInput.innerHTML = e.target.value;
  }
  else {
    e.target.value = e.target.value.substr(0, 3);
  }
}
// window.addEventListener("load", getImageSize);
// window.addEventListener("resize", getImageSize);
function getImageSize () {
  var img = document.querySelector('.card-background'); 
  cardContainer.style.height = img.clientHeight + "px";
  cardContainer.style.width = img.clientWidth + "px";
}
