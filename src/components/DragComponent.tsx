import React, { useState, useRef, useEffect } from 'react';
import '../styles/drag-component.css'; // подключаем стили

interface DragComponentProps {
  onTargetReached: () => void; // Колбэк для уведомления о достижении цели
}

const DragComponent: React.FC<DragComponentProps> = ({onTargetReached}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [targetReached, setTargetReached] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Добавляем реф для контейнера
  const currentPositionRef = useRef(position); 

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!targetReached) setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!targetReached) setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition = clientX - containerRect.left - 20; // 20 - половина ширины ползунка

    const maxPosition = 281 - 30 - 20; // 30px = половина второго кружка, 20px = половина ползунка

    // Ограничиваем движение ползунка
    if (newPosition >= 0 && newPosition <= maxPosition) {
      setPosition(newPosition);
      currentPositionRef.current = newPosition;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };


  const handleMouseUp = () => {
    setIsDragging(false);

    if (!containerRef.current || !targetRef.current) return; 

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();
    const targetCenter = targetRect.left - containerRect.left + 30; // Центр второго кружка

      // Если ползунок достиг цели
      if (currentPositionRef.current >= targetCenter - 30 && currentPositionRef.current <= targetCenter + 30) {
        setPosition(targetCenter - 20); // Устанавливаем в центр второго кружка
        setTargetReached(true);
        onTargetReached();
      } else setPosition(0)
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    handleMouseUp();
  };

  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpWrapper = () => handleMouseUp();
    const handleTouchMoveWrapper = (e: TouchEvent) => handleTouchMove(e);
    const handleTouchEndWrapper = () => handleTouchEnd();

    window.addEventListener('mousemove', handleMouseMoveWrapper);
    window.addEventListener('mouseup', handleMouseUpWrapper);
    window.addEventListener('touchmove', handleTouchMoveWrapper, { passive: false });
    window.addEventListener('touchend', handleTouchEndWrapper);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWrapper);
      window.removeEventListener('mouseup', handleMouseUpWrapper);
      window.removeEventListener('touchmove', handleTouchMoveWrapper);
      window.removeEventListener('touchend', handleTouchEndWrapper);
    };
  }, [isDragging]);

  return (
    <div className="slider-container" ref={containerRef}>
      <div
        className="drag-area" // Невидимая область перетаскивания
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      <div
        className={`drag-button ${isDragging ? 'dragging' : ''}`}
        style={{ left: position }}
      >
        {'>'}
      </div>
      <div className="drag-line"></div>
      <div className="drag-target" ref={targetRef}></div>
    </div>
  );
};

export default DragComponent;
