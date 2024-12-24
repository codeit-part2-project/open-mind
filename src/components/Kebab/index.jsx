import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import QuestionDelete from 'components/QuestionDelete';
import AnswerRejection from 'components/AnswerRejection';
import kebab from 'assets/images/icons/ic_Kebab.svg';
import AnswerDelete from 'components/AnswerDelete';
import AnswerEdit from 'components/AnswerEdit';

const Kebab = ({ id, isAnswer, isKebabOpen, onKebabClick, onDeleteQuestion, onAnswerDeleted, setQuestionList, editId, setEditId, answerId }) => {
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
    setQuestionList: PropTypes.func.isRequired,
    editId: PropTypes.number.isRequired,
    setEditId: PropTypes.func.isRequired,
    answerId: PropTypes.number.isRequired,
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
                <AnswerRejection id={id} setQuestionList={setQuestionList} onKebabClick={onKebabClick} />
              </div>
              <div className='flex justify-center items-center'>
                <QuestionDelete id={id} onDeleteQuestion={onDeleteQuestion} />
              </div>
            </>
          ) : (
            <>
              <div className='flex justify-center items-center'>
                <AnswerEdit id={id} editId={editId} setEditId={setEditId} answerId={answerId} onKebabClick={onKebabClick} />
              </div>
              <div className='flex justify-center items-center'>
                <QuestionDelete id={id} onDeleteQuestion={onDeleteQuestion} onKebabClick={onKebabClick} />
              </div>
              <div className='flex justify-center items-center'>
                <AnswerDelete id={id} answerId={isAnswer.id} onAnswerDeleted={onDeleteAnswer} onKebabClick={onKebabClick} />
              </div>
            </>
          )}
        </menu>
      )}
    </div>
  );
};
export default Kebab;
