import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const AnswerContent = ({ answer, name, imageSource }) => {
  AnswerContent.propTypes = {
    answer: PropTypes.shape({
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool,
    }),
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string,
  };

  AnswerContent.defaultProps = {
    imageSource: 'https://fastly.picsum.photos/id/772/200/200.jpg?hmac=9euSj4JHTPr7uT5QWVmeNJ8JaqAXY8XmJnYfr_DfBJc',
  };

  const location = useLocation();

  const isFeedPage = location.pathname.startsWith('/post/') && !location.pathname.includes('/answer');
  const isAnswerPage = location.pathname.startsWith('/post/') && location.pathname.includes('/answer');

  if (answer && answer.isRejected) {
    return <p>답변 거절</p>;
  }

  if (isFeedPage) {
    if (answer) {
      return (
        <>
          <img src={imageSource} alt={`${name}의 프로필`} />
          <p>{name}</p>
          <p>{answer.content}</p>
        </>
      );
    }
    return null;
  }

  if (isAnswerPage) {
    return (
      <>
        <img src={imageSource} alt={`${name}의 프로필`} />
        <p>{name}</p>
        {answer ? (
          <p>{answer.content}</p>
        ) : (
          <form>
            <textarea placeholder='답변을 입력해 주세요' />
            <button type='submit'>답변 완료</button>
          </form>
        )}
      </>
    );
  }

  return null;
};

export default AnswerContent;
