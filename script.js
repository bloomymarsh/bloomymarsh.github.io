// Array of text options
const headerTexts = [
  "Bloomy ✦ Marsh",
  "Broom ✦ Mop",
  "Bold ✦ Mysterious",
  "Bloody ✦ Mary",
  "Bright ✦ Moon",
  "Brooklyn ✦ Manhattan",
  "Bandung ✦ Majalaya",
  "Brave ✦ Master",
  "Broken ✦ Mirror",
  "Blue ✦ Mountain",
  "Butter ✦ Milk",
  "Body ✦ Mist",
  "Beautiful ✦ Mind",
  "Bright ✦ Meteor"
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
