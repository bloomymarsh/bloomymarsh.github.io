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
  favicon.href = "Krakatoa putih.ico"; // Dark-mode .ico
} else {
  favicon.href = "Krakatoa.ico"; // Light-mode .ico
}
});

// header changes
const headerTexts = [
  "Bloomy ✦ Marsh",
  // "Bloomy ☾ Marsh",
  // "Bloomy ✮ Marsh",
  // "Bloomy ☽ Marsh",
  "Bloomy ✧ Marsh"
  //   "Bloody ✦ Mary",
  //   "Broom ✦ Mop",
  //   "Bright ✦ Moon",
  //   "Bulan ✦ Matahari",
  //   "Big ✦ Meteor",
  //   "Butter ✦ Milk",
  //   "Body ✦ Mist",
  //   "Blue ✦ Mountain"
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
let slideIndex = 0;

// Ensure there's at least one slide before applying the class
if (slides.length > 0) {
  slides[slideIndex].classList.add("displaySlide");
  slideText.textContent = slides[slideIndex].alt; // Use the alt attribute from the img element
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
  slideText.textContent = slides[slideIndex].alt; // Update text to match the current slide's alt attribute
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function togglePopup() {
  var modal = document.getElementById("modal");
  modal.classList.toggle("show"); /* Toggle visibility of the modal */
}

// Ensure the DOM has loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".prev").addEventListener("touchend", (e) => {
    e.stopPropagation(); // Prevent interference from drag events
    prevSlide();
  });

  document.querySelector(".next").addEventListener("touchend", (e) => {
    e.stopPropagation();
    nextSlide();
  });
});

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

("use strict");

/* global THREE */
function main() {
  const canvas = document.querySelector("#c");
  const canvasHover = document.getElementById('canvas-hover');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true // Enables transparency
  });
  renderer.setClearColor(0x000000, 0);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(1, 0.5, 3); // Move back to avoid distortions

  const controls = new THREE.OrbitControls(camera, canvas);

  const scene = new THREE.Scene();
  scene.background = null;

  // Ambient Lighting
  var light = new THREE.DirectionalLight(0x404040, 15);
  scene.add(light);
  light.castShadows = true;

  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load(
    "https://raw.githubusercontent.com/bloomymarsh/bloomymarsh.github.io/refs/heads/main/dino.glb",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(0, 0, 0);
      scene.add(root);

      // === Add after scene.add(root); ===
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let timeoutId = null;

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(root, true); // 'true' checks all children

  if (intersects.length > 0) {
    canvasHover.style.display = 'block';
    canvasHover.style.left = event.clientX + 10 + 'px';
    canvasHover.style.top = event.clientY + 10 + 'px';

    clearTimeout(timeoutId); // Prevent multiple timers
    timeoutId = setTimeout(() => {
      canvasHover.style.display = 'none';
    }, 2000);
  }
});

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 2;
      controls.target.copy(boxCenter);
      controls.update();
    }
  );

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    controls.autoRotate = true;
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

// CAROUSEL LABEL
document.addEventListener("DOMContentLoaded", function () {
  const navSpans = document.querySelectorAll("#carouselNav span");
  const columns = document.querySelectorAll(".column");
  const container = document.querySelector(".grid-container");

  // CLICK BEHAVIOR: scroll container horizontally, not full-page
  navSpans.forEach((span, i) => {
    span.addEventListener("click", () => {
      container.scrollTo({
        left: i * container.clientWidth,
        behavior: "smooth"
      });
    });
  });

  // OBSERVE which carousel is in view and highlight nav
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(columns).indexOf(entry.target);
          navSpans.forEach((span, i) => {
            span.classList.toggle("active", i === index);
          });
        }
      });
    },
    {
      root: container,
      threshold: 0.5,
    }
  );

  columns.forEach((col) => observer.observe(col));
});


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
        var delta = 100 - Math.random() * 50; //type and backspace speed
        if (this.isDeleting) { delta /= 5; } //backspace speed
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

    document.addEventListener("DOMContentLoaded", function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS for trailer
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.11em solid #eee}";
  document.body.appendChild(css);
}); // <-- Fixed closing bracket and parenthesis
