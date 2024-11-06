Flashcard-o-matic
A flashcard application built to help students study online. Teachers can create decks of flashcards for their subjects, and students can use these decks to review and study. This app is developed using React, and includes features like deck creation, editing, studying, and managing flashcards.

Table of Contents
Features
Installation
Usage
Screenshots
Technologies Used
API
Project Structure
Contributing
License
Features
Create and Edit Decks: Teachers can create decks for various subjects and edit them as needed.
Add and Edit Flashcards: Add new flashcards to decks or update existing ones.
Study Mode: Flip through flashcards to study each topic and track progress.
Responsive Design: Works on both desktop and mobile devices.
Installation
To get a local copy of the project up and running, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/flashcard-o-matic.git
cd flashcard-o-matic
Install dependencies:

bash
Copy code
npm install
Start the application:

bash
Copy code
npm start
The app will run on http://localhost:3000.
The API server will run on http://localhost:5000.
Usage
Creating a Deck: Click "Create Deck" on the home page, fill in the deck details, and submit.
Adding Cards: Go to a deck, select "Add Card," and fill in the front and back text for each card.
Studying a Deck: Open a deck, select "Study," and flip through the cards to review.
Editing and Deleting Decks or Cards: Go to the respective deck or card and choose "Edit" or "Delete" as needed.


Technologies Used
React: For building the user interface.
React Router: For managing routing and navigation.
Bootstrap 4: For basic styling.
JSON Server: Mock API for handling data locally.
API
The project uses a mock API (JSON Server) to simulate backend interactions. Here are some key endpoints:

GET /decks: Get a list of all decks.
POST /decks: Create a new deck.
GET /decks/:deckId: Get details of a specific deck (includes cards).
POST /decks/:deckId/cards: Add a new card to a specific deck.
PUT /decks/:deckId: Update a deck.
DELETE /decks/:deckId: Delete a deck.
Note: The API is run locally on http://localhost:5000.

Project Structure
plaintext
Copy code
flashcard-o-matic/
├── src/
│   ├── components/
│   │   ├── Home/
│   │   ├── Deck/
│   │   ├── Study/
│   │   ├── CreateDeck/
│   │   ├── EditDeck/
│   │   └── AddCard/
│   ├── Layout/
│   ├── utils/
│   └── App.js
├── data/
├── public/
└── README.md
Contributing
Contributions are welcome! Please fork the repository and create a pull request for any feature additions or bug fixes.
