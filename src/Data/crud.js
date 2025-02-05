import axios from "axios";
import { normalizeMovie } from "./Util";

const movie_URL = "http://localhost:5000/movies";
const booking_URL = "http://localhost:5000/bookings";

const getMovies = async () => {
  try {
    const response = await axios.get(movie_URL);
    const movies = response.data.map(normalizeMovie);
    return movies;
  } catch (error) {
    console.error("Error fetching movies", error);
    return [];
  }
};

const getMovie = async (id) => {
  try {
    const response = await axios.get(`${movie_URL}/${id}`);
    const movie = response.data.map(normalizeMovie);
    return movie;
  } catch (error) {
    console.error("Error fetching movie", error);
    return [];
  }
};

const addMovie = async (movieData) => {
  try {
    const response = await axios.post(movie_URL, movieData);
    const added = response.data;
    return normalizeMovie(added)
  } catch (error) {
    console.error("Error adding movie", error);
    return null;
  }
};

const updateMovie = async (id, movieData) => {
  try {
    const response = await axios.put(`${movie_URL}/${id}`, movieData);
    const updated = response.data;
    return normalizeMovie(updated);
  } catch (error) {
    console.error("Error attempting to update movie", error);
    return null;
  }
};

const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${movie_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error attempting to delete movie", error);
    return null;
  }
};

const getBookings = async (movieId) => {
  try {
    const response = await axios.get(`${booking_URL}?movieid=${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking", error);
    return [];
  }
};

const addBooking = async (bookingData) => {
  try {
    const response = await axios.post(booking_URL, bookingData);
    return response.data
  } catch (error) {
    console.error("Error adding booking", error);
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
