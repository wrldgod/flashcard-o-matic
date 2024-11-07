import React from 'react';
import { Link } from 'react-router-dom';

function CardForm({ formData, handleChange, handleSubmit, deckId }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={formData.front}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={formData.back}
          onChange={handleChange}
          required
        />
      </div>

      {/* Navigation buttons */}
      <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Done</Link>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default CardForm;