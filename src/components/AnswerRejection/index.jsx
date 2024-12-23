import PropTypes from 'prop-types';
import { useState } from 'react';
import { postAnswer } from 'api/answers';
import { ReactComponent as Rejection } from 'assets/images/icons/ic_Rejection.svg';

const AnswerRejection = ({ id, setQuestionList }) => {
  AnswerRejection.propTypes = {
    id: PropTypes.number.isRequired,
    setQuestionList: PropTypes.func.isRequired,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRejection = async () => {
    const defaultContent = 'reject';
    try {
      setIsLoading(true);
      setError(null);

      const result = await postAnswer(id, {
        content: defaultContent,
        isRejected: true,
      });

      setQuestionList((prevQuestions) =>
        prevQuestions.map((question) => {
          if (question.id === id) {
            return { ...question, answer: result };
          }
          return question;
        }),
      );
    } catch (err) {
      setError('답변 거절 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <button
      type='button'
      className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20'
      onClick={handleRejection}
      disabled={isLoading}
    >
      <Rejection className='w-3.5 h-3.5 fill-current' />
      답변거절
    </button>
  );
};

export default AnswerRejection;
