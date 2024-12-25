import PropTypes from 'prop-types';

const ToastSuccess = ({ toastMsg }) => {
  ToastSuccess.propTypes = {
    toastMsg: PropTypes.string.isRequired,
  };
  if (toastMsg === '질문' || toastMsg === '답변') {
    return (
      <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-delete'>
        {toastMsg}이 삭제되었습니다.
      </div>
    );
  }
  if (toastMsg === '수정') {
    return (
      <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-delete'>
        {toastMsg}이 완료되었습니다.
      </div>
    );
  }
  if (toastMsg === '거절') {
    return (
      <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-delete'>
        답변이 {toastMsg}되었습니다.
      </div>
    );
  }
  if (toastMsg === '등록') {
    return (
      <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-delete'>
        답변이 {toastMsg}되었습니다.
      </div>
    );
  }
  return null;
};
export default ToastSuccess;
