import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api';
import CardForm from '../CardForm';

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ front: '', back: '' });

  // Load deck and card data when the component mounts
  useEffect(() => {
    const loadDeckAndCard = async () => {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
      const cardData = await readCard(cardId);
      setFormData({ front: cardData.front, back: cardData.back });
    };
    loadDeckAndCard();
  }, [deckId, cardId]);

  // Handle form input changes
  const handleChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({ ...formData, id: cardId, deckId });
    navigate(`/decks/${deckId}`);
  };

  if (!deck.name) {
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
            Edit Card
          </li>
        </ol>
      </nav>

      {/* Deck title */}
      <h2>{deck.name}: Edit Card</h2>

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

export default EditCard;