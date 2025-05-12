import React from 'react';
import "../styles/header.css";

const Header: React.FC = () => {
  return (
    <div className="header">
      <h1 className="title">Приглашение</h1>
      <div className="message">
        <span>save the date</span>
        <span>19.09.2025</span>
      </div>
    </div>
  );
};

export default Header;