import PropTypes from 'prop-types';
import { ReactComponent as Edit } from 'assets/images/icons/ic_Edit.svg';

// eslint-disable-next-line
const AnswerEdit = ({ id, setEditId, answerId }) => {
  AnswerEdit.propTypes = {
    id: PropTypes.number.isRequired,
    setEditId: PropTypes.func.isRequired,
  };

  const handleEdit = () => {
    setEditId(answerId);
  };

  return (
    <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20' onClick={handleEdit}>
      <Edit className='w-3.5 h-3.5 fill-current' />
      답변수정
    </button>
  );
};

export default AnswerEdit;
