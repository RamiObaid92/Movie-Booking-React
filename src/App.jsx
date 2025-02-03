import { MovieProvider } from "./Data/MovieContext";
import MovieDisplay from "./components/MovieDisplay";
import PriceDisplay from "./components/PriceDisplay";
import SeatDisplay from "./components/SeatDisplay";
import Showcase from "./components/Showcase";

function App() {

  return (
    <>
    <MovieProvider>
      <MovieDisplay/>
      <Showcase />
      <SeatDisplay/>
      <PriceDisplay />
    </MovieProvider>
    </>
  );
}

export default App;
