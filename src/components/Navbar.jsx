import React from "react";

const Navbar = ({ toggleLanguage, toggleTheme, toggleMusic, musicOn, language }) => {
  const isLight = document.body.classList.contains("light");
  const titles = {
    si: {
      title: "අවුරුදු",
    },
    en: {
      title: "Avurudu",
    },
  };

  return (
    <nav className="navbar navbar-light bg-light shadow-sm py-2 px-2 sticky-top">
      <div className="container-fluid g-0 d-flex justify-content-between align-items-center">
        <span className={`navbar-brand fs-4 ps-2 ${language === "en" && "fw-bold"}`}>
          {language === "si" ? titles.si.title : titles.en.title} 
          {/* <span className="fw-bold">2025</span> */}
          </span>

        <div className="d-flex align-items-center">
          {/* Language Toggle */}
          <button
            className="btn btn-transparent pe-2"
            onClick={toggleLanguage}
            title={language === "si" ? "Switch to English" : "සිංහලට මාරු වන්න"}
          >
            <i className="bi bi-translate fs-5"></i>
          </button>

          {/* Theme Toggle */}
          <button
            className="btn btn-transparent pe-2"
            onClick={toggleTheme}
            title={isLight ? "Enable Dark Mode" : "Enable Light Mode"}
          >
            <i className={`bi ${isLight ? "bi-moon-fill" : "bi-sun-fill"} fs-5`}></i>
          </button>

          {/* Music Toggle */}
          {/* <button
            className="btn btn-transparent"
            onClick={toggleMusic}
            title={musicOn ? "Pause Music" : "Play Music"}
          >
            <i className={`bi ${musicOn ? "bi-pause-circle" : "bi-play-circle"} fs-5`}></i>
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
