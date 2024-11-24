// script.js

document.getElementById('survey-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Get the location input value
  const location = document.getElementById('location').value;

  // Display a message with the entered location
  if (location) {
    alert('Thank you for submitting your squirrel sighting at ' + location);
  } else {
    alert('Please enter a location.');
  }
});
