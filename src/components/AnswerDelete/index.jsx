import { deleteAnswer } from 'api/answers';
import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AnswerDelete = ({ id, answerId, onAnswerDeleted, onKebabClick }) => {
  AnswerDelete.propTypes = {
    id: PropTypes.number.isRequired,
    answerId: PropTypes.number.isRequired,
    onAnswerDeleted: PropTypes.func.isRequired,
    onKebabClick: PropTypes.func.isRequired,
  };

  const [isDeleting, setIsDeleting] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAnswerDelete = async () => {
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?', ''); // user 확인작업은 confirm으로 임시로 만들었습니다.
    if (userConfirmed) {
      onKebabClick(id);
      setIsDeleting(true);

      try {
        const response = await deleteAnswer(answerId);
        if (!response.ok) {
          throw new Error('답변 삭제 중 오류가 발생했습니다.');
        }
        onAnswerDeleted(answerId);
      } catch (err) {
        navigate('/');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      type='button'
      className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20'
      disabled={isDeleting}
      onClick={handleAnswerDelete}
    >
      <Close className='w-3.5 h-3.5 fill-current' />
      <p>답변삭제</p>
    </button>
  );
};

export default AnswerDelete;
