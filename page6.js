const textArray = [
    { text: "Your perfect match is...", speed: 50 }, // Speed for the first line
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
        } else {
            // Typing animation complete
            cycleImages(); // Start cycling through images
        }
    }

    typeNextChar();
}

let fadeAlpha = 0; // Initialize fade alpha
let imagesPlayed = false; // Flag to track if images have played

// Function to cycle through images
function cycleImages() {
    const imageContainer = document.getElementById('imageContainer');
    const images = [
        'ai_images/image1.png',
        'ai_images/image2.png',
        'ai_images/image3.png',
        'ai_images/image4.png',
        'ai_images/image5.png',
        'ai_images/image6.png',
        'ai_images/image7.png',
        'ai_images/image8.png',
        'ai_images/image9.png',
        'ai_images/image10.png',
        // Add paths to all AI-generated images here
    ];

    let currentIndex = 0;

    setInterval(function () {
        const img = new Image();
        img.src = images[currentIndex];
        img.onload = function () {
            imageContainer.innerHTML = ''; // Clear previous image
            imageContainer.appendChild(img);
        };
        currentIndex = (currentIndex + 1) % images.length;
    }, 100); // Adjust interval as needed (in milliseconds)

    // Set a timeout to trigger the fade effect after 5 seconds
    setTimeout(startFadeToBlack, 2000); // Adjust duration as needed
}

// Function to start the fade to black effect
function startFadeToBlack() {
    imagesPlayed = true; // Set flag to true
}

// Function to handle the fade to black effect
function handleFadeToBlack() {
    if (imagesPlayed && fadeAlpha < 255) {
        fadeAlpha += 2; // Adjust fade speed as needed
    } else if (fadeAlpha >= 255) {
        // Fully faded to black, navigate to another page
        window.location.href = 'page7.html'; // Change 'loading_page2.html' to the URL of the next page
    }
    document.body.style.backgroundColor = `rgba(0, 0, 0, ${fadeAlpha / 255})`; // Update background color
}

// Call handleFadeToBlack function continuously in a loop
setInterval(handleFadeToBlack, 16); // Adjust interval as needed (in milliseconds)
