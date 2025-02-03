import { useCallback, useEffect, useState } from "react";
import MovieDisplay from "./components/MovieDisplay";
import PriceDisplay from "./components/PriceDisplay";
import SeatDisplay from "./components/SeatDisplay";
import Showcase from "./components/Showcase";
import { getMovies } from "./Data/CRUD";

function App() {
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

  return (
    <>
      <MovieDisplay
        movies={movies}
        onMovieSelect={handleMovieSelect}
        selectedMovieId={selectedMovieId}
      />
      <Showcase />
      <SeatDisplay movieId={selectedMovieId} />
      <PriceDisplay />
    </>
  );
}

export default App;
