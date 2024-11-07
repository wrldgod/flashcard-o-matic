import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck, createCard } from '../../utils/api';
import CardForm from '../CardForm';

function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ front: '', back: '' });

  // Load deck data when the component mounts
  useEffect(() => {
    const loadDeck = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };
    loadDeck();
  }, [deckId]);

  // Handle form input changes
  const handleChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCard(deckId, formData);
      setFormData({ front: '', back: '' }); // Reset form for adding another card
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      {/* Deck title */}
      <h2>{deck.name}: Add Card</h2>

      {/* Use CardForm component */}
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deckId={deckId}
      />
    </div>
  );
}

export default AddCard;