import PropTypes from 'prop-types';

const ToastMovePage = ({ toastMessage }) =>
  toastMessage ? (
    <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-delete'>
      {toastMessage}
    </div>
  ) : null;

ToastMovePage.propTypes = {
  toastMessage: PropTypes.string.isRequired,
};

export default ToastMovePage;
