import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getQuestionBySubjectId } from 'api/questions';
import AnswerStatus from 'components/AnswerStatus';
import QuestionContent from 'components/QuestionContent';
import AnswerContent from 'components/AnswerContent';
import CountFavorite from 'components/CountFavorite';
import Kebab from 'components/Kebab';
import questionBoxImg from 'assets/images/img_QuestionBox.svg';

const QnAList = ({ subjectId, name, imageSource, onDeleteQuestion }) => {
  QnAList.propTypes = {
    subjectId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    onDeleteQuestion: PropTypes.func.isRequired,
  };

  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  const location = useLocation();
  const isAnswerPage = location.pathname.startsWith('/post/') && location.pathname.includes('/answer');

  const handleKebabClick = (id) => {
    setVisibleMenuId((prevVisibleMenuId) => (prevVisibleMenuId === id ? null : id));
    // setVisibleMenuId(visibleMenuId === id ? null : id);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestionList((prevQuestions) => prevQuestions.filter((question) => question.id !== questionId));
    onDeleteQuestion(questionId);
  };

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
        <ul className='flex flex-col gap-[16px]'>
          {questionList.map((question) => (
            <li key={question.id} className='mx-[16px] flex flex-col gap-[24px] justify-center rounded-2xl bg-gray-10 p-[24px] shadow-1pt md:gap-[32px]'>
              <div className='flex place-content-between items-center'>
                <AnswerStatus answer={question.answer} />
                {isAnswerPage && (
                  <Kebab id={question.id} isAnswer={question.answer} isKebabOpen={visibleMenuId === question.id} onKebabClick={handleKebabClick} onDeleteQuestion={handleDeleteQuestion} />
                )}
              </div>
              <QuestionContent createdAt={question.createdAt} content={question.content} />
              <AnswerContent answer={question.answer} name={name} imageSource={imageSource} />
              <CountFavorite like={question.like} dislike={question.dislike} />
            </li>
          ))}
        </ul>
      ) : (
        <img src={questionBoxImg} alt='질문 박스 이미지' className='mx-auto mt-[50px] mb-[86px] h-[118px] w-[114px] md:mt-[54px] md:mb-[49px] md:h-[154px] md:w-[150px]' />
      )}
    </div>
  );
};

export default QnAList;
