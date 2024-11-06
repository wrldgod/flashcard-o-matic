import React from 'react';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Not Found</h2> {/* Adjusted to match test */}
      <p>Oops! The page you are looking for does not exist or has been moved.</p>
      <a href="/" className="btn btn-primary">Go to Homepage</a>
    </div>
  );
}

export default NotFound;
