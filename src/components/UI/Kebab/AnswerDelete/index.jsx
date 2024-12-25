import { deleteAnswer } from 'api/answers';
import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from 'components/UI/Modals/ConfirmModal';

const AnswerDelete = ({ id, answerId, onAnswerDeleted, onKebabClick, setIsKebabLoading, setIsToast, editId, setEditId }) => {
  AnswerDelete.propTypes = {
    id: PropTypes.number.isRequired,
    answerId: PropTypes.number.isRequired,
    onAnswerDeleted: PropTypes.func.isRequired,
    onKebabClick: PropTypes.func.isRequired,
    setIsKebabLoading: PropTypes.func.isRequired,
    setIsToast: PropTypes.func.isRequired,
    editId: PropTypes.number.isRequired,
    setEditId: PropTypes.func.isRequired,
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setShowModal(true);
  };

  const handleModalCancel = () => {
    onKebabClick(id);
    setShowModal(false);
  };

  const handleModalConfirm = async () => {
    onKebabClick(id);
    setIsKebabLoading(true);
    setShowModal(false);
    setIsDeleting(true);

    try {
      const response = await deleteAnswer(answerId);
      if (!response.ok) {
        throw new Error('답변 삭제 중 오류가 발생했습니다.');
      }
      onAnswerDeleted(answerId);
      setIsToast('답변');
    } catch (err) {
      navigate('/');
    } finally {
      setIsDeleting(false);
      setIsKebabLoading(false);
      if (editId !== null) {
        setEditId(null);
      }
      setTimeout(() => {
        setIsToast(null);
      }, 3000);
    }
  };

  return (
    <>
      <button
        type='button'
        className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-blue-50 hover:bg-gray-20'
        disabled={isDeleting}
        onClick={handleDelete}
      >
        <Close className='w-3.5 h-3.5 fill-current' />
        <p>답변삭제</p>
      </button>
      <ConfirmModal isOpen={showModal} onConfirm={handleModalConfirm} onCancel={handleModalCancel} message='답변을 삭제하시겠습니까?' />
    </>
  );
};

export default AnswerDelete;
