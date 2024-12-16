import PropTypes from 'prop-types';

const QuestionContent = ({ content }) => <h2>{content}</h2>;

QuestionContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default QuestionContent;
