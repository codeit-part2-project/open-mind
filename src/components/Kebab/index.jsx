import PropTypes from 'prop-types';
import kebab from 'assets/images/icons/ic_Kebab.svg';
import { ReactComponent as Rejection } from 'assets/images/icons/ic_Rejection.svg';
import { ReactComponent as Edit } from 'assets/images/icons/ic_Edit.svg';
import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';
import { useEffect, useRef } from 'react';

const Kebab = ({ id, isAnswer, isKebabOpen, onKebabClick }) => {
  Kebab.propTypes = {
    isAnswer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      questionId: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
    id: PropTypes.number.isRequired,
    isKebabOpen: PropTypes.bool.isRequired,
    onKebabClick: PropTypes.func.isRequired,
  };

  const menuRef = useRef(null);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    onKebabClick(id);
  };

  const handleMenuItemClick = () => {
    onKebabClick(id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onKebabClick(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id, onKebabClick]);

  // () => onKebabClick(id)

  return (
    <div ref={menuRef} className='relative flex items-center'>
      <button type='button' onClick={handleMenuToggle}>
        <img src={kebab} alt='kebab' className='w-[26px] h-[26px]' />
      </button>
      {isKebabOpen && (
        <menu className='absolute top-[26px] end-0 w-[103px] py-1 bg-gray-10 text-sm/[18px] font-medium border border-gray-30 rounded-lg shadow-2pt'>
          {!isAnswer ? (
            <>
              <div className='flex justify-center items-center rounded-lg'>
                <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20' onClick={handleMenuItemClick}>
                  <Rejection className='w-3.5 h-3.5 fill-current' />
                  <p>답변거절</p>
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20' onClick={handleMenuItemClick}>
                  <Close className='w-3.5 h-3.5 fill-current' />
                  <p>질문삭제</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='flex justify-center items-center'>
                <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20' onClick={handleMenuItemClick}>
                  <Edit className='w-3.5 h-3.5 fill-current' />
                  <p>수정하기</p>
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20' onClick={handleMenuItemClick}>
                  <Close className='w-3.5 h-3.5 fill-current' />
                  <p>질문삭제</p>
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20' onClick={handleMenuItemClick}>
                  <Close className='w-3.5 h-3.5 fill-current' />
                  <p>답변삭제</p>
                </button>
              </div>
            </>
          )}
        </menu>
      )}
    </div>
  );
};
export default Kebab;
