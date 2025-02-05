const normalizeMovie = (movie) => ({
  ...movie,
  year: Number(movie.year),
  price: Number(movie.price),
});

export { normalizeMovie };
