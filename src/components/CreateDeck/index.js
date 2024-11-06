import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createDeck } from '../../utils/api';

function CreateDeck() {
  const navigate = useNavigate(); // Updated from useHistory to useNavigate
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState(null); // State for error handling

  // Handle form input changes
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdDeck = await createDeck(formData);
      navigate(`/decks/${createdDeck.id}`); // Updated from history.push
    } catch (error) {
      setError("An error occurred while creating the deck. Please try again.");
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <div>
      <h2>Create Deck</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <Link to="/" className="btn btn-secondary mr-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;
