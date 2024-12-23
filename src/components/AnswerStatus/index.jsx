import PropTypes from 'prop-types';

const AnswerStatus = ({ answer }) => {
  AnswerStatus.propTypes = {
    answer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      questionId: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  };

  const ANSWER_STATUS_COLOR = answer ? 'border-brown-40 text-brown-40' : 'border-gray-40 text-gray-40';

  return (
    <div>
      <span className={`inline-block max-w-max rounded-lg border border-solid px-[12px] py-[4px] text-sm font-medium ${ANSWER_STATUS_COLOR}`}>{answer ? '답변 완료' : '미답변'}</span>
    </div>
  );
};

export default AnswerStatus;
