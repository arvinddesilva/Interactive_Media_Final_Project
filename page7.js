const textArray = [
    { text: "YOU!", speed: 50 }, // Speed for the first line
];

let index = 0;
let charIndex = 0;
const textElement = document.getElementById("typewriter-text");
const containerElement = document.getElementById("container");
const textSound = document.getElementById("text-sound");

document.addEventListener("DOMContentLoaded", () => {
    type(); // Start typing animation
});

function type() {
    let currentCharIndex = 0;
    let totalCharCount = 0;
    for (let i = 0; i < textArray.length; i++) {
        totalCharCount += textArray[i].text.length;
    }

    function typeNextChar() {
        if (index < textArray.length) {
            const currentLine = textArray[index].text;
            const speed = textArray[index].speed;

            if (charIndex === 0 && index !== 0) {
                // Start of a new line, so add line breaks if needed
                textElement.innerHTML += "<br><br>";
            }

            if (charIndex < currentLine.length) {
                textElement.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, speed);
            } else {
                // Move to the next line
                index++;
                charIndex = 0;
                setTimeout(typeNextChar, 2000); // Pause before typing the next line
            }
        } 
    }

    typeNextChar();
}

// Retrieve the captured image data URL from local storage
var imageDataURL = localStorage.getItem('capturedImage');

// Create a new image element
var img = new Image();

// Set the source of the image to the retrieved data URL
img.src = imageDataURL;

// Append the image element to the document body or any other container element on page 7
document.querySelector('.image-container').appendChild(img);

// Add the loaded class to the image when it's fully loaded
img.onload = function() {
    img.classList.add('loaded');
};

document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audio");
    audio.play();
});