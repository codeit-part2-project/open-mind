import PropTypes from 'prop-types';
import { useState } from 'react';
import { putAnswer } from 'api/answers';

// eslint-disable-next-line
const AnswerEditForm = ({ answer, name, imageSource, id, setEditId, setQuestionList }) => {
  AnswerEditForm.propTypes = {
    answer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isRejected: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string,
    id: PropTypes.number.isRequired,
  };

  AnswerEditForm.defaultProps = {
    imageSource: 'https://fastly.picsum.photos/id/772/200/200.jpg?hmac=9euSj4JHTPr7uT5QWVmeNJ8JaqAXY8XmJnYfr_DfBJc',
  };

  // 초기값 설정 시 answer.content가 null일 경우 빈 문자열로 처리
  const [textareaValue, setTextareaValue] = useState(answer.content === null || answer.content === 'reject' ? '' : answer.content);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleTextareaChange = (event) => {
    const text = event.target.value;
    setTextareaValue(text);
    const isFormValid = text.trim() !== answer.content.trim() && text !== '' && text !== 'reject';
    setIsValid(isFormValid);
  };

  const handleAnswerPatch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await putAnswer(answer.id, {
        content: textareaValue, // textareaValue에서 내용을 가져옵니다.
        isRejected: false, // 필요하다면 다른 데이터도 추가 가능합니다.
      });
      setQuestionList((prevQuestions) =>
        prevQuestions.map((question) => {
          if (question.id === id) {
            return { ...question, answer: result };
          }
          return question;
        }),
      );
    } catch (err) {
      // handle error here (e.g., show error message)
    } finally {
      setIsLoading(false);
      setEditId(null);
    }
  };

  const renderProfileImg = () => <img src={imageSource} alt={`${name}의 프로필`} className='w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full object-cover' />;

  const renderAnswerForm = () => (
    <form onSubmit={handleAnswerPatch} className='flex w-full flex-col gap-[8px]'>
      <textarea
        className='w-full h-[186px] resize-none rounded-lg border-none p-[16px] bg-gray-20 text-base leading-[22px] text-secondary-900 placeholder:text-base placeholder:leading-[22px] placeholder:text-gray-40 focus:outline-brown-40'
        placeholder='답변을 입력해주세요'
        value={textareaValue}
        onChange={handleTextareaChange}
      />
      <button type='submit' className='py-[12px] rounded-lg bg-brown-40 text-base leading-[22px] text-gray-10 disabled:bg-brown-30' disabled={!isValid || isLoading}>
        수정 완료
      </button>
    </form>
  );

  return (
    <div className='flex gap-[12px]'>
      {renderProfileImg()}
      <div className='flex-1'>
        <p className='mb-[4px] mr-[8px] inline-block text-sm leading-[18px] md:text-lg md:leading-[24px]'>{name}</p>
        {renderAnswerForm()}
      </div>
    </div>
  );
};

export default AnswerEditForm;