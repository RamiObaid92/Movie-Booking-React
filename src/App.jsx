import { MovieProvider } from "./Data/MovieContext";
import BookingModal from "./components/BookingModal";
import MovieCrud from "./components/MovieCrud";
import MovieDisplay from "./components/MovieDisplay";
import PriceDisplay from "./components/PriceDisplay";
import SeatDisplay from "./components/SeatDisplay";
import Showcase from "./components/Showcase";

function App() {
  return (
    <>
      <MovieProvider>
        <MovieDisplay />
        <Showcase />
        <SeatDisplay />
        <PriceDisplay />
        <BookingModal />
        <MovieCrud />
      </MovieProvider>
    </>
  );
}

export default App;
