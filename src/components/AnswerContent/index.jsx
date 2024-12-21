import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import formatCreatedAt from 'utils/dateUtils';

const AnswerContent = ({ answer, name, imageSource }) => {
  AnswerContent.propTypes = {
    answer: PropTypes.shape({
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string,
  };

  AnswerContent.defaultProps = {
    imageSource: 'https://fastly.picsum.photos/id/772/200/200.jpg?hmac=9euSj4JHTPr7uT5QWVmeNJ8JaqAXY8XmJnYfr_DfBJc',
  };

  const location = useLocation();
  const [textareaValue, setTextareaValue] = useState('');

  const isFeedPage = location.pathname.startsWith('/post/') && !location.pathname.includes('/answer');
  const isAnswerPage = location.pathname.startsWith('/post/') && location.pathname.includes('/answer');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const renderProfileImg = () => <img src={imageSource} alt={`${name}의 프로필`} className='w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full object-cover' />;

  const renderAnswerHeader = () => (
    <div className='flex items-center mb-[4px]'>
      <p className='mr-[8px] inline-block text-sm leading-[18px] md:text-lg md:leading-[24px]'>{name}</p>
      <p className='text-sm font-medium leading-[18px] text-gray-40'>{formatCreatedAt(answer.createdAt)}</p>
    </div>
  );

  const renderAnswerContent = () => <p className='text-base leading-[22px]'>{answer.content}</p>;

  const renderAnswerForm = () => (
    <form className='flex w-full flex-col gap-[8px]'>
      <textarea
        className='w-full h-[186px] resize-none rounded-lg border-none p-[16px] bg-gray-20 text-base leading-[22px] text-secondary-900 placeholder:text-base placeholder:leading-[22px] placeholder:text-gray-40 focus:outline-brown-40'
        placeholder='답변을 입력해주세요'
        value={textareaValue}
        onChange={handleTextareaChange}
      />
      <button type='submit' className='py-[12px] rounded-lg bg-brown-40 text-base leading-[22px] text-gray-10 disabled:bg-brown-30' disabled={textareaValue.trim() === ''}>
        답변 완료
      </button>
    </form>
  );

  if (answer && answer.isRejected) {
    return (
      <div className='flex gap-[12px]'>
        {renderProfileImg()}
        <div>
          {renderAnswerHeader()}
          <p className='text-base leading-[22px] text-red-50'>답변 거절</p>
        </div>
      </div>
    );
  }

  if (isFeedPage) {
    if (answer) {
      return (
        <div className='flex gap-[12px]'>
          {renderProfileImg()}
          <div>
            {renderAnswerHeader()}
            {renderAnswerContent()}
          </div>
        </div>
      );
    }
    return null;
  }

  if (isAnswerPage) {
    if (answer) {
      return (
        <div className='flex gap-[12px]'>
          {renderProfileImg()}
          <div>
            {renderAnswerHeader()}
            <p className='text-base leading-[22px]'>{answer.content}</p>
          </div>
        </div>
      );
    }
    return (
      <div className='flex gap-[12px]'>
        {renderProfileImg()}
        <div className='flex-1'>
          <p className='mb-[4px] mr-[8px] inline-block text-sm leading-[18px] md:text-lg md:leading-[24px]'>{name}</p>
          {renderAnswerForm()}
        </div>
      </div>
    );
  }

  return null;
};

export default AnswerContent;
