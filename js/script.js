// script.js
// Weekly Assignment No. 6


// Define a class
class PlayingCard {
    // Set the values to be input
    constructor(element, face, suit) {

        this.element = element;
        this.suit = suit;
        this.face = face;
        this.img = `img/${face}_of_${suit}.png`;
        this.state = 0;

        this.element.addEventListener('click', () => {
            if (this.state === 1) {
                // Change the card's face
                this.element.src = 'img/back.png';
                // Set the state back so if clicked again it'll "flip over"
                this.state = 0;
            } else {
                this.element.src = `img/${face}_of_${suit}.png`;
                this.state = 1;
            }
        })
    }

    showFaces() {
        this.element.src = this.img
    }

    showBacks() {
        this.element.src = 'img/back.png'
    }
}

function createCardImage() {
    const img = document.createElement('img');
    img.src = 'img/back.png';
    return img;
}

function displayDeck() {
    deck.forEach((card) => {
        // Add card to display
        container.appendChild(card.element);
    })
}

function shuffleDeck() {
    // Shuffle the deck 1,000 times
    for (let i = 0; i < 1000; i++) {
        deck.sort(() => Math.random() - 0.5)
    }
}

function removeCard() {
    // Make sure there are cards in the deck to remove
    if (deck.length != 0) {
        // Assign variable, remove the card, then move the first instance of it and also remove the card from the deck array
        card = document.querySelector('img')
        card.remove()
        deck.shift()
        // Notify the user that the deck no longer has any cards
        if (deck.length == 0) {
            actions.innerHTML = 'No cards left in the deck. :-('
        }
    } else {
        // Tell the user that there are no cards left instead of saying a card was removed when there wasn't
        actions.innerHTML = 'No cards left in the deck. :-('
    }
}

function buildDeck() {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs']
    const faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

    suits.forEach(suit => {
        faces.forEach(face => {
            // Set make the element for the card
            const image = createCardImage();

            // Assign an ID to the element
            image.id = `${face}_of_${suit}.png`;

            // Create the new card and add it to the deck
            deck.push(new PlayingCard(image, face, suit));

        })
    })
}

function clearActions() {
    actions.innerHTML = ''
}

// Assign variables for later use
let deck = []

const container = document.querySelector('#container')
const actions = document.querySelector('#actions')
const shuffleBtn = document.querySelector('#shuffle')
const removeBtn = document.querySelector('#remove')
const newDeckBtn = document.querySelector('#newdeck')
const showFacesBtn = document.querySelector('#showfaces')
const showBacksBtn = document.querySelector('#showbacks')

// Make the different buttons do what they say when clicked
shuffleBtn.addEventListener('click', () => {
    // Notify the user that the deck has been shuffled
    actions.innerHTML = 'The deck of cards has been shuffled.'
    // Clear the display so the deck doesn't just show twice
    container.innerHTML = ''
    shuffleDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

removeBtn.addEventListener('click', () => {
    // Tell them what happened
    actions.innerHTML = 'A card was removed.'
    // Actually remove the card
    removeCard()
    setTimeout(clearActions, 5000)
})

newDeckBtn.addEventListener('click', () => {
    // Set a message to notify the user that the deck was created
    actions.innerHTML = 'A new deck of cards has been created.'
    // Clear out the deck
    deck = []
    // Clear the display of the old cards
    container.innerHTML = ''
    // Build the deck with delays to show the user that a deck is being worked on/made.
    buildDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

// Make it so when you click the button all cards have their state set to the "face"
showFacesBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card faces are now showing.'
    deck.forEach(card => {
        card.showFaces()
    })
    setTimeout(clearActions, 5000)
})

// Make it so when you click the button all cards have their state set to the "back"
showBacksBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card backs are now showing.'
    deck.forEach(card => {
        card.showBacks()
    })
    setTimeout(clearActions, 5000)
})

// As the functions say, on page load make sure you create a new deck, shuffle it, then show it to the user.
buildDeck()
shuffleDeck()
displayDeck()