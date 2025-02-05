import { useContext, useState } from "react";
import * as Yup from "yup";
import { MovieContext } from "../Data/MovieContext";
import { addBooking } from "../Data/CRUD";
import { Field, Form, Formik } from "formik";

const BookingModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedSeats, selectedMovieId, setSelectedSeats, getTotalPrice } =
    useContext(MovieContext);

  const BookingSchema = Yup.object().shape({
    name: Yup.string().required("First name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone-number must be 10 digits")
      .required("Phone-number is required"),
  });

  const closeModal = () => setIsModalOpen(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <>
      <button
        type="button"
        className="modal-button"
        onClick={() => setIsModalOpen(true)}
        disabled={selectedSeats.length === 0}
      >
        Book Seats
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Book Your Seats</h2>

            <Formik
              initialValues={{ name: "", phone: "" }}
              validationSchema={BookingSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={async (values, { resetForm }) => {
                const formattforedPhone = formatPhoneNumber(values.phone);
                const capitalizedName = capitalizeFirstLetter(values.name);
                const newBooking = {
                  name: capitalizedName,
                  phone: formattforedPhone,
                  movieid: selectedMovieId,
                  seat: selectedSeats,
                };

                await addBooking(newBooking);

                setSelectedSeats([]);
                resetForm();
                closeModal();
              }}
            >
              {({ errors, submitCount }) => (
                <Form>
                  <div className="error-tooltip">
                    <Field
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      autoComplete="off"
                    />
                    {submitCount > 0 && errors.name && (
                      <div className="tooltip">{errors.name}</div>
                    )}
                  </div>

                  <div className="error-tooltip">
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="Your Phone number"
                      autoComplete="off"
                    />
                    {submitCount > 0 && errors.phone && (
                      <div className="tooltip">{errors.phone}</div>
                    )}
                  </div>

                  <p className="text">
                    Total Price: $<span>{getTotalPrice()}</span>
                  </p>

                  <div className="button-row">
                    <button type="submit">Book</button>
                    <button type="button" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;
