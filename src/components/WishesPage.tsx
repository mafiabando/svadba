import React, { useState, useEffect, useRef } from "react";
import "../styles/wishes-page.css"; // Импортируем CSS

const WishesPage: React.FC = () => {
  const [isVisibleDescription, setIsVisibleDescription] = useState(false);
  const [isVisibleText, setIsVisibleTextTop] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const handleScroll = () => {
    if (descriptionRef.current) {
      const rect = descriptionRef.current.getBoundingClientRect();
      // Проверяем, виден ли элемент на экране
      const isInViewport = (
        rect.top < window.innerHeight && 
        rect.bottom > 0
      );
      
      setIsVisibleDescription(isInViewport);
    }

    if (textRef.current) {
      const rectText = textRef.current.getBoundingClientRect();
      const isInViewportTextTop = (
        rectText.top < window.innerHeight && 
        rectText.bottom > 0
      );
      setIsVisibleTextTop(isInViewportTextTop);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Вызываем обработчик один раз при монтировании, чтобы проверить начальное состояние
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="wishes-page">
      <h1 className="wishes-title">Пожелания</h1>
      <p className={`wishes-text wishes-text_top ${isVisibleText ? 'visible' : ''}`}
        ref={textRef}
        style={{ opacity: isVisibleText ? 1 : 0, transition: 'opacity 0.5s ease' }} >
        Если хотите подарить нам ценный и нужный подарок, мы
        будем очень благодарны за вклад в бюджет нашей
        молодой семьи.
      </p>
      <hr className="wishes-line"/>
      <p className={`wishes-text wishes-text_bottom ${isVisibleText ? 'visible' : ''}`}
        ref={textRef}
        style={{ opacity: isVisibleText ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        Приятным комплиментом для нас вместо цветов будет
        бутылочка белого полусухого (сухого), которую мы откроем
        на ближайшем совместном празднике.
      </p>
      <div className="wishes-photo" />
      
      {/* Контейнер для описания */}
      <div
        className="wishes-description_container"
        ref={descriptionRef}
        style={{ opacity: isVisibleDescription ? 1 : 0, transition: 'opacity 0.5s ease' }} // Плавное появление и исчезновение
      >
        <div className="wishes-description_border">
          <span className="wishes-description_text">
            в этом <span className="custom-font"> мире </span> ты всего лишь человек, но для кого-то ты - <span className="custom-font">весь мир</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WishesPage;
