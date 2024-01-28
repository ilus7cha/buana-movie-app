import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import WatchedMovieList from "./components/WatchedMovieList";
import OfflineIndicator from "./components/OfflineIndicator";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://backendexample.sanbersy.com/api/movies"
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const markAsWatched = async (movieId) => {
    try {
      if (!watchedMovies.some((movie) => movie.id === movieId)) {
        await axios.put(`https://backendexample.sanbersy.com/api/movies/${movieId}`, {
          watched: true,
        });

        const updatedMovies = movies.map((movie) =>
          movie.id === movieId ? { ...movie, watched: true } : movie
        );
        setMovies(updatedMovies);

        setWatchedMovies([...watchedMovies, movies.find((movie) => movie.id === movieId)]);
      } else {
        window.alert('Movie is already in Watched Movies list.');
      }
    } catch (error) {
      console.error('Error marking as watched:', error);
    }
  };

  const removeFromWatched = async (movieId) => {
    try {
      await axios.put(
        `https://backendexample.sanbersy.com/api/movies/${movieId}`,
        {
          watched: false,
        }
      );

      const updatedMovies = movies.map((movie) =>
        movie.id === movieId ? { ...movie, watched: false } : movie
      );
      setMovies(updatedMovies);

      const updatedWatchedMovies = watchedMovies.filter(
        (movie) => movie.id !== movieId
      );
      setWatchedMovies(updatedWatchedMovies);
    } catch (error) {
      console.error("Error removing from watched:", error);
    }
  };

  const syncDataWithServer = useCallback(async () => {
    try {
      await axios.put("https://backendexample.sanbersy.com/api/movies", {
        watchedMovies: watchedMovies.map((movie) => ({
          id: movie.id,
          watched: true,
        })),
      });
    } catch (error) {
      console.error("Error syncing data with server:", error);
    }
  }, [watchedMovies]);

  const handleOnline = useCallback(() => {
    setIsOffline(false);
    syncDataWithServer();
  }, [syncDataWithServer]);

  const handleOffline = useCallback(() => {
    setIsOffline(true);
  }, []);

  useEffect(() => {
    fetchMovies();

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return (
    <div className="app-container">
      <OfflineIndicator isOffline={isOffline} />
      <MovieList movies={movies} onMarkAsWatched={markAsWatched} />
      <WatchedMovieList
        watchedMovies={watchedMovies}
        onRemoveFromWatched={removeFromWatched}
        isWatchedPage={true}
      />
    </div>
  );
};

export default App;
