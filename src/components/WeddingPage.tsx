import React, { useState, useEffect, useRef } from "react";
import "../styles/wedding-page.css";

const WeddingPage: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true); // Статус воспроизведения музыки
  const [scrollPosition, setScrollPosition] = useState(0); // Позиция прокрутки

  const audio = new Audio("/МОСКВА.mp3"); // Путь к файлу музыки
  const imgRef = useRef<HTMLImageElement | null>(null); // Ссылка на изображение

  // Управление музыкой
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Автоматическое воспроизведение музыки при загрузке
  useEffect(() => {
    audio.loop = true; // Воспроизводить бесконечно

    if (isMusicPlaying) {
      audio.play().catch((error) => {
        console.error("Ошибка воспроизведения", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause(); // Остановить музыку при размонтировании компонента
    };
  }, [isMusicPlaying]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const newPosition = window.scrollY; // Используем window.scrollY для отслеживания прокрутки
      setScrollPosition(newPosition);
    };
    console.log(window.screen.availHeight, window.screen.availWidth)
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const translateY = scrollPosition * 0.5; // Анимация скролла
  const transformStyle = `translateY(${translateY}px)`;

  return (
    <>
      <div className="wedding-page">
        {/* Верхний блок */}
        <div className="top-section">
          <h1 className="main-title">Владимир и Полина</h1>
          <h2 className="sub-title">Мы женимся</h2>
          {/* Интерактивная кнопка */}
          <button className="music-control" onClick={toggleMusic}>
            {isMusicPlaying ? (
              <img
                src="/heart.svg"
                alt="heart"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img
                src="/heart2.svg"
                alt="heart2"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <img src="/tap.png" alt="tap" className="tap" />
          </button>
          </div>
          {/* Фотография */}
          <img
            src="/vovan.png"
            alt="Пара"
            className="couple-photo"
            style={{ transform: transformStyle }}
          />
        </div>
    </>
  );
};

export default WeddingPage;
