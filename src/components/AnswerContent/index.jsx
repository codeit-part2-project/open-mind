import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const AnswerContent = ({ answer }) => {
  AnswerContent.propTypes = {
    answer: PropTypes.shape({
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool,
    }),
    subject: PropTypes.shape({
      name: PropTypes.string,
      imageSource: PropTypes.string,
    }),
  };

  const location = useLocation();

  const isFeedPage = location.pathname.startsWith('/post/') && !location.pathname.includes('/answer');
  const isAnswerPage = location.pathname.startsWith('/post/') && location.pathname.includes('/answer');

  if (answer && answer.isRejected) {
    return <p>답변 거절</p>;
  }

  if (isFeedPage) {
    if (answer) {
      return <h2>{answer.content}</h2>;
    }
    return null;
  }

  if (isAnswerPage) {
    if (answer) {
      return <h2>{answer.content}</h2>;
    }
    return (
      <form>
        <textarea />
        <button type='submit'>답변 완료</button>
      </form>
    );
  }

  return null;
};

export default AnswerContent;
