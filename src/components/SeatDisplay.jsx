import { useState } from "react";

const SeatDisplay = () => {
  const [seatLayout, setSeatLayout] = useState([
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 0],
  ]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const status = seatLayout[rowIndex][seatIndex];

    if (status === 2) return;

    const newStatus = status === 1 ? 0 : 1;

    const newLayout = seatLayout.map((row, rIdx) =>
      row.map((seatVal, sIdx) => {
        if (rIdx === rowIndex && sIdx === seatIndex) {
          return newStatus;
        }
        return seatVal;
      }),
    );

    setSeatLayout(newLayout);
  };

  return (
    <div className="container">
      <div className="screen"></div>
      {seatLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((status, seatIndex) => {
            let seatClass = "seat";

            if (status === 2) {
              seatClass += " occupied";
            } else if (status === 1) {
              seatClass += " selected";
            }

            return (
              <div
                key={seatIndex}
                className={seatClass}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatDisplay;
