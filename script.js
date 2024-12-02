const storedFlashcards = JSON.parse(sessionStorage.getItem('flashcards'));
// Main Buttons
const learnButton = document.getElementById('learn-btn'); // Button to navigate to the flashcards page
//const addButton = document.getElementById('add-btn'); // Button to open the form for adding flashcards

// Pop-up Form
const popupForm = document.getElementById('popup-form'); // The pop-up form for adding flashcards

// Opens the flashcards page
function learnBtn() {
    window.location.href = 'flashcards.html'; // Update the path if necessary
}

// Displays the pop-up form for adding a flashcard
function addButton() {
    popupForm.classList.remove('hidden');
}

// Closes the pop-up form
function closePopup() {
    popupForm.classList.add('hidden');
}

// Flashcard Form Handling
const flashcardForm = document.getElementById('flashcard-form');
if (flashcardForm) {
    flashcardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const concept = document.getElementById('concept').value.trim();
        const definition = document.getElementById('definition').value.trim();

        if (concept && definition) {
            alertify.success("Flashcard submitted successfully!");
            if(storedFlashcards){
                flashcards= storedFlashcards;
            }
            flashcards.push({ concept, definition }); // Add new flashcard to the array
            saveFlashcardsToStorage(); // Save the updated array to session storage
            flashcardForm.reset(); // Reset the form
            popupForm.classList.add('hidden'); // Hide the pop-up
        } else {
            // Show an alert if fields are empty
            alertify.error("All fields are required!");
        }
    });
}

// Save flashcards to sessionStorage
function saveFlashcardsToStorage() {
    sessionStorage.setItem('flashcards', JSON.stringify(flashcards));
}

// Flashcard Data and DOM Elements
let flashcards = [
    { concept: "JAVASCRIPT", definition: "A programming language that enables interactivity and dynamism on web pages, such as buttons, animations, and form validation." },
    { concept: "HTML", definition: "A markup language used to structure the content of webpages with elements like headings, paragraphs, images, and links." },
    { concept: "CSS", definition: "A styling language that defines how the elements of a webpage look, including colors, fonts, layout, and formatting." },
];

let currentIndex = 0; // Tracks the current flashcard index

const cardConcept = document.getElementById("card_concept");
const cardDefinition = document.getElementById("card_definition");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const card = document.querySelector('.card_inner');


// Flashcard Navigation
if (card) {
    // Toggles card flipping animation
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });

    // Shuffles the flashcards array
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    // Displays the flashcard at the given index
    function showFlashcard(index) {
        if(storedFlashcards){
flashcards=storedFlashcards
        }
console.log("muestra la carta")
        const flashcard = flashcards[index];
        cardConcept.textContent = flashcard.concept;
        cardDefinition.textContent = flashcard.definition;
    }

    // Navigate to the previous flashcard
    function previousFlashcard() {
        resetCardState(card);
        changeFlashcard(-1);
        currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
        console.log("flashcards,currentIndex ->",flashcards,currentIndex)
        showFlashcard(currentIndex);
    }

    // Navigate to the next flashcard
    function nextFlashcard() {
        console.log(123)
        resetCardState(card);
        changeFlashcard(1);
        currentIndex = (currentIndex + 1) % flashcards.length;
        console.log("flashcards,currentIndex ->",flashcards,currentIndex)
        showFlashcard(currentIndex);
    }


    nextBtn.addEventListener("click", nextFlashcard)
    prevBtn.addEventListener("click", previousFlashcard)

    // Load and display flashcards
    shuffle(flashcards);
    showFlashcard(currentIndex);

    // Button Listeners
    // prevBtn.addEventListener('click', previousFlashcard);
    // nextBtn.addEventListener('click', nextFlashcard);

    // Export flashcards as a downloadable file
    function exportFlashcards() {
          const jsonData = JSON.stringify(flashcards, null, 2);
    
          const blob = new Blob([jsonData], { type: 'application/json' });

          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'flashcards.json'; // Nombre del archivo
          link.click();
  
          // Limpiar la URL creada
          URL.revokeObjectURL(link.href);
    }

    document.getElementById('export-btn').addEventListener('click', exportFlashcards);
    document.getElementById('back-btn').addEventListener('click', backBtn);

    // Navigates back to the main page
    function backBtn() {
        window.location.href = "index.html"; // Update the path if necessary
    }
}

// Animates flashcard transitions
function changeFlashcard(direction) {
    const cardAnimation = document.querySelector('.card');
    cardAnimation.classList.add('slide-out');

    setTimeout(() => {
        cardAnimation.classList.remove('slide-out');
        cardAnimation.classList.add('slide-in');

        setTimeout(() => {
            cardAnimation.classList.remove('slide-in');
        }, 200); // Matches the animation duration
    }, 200);
}

// Resets the card's state (removes flipping animation)
function resetCardState(card) {
    card.style.transition = 'none';
    card.classList.remove('is-flipped');
    void card.offsetWidth; // Triggers a reflow
    card.style.transition = '';
}

// Load flashcards from sessionStorage
// const storedFlashcards = JSON.parse(sessionStorage.getItem('flashcards'));
if (storedFlashcards && card) {
    flashcards = storedFlashcards; 
    console.log("flashcards in  storage", flashcards)// Load existing data
    shuffle(flashcards);
    showFlashcard(currentIndex);
}




    