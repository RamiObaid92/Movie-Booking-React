import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMovies } from "../Data/CRUD";

const MovieDisplay = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
    };

    fetchMovies();
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleChange = (e) => {
    const movieId = e.target.value;
    setSelectedMovie(movieId);
    onMovieSelect(movieId);
  };

  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie:</label>
      <select id="movie" onChange={handleChange} value={selectedMovie || ""}>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title} ({movie.price} kr)
          </option>
        ))}
      </select>
    </div>
  );
};

MovieDisplay.propTypes = {
  onMovieSelect: PropTypes.func.isRequired,
};

export default MovieDisplay;
