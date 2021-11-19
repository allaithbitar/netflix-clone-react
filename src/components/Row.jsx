import React, { useState, useEffect } from "react";
import instance from "../requestsHandling/instance";
import Youtube from "react-youtube";

import "../components/Row.css";
import movieTrailer from "movie-trailer";
function Row({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);

  const [trailerURL, setTrailerURL] = useState("");
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const fetchData = async () => {
    try {
      const { data } = await instance.get(fetchURL);

      await setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (movie) => {
    movieTrailer(movie?.name || movie?.title || movie?.id).then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);

      if (trailerURL === null) {
        return setTrailerURL(urlParams.get("v"));
      }
      if (trailerURL === urlParams.get("v")) {
        return setTrailerURL(null);
      }
      if (trailerURL !== urlParams.get("v")) {
        return setTrailerURL(urlParams.get("v"));
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id}
              className="row_poster"
              alt={movie.title}
              src={baseURL + movie.poster_path}
            />
          );
        })}
      </div>
      {trailerURL && (
        <Youtube
          videoId={trailerURL}
          opts={{
            width: "98.6%",
            height: "390px",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }}
        />
      )}
    </div>
  );
}

export default Row;
