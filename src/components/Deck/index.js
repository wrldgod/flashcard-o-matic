import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../../utils/api';

function Deck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const data = await readDeck(deckId);
        setDeck(data);
      } catch (err) {
        setError("Error loading deck data. Please try again.");
      }
    };
    loadDeck();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    const confirmed = window.confirm("Delete this deck?");
    if (confirmed) {
      await deleteDeck(deckId);
      navigate("/");
    }
  };

  const handleDeleteCard = async (cardId) => {
    const confirmed = window.confirm("Delete this card?");
    if (confirmed) {
      await deleteCard(cardId);
      setDeck((currentDeck) => ({
        ...currentDeck,
        cards: currentDeck.cards.filter((card) => card.id !== cardId),
      }));
    }
  };

  return (
    <div>
      {error && <p className="alert alert-danger">{error}</p>}
      <h2>{deck.name || "Deck"}</h2>
      <p>{deck.description || "No description available."}</p>
      <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">Edit</Link>
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
      <button onClick={handleDeleteDeck} className="btn btn-danger">Delete</button>

      <h3>Cards</h3>
      {deck.cards.length ? (
        deck.cards.map((card) => (
          <div key={card.id} className="card mb-2">
            <div className="card-body">
              <p><strong>Front:</strong> {card.front}</p>
              <p><strong>Back:</strong> {card.back}</p>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">Edit</Link>
              <button onClick={() => handleDeleteCard(card.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No cards available in this deck.</p>
      )}
    </div>
  );
}

export default Deck;
