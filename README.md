# Movie Booking App

A simple movie seat-booking application built with [React](https://react.dev/) and [Vite](https://vitejs.dev/) using JavaScript, ESLint, Axios, json-server and Prettier. This project demonstrates CRUD operations for managing movies and seat bookings, along with a user-friendly interface for selecting seats and calculating prices.

## Features

- **Movie Selection**: Fetch a list of available movies from a REST API.  
- **Seat Selection**: Displays theater seats in rows and lets users select available seats.  
- **Real-Time Price**: Calculates and displays the total price based on the selected seats.  
- **Seat Booking Modal**: Prompts users for their name and phone number before confirming a booking.  
- **Admin Panel**: Allows adding, editing, and deleting movies from the database.

## The project also utilizes:

- **Formik**: for managing forms.
- **Yup**: for form validation.
- **Axios**: for HTTP requests.
- **Proptypes**: for type checking.

## Prerequisites

- [Node.js](https://nodejs.org/)
- NPM or Yarn
- A JSON server (or any RESTful backend) to handle API requests. By default, this app points to `http://localhost:5000` for movies and bookings.

## Installation

1. **Clone this repository**:  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Navigate to the project folder**:  
   ```bash
   cd your-repo-name
   ```
3. **Install dependencies**:  
   ```bash
   npm install
   # or
   yarn
   ```

## Setup the Backend

The code makes requests to:
```
http://localhost:5000/movies
http://localhost:5000/bookings
```
You can use [json-server](https://github.com/typicode/json-server) (or any other REST API) to serve data from a `db.json` file. For example:

1. **Install json-server (if you don't already have it)**:
   ```bash
   npm install json-server
   ```
2. **Create a `db.json` file** in the root or wherever you like:
   ```json
   {
     "movies": [],
     "bookings": []
   }
   ```
3. **Run json-server**:
   ```bash
   json-server --watch db.json --port 5000
   ```
   This will spin up endpoints at `http://localhost:5000/movies` and `http://localhost:5000/bookings`.

Make sure the `movie_URL` and `booking_URL` values in your code match this server URL (in this project, they’re set to `http://localhost:5000/movies` and `http://localhost:5000/bookings`).

## Running the App

Once your backend is running, start the development server:

```bash
npm run dev
# or
yarn dev
```

This will open the app at [http://localhost:5173/](http://localhost:5173/) (or whichever port Vite chooses).

## Usage

1. **Pick a Movie**: Use the dropdown to select one of the available movies (pulled from the backend).  
2. **Select Seats**: Click on any seat not marked “Occupied” to select it. Click again to deselect.  
3. **Price Display**: Shows the number of seats selected and the total price (movie price × number of seats).  
4. **Book Seats**:
   - Click the **Book Seats** button.
   - Fill in your name and a 10-digit phone number.
   - Submit the form to finalize your booking. Occupied seats will be updated in the UI.
5. **Admin Panel**:
   - Click **Admin Panel** to open the admin modal.
   - Select an existing movie to edit or delete, or choose “Add New Movie” to create one.
   - **Update Movie**: Modify title, year, and price, then click **Update Movie**.
   - **Delete Movie**: Remove the selected movie from the database.
   - **Add Movie**: Enter details for a new movie and click **Add Movie**.

## Project Structure

```
├── Data
│   ├── CRUD.js         // All CRUD operations for movies & bookings (axios-based)
│   ├── MovieContext.js // React Context to provide movie data and seat info
│   └── Util.js         // Utility function (normalizeMovie)
├── components
│   ├── BookingModal.jsx  // Booking form and modal
│   ├── MovieCrud.jsx     // Admin panel for CRUD operations
│   ├── MovieDisplay.jsx  // Dropdown for selecting a movie
│   ├── PriceDisplay.jsx  // Displays total seats and total price
│   ├── SeatDisplay.jsx   // Visual layout of the seats
│   └── Showcase.jsx      // Displays the seat color legend
├── App.jsx              // Main app structure, wraps components in MovieProvider
├── index.css            // Core styling for layout
└── main.jsx             // Renders the React app into the DOM
```

## ESLint & Prettier

The project uses ESLint and Prettier for code quality and formatting. Configuration files can be found in the root directory (e.g., `.eslint.config.js`, `.prettierrc`), and the setup ensures consistent styling across the codebase. You can run the linter or formatting commands as follows:

```bash
npm run lint
npm run format
```

## Contributing

Feel free to open issues or submit pull requests if you find bugs or want to suggest improvements. Any feedback is welcome!

---

_Enjoy the Movie Booking App!_