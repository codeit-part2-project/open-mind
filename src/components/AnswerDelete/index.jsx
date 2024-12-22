import { ReactComponent as Close } from 'assets/images/icons/ic_Close.svg';

const AnswerDelete = () => (
  <button type='button' className='flex justify-center items-center gap-2 rounded-lg w-[103px] h-[30px] text-gray-50 hover:text-gray-60 hover:bg-gray-20'>
    <Close className='w-3.5 h-3.5 fill-current' />
    <p>답변삭제</p>
  </button>
);

export default AnswerDelete;
