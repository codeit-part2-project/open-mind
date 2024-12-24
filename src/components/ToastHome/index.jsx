import { PropTypes } from 'prop-types';

const ToastHome = ({ errorMessage }) => {
  ToastHome.propTypes = {
    errorMessage: PropTypes.string.isRequired,
  };
  return (
    <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-delete'>
      {errorMessage}
    </div>
  );
};
export default ToastHome;
