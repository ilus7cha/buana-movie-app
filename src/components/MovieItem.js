import React from 'react';
import './styles/MovieItem.css';

const MovieItem = ({ movie, onMarkAsWatched }) => {
  return (
    <div className="movie-item">
      <img src={movie.image_url} alt={movie.title} />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <p>{movie.description.substring(0, 150)}...</p>
        <button onClick={() => onMarkAsWatched(movie.id)} className="mark-as-watched-button">
          Mark As Watched
        </button>
      </div>
    </div>
  );
};

export default MovieItem;