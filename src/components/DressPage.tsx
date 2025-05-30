import React, { useState } from "react";
import "../styles/dress-page.css"; // Импортируем CSS

const DressPage: React.FC = () => {
    const images = [
  `url(${process.env.PUBLIC_URL}/1.jpg)`,
  `url(${process.env.PUBLIC_URL}/2.jpg)`,
  `url(${process.env.PUBLIC_URL}/3.jpg)`,
  `url(${process.env.PUBLIC_URL}/4.jpg)`,
  `url(${process.env.PUBLIC_URL}/5.jpg)`,
  `url(${process.env.PUBLIC_URL}/6.jpg)`,
  `url(${process.env.PUBLIC_URL}/7.jpg)`,
  `url(${process.env.PUBLIC_URL}/8.jpg)`
];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    
      const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      };
      
  return (
      <div className="dress-page">
        <h1 className="dress-title">Дресс код</h1>
        <p className="dress-text">
          Мы очень старались сделать праздник красивым и будем рады, если в своих нарядах вы поддержите цветовую гамму нашей свадьбы
        </p>
        <div className="dress-colors">
        <div className="colors">
            <div className="color black"/>
            <div className="color brown"/>
            <div className="color red"/>
        </div>
        <div className='lines'>
        <div className="line-container">
          <div className="color-line" />
        <span className="color-text">черный</span>
           </div>
        <div className="line-container">
        <div className="color-line" />
        <span className="color-text">коричневый</span>
        </div>
        <div className="line-container">
        <div className="color-line" />
        <span className="color-text">красный</span>
        </div>
        </div>

        </div>
        <span className="dress-description">Образы для вдохновения.</span>
        <div className="slider">

          <div className="image" style={{ backgroundImage: images[currentIndex]}}>  
          <button className="dress-page_button prev" onClick={prevImage}>
        <svg className ='arrow arrow_prev' width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 68L60 47L39 26" stroke="black" vector-effect="non-scaling-stroke" ></path></svg>
        </button>
        <button className="dress-page_button next" onClick={nextImage}>
          <svg  className ='arrow arrow_next' width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 68L60 47L39 26" stroke="black" vector-effect="non-scaling-stroke"></path></svg>
          </button>
          </div>
       
          </div>
      </div>
  );
};

export default DressPage;
