import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
      document.body.style.paddingRight = 0;
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className='modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div
        ref={modalRef}
        className='fixed left-1/2 -translate-x-1/2 modal-content p-6 rounded-2xl bg-gray-20 shadow-2pt animate-slide-up-fade-modal'
        role='dialog'
        aria-labelledby='confirm-modal-title'
      >
        <h2 id='confirm-modal-title' className='text-center text-lg font-medium mb-4'>
          {message}
        </h2>
        <div className='flex justify-center gap-4'>
          <button type='button' onClick={onConfirm} className='bg-brown-40 text-white px-5 py-2 rounded-xl transition ease-in-out hover:-translate-y-1 hover:scale-105'>
            확인
          </button>
          <button type='button' onClick={onCancel} className='bg-gray-300 text-black px-5 py-2 rounded-xl transition ease-in-out hover:-translate-y-1 hover:scale-105'>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
