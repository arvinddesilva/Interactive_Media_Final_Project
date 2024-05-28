let video;
let poseNet;
let poses = [];
let previousNoseY = null;
let previousNoseX = null;
let img;
let imgIndex = 0;
let images = [];
let lastActionTime = 0;
const debounceDelay = 1000; // Adjust this delay as needed (in milliseconds)
let flashColor = null;
let flashStartTime = 0;
const flashDuration = 400; // Duration of the flash in milliseconds
let fadeAlpha = 0;

function preload() {
  // Load your AI-generated images
  for (let i = 1; i <= 10; i++) {
    let imagePath = 'ai_images/image' + i + '.png';  // Update this path
    let loadedImage = loadImage(imagePath);
    images.push(loadedImage);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth / 2, windowHeight);
  video.hide();

  // Initialize PoseNet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  // Load the first image
  img = images[imgIndex];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth / 2, windowHeight);
}

function modelLoaded() {
  console.log('PoseNet model loaded');
}

function draw() {
  // Draw the mirrored video feed on the left half of the screen
  push();
  translate(windowWidth / 2, 0);
  scale(-1, 1); // Flip horizontally
  image(video, 0, 0, windowWidth / 2, windowHeight);
  pop();

  // Draw the image on the right half of the screen
  displayImage();

  // Flash the right side of the screen if flashColor is set and flash duration has not elapsed
  if (flashColor && millis() - flashStartTime < flashDuration) {
    fill(flashColor);
    rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
  } else {
    flashColor = null; // Reset the flash color after the flash duration
  }

  // Fade to black if user has interacted with the last image
  if (imgIndex >= images.length) {
    if (fadeAlpha < 255) {
      fadeAlpha += 2; // Adjust fade speed as needed
    } else {
      // Fully faded to black, navigate to another page
      window.location.href = 'loading_page2.html'; // Change 'next_page.html' to the URL of the next page
    }
    fill(0, fadeAlpha);
    rect(0, 0, windowWidth, windowHeight);
  }

  // Process pose detection for image matching or rejection
  if (poses.length > 0) {
    let nose = poses[0].pose.keypoints.find(point => point.part === 'nose');
    if (nose.score > 0.5) {
      if (previousNoseY !== null && previousNoseX !== null) {
        let dy = nose.position.y - previousNoseY;
        let dx = nose.position.x - previousNoseX;

        if (dy > 10 || dy < -10) {
          if (millis() - lastActionTime > debounceDelay) {
            matchImage();  // Head nodded up or down
            lastActionTime = millis();
          }
        }

        if (dx > 10 || dx < -10) {
          if (millis() - lastActionTime > debounceDelay) {
            rejectImage();  // Head swiped left or right
            lastActionTime = millis();
          }
        }
      }

      previousNoseY = nose.position.y;
      previousNoseX = nose.position.x;
    }
  }
}


function displayImage() {
  if (img) {
    // Display the image to fill the entire right half of the screen
    image(img, windowWidth / 2, 0, windowWidth / 2, windowHeight);
  }
}

function matchImage() {
  console.log("Image matched");
  flashScreen(color(0, 255, 0)); // Flash green
  loadImageAtIndex(++imgIndex);
}

function rejectImage() {
  console.log("Image rejected");
  flashScreen(color(255, 0, 0)); // Flash red
  loadImageAtIndex(++imgIndex);
}

function loadImageAtIndex(index) {
  if (index < images.length) {
    img = images[index];
  } else {
    console.log("No more images to display");
    img = null;
  }
}

function flashScreen(flashCol) {
  flashColor = flashCol;
  flashStartTime = millis();
}


