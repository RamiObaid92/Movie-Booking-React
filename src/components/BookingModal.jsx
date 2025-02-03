import { useContext, useState } from "react";
import * as Yup from "yup";
import { MovieContext } from "../Data/MovieContext";
import { addBooking } from "../Data/CRUD";



const BookingModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { selectedSeats, selectedMovieId, setSelectedSeats, getTotalPrice } = useContext(MovieContext);

    const BookingSchema = Yup.object().shape({
        name: Yup.string().required("First name is required"),
        Surname: Yup.string().required("Surname is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const closeModal = () => {
        setIsModalOpen(false);
    };

  return (
    <button onClick={() => setIsModalOpen(true)}>Book Seats</button>
  )
}

export default BookingModal