import PropTypes from 'prop-types';
import { useState } from 'react';
import { putAnswer } from 'api/answers';
import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';
import ConfirmModal from 'components/UI/Modals/ConfirmModal';

const AnswerEditForm = ({ answer, name, imageSource, id, setEditId, setQuestionList, setIsKebabLoading, setIsToast }) => {
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
    setIsKebabLoading: PropTypes.func.isRequired,
    setIsToast: PropTypes.func.isRequired,
    setEditId: PropTypes.number.isRequired,
    setQuestionList: PropTypes.func.isRequired,
  };

  AnswerEditForm.defaultProps = {
    imageSource: 'https://fastly.picsum.photos/id/772/200/200.jpg?hmac=9euSj4JHTPr7uT5QWVmeNJ8JaqAXY8XmJnYfr_DfBJc',
  };

  const [textareaValue, setTextareaValue] = useState(answer.content === null || answer.content === 'reject' ? '' : answer.content);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTextareaChange = (event) => {
    const text = event.target.value;
    setTextareaValue(text);
    const isFormValid = text.trim() !== answer.content.trim() && text !== '' && text !== 'reject';
    setIsValid(isFormValid);
  };

  const handleAnswerPatch = async (e) => {
    e.preventDefault();
    try {
      setIsKebabLoading(true);
      setIsLoading(true);
      const result = await putAnswer(answer.id, {
        content: textareaValue,
        isRejected: false,
      });
      setIsToast('수정');
      setQuestionList((prevQuestions) =>
        prevQuestions.map((question) => {
          if (question.id === id) {
            return { ...question, answer: result };
          }
          return question;
        }),
      );
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    } finally {
      setIsKebabLoading(false);
      setIsLoading(false);
      setEditId(null);
      setTimeout(() => {
        setIsToast(null);
      }, 3000);
    }
  };

  const onCancelClick = () => {
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setEditId(null);
  };

  const renderProfileImg = () => <img src={imageSource} alt={`${name}의 프로필`} className='w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full object-cover' />;

  const renderAnswerForm = () => (
    <form onSubmit={handleAnswerPatch} className='relative flex w-full flex-col gap-[8px]'>
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
    <>
      <div className='flex gap-[12px]'>
        {renderProfileImg()}
        <div className='flex-1'>
          <div className='flex justify-between items-center mb-[4px]'>
            <p className='mr-[8px] inline-block text-sm leading-[18px] md:text-lg md:leading-[24px]'>{name}</p>
            <button type='button' className='mr-[4px] w-3 h-3 md:w-4 md:h-4 fill-current text-gray-50' onClick={onCancelClick}>
              <Close className='w-3 h-3 md:w-4 md:h-4' />
            </button>
          </div>
          {renderAnswerForm()}
        </div>
      </div>
      <ConfirmModal isOpen={showModal} onConfirm={handleModalConfirm} onCancel={handleModalCancel} message='수정 중인 답변이 있습니다. 취소하시겠습니까?' />
    </>
  );
};

export default AnswerEditForm;
