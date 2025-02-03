import { useContext } from "react";
import { MovieContext } from "./MovieContext";



function MovieDisplay() {
  const { movies, selectedMovieId, setSelectedMovieId } = useContext(MovieContext);

  const handleChange = (e) => {
    const movieId = Number(e.target.value);
    setSelectedMovieId(movieId);
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
}

export default MovieDisplay;
