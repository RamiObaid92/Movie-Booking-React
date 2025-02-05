import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMovies } from "./CRUD";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");

  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
      if (moviesData.length > 0) {
        setSelectedMovieId(moviesData[0].id);
      }
    };

    fetchMovies();
  }, []);

  const getTotalPrice = () => {
    const movie = movies.find((m) => m.id === selectedMovieId);
    if (!movie) return 0;
    return movie.price * selectedSeats.length;
  };

  const contextValue = {
    movies,
    setMovies,
    selectedMovieId,
    setSelectedMovieId,
    selectedSeats,
    setSelectedSeats,
    getTotalPrice,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };
