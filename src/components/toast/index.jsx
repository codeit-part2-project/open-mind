import PropTypes from 'prop-types';

const Toast = ({ isToast = false }) => {
  Toast.propTypes = {
    isToast: PropTypes.bool,
  };

  return (
    isToast && (
      <div className=' fixed bottom-[100px] flex justify-center w-screen md:bottom-[60px] overflow-hidden'>
        <div className='w-[167px] min-w-[167px] h-[42px] bg-black rounded-lg text-sm/[18px] font-medium text-white flex justify-center items-center'>
          <p>URL이 복사되었습니다</p>
        </div>
      </div>
    )
  );
};

export default Toast;
