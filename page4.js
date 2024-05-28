const textArray = [
    {text: "Got it?", speed: 200}, // Speed for the first line
];

let index = 0;
let charIndex = 0;
const textElement = document.getElementById("typewriter-text");
const button = document.getElementById("action-button");

document.addEventListener("DOMContentLoaded", () => {
    // Delay the start of the typewriter effect by 3 seconds (3000 milliseconds)
    setTimeout(() => {
        type(); // Start typing animation
    }, 2000);
});

function type() {
    button.style.display = "none"; // Hide the button initially

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
    return totalDuration + 1000; // Add an additional 2000ms delay after the typing animation completes
}

function playSoundAndNavigate() {
    // Play the text sound
    const textSound = document.getElementById("text-sound");
    textSound.play();

    // Navigate to a new page after a short delay (e.g., 1000 milliseconds)
    setTimeout(() => {
        window.location.href = "page5.html";
    }, 1000);
}
