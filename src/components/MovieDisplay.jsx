import PropTypes from "prop-types";

const MovieDisplay = ({ movies, selectedMovieId, onMovieSelect }) => {
  const handleChange = (e) => {
    const movieId = Number(e.target.value);
    onMovieSelect(movieId);
  };

  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie:</label>
      <select id="movie" onChange={handleChange} value={selectedMovieId ?? ""}>
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
  movies: PropTypes.array.isRequired,
  selectedMovieId: PropTypes.number,
  onMovieSelect: PropTypes.func.isRequired,
};

export default MovieDisplay;
