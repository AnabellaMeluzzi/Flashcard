
const learnButton = document.getElementById('learn-btn'); 
//const addButton = document.getElementById('add-btn'); 

const popupForm = document.getElementById('popup-form'); 


function learnBtn() {
    window.location.href = 'flashcards.html';
}

function addButton() {
    popupForm.classList.remove('hidden');
}


function closePopup() {
    popupForm.classList.add('hidden');
}

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
            flashcards.push({ concept, definition }); 
            saveFlashcardsToStorage(); 
            flashcardForm.reset(); 
            popupForm.classList.add('hidden'); 
        } else {
            // Show an alert if fields are empty
            alertify.error("All fields are required!");
        }
    });
}

function saveFlashcardsToStorage() {
    sessionStorage.setItem('flashcards', JSON.stringify(flashcards));
}


let flashcards = [
    { concept: "JAVASCRIPT", definition: "A programming language that enables interactivity and dynamism on web pages, such as buttons, animations, and form validation." },
    { concept: "HTML", definition: "A markup language used to structure the content of webpages with elements like headings, paragraphs, images, and links." },
    { concept: "CSS", definition: "A styling language that defines how the elements of a webpage look, including colors, fonts, layout, and formatting." },
];

let currentIndex = 0;

const cardConcept = document.getElementById("card_concept");
const cardDefinition = document.getElementById("card_definition");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const card = document.querySelector('.card_inner');


if (card) {

    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });

    
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

    function previousFlashcard() {
        resetCardState(card);
        changeFlashcard(-1);
        currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
        console.log("flashcards,currentIndex ->",flashcards,currentIndex)
        showFlashcard(currentIndex);
    }

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

   
    shuffle(flashcards);
    showFlashcard(currentIndex);

    // prevBtn.addEventListener('click', previousFlashcard);
    // nextBtn.addEventListener('click', nextFlashcard);


    function exportFlashcards() {
          const jsonData = JSON.stringify(flashcards, null, 2);
    
          const blob = new Blob([jsonData], { type: 'application/json' });

          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'flashcards.json'; 
          link.click();
  
 
          URL.revokeObjectURL(link.href);
    }

    document.getElementById('export-btn').addEventListener('click', exportFlashcards);
    document.getElementById('back-btn').addEventListener('click', backBtn);

    function backBtn() {
        window.location.href = "index.html";
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
    void card.offsetWidth;
    card.style.transition = '';
}

// Load sessionStorage
// const storedFlashcards = JSON.parse(sessionStorage.getItem('flashcards'));
if (storedFlashcards && card) {
    flashcards = storedFlashcards; 
    console.log("flashcards in  storage", flashcards)
    shuffle(flashcards);
    showFlashcard(currentIndex);
}




    