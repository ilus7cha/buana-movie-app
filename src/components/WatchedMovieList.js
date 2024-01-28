import React from 'react';
import WatchedMovieItem from './WatchedMovieItem';
import './styles/WatchedMovieList.css';

const WatchedMovieList = ({ watchedMovies, onRemoveFromWatched }) => {
  return (
    <div>
      <h2>Watched Movies</h2>
      <div className="movie-list">
        {watchedMovies.map((movie) => (
          <WatchedMovieItem
            key={movie.id}
            movie={movie}
            onRemoveFromWatched={onRemoveFromWatched}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchedMovieList;