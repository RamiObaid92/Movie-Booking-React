import "./App.css";
import Movieselector from "./components/Movieselector";
import PriceDisplay from "./components/PriceDisplay";
import SeatDisplay from "./components/SeatDisplay";
import Showcase from "./components/Showcase";

function App() {
  return (
    <>
      <Movieselector />
      <Showcase />
      <SeatDisplay />
      <PriceDisplay />
    </>
  );
}

export default App;
