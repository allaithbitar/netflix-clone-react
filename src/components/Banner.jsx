import React, { useEffect, useState } from "react";
import instance from "../requestsHandling/instance";
import requests from "../requestsHandling/requests";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await instance.get(requests.fetchTrending);

      await setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
    } catch (err) {
      console.log(err);
    }
  };
  function truncate(str, max) {
    return str?.length > max ? str.substr(0, max - 1) + "…" : str;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center",
      }}
    >
      <div className="Banner_content">
        <h1 className="Banner_title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="Banner_buttons">
          <button className="Banner_button">Play</button>
          <button className="Banner_button">My list</button>
        </div>
        {/* buttons */}
        <h1 className="Banner_desc">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="Banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;
