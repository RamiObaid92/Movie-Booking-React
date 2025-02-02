import axios from "axios";

const movie_URL = "http://localhost:5000/movies";
const booking_URL = "http://localhost:5000/bookings";

const getMovies = async () => {
  try {
    const response = await axios.get(movie_URL);
    return response.data;
  } catch (error) {
    console.error("Fel vid inhämtning av filmer", error);
    return [];
  }
};

const getMovie = async (id) => {
  try {
    const response = await axios.get(`${movie_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fel vid inhämtning av film", error);
    return [];
  }
};

const addMovie = async (movieData) => {
  try {
    const response = await axios.post(movie_URL, movieData);
    return response.data;
  } catch (error) {
    console.error("Fel vid tillägning av film", error);
    return null;
  }
};

const updateMovie = async (id, movieData) => {
  try {
    const response = await axios.put(`${movie_URL}/${id}`, movieData);
    return response.data;
  } catch (error) {
    console.error("Fel vid uppdatering av film", error);
    return null;
  }
};

const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${movie_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fel vid radering av film", error);
    return null;
  }
};

const getBookings = async (movieId) => {
  try {
    const response = await axios.get(`${booking_URL}?movieid=${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Fel vid inhämtning av bokningar", error);
    return [];
  }
};

const addBooking = async (bookingData) => {
  try {
    const response = await axios.post(booking_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error("Fel vid tilläggning av bokning", error);
    return null;
  }
};

export {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getBookings,
  addBooking,
};
