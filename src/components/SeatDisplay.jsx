import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getBookings } from "../Data/CRUD";

const SeatDisplay = ({movieId}) => {
  const seatLayout = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"]
  ];

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {

    if (!movieId) return;

    setSelectedSeats([]);

    const fetchSeats = async () => {
      const seatsData = await getBookings(movieId);
      setBookedSeats(seatsData.map(booking => booking.seat))
    }

    fetchSeats();
  }, [movieId]);

  const handleSeatClick = (seatName) => {
    if (bookedSeats.includes(seatName)) {
      return;
    }
    setSelectedSeats((prev) => {
      if (prev.includes(seatName)) {
        return prev.filter((s) => s !== seatName);
      } else {
        return [...prev, seatName];
      }
    });
  };

  return (
    <div className="container">
      <div className="screen"></div>
      {seatLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((seatName) => {
            let seatClass = "seat";

            if (bookedSeats.includes(seatName)) {
              seatClass += " occupied";
            } else if (selectedSeats.includes(seatName)) {
              seatClass += " selected";
            }

            return (
              <div
                key={seatName}
                className={seatClass}
                onClick={() => handleSeatClick(seatName)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

SeatDisplay.propTypes = {
  movieId: PropTypes.number.isRequired
};

export default SeatDisplay;
