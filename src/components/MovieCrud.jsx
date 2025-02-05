import { useState, useContext } from "react";
import { MovieContext } from "../Data/MovieContext";
import { Field, Form, Formik } from "formik";
import { addMovie, updateMovie, deleteMovie } from "../Data/CRUD";
import * as Yup from "yup";
import { normalizeMovie } from "../Data/Util";

const MovieCrud = () => {
  const [adminPanel, setAdminPanel] = useState(false);

  const { movies, setMovies } = useContext(MovieContext);

  const [selectedMovieId, setSelectedMovieId] = useState("");

  const AdminSchema = Yup.object().shape({
    title: Yup.string().required("Movie title is required"),
    year: Yup.number()
      .typeError("Year must be a number")
      .required("Year is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
  });

  const handleSelectChange = (e, setValues) => {
    if (!e.target.value) {
      setSelectedMovieId("");
      setValues({ title: "", year: "", price: "" }, false);
      return;
    }

    const movieId = e.target.value;
    setSelectedMovieId(movieId);

    const foundMovie = movies.find((m) => m.id === movieId);
    if (foundMovie) {
      setValues(
        {
          title: foundMovie.title,
          year: foundMovie.year.toString(),
          price: foundMovie.price.toString(),
        },
        false,
      );
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (!selectedMovieId) {
      const newMovie = {
        title: values.title,
        year: Number(values.year),
        price: Number(values.price),
      };
      const added = await addMovie(newMovie);
      if (added) {
        setMovies((prev) => [...prev, added]);
      }
    } else {
      const updatedMovie = {
        title: values.title,
        year: Number(values.year),
        price: Number(values.price),
      };
      const result = await updateMovie(selectedMovieId, updatedMovie);
      if (result) {
        setMovies((prev) =>
          prev.map((m) =>
            m.id === selectedMovieId ? normalizeMovie(result) : m,
          ),
        );
      }
    }

    resetForm();
    setSelectedMovieId(null);
    setAdminPanel(false);
  };

  const handleDelete = async (resetForm) => {
    if (!selectedMovieId) return;

    const result = await deleteMovie(selectedMovieId);
    if (result) {
      setMovies((prev) => prev.filter((m) => m.id !== selectedMovieId));
    } else {
      console.error("Delete failed");
    }

    resetForm();
    setSelectedMovieId("");
  };

  return (
    <>
      <button
        type="button"
        id="admin-button"
        className="modal-button"
        onClick={() => setAdminPanel(true)}
      >
        Admin Panel
      </button>

      {adminPanel && (
        <div className="modal">
          <div className="modal-content">
            <h2>Admin Panel</h2>

            <Formik
              initialValues={{ title: "", price: "", year: "" }}
              validationSchema={AdminSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
            >
              {({ errors, submitCount, setValues, resetForm }) => (
                <Form>
                  <div>
                    <label htmlFor="filmSelect">
                      Select a film to Edit or Delete
                    </label>
                    <select
                      id="filmSelect"
                      value={selectedMovieId}
                      onChange={(e) => handleSelectChange(e, setValues)}
                    >
                      <option value="">--Add New Movie--</option>
                      {movies.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.title} ({m.year})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="error-tooltip">
                    <label htmlFor="title">Title:</label>
                    <Field id="title" name="title" placeholder="Movie Title" />
                    {submitCount > 0 && errors.title && (
                      <div className="tooltip">{errors.title}</div>
                    )}
                  </div>
                  <div className="error-tooltip">
                    <label htmlFor="year">Year:</label>
                    <Field id="year" name="year" placeholder="Year" />
                    {submitCount > 0 && errors.year && (
                      <div className="tooltip">{errors.year}</div>
                    )}
                  </div>

                  <div className="error-tooltip">
                    <label htmlFor="price">Price:</label>
                    <Field id="price" name="price" placeholder="Price" />
                    {submitCount > 0 && errors.price && (
                      <div className="tooltip">{errors.price}</div>
                    )}
                  </div>

                  <div className="button-row">
                    <button type="submit">
                      {selectedMovieId ? "Update Movie" : "Add Movie"}
                    </button>

                    {selectedMovieId && (
                      <button
                        type="button"
                        onClick={() => handleDelete(resetForm)}
                      >
                        Delete Movie
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setSelectedMovieId("");
                        setAdminPanel(false);
                      }}
                    >
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

export default MovieCrud;
