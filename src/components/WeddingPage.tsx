import React, { useState, useEffect, useRef } from "react";
import "../styles/wedding-page.css";


const WeddingPage: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Статус воспроизведения музыки
  const [scrollPosition, setScrollPosition] = useState(0); // Позиция прокрутки
  const audio = useRef<HTMLAudioElement | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // Флаг для взаимодействия

  // Создаем аудио при монтировании
  useEffect(() => {
    audio.current = new Audio("track.mp3");
    audio.current.loop = true;

    return () => {
      if (audio.current) {
        audio.current.pause();
        audio.current = null;
      }
    };
  }, []);

  // Управление музыкой после взаимодействия
  useEffect(() => {
    if (!audio.current || !hasUserInteracted) return;

    if (isMusicPlaying) {
      audio.current.play().catch((error) => {
        console.error("Ошибка воспроизведения", error);
      });
    } else {
      audio.current.pause();
    }
  }, [isMusicPlaying, hasUserInteracted]);

  // Запуск музыки при первом скролле или касании
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasUserInteracted && audio.current) {
        setHasUserInteracted(true);
        setIsMusicPlaying(true);
        audio.current.play().catch((error) => {
          console.error("Ошибка первого воспроизведения", error);
        });

        // Удаляем обработчики
        window.removeEventListener('wheel', handleFirstInteraction, false );
        window.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Добавляем обработчики для десктопа и мобильных
    window.addEventListener('wheel', handleFirstInteraction, { passive: false });
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('wheel', handleFirstInteraction, false);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Кнопка управления музыкой
  const toggleMusic = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      setIsMusicPlaying(true);
      audio.current?.play().catch(console.error);
    } else {
      setIsMusicPlaying((prev) => !prev);
    }
  };

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
                src={`${process.env.PUBLIC_URL}/heart.svg`}
                alt="heart"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/heart2.svg`}
                alt="heart2"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <img 
            src={`${process.env.PUBLIC_URL}/tap.png`}
            alt="tap" 
            className="tap"
            />
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
