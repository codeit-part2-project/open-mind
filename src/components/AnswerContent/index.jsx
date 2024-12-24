import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import formatCreatedAt from 'utils/dateUtils';
import { postAnswer } from 'api/answers';

const AnswerContent = ({ answer, name, imageSource, id, onAnswerSubmit }) => {
  AnswerContent.propTypes = {
    answer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string,
    id: PropTypes.number.isRequired,
    onAnswerSubmit: PropTypes.func.isRequired,
  };

  AnswerContent.defaultProps = {
    imageSource: 'https://fastly.picsum.photos/id/772/200/200.jpg?hmac=9euSj4JHTPr7uT5QWVmeNJ8JaqAXY8XmJnYfr_DfBJc',
  };

  const location = useLocation();
  const [textareaValue, setTextareaValue] = useState('');
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);
  const [isLoading, setIsLoading] = useState(false);

  const isFeedPage = location.pathname.startsWith('/post/') && !location.pathname.includes('/answer');
  const isAnswerPage = location.pathname.startsWith('/post/') && location.pathname.includes('/answer');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleAnswerPost = async (e) => {
    e.preventDefault();
    const postBody = {
      questionId: id,
      content: textareaValue,
      isRejected: false,
      team: '12-6',
    };

    let response;
    try {
      setIsLoading(true);
      response = await postAnswer(id, postBody);
      setUpdatedAnswer(response);
      onAnswerSubmit(id, response);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileImg = () => <img src={imageSource} alt={`${name}의 프로필`} className='w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full object-cover' />;

  const renderAnswerHeader = () => (
    <div className='flex items-center mb-[4px]'>
      <p className='mr-[8px] inline-block text-sm leading-[18px] md:text-lg md:leading-[24px] font-actor'>{name}</p>
      <p className='text-sm font-medium leading-[18px] text-gray-40'>{formatCreatedAt(updatedAnswer.createdAt)}</p>
    </div>
  );

  const renderAnswerContent = () => <p className='text-base leading-[22px]'>{updatedAnswer.content}</p>;

  const renderAnswerForm = () => (
    <form onSubmit={handleAnswerPost} className='flex w-full flex-col gap-[8px]'>
      <textarea
        className='w-full h-[186px] resize-none rounded-lg border-none p-[16px] bg-gray-20 text-base leading-[22px] text-secondary-900 placeholder:text-base placeholder:leading-[22px] placeholder:text-gray-40 focus:outline-brown-40'
        placeholder='답변을 입력해주세요'
        value={textareaValue}
        onChange={handleTextareaChange}
      />
      <button type='submit' className='py-[12px] rounded-lg bg-brown-40 text-base leading-[22px] text-gray-10 disabled:bg-brown-30' disabled={textareaValue.trim() === '' || isLoading}>
        답변 완료
      </button>
    </form>
  );

  useEffect(() => {
    setUpdatedAnswer(answer);
    setTextareaValue('');
  }, [answer]);

  if (updatedAnswer && updatedAnswer.isRejected) {
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
    if (updatedAnswer) {
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
    if (updatedAnswer === null || !updatedAnswer) {
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

    if (updatedAnswer) {
      return (
        <div className='flex gap-[12px]'>
          {renderProfileImg()}
          <div>
            {renderAnswerHeader()}
            <p className='text-base leading-[22px]'>{updatedAnswer.content}</p>
          </div>
        </div>
      );
    }
  }

  return null;
};

export default AnswerContent;
