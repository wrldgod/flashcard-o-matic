import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api';

function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const deck = await readDeck(deckId);
        setFormData({ name: deck.name, description: deck.description });
      } catch (err) {
        console.error("Error loading deck:", err);
      }
    };
    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck({ ...formData, id: deckId });
    navigate(`/decks/${deckId}`); // Redirect to updated deck
  };

  return (
    <div>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditDeck;
