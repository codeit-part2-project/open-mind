import PropTypes from 'prop-types';

const getMsg = (toastMsg) => {
  switch (toastMsg) {
    case '질문':
    case '답변':
      return `${toastMsg}이 삭제되었습니다.`;
    case '수정':
      return '수정이 완료되었습니다.';
    case '거절':
      return '답변이 거절되었습니다.';
    case '등록':
      return '답변이 등록되었습니다.';
    default:
      return '알 수 없는 메시지입니다.';
  }
};

const ToastSuccess = ({ toastMsg }) => {
  ToastSuccess.propTypes = {
    toastMsg: PropTypes.string.isRequired,
  };
  const PRINT_MSG = getMsg(toastMsg);

  return (
    <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-delete'>
      {PRINT_MSG}
    </div>
  );
};

export default ToastSuccess;
