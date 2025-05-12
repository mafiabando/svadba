import React, { useState, useEffect, useRef } from "react";
import "../styles/wedding-page.css";


const WeddingPage: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true); // Статус воспроизведения музыки
  const [scrollPosition, setScrollPosition] = useState(0); // Позиция прокрутки
  const audio = useRef<HTMLAudioElement | null>(null);

  // Управление музыкой
  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

 // Автоматическое воспроизведение музыки при загрузке
  useEffect(() => {
    audio.current = new Audio("track.mp3"); // Путь к файлу музыки
    audio.current.loop = true; // Воспроизводить бесконечно

    if (isMusicPlaying) {
      audio.current.play().catch((error) => {
        console.error("Ошибка воспроизведения", error);
      });
    } else {
      audio.current.pause();
    }

    return () => {
      audio.current?.pause(); // Остановить музыку при размонтировании компонента
      audio.current = null; // Удалить аудио при размонтировании
    };
  }, []);

  // Эффект для управления состоянием воспроизведения
  useEffect(() => {
    if (isMusicPlaying) {
      audio.current?.play().catch((error) => {
        console.error("Ошибка воспроизведения", error);
      });
    } else {
      audio.current?.pause();
    }
  }, [isMusicPlaying]); // Зависимость от состояния воспроизведения

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const newPosition = window.scrollY; // Используем window.scrollY для отслеживания прокрутки
      setScrollPosition(newPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const translateY = scrollPosition * 0.5; // Анимация скролла
  const transformStyle: React.CSSProperties = { transform: `translateY(${translateY}px)`}
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
                src="heart.svg"
                alt="heart"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img
                src="heart2.svg"
                alt="heart2"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <img src="tap.png" alt="tap" className="tap" />
          </button>
          </div>
          {/* Фотография */}
          <div
          className="couple-photo"
          style={{ ...transformStyle}}
        />
        </div>
    </>
  );
};

export default WeddingPage;
