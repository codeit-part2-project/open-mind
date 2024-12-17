import PropTypes from 'prop-types';

const AnswerStatus = ({ answer }) => <div>{answer ? <span>답변 완료</span> : <span>미답변</span>}</div>;

AnswerStatus.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    questionId: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    isRejected: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

export default AnswerStatus;
