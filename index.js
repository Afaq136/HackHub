// TODO: Remove the click event listener that calls addSignature()

// TODO: Query for button with an id "theme-button"
// TODO: Complete the toggleDarkMode function
let themeButton = document.getElementById("theme-button");

// Write your code to manipulate the DOM here
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);
// Adjusted validation form function
// Adjusted validation form function
const validateForm = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    let containsErrors = false;
    let petitionInputs = document.getElementById("sign-petition").elements;

    // Create a person object to store the form data
    let person = {
        name: petitionInputs["name"].value.trim(),
        hometown: petitionInputs["hometown"].value.trim(),
        email: petitionInputs["email"].value.trim()
    };

    // Loop through petition inputs for validation
    for (let input of Object.values(petitionInputs)) {
        if (input.value.length < 2) {
            input.classList.add('error');
            containsErrors = true;
        } else {
            input.classList.remove('error');
        }
    }

    // Check email format after other input validations
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        emailInput.classList.add('error');
        containsErrors = true;
    } else {
        emailInput.classList.remove('error');
    }

    // If there are no errors, add the signature and clear the form
    if (!containsErrors) {
        addSignature(person); // Pass the person object to addSignature function
        document.getElementById("sign-petition").reset(); // Clear the form
    }
};


// Add a click event listener to the sign now button here
const signNowButton = document.getElementById("sign-now-button");
signNowButton.addEventListener("click", validateForm);

// Define the addSignature function to accept a person object as a parameter
const addSignature = (person) => {
    // Create a new paragraph element for the signature
    const signatureElement = document.createElement("p");

    // Construct the signature text with name and hometown from the person object
    const signatureText = `🖊️ ${person.name} from ${person.hometown} supports this.`;

    // Set the text content of the signature element
    signatureElement.textContent = signatureText;

    // Find the signatures section and append the new signature
    const signaturesSection = document.querySelector(".signatures");
    signaturesSection.appendChild(signatureElement);

    // Call toggleModal with the person argument after the user signs the petition
    toggleModal(person);
};

// Define the animation object
let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

// Select all elements with the class 'revealable'
let revealableContainers = document.querySelectorAll('.revealable');

// Define the reveal function
const reveal = () => {
    // Get the height of the window
    let windowHeight = window.innerHeight;

    // Loop through each revealable container
    for (let i = 0; i < revealableContainers.length; i++) {
        // Get the distance from the top of the container to the top of the window
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        // Check if the container should be revealed
        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            // Add the 'active' class to the container
            revealableContainers[i].classList.add('active');
        } else {
            // Remove the 'active' class from the container
            revealableContainers[i].classList.remove('active');
        }
    }
};

// Add the reveal function as a scroll event listener to the window
window.addEventListener('scroll', reveal);

// Query for the reduce motion button
const reduceMotionButton = document.getElementById("reduce-motion-button");

// Define the reduceMotion function
const reduceMotion = () => {
    // Update the animation object with new values
    animation.transitionDuration = '0s'; // Set transition duration to 0s to disable animation

    // Loop through revealable containers and update their style
    for (let i = 0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transition = 'none'; // Disable transition
    }
};

// Add event listener to the reduce motion button
reduceMotionButton.addEventListener("click", reduceMotion);

// Define the toggleModal function
// Define the toggleModal function
const toggleModal = (person) => {
    // Select the modal and modal content elements
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("modal-text-container");

    // Set the display style property of the modal to flex
    modal.style.display = "flex";

    // Personalized message for HackHub project
    const personalizedMessage = `Thanks, ${person.name}! Your support at HackHub is appreciated.`;

    // Display personalized thank you message
    modalContent.textContent = personalizedMessage;

    // Center the modal on the screen
    modal.style.justifyContent = "center"; // Center horizontally
    modal.style.alignItems = "center"; // Center vertically
    modal.style.left = "50%"; // Move to the center horizontally
    modal.style.top = "50%"; // Move to the center vertically
    modal.style.transform = "translate(-50%, -50%)"; // Centering trick

    // Adjust modal size
    modal.style.width = "80%"; // Set width to 80%
    modalContent.style.padding = "15px"; // Add padding to modal content

    // Hide the modal after a few seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 4000); // Adjust the delay time as needed
};