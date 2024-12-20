import PropTypes from 'prop-types';
import AnswerStatus from 'components/AnswerStatus';
import QuestionContent from 'components/QuestionContent';
import AnswerContent from 'components/AnswerContent';
import CountFavorite from 'components/CountFavorite';
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

  return questionList.length > 0 ? (
    <ul className='flex flex-col gap-[16px]'>
      {questionList.map((question) => (
        <li key={question.id} className='mx-[16px] flex flex-col gap-[24px] justify-center rounded-2xl bg-gray-10 p-[24px] shadow-1pt md:gap-[32px]'>
          <AnswerStatus answer={question.answer} />
          <QuestionContent createdAt={question.createdAt} content={question.content} />
          <AnswerContent answer={question.answer} name={name} imageSource={imageSource} />
          <CountFavorite like={question.like} dislike={question.dislike} />
        </li>
      ))}
    </ul>
  ) : (
    <img src={questionBoxImg} alt='질문 박스 이미지' className='mx-auto mt-[50px] mb-[86px] h-[118px] w-[114px] md:mt-[54px] md:mb-[49px] md:h-[154px] md:w-[150px]' />
  );
};

export default QnAList;
