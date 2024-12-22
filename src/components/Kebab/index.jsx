import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import QuestionDelete from 'components/QuestionDelete';
import kebab from 'assets/images/icons/ic_Kebab.svg';
import { ReactComponent as Rejection } from 'assets/images/icons/ic_Rejection.svg';
import { ReactComponent as Edit } from 'assets/images/icons/ic_Edit.svg';
import AnswerDelete from 'components/AnswerDelete';

const Kebab = ({ id, isAnswer, isKebabOpen, onKebabClick, onDeleteQuestion, onAnswerDeleted }) => {
  Kebab.propTypes = {
    id: PropTypes.number.isRequired,
    isAnswer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      questionId: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
    isKebabOpen: PropTypes.bool.isRequired,
    onKebabClick: PropTypes.func.isRequired,
    onDeleteQuestion: PropTypes.func.isRequired,
    onAnswerDeleted: PropTypes.func.isRequired,
  };

  const menuRef = useRef(null);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    onKebabClick(id);
  };

  const onDeleteAnswer = () => {
    if (isAnswer) {
      onAnswerDeleted(isAnswer.id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('button')) {
        onKebabClick(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id, onKebabClick]);

  return (
    <div ref={menuRef} className='relative flex items-center'>
      <button type='button' onClick={handleMenuToggle}>
        <img src={kebab} alt='kebab' className='w-[26px] h-[26px]' />
      </button>
      {isKebabOpen && (
        <menu type='button' className='absolute top-[26px] end-0 w-[103px] py-1 bg-gray-10 text-sm/[18px] font-medium border border-gray-30 rounded-lg shadow-2pt'>
          {!isAnswer ? (
            <>
              <div className='flex justify-center items-center rounded-lg'>
                <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20'>
                  <Rejection className='w-3.5 h-3.5 fill-current' />
                  <p>답변거절</p>
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <QuestionDelete id={id} onDeleteQuestion={onDeleteQuestion} />
              </div>
            </>
          ) : (
            <>
              <div className='flex justify-center items-center'>
                <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20'>
                  <Edit className='w-3.5 h-3.5 fill-current' />
                  <p>수정하기</p>
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <QuestionDelete id={id} onDeleteQuestion={onDeleteQuestion} />
              </div>
              <div className='flex justify-center items-center'>
                <AnswerDelete answerId={isAnswer.id} onAnswerDeleted={onDeleteAnswer} />
              </div>
            </>
          )}
        </menu>
      )}
    </div>
  );
};
export default Kebab;
