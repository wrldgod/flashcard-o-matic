import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { readDeck } from '../../utils/api';

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ cards: [] });
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const data = await readDeck(deckId);
        setDeck(data);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };
    loadDeck();
  }, [deckId]);

  const handleFlip = () => setFlipped(!flipped);

  const handleNext = () => {
    if (currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setFlipped(false);
    } else {
      const restart = window.confirm("Restart cards?");
      if (restart) {
        setCurrentCard(0);
        setFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  if (deck.cards.length < 3) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <h2>Not enough cards</h2>
        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
      </div>
    );
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      <h2>{deck.name}: Study</h2>

      {/* Card display with card counter */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card {currentCard + 1} of {deck.cards.length}</h5>
          <p>{flipped ? deck.cards[currentCard].back : deck.cards[currentCard].front}</p>
          <button onClick={handleFlip} className="btn btn-secondary mr-2">Flip</button>
          {flipped && <button onClick={handleNext} className="btn btn-primary">Next</button>}
        </div>
      </div>
    </div>
  );
}

export default Study;
