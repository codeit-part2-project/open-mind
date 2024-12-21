import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AnswerStatus from 'components/AnswerStatus';
import QuestionContent from 'components/QuestionContent';
import AnswerContent from 'components/AnswerContent';
import CountFavorite from 'components/CountFavorite';
import Kebab from 'components/Kebab';
import questionBoxImg from 'assets/images/img_QuestionBox.svg';

const QnAList = ({ name, imageSource, questionList }) => {
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
  };

  const [visibleMenuId, setVisibleMenuId] = useState(null);

  const location = useLocation();
  const isAnswerPage = location.pathname.startsWith('/post/') && location.pathname.includes('/answer');

  const handleKebabClick = (id) => {
    setVisibleMenuId((prevVisibleMenuId) => (prevVisibleMenuId === id ? null : id));
    // setVisibleMenuId(visibleMenuId === id ? null : id);
  };

  return (
    <div>
      {questionList.length > 0 ? (
        <ul className='flex flex-col gap-[16px]'>
          {questionList.map((question) => (
            <li key={question.id} className='mx-[16px] flex flex-col gap-[24px] justify-center rounded-2xl bg-gray-10 p-[24px] shadow-1pt md:gap-[32px]'>
              <div className='flex place-content-between items-center'>
                <AnswerStatus answer={question.answer} />
                {isAnswerPage && <Kebab id={question.id} isAnswer={question.answer} isKebabOpen={visibleMenuId === question.id} onKebabClick={handleKebabClick} />}
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
