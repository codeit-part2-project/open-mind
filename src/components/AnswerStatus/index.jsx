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

  return (
    <div>
      <span className='inline-block max-w-max rounded-lg border border-solid border-brown-40 px-[12px] py-[4px] text-sm font-medium text-brown-40'>{answer ? '답변 완료' : '미답변'}</span>
    </div>
  );
};

export default AnswerStatus;
