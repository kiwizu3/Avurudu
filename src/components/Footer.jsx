import React from "react";

const Footer = ({ language }) => {
  const year = new Date().getFullYear();
  const content = {
    si: `© ${year} සියලු හිමිකම් ඇවිරිණි.`,
    en: `© ${year} All rights reserved.`,
  };

  return (
    <footer className="text-center py-4 footer mt-5">
      <p className="mb-0">{content[language]} | Powered with ♥️ by <a className="text-decoration-none" href="https://2xdev.com/">2xDev</a></p>
    </footer>
  );
};

export default Footer;
