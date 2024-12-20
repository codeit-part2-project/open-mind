import PropTypes from 'prop-types';
import { ReactComponent as MessagesIcon } from 'assets/images/icons/ic_Messages.svg';

const CountQuestion = ({ count }) => {
  CountQuestion.propTypes = {
    count: PropTypes.number.isRequired,
  };

  return (
    <div className='flex items-center justify-center gap-[8px] py-[16px]'>
      <MessagesIcon className='w-[22px] h-[22px] fill-brown-40 md:w-[24px] md:h-[24px]' />
      <p className='text-lg leading-6 text-brown-40 md:text-xl md:leading-[25px]'>{count === 0 ? '아직 질문이 없습니다' : `${count}개의 질문이 있습니다`}</p>
    </div>
  );
};

export default CountQuestion;
