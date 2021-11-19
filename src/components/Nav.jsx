import React, { useState, useEffect } from "react";
import "./Nav.css";
function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => window.removeEventListener("scroll");
  }, []);
  return (
    <div className={`Nav ${show && "Nav_Black"}`}>
      <img
        src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
        alt="netflix"
        className="Nav_Logo"
      />
    </div>
  );
}

export default Nav;
