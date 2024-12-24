import PropTypes from 'prop-types';
import { useState } from 'react';
import { deleteQuestion } from 'api/questions';
import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';

const QuestionDelete = ({ id, onDeleteQuestion }) => {
  QuestionDelete.propTypes = {
    id: PropTypes.number.isRequired,
    onDeleteQuestion: PropTypes.func.isRequired,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?', ''); // user 확인작업은 confirm으로 임시로 만들었습니다.
    if (userConfirmed) {
      try {
        setIsLoading(true);
        setError(null);

        const response = await deleteQuestion(id);
        if (!response.ok) {
          throw new Error('질문 삭제 중 오류가 발생했습니다.');
        }

        onDeleteQuestion(id);
      } catch (err) {
        setError('질문 삭제 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20' onClick={handleDelete} disabled={isLoading}>
      <Close className='w-3.5 h-3.5 fill-current' />
      질문삭제
    </button>
  );
};

export default QuestionDelete;
