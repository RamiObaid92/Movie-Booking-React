import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import PriceDisplay from "./components/PriceDisplay";
import SeatDisplay from "./components/SeatDisplay";
import Showcase from "./components/Showcase";

function App() {
  return (
    <>
      <MovieDisplay />
      <Showcase />
      <SeatDisplay />
      <PriceDisplay />
    </>
  );
}

export default App;
