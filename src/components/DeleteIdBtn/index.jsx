import PropTypes from 'prop-types';

const DeleteIdBtn = ({ onClick, id }) => {
  DeleteIdBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  };

  const handleDelete = () => {
    onClick(id);
  };

  return (
    <div className='relative w-full max-w-[717px] min-w-[144px] h-[25px] md:h-[35px] md:w-[702px] pc:w-[714px]'>
      <button
        type='button'
        className='absolute right-0 w-[70px] min-w-[70px] h-[25px] md:w-[100px] md:h-[35px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] px-[17.5px] md:px-[24px] md:py-[5px] rounded-[200px] bg-brown-40 font-normal text-gray-10 text-[10px]/[25px] md:text-[15px]/[25px] hover:scale-105'
        onClick={handleDelete}
      >
        삭제하기
      </button>
    </div>
  );
};

export default DeleteIdBtn;
