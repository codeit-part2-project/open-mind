import PropTypes from 'prop-types';
import formatCreatedAt from 'utils/dateUtils';

const QuestionContent = ({ createdAt, content }) => {
  QuestionContent.propTypes = {
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };

  return (
    <div>
      <p className='mb-[4px] text-sm font-normal leading-[18px] text-gray-40'>질문 · {formatCreatedAt(createdAt)}</p>
      <p className='text-base font-normal leading-[22px] md:text-lg md:leading-6 font-actor break-words break-all whitespace-normal'>{content}</p>
    </div>
  );
};

export default QuestionContent;
