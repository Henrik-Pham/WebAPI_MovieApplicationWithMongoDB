import { Link, Route, Routes } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

export const MoviesContext = React.createContext({
  postNewMovie: (movie) => {},
});

function FrontPage() {
  return (
    <ul>
      <li>
        <Link to={"/movies"}>List movies</Link>
      </li>
      <li>
        <Link to={"/movies/new"}>Add a movie</Link>
      </li>
    </ul>
  );
}

function MovieEntry({ movie }) {
  return (
    <>
      <h3>
        {movie.title} ({movie.year} Meta critic score: {movie.metacritic})
      </h3>
      <p>{movie.plot}</p>
    </>
  );
}

function MoviesList({ fetchMovies }) {
  const [movies, setMovies] = useState([]);

  async function loadMovies() {
    setMovies(await fetchMovies());
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <h2>Listing of all movies</h2>
      {movies.map((m) => (
        <React.Fragment key={m.id}>
          <div>{m.title}</div>
          <MovieEntry movie={m} />
        </React.Fragment>
      ))}
    </>
  );
}

function AddMovieForm() {
  const { postNewMovie } = useContext(MoviesContext);
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    postNewMovie({ title });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add movie</h2>
      <div>
        <label>
          Title <br />
          <input
            autoFocus={true}
            name={"title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <button>Submit</button>
    </form>
  );
}

function MoviesRoutes({ fetchMovies }) {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route
        path={"/movies"}
        element={<MoviesList fetchMovies={fetchMovies} />}
      />
      <Route path={"/movies/new"} element={<AddMovieForm />} />
      <Route path={"*"} element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export function MoviesApplication({ fetchMovies }) {
  return (
    <>
      <header>
        <h1>Kristiania movies</h1>
      </header>
      <nav>
        <Link to={"/"}>Front page</Link>
      </nav>
      <main>
        <MoviesRoutes fetchMovies={fetchMovies} />
      </main>
      <footer>By Johannes Brodwall with 💚</footer>
    </>
  );
}
