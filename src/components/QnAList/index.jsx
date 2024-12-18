import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getQuestionBySubjectId } from 'api/questions';
import AnswerStatus from 'components/AnswerStatus';
import QuestionContent from 'components/QuestionContent';
import AnswerContent from 'components/AnswerContent';
import questionBoxImg from 'assets/images/img_QuestionBox.svg';

const QnAList = ({ subjectId, name, imageSource }) => {
  QnAList.propTypes = {
    subjectId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
  };

  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getQuestionBySubjectId(subjectId);
        if (response.results) {
          setQuestionList(response.results);
        } else {
          throw new Error('질문 목록을 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        setError(err.message || '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div>
      {questionList.length > 0 ? (
        <ul>
          {questionList.map((question) => (
            <li key={question.id}>
              <AnswerStatus answer={question.answer} />
              <QuestionContent createdAt={question.createdAt} content={question.content} />
              <AnswerContent answer={question.answer} name={name} imageSource={imageSource} />
            </li>
          ))}
        </ul>
      ) : (
        <img src={questionBoxImg} alt='질문 박스 이미지' />
      )}
    </div>
  );
};

export default QnAList;
