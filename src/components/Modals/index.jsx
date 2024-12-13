import { useContext, useState, useRef } from 'react';
import { AppContext } from 'components/Context';
import icMessages from 'assets/images/icons/ic_Messages.svg';
import icClose from 'assets/images/icons/ic_Close.svg';

const Modal = () => {
  const { isModalOpen, profile, closeModal } = useContext(AppContext);
  const [isContent, setIsContent] = useState(false);
  const content = useRef();

  const exitModal = () => {
    closeModal();
    setIsContent(false);
  };
  // Form 제출 이벤트
  const postFormHandler = (e) => {
    e.preventDefault();
    exitModal();
  };
  // 실제 이벤트 발생 지점과 버블링 지점에서 target이 일치하면 모달 닫기
  const clickOutsideModal = ({ target, currentTarget }) => {
    if (target === currentTarget) exitModal();
  };
  // TextArea 유효성 검사
  const changeContentHandler = () => {
    if (content.current.value !== '') setIsContent(true);
    else setIsContent(false);
  };

  if (!isModalOpen) return null;
  return (
    <button className='fixed inset-0 flex flex-col justify-center items-center px-6 bg-dim' onClick={clickOutsideModal} type='button'>
      <form action='POST' onSubmit={postFormHandler} className=' flex flex-col w-full h-3/5 rounded-3xl p-6 bg-gray-10 shadow-2pt md:max-w-lg md:h-2/5'>
        <label htmlFor='questionContent' className='flex flex-col flex-1'>
          <div className='flex w-full items-center gap-2'>
            <img src={icMessages} alt='메신저 아이콘' />
            <p className='flex-1 text-xl text-left'>질문을 작성해주세요</p>
            <button type='button' onClick={exitModal}>
              <img src={icClose} alt='닫기 아이콘' />
            </button>
          </div>
          <div className='flex items-center gap-1 mt-6 mb-2'>
            <span className='text-lg'>To.</span>
            <img src={profile.imageSource} alt='프로필' className='w-7 h-7 rounded-full' />
            <p className='flex-1 text-left'>{profile.name}</p>
          </div>
          <textarea
            name='question-content'
            id='questionContent'
            className='flex-1 w-full rounded-lg p-4 bg-gray-20 resize-none focus:outline-brown-30'
            placeholder='질문을 입력해주세요'
            onChange={changeContentHandler}
            ref={content}
          />
        </label>
        <button type='submit' disabled={!isContent} className={`mt-2 py-3 rounded-lg text-gray-10 ${isContent ? 'bg-brown-40' : 'bg-brown-30'}`}>
          질문 보내기
        </button>
      </form>
    </button>
  );
};

export default Modal;
