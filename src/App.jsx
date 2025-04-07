import React, { useState, useEffect } from "react";
import nakathData from "./nakathData";
import Navbar from "./components/Navbar.jsx";
import NakathList from "./components/NakathList.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [language, setLanguage] = useState("si");
  const [theme, setTheme] = useState("light");
  const [musicOn, setMusicOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => setLanguage((prev) => (prev === "si" ? "en" : "si"));
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
  };
  const toggleMusic = () => {
    const audio = document.getElementById("festive-audio");
    musicOn ? audio.pause() : audio.play();
    setMusicOn(!musicOn);
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const showReminder = () => {
    if (Notification.permission === "granted") {
      new Notification("🪔 Avurudu Reminder", {
        body: "A nakath event is happening soon!",
      });
    }
  };

  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
    document.body.className = theme;
  }, []);

  const title = {
    si: "අලුත් අවුරුදු නැකෑත්",
    en: "Sinhala Avurudu Rituals",
  };

  return (
    <>
      <Navbar
        toggleLanguage={toggleLanguage}
        toggleTheme={toggleTheme}
        toggleMusic={toggleMusic}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        musicOn={musicOn}
        language={language}
      />
      <div className="container-fluid g-0 px-0">
        <Hero language={language} />
        <NakathList nakathData={nakathData} language={language} showReminder={showReminder} />
      </div>
      <Footer language={language} />
    </>
  );
};

export default App;
