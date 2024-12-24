import PropTypes from 'prop-types';
import { useState } from 'react';
import { deleteQuestion } from 'api/questions';
import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';
import ConfirmModal from 'components/ConfirmModal'; // Import the modal component

const QuestionDelete = ({ id, onDeleteQuestion }) => {
  QuestionDelete.propTypes = {
    id: PropTypes.number.isRequired,
    onDeleteQuestion: PropTypes.func.isRequired,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setShowModal(true); // Show the modal when delete is clicked
  };

  const handleModalCancel = () => {
    setShowModal(false); // Close the modal if canceled
  };

  const handleModalConfirm = async () => {
    setShowModal(false); // Close the moda

    try {
      setIsLoading(true);
      setError(null);

      const response = await deleteQuestion(id);
      if (!response.ok) {
        throw new Error('질문 삭제 중 오류가 발생했습니다.');
      }

      onDeleteQuestion(id);
    } catch (err) {
      setError('질문 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <>
      <button
        type='button'
        className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-blue-50 hover:bg-gray-20'
        onClick={handleDelete}
        disabled={isLoading}
      >
        <Close className='w-3.5 h-3.5 fill-current' />
        질문삭제
      </button>
      <ConfirmModal isOpen={showModal} onConfirm={handleModalConfirm} onCancel={handleModalCancel} message='질문을 삭제하시겠습니까?' />
    </>
  );
};

export default QuestionDelete;
