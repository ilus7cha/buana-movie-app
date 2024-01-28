import React from 'react';
import './styles/WatchedMovieItem.css';

const WatchedMovieItem = ({ movie, onRemoveFromWatched }) => {
  return (
    <div className="movie-item">
      <img src={movie.image_url} alt={movie.title} />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        {/* Add any other details you want to display */}
      </div>
      <button onClick={() => onRemoveFromWatched(movie.id)} className="remove-from-list-button">
        Remove from List
      </button>
    </div>
  );
};

export default WatchedMovieItem;