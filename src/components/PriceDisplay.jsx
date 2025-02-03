import { useContext } from "react";
import { MovieContext } from "../Data/MovieContext";

function PriceDisplay() {
  const { selectedSeats, getTotalPrice } = useContext(MovieContext);

  const count = selectedSeats.length;
  const total = getTotalPrice();

  return (
    <p className="text">
      You have selected <span id="count">{count}</span> seats 
      for a price of $<span id="total">{total}</span>
    </p>
  );
}

export default PriceDisplay;
