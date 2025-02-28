// Global variables and functions
var ledOverlay = document.getElementById('ledOverlay');
var frameOverlay = document.getElementById('frameOverlay');
var currentAnimation = 'blink'; // Default animation is blink
var strongMode = false;
var lightsOn = true; // Default lights are on
var ledCountPerSide = 40; // LEDs for full border coverage
var isDarkMode = true; // Default is dark mode
var lightIntensity = 50; // Default light intensity (lower value)
var frameIndex = 0; // Current frame index
var frames = [
  'Frames/frame-blue.webp',
  'Frames/blue-frame.webp',
  'Frames/photo-frame.png',
  'Frames/goldenframe-Photo.png',
  'Frames/gold-wooden.png',
  'Frames/wood-frame.webp'
]; // List of frame images

// Function to create LEDs
function createLEDs() {
  ledOverlay.innerHTML = '';
  if (!lightsOn) return; // If lights are off, don't create LEDs

  // Top and bottom rows
  for (var i = 0; i < ledCountPerSide; i++) {
    // Top side
    var ledTop = document.createElement('div');
    ledTop.classList.add('led');
    ledTop.style.top = '-14px'; /* Half outside the frame */
    ledTop.style.left = (i * (100 / (ledCountPerSide - 1))) + '%';
    ledOverlay.appendChild(ledTop);
    // Bottom side
    var ledBottom = document.createElement('div');
    ledBottom.classList.add('led');
    ledBottom.style.bottom = '-14px'; /* Half outside the frame */
    ledBottom.style.left = (i * (100 / (ledCountPerSide - 1))) + '%';
    ledOverlay.appendChild(ledBottom);
  }
  // Left and right columns (excluding corners)
  for (var i = 1; i < ledCountPerSide - 1; i++) {
    var ledLeft = document.createElement('div');
    ledLeft.classList.add('led');
    ledLeft.style.left = '-18px'; /* Half outside the frame */
    ledLeft.style.top = (i * (100 / (ledCountPerSide - 1))) + '%';
    ledOverlay.appendChild(ledLeft);
    var ledRight = document.createElement('div');
    ledRight.classList.add('led');
    ledRight.style.right = '-18px'; /* Half outside the frame */
    ledRight.style.top = (i * (100 / (ledCountPerSide - 1))) + '%';
    ledOverlay.appendChild(ledRight);
  }
  updateLEDs();
}

// Function to update LEDs
function updateLEDs() {
  var leds = document.querySelectorAll('.led');
  leds.forEach(function(led) {
    // Reset inline styles so CSS variables and animations take precedence
    led.style.backgroundColor = '';
    led.style.boxShadow = '';
    // Apply strength if active
    if (strongMode) {
      led.classList.add('strong');
    } else {
      led.classList.remove('strong');
    }
    // Set animation if any
    if (currentAnimation === 'fade') {
      led.style.animation = "fadeEffect 3s infinite alternate";
    } else if (currentAnimation === 'blink') {
      led.style.animation = "blinkEffect 3s infinite";
    } else {
      led.style.animation = "";
    }
  });
}

// Function to set LED color
function setColor(color) {
  document.documentElement.style.setProperty('--led-color', color);
  currentAnimation = null;
  updateLEDs();
}

// Function to set animation mode
function setAnimation(mode) {
  currentAnimation = mode;
  updateLEDs();
}

// Function to toggle strength mode
function toggleStrength() {
  strongMode = !strongMode;
  updateLEDs();
}

// Function to toggle lights on/off
function toggleLights() {
  lightsOn = !lightsOn;
  var lightsBtn = document.getElementById('lightsBtn');
  lightsBtn.textContent = lightsOn ? 'Lights On' : 'Lights Off';
  createLEDs();
}

// Function to toggle dark/light mode
function toggleMode() {
  isDarkMode = !isDarkMode;
  var modeToggle = document.querySelector('.mode-toggle');
  modeToggle.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
  document.documentElement.style.setProperty('--frame-bg', isDarkMode ? '#222' : '#fff');
  document.documentElement.style.setProperty('--body-bg', isDarkMode ? '#393737' : '#f0f0f0');
  document.documentElement.style.setProperty('--text-color', isDarkMode ? '#fff' : '#000');
}

// Function to change photo in the frame
function changePhoto(src) {
  var photo = document.getElementById('photo');
  photo.src = src;
}

// Function to increase light intensity by 5%
function increaseIntensity() {
  lightIntensity = Math.min(lightIntensity * 1.05, 100); // Max intensity: 100px
  document.documentElement.style.setProperty('--light-intensity', lightIntensity + 'px');
  updateLEDs();
}

// Function to decrease light intensity by 5%
function decreaseIntensity() {
  lightIntensity = Math.max(lightIntensity * 0.85, 20); // Min intensity: 20px
  document.documentElement.style.setProperty('--light-intensity', lightIntensity + 'px');
  updateLEDs();
}

// Function to change frame
function changeFrame() {
  frameIndex = (frameIndex + 1) % frames.length; // Cycle through frames
  frameOverlay.style.backgroundImage = `url('${frames[frameIndex]}')`;
}

// Function to show info modal
function showInfo() {
  var modal = document.getElementById('infoModal');
  modal.style.display = 'block';
}

// Function to hide info modal
function hideInfo() {
  var modal = document.getElementById('infoModal');
  modal.style.display = 'none';
}
// Function for Mix-Light (Series Animation)
// function mixLight() {
//   var leds = document.querySelectorAll('.led');
//   leds.forEach((led, index) => {
//     led.style.animation = ''; // Reset animation
//     setTimeout(() => {
//       led.style.animation = 'fadeEffect 0.5s forwards';
//       led.style.backgroundColor = 'var(--led-color)';
//     }, index * 100); // Delay each LED by 100ms
//   });
// }

function mixLight() {
var leds = document.querySelectorAll('.led');
var colors = ['white', 'blue', 'green', 'yellow']; // Colors for different rounds
var round = 0; // Current round

function animateRound() {
leds.forEach((led, index) => {
  led.style.animation = ''; // Reset animation
  setTimeout(() => {
    led.style.animation = 'fadeEffect 0.3s forwards';
    led.style.backgroundColor = colors[round]; // Use current round color
  }, index * 30); // Delay each LED by 30ms (faster speed)
});

// Move to next round
round = (round + 1) % colors.length;

// Repeat animation after current round completes
setTimeout(animateRound, leds.length * 30 + 500); // 500ms gap between rounds
}

// Start the first round
animateRound();
}

// Function for All-Mix (Random Colors)
function allMix() {
var leds = document.querySelectorAll('.led');
var colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan', 'magenta', 'pink', 'white'];
leds.forEach((led) => {
led.style.animation = 'blinkEffect 1s infinite';
led.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
});
}

// Initialize LEDs when DOM is ready
createLEDs();
setAnimation('blink'); // Set default animation to blink
