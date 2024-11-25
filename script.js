document.addEventListener('DOMContentLoaded', function () {
  const favicon = document.getElementById('favicon');

  function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) { // shorthand for hex
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) { // full hex
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return {r, g, b};
  }

  function luminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
  const rgb = hexToRgb(backgroundColor);
  const lum = luminance(rgb.r, rgb.g, rgb.b);

  // If luminance is below a certain threshold, it's dark
  if (lum < 0.5) {
    favicon.href = 'font/Krakatoa putih.png'; // Dark favicon
  } else {
    favicon.href = 'font/Krakatoa.png'; // Light favicon
  }
});


// Array of text options
const headerTexts = [
  "Bloomy ✦ Marsh",
  "Brooklyn ✦ Manhattan",
  "Bandung ✦ Majalaya",
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

// Index to keep track of the current text
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
