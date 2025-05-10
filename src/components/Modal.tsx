import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = ''; // Возвращаем прокрутку
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Затемненный фон */}
      <div className='overlay' onClick={onClose} />
      
      {/* Само модальное окно */}
      <div className='modalContent'>
        {/* Кнопка закрытия */}
        <button 
          className="closeButton"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        
        {/* Содержимое модального окна */}
        {children}
      </div>
    </>,
    document.getElementById('modal-root')! // Корневой элемент для модального окна
  );
};

export default Modal;