import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>Desarrollado por Estudiante <span className="developer">crissXcoder</span> | © {new Date().getFullYear()} </p>
    </footer>
  );
};

export default Footer;