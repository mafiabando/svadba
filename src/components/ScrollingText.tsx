  import React from 'react';
  import '../styles/scrolling-text.css'; // Импортируем CSS файл

  const ScrollingText: React.FC = () => {
    const text = " " + "Она сказала - ДА!" + " "; // Ваш текст

    const repeatCount = 100; // Количество повторений текста

    return (
      <div className="scrolling-container">
        <div className="scrolling-text">
          {text.repeat(repeatCount)} {/* Дублируем текст */}
        </div>
      </div>
    );
  };

  export default ScrollingText;
