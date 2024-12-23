import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AnswerStatus from 'components/AnswerStatus';
import QuestionContent from 'components/QuestionContent';
import AnswerContent from 'components/AnswerContent';
import CountFavorite from 'components/CountFavorite';
import Kebab from 'components/Kebab';
import questionBoxImg from 'assets/images/img_QuestionBox.svg';
import AnswerEditForm from 'components/AnswerEditForm';

const QnAList = ({ name, imageSource, questionList, setQuestionList, onDeleteQuestion }) => {
  QnAList.propTypes = {
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    questionList: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        like: PropTypes.number.isRequired,
        dislike: PropTypes.number.isRequired,
        answer: PropTypes.objectOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            questionsId: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            isRejected: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
    setQuestionList: PropTypes.func.isRequired,
    onDeleteQuestion: PropTypes.func.isRequired,
  };

  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const location = useLocation();
  const isAnswerPage = location.pathname.startsWith('/post/') && location.pathname.includes('/answer');
  const [editId, setEditId] = useState(null);

  const handleKebabClick = (id) => {
    setVisibleMenuId((prevVisibleMenuId) => (prevVisibleMenuId === id ? null : id));
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestionList((prevQuestions) => prevQuestions.filter((question) => question.id !== questionId));
    onDeleteQuestion(questionId);
  };

  const handleAnswerSubmit = (questionId, answer) => {
    setQuestionList((prevQuestions) => prevQuestions.map((question) => (question.id === questionId ? { ...question, answer } : question)));
  };

  const handleAnswerDeleted = (answerId) => {
    setQuestionList((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.answer && question.answer.id === answerId) {
          return { ...question, answer: null };
        }
        return question;
      }),
    );
  };

  return (
    <div>
      {questionList.length > 0 ? (
        <ul className='flex flex-col gap-[16px]'>
          {questionList.map((question) => (
            <li key={question.id} className='mx-[16px] flex flex-col gap-[24px] justify-center rounded-2xl bg-gray-10 p-[24px] shadow-1pt md:gap-[32px]'>
              <div className='flex place-content-between items-center'>
                <AnswerStatus answer={question.answer} />
                {isAnswerPage && (
                  <Kebab
                    id={question.id}
                    isAnswer={question.answer}
                    isKebabOpen={visibleMenuId === question.id}
                    onKebabClick={handleKebabClick}
                    onClick={handleDeleteQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                    onAnswerDeleted={handleAnswerDeleted}
                    setQuestionList={setQuestionList}
                    setEditId={setEditId}
                    answerId={question.answer ? question.answer.id : null}
                  />
                )}
              </div>
              <QuestionContent
                createdAt={question.createdAt}
                content={question.content || ''} // content가 null일 경우 기본 값 제공
              />
              {question.answer && question.answer.id === editId ? (
                <AnswerEditForm
                  answer={question.answer || { content: '' }} // answer가 없으면 빈 객체를 넘겨줌
                  name={name}
                  imageSource={imageSource}
                  id={question.id}
                  setEditId={setEditId}
                  setQuestionList={setQuestionList}
                />
              ) : (
                <AnswerContent answer={question.answer} name={name} imageSource={imageSource} id={question.id} onAnswerSubmit={handleAnswerSubmit} />
              )}

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
