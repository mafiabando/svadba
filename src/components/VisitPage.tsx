import React, { useState, useEffect, useRef } from "react";
import "../styles/visit-page.css";

const VisitPage: React.FC = () => {
  const [animatedDate, setAnimatedDate] = useState({
    day: 0,
    month: 0,
    year: 2000,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dynamicLetterEnd, setDynamicLetterEnd] = useState(10);

  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(hasAnimated);

  // Для анимации букв
  const leftLetterRef = useRef<HTMLDivElement>(null);
  const rightLetterRef = useRef<HTMLDivElement>(null);

  // Функция интерполяции
  const interpolate = (start: number, end: number, progress: number) => {
    return start + (end - start) * progress;
  };

  // Функция для определения LetterEnd по ширине экрана
  const getLetterEnd = () => {
    if (window.innerWidth < 480) return 25;
    if (window.innerWidth < 600) return 20; // мобильные
    if (window.innerWidth < 960) return 15; // планшеты
    return 10; // десктоп
  };

  // Обновление при изменении размера экрана

  useEffect(() => {
    const handleResize = () => {
      setDynamicLetterEnd(getLetterEnd());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Обновляем при монтировании

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обновляем ref при изменении hasAnimated
  useEffect(() => {
    hasAnimatedRef.current = hasAnimated;
  }, [hasAnimated]);

  // Отслеживание прокрутки
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Позиция начала и конца контейнера на странице
      const containerTop = scrollTop + rect.top;

      // Прогресс от начала до конца контейнера
      let progress = (scrollTop - containerTop + rect.height) / rect.height;
      progress = Math.max(0, Math.min(progress, 1));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Интерполяция позиций
  const LetterStart = -100;
  const LetterEnd = dynamicLetterEnd;

  const leftLetterStyle = {
    transform: `translateX(${interpolate(
      -LetterStart,
      LetterEnd,
      scrollProgress
    )}vw)`,
  };

  const rightLetterStyle = {
    transform: `translateX(${interpolate(
      LetterStart,
      -LetterEnd,
      scrollProgress
    )}vw)`,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setHasAnimated(true);
          hasAnimatedRef.current = true;

          const targetDay = 19;
          const targetMonth = 9;
          const targetYear = 2025;

          // Анимация для дня
          const dayInterval = setInterval(() => {
            setAnimatedDate((prev) => {
              if (prev.day < targetDay) {
                return { ...prev, day: prev.day + 1 };
              } else {
                clearInterval(dayInterval);
                return prev;
              }
            });
          }, 52.6);

          // Анимация для месяца
          const monthInterval = setInterval(() => {
            setAnimatedDate((prev) => {
              if (prev.month < targetMonth) {
                return { ...prev, month: prev.month + 1 };
              } else {
                clearInterval(monthInterval);
                return prev;
              }
            });
          }, 111.11);

          // Анимация года
          const yearInterval = setInterval(() => {
            setAnimatedDate((prev) => {
              if (prev.year < targetYear) {
                return { ...prev, year: prev.year + 1 };
              } else {
                clearInterval(yearInterval);
                return prev;
              }
            });
          }, 40);
        }
      },
      { threshold: 0.5 } // Срабатывает, когда 50% элемента видны
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []); // Пустой массив зависимостей, так как используем ref для hasAnimated

  return (
    <div ref={containerRef} className="visit-page">
      <h1 className="top-title">Приглашение</h1>
      <div className="visit-text">
        Мы будем рады разделить с вами радость неповторимого для нас дня – дня
        нашей свадьбы! <br />
        Приглашаем присоединиться к нашему празднику и украсить его своим
        присутствием!
        <br />
        <br />
      </div>
      <div className="box">
        <hr className="visit-line" />
        <div className="date-numbers">
          <span className="day">
            {animatedDate.day < 10 ? `0${animatedDate.day}` : animatedDate.day}
          </span>
          <span className="month">
            {animatedDate.month < 10
              ? `0${animatedDate.month}`
              : animatedDate.month}
          </span>
          <span className="year">{animatedDate.year}</span>
        </div>
        <div className="letter-container">
          <div
            ref={leftLetterRef}
            style={leftLetterStyle}
            className="letter left-letter"
          >
            П
          </div>
          <div
            ref={rightLetterRef}
            style={rightLetterStyle}
            className="letter right-letter"
          >
            В
          </div>
        </div>
        <hr className="visit-line" />
      </div>
      <h2 className="bottom-title">Дорогие гости!</h2>
      <div className="visit-text">
        В какой бы точке мира мы ни оказались, в каких бы шикарных местах ни
        побывали, все самые яркие моменты в жизни для нас создают люди - близкие
        и любимые.
        <br />
        <br />В новой истории нашей молодой семьи мы хотим видеть Вас среди
        гостей. Приглашаем разделить всю важность и радость нашего
        бракосочетания с нами.
      </div>
    </div>
  );
};

export default VisitPage;
