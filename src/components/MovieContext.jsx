import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMovies } from "../Data/CRUD";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
  
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

    const handleMovieSelect = useCallback((movieId) => {
        setSelectedMovieId(movieId);
      }, []);

      const contextValue = {
        movies,
        selectedMovieId,
        setSelectedMovieId: handleMovieSelect,
      };

      return (
        <MovieContext.Provider value={contextValue}>
          {children}
        </MovieContext.Provider>
      );
}

MovieProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export { MovieProvider, MovieContext }