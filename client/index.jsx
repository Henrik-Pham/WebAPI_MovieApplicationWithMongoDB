import React from "react";
import ReactDOM from "react-dom/client";
import { MoviesApplication, MoviesContext } from "./moviesApplication";

import "./application.css";
import { HashRouter } from "react-router-dom";

async function fetchMovies() {
  const res = await fetch("/api/movies");
  return await res.json();
}

async function postNewMovie(newMovie) {
  await fetch("/api/movies", {
    method: "POST",
    body: JSON.stringify(newMovie),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const rootElement = document.getElementById("app");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <HashRouter>
      <MoviesContext.Provider value={{ postNewMovie }}>
        <MoviesApplication fetchMovies={fetchMovies} />
      </MoviesContext.Provider>
    </HashRouter>,
  );
}
