import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from '../../utils/api';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const loadDecks = async () => {
      const data = await listDecks();
      setDecks(data);
    };
    loadDecks();
  }, []);

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary mb-2">Create Deck</Link>
      {decks.map((deck) => (
        <div key={deck.id} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <p>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">View</Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">Study</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
