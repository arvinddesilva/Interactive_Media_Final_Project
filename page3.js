const textArray = [
    {text: "The algorithm has found your perfect matches.", speed: 50}, // Speed for the first line
    {text: "Looks like you're popular ;)", speed:50}, // Speed for the second line
    {text: "Click the button below for a tutorial on how to interact with the complex alogrithm.", speed: 50} // Speed for the last line
];

let index = 0;
let charIndex = 0;
const textElement = document.getElementById("typewriter-text");
const containerElement = document.getElementById("container");
const button = document.getElementById("action-button");
const textSound = document.getElementById("text-sound");

document.addEventListener("DOMContentLoaded", () => {
    type(); // Start typing animation
});

function type() {
    const totalAnimationDuration = calculateAnimationDuration();
    button.style.display = "none"; // Hide the button initially

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
            // Typing animation complete, show the button
            setTimeout(() => {
                button.style.display = "inline-block";
            }, 1000);
        }
    }

    typeNextChar();
}

function calculateAnimationDuration() {
    let totalDuration = 0;
    for (let i = 0; i < textArray.length; i++) {
        totalDuration += textArray[i].text.length * textArray[i].speed;
    }
    return totalDuration + 2000; // Add an additional 2000ms delay after the typing animation completes
}

function playSoundAndNavigate() {
    // Play the text sound
    const textSound = document.getElementById("text-sound");
    textSound.play();

    // Navigate to a new page after a short delay (e.g., 1000 milliseconds)
    setTimeout(() => {
        window.location.href = "page4.html";
    }, 1000);
}
