const video = document.getElementById('video-feed');
const captureButton = document.getElementById('capture-button');
const canvas = document.getElementById('canvas');
const textSound = document.getElementById('text-sound');
const constraints = { video: true };

// Access the webcam and stream the video feed
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
    } catch (err) {
        console.error('Error accessing webcam:', err);
    }
}

// Capture the image from the video feed
function captureImage() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Optionally, you can convert the image to a data URL and use it
    const imageDataURL = canvas.toDataURL('image/png');
    console.log('Image captured:', imageDataURL);
}

// Initialize the webcam when the page loads
window.onload = () => {
    initCamera();
};

// Add click event listener to the capture button
captureButton.addEventListener('click', captureImage);

// Text array for the typewriter effect
const textArray = [
    { text: "Don't forget to smile :)", speed: 50 } // Speed for the line
];

let index = 0;
let charIndex = 0;
const textElement = document.getElementById("typewriter-text");

document.addEventListener("DOMContentLoaded", () => {
    type(); // Start typing animation
});

// Function to start the typing animation
function type() {
    let totalAnimationDuration = calculateAnimationDuration();

    function typeNextChar() {
        if (index < textArray.length) {
            const currentLine = textArray[index].text;
            const speed = textArray[index].speed;

            if (charIndex === 0 && index !== 0) {
                // Start of a new line, so add line breaks if needed
                textElement.innerHTML += "<br><br>";
                textSound.play(); // Play sound when starting a new line
            }

            if (charIndex < currentLine.length) {
                textElement.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, speed);
            } else {
                // Move to the next line
                index++;
                charIndex = 0;
                // No need to pause before typing the next line since this is the only line
            }
        }
    }

    typeNextChar();
}

// Function to calculate the total animation duration
function calculateAnimationDuration() {
    let totalDuration = 0;
    for (let i = 0; i < textArray.length; i++) {
        totalDuration += textArray[i].text.length * textArray[i].speed;
    }
    return totalDuration;
}

// Function to take photo and play camera shutter when capture button is clicked
document.getElementById("capture-button").addEventListener("click", function() {
    var video = document.getElementById('video-feed');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // Hide the text element
    document.getElementById("typewriter-text").style.display = "none";

    // Set canvas size to match video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current frame from video onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Show the canvas (hide the video feed)
    canvas.style.display = 'block';
    video.style.display = 'none';

    // Hide the capture button
    document.getElementById('capture-button').style.display = 'none';

    // Play the capture sound
    var audio = new Audio('camera_shutter_sound.mp3');
    audio.play();

    // Store the captured image in local storage
    var imageDataURL = canvas.toDataURL('image/png');
    localStorage.setItem('capturedImage', imageDataURL);    

    // Redirect to another page after 3 seconds (3000 milliseconds)
        setTimeout(function() {
            window.location.href = 'loading_page.html';
    }, 3000);            
});
