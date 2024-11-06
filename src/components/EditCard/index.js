import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api';

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate(); // Updated from useHistory to useNavigate
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ front: '', back: '' });

  useEffect(() => {
    const loadDeckAndCard = async () => {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
      const cardData = await readCard(cardId);
      setFormData({ front: cardData.front, back: cardData.back });
    };
    loadDeckAndCard();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({ ...formData, id: cardId, deckId });
    navigate(`/decks/${deckId}`); // Updated from history.push
  };

  return (
    <div>
      <h2>{deck.name}: Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Front</label>
          <textarea name="front" className="form-control" value={formData.front} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea name="back" className="form-control" value={formData.back} onChange={handleChange} required />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default EditCard;
