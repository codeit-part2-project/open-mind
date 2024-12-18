import PropTypes from 'prop-types';
import messagesIcon from 'assets/images/icons/ic_Messages.svg';

const CountQuestion = ({ count }) => {
  CountQuestion.propTypes = {
    count: PropTypes.number.isRequired,
  };

  return (
    <div>
      <img src={messagesIcon} alt='메세지 아이콘' />
      <h2>{count === 0 ? '아직 질문이 없습니다' : `${count}개의 질문이 있습니다`}</h2>
    </div>
  );
};

export default CountQuestion;
