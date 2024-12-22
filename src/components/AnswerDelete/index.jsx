import { deleteAnswer } from 'api/answers';
import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AnswerDelete = ({ answerId, onAnswerDeleted }) => {
  AnswerDelete.propTypes = {
    answerId: PropTypes.number.isRequired,
    onAnswerDeleted: PropTypes.func.isRequired,
  };

  const [isDeleting, setIsDeleting] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAnswerDelete = async () => {
    // setIsDeleting(true);
    // setError(null);

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
