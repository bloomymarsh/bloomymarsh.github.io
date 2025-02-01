// dark mode favicon
document.addEventListener("DOMContentLoaded", function () {
  const favicon = document.getElementById("favicon");

  function hexToRgb(hex) {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      // shorthand for hex
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      // full hex
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
  }

  function luminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  const backgroundColor = window.getComputedStyle(document.body)
    .backgroundColor;
  const rgb = hexToRgb(backgroundColor);
  const lum = luminance(rgb.r, rgb.g, rgb.b);

  if (lum < 0.5) {
    favicon.href = "font/Krakatoa putih.png"; // Dark favicon
  } else {
    favicon.href = "font/Krakatoa.png"; // Light favicon
  }
});

// header changes
const headerTexts = [
  "Bloomy ✦ Marsh",
  "Bon ✦ Monde",
  // "Brooklyn ✦ Manhattan",
  // "Bandung ✦ Majalaya",
  "Bold ✦ Mysterious",
  "Beautiful ✦ Mind",
  "Black ✦ Mirror",
  "Bloody ✦ Mary",
  "Broom ✦ Mop",
  "Bright ✦ Moon",
  "Bulan ✦ Matahari",
  "Big ✦ Meteor",
  "Butter ✦ Milk",
  "Body ✦ Mist",
  "Blue ✦ Mountain"
];

let currentIndex = 0;

// Function to update the header text
function updateHeaderText() {
  const headerElement = document.getElementById("dynamic-header");

  // Update the text content
  headerElement.textContent = headerTexts[currentIndex];

  // Move to the next index, loop back if at the end
  currentIndex = (currentIndex + 1) % headerTexts.length;
}

// Call the function every second
setInterval(updateHeaderText, 1000);

// DRAGGABLE OBJECT
const slides = document.querySelectorAll(".avatars img");
const slideText = document.getElementById("avatarText");
const textArray = ["irl", "memoji", "notion faces", "bitmoji"];
let slideIndex = 0;

// Ensure there's at least one slide before applying the class
if (slides.length > 0) {
  slides[slideIndex].classList.add("displaySlide");
  slideText.textContent = textArray[slideIndex];
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
  slideText.textContent = textArray[slideIndex];
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// START DRAGGING
let draggableElem = document.getElementById("avatars-container");
let initialX = 0,
  initialY = 0;
let moveElement = false;
let translateX = 0,
  translateY = 0;

//Events Object
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup"
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend"
  }
};

// Detect touch device
const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints;

let deviceType = isTouchDevice() ? "touch" : "mouse";

// Start movement
draggableElem.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  draggableElem.style.cursor = "grabbing";
  let clientX = deviceType === "touch" ? e.touches[0].clientX : e.clientX;
  let clientY = deviceType === "touch" ? e.touches[0].clientY : e.clientY;

  initialX = clientX - translateX;
  initialY = clientY - translateY;

  moveElement = true;
});

// Move element
draggableElem.addEventListener(events[deviceType].move, (e) => {
  if (!moveElement) return;

  let clientX = deviceType === "touch" ? e.touches[0].clientX : e.clientX;
  let clientY = deviceType === "touch" ? e.touches[0].clientY : e.clientY;

  translateX = clientX - initialX;
  translateY = clientY - initialY;

  draggableElem.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.5)`;
});

// Stop movement
const stopMovement = () => {
  moveElement = false;
  draggableElem.style.cursor = "grab";
};

draggableElem.addEventListener(events[deviceType].up, stopMovement);
draggableElem.addEventListener("mouseleave", stopMovement);

// RAT START

// UI
const rat = document.getElementById("rat");
const paw = document.getElementById("paw");
const scoreDisplay = document.getElementById("score");
const timerElement = document.getElementById("time");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const popupImage = document.createElement("img");
const gameTitle = document.getElementById("gameTitle");

popupImage.src =
  "https://raw.githubusercontent.com/bloomymarsh/bloomymarsh.github.io/refs/heads/main/!!!.png";
popupImage.alt = "Popup Image 1";
popupImage.style.width = "100px";
popupImage.style.height = "auto";

// Init
let score = 0;
let gameActive = false;
let timer;
let gameTime = 10;
gameTitle.innerHTML = `<span style="font-size: 40px; font-weight: bold;">Hit</span><br><span style="font-size: 50px;">the</span><br><span style="font-size: 60px;">Rat</span>
  `;

// Collision Detection
const circle = document.getElementById("circle");
const circleRadius = circle.offsetWidth / 2;
let circleCenterX = circle.offsetLeft + circleRadius;
let circleCenterY = circle.offsetTop + circleRadius;

// Collision detection function
function checkCollision() {
  const ratRect = rat.getBoundingClientRect();
  const ratCenterX = ratRect.left + ratRect.width / 2;
  const ratCenterY = ratRect.top + ratRect.height / 2;

  const circleRect = circle.getBoundingClientRect();
  circleCenterX = circleRect.left + circleRect.width / 2;
  circleCenterY = circleRect.top + circleRect.height / 2;

  //   DEBUGGING DETECTOR
  //   circle.style.border = "2px solid red";
  // rat.style.border = "2px solid blue";

  //   console.log("Rat center:", ratCenterX, ratCenterY);
  // console.log("Circle center:", circleCenterX, circleCenterY);

  function updateCirclePosition() {
    const circleRect = circle.getBoundingClientRect();
    circleCenterX = circleRect.left + circleRect.width / 2;
    circleCenterY = circleRect.top + circleRect.height / 2;
  }
  window.addEventListener("resize", updateCirclePosition);
  updateCirclePosition(); // Call initially

  const distance = Math.sqrt(
    Math.pow(ratCenterX - circleCenterX, 2) +
      Math.pow(ratCenterY - circleCenterY, 2)
  );

  return distance <= circleRadius;
}

// Collision effect
rat.addEventListener("click", () => {
  if (gameActive && checkCollision()) {
    score++;
    scoreDisplay.textContent = `${score}`;
    console.log("Score added!");
    if (score > 0 && scoreDisplay.style.display === "none") {
      scoreDisplay.style.display = "block"; // Show score display once score increases from 0
    }

    // Only append the popup image if it's not already appended
    if (!popupContainer.contains(popupImage)) {
      popupContainer.appendChild(popupImage);

      // Remove the popup image after 1 second
      setTimeout(() => {
        if (popupContainer.contains(popupImage)) {
          popupContainer.removeChild(popupImage);
        }
      }, 100);
    }

    // Set a timeout to remove the score after 1 second (1000 ms)
    setTimeout(() => {
      scoreDisplay.textContent = ""; // Remove the score text
    }, 1000); // Timeout duration in milliseconds
  } else {
    console.log("Missed! Rat not in the circle.");
  }
});

// Monitor rat position
function monitorRatPosition() {
  if (gameActive && checkCollision()) {
    console.log("Rat is inside the circle!");
  }
  if (gameActive) {
    requestAnimationFrame(monitorRatPosition);
  }
}

// Start game function
function startGame() {
  score = 0;
  scoreDisplay.textContent = `${score}`;
  gameActive = true;

  rat.style.animation = "rat1 4s linear infinite";
  gameTitle.style.display = "none";
  scoreDisplay.style.display = "none"; // Hide score initially

  // Show the timer when the game starts
  console.log("Showing timer...");
  timerElement.textContent = gameTime;

  // Start the game timer
  timer = setInterval(function () {
    gameTime--;
    timerElement.textContent = gameTime; // Update the timer display
    if (gameTime <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  startButton.style.display = "none"; // Hide start button once the game starts
  restartButton.style.display = "none"; // Hide restart button during game
  monitorRatPosition(); // Start monitoring the rat
}

// Add click event listener for paw movement
document.addEventListener("click", () => {
  if (gameActive) {
    // Ensure the game has started
    // Move the paw
    paw.style.transform = "rotate(-60deg)";
    setTimeout(() => {
      paw.style.transform = "rotate(-20deg)";
    }, 200);
  }
});

// End game function
function endGame() {
  rat.style.animation = "none";
  gameActive = false;
  console.log("Game Over!");
  restartButton.style.display = "inline"; // Show restart button
  gameTitle.style.display = "block";
  gameTitle.innerHTML = `<span style="font-size: 60px; font-weight: bold;">${score}</span><br><span style="font-size: 25px;">Hit   ✧<br>Score</span>
  `;
}

// Restart game function
function restartGame() {
  // Reset game state
  rat.style.animation = "none";
  gameTime = 10; // Reset the game time
  score = 0; // Reset score
  timerElement.textContent = gameTime; // Reset the timer display

  // Hide restart button
  restartButton.style.display = "none";

  // Start the game again
  startGame();
}

// Event listeners for buttons
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

// Medium
let TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100; //type and backspace speed

        if (this.isDeleting) { delta /= 3; } //backspace speed

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500; // time for new sentence
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS for trailer
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.11em solid #eee}";
        document.body.appendChild(css);
    };
