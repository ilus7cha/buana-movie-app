import React from 'react';
import MovieItem from './MovieItem';
import './styles/MovieList.css';

const MovieList = ({ movies, onMarkAsWatched }) => {
  return (
    <div>
      <h2>Movie List</h2>
      <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-item">
          <MovieItem movie={movie} onMarkAsWatched={onMarkAsWatched} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default MovieList;