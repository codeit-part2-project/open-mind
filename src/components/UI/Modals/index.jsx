import { useContext, useState, useRef } from 'react';
import { AppContext } from 'components/Context';
import { postQuestion } from 'api/questions';
import { ReactComponent as MessagesIcon } from 'assets/images/icons/ic_Messages.svg';
import icClose from 'assets/images/icons/ic_Close.svg';

const Modal = () => {
  const { isModalOpen, profile, closeModal, setPostObject } = useContext(AppContext);
  const [isContent, setIsContent] = useState(false);
  const content = useRef();

  const exitModal = () => {
    closeModal();
    setIsContent(false);
  };

  const postFormHandler = async (e) => {
    e.preventDefault();
    setPostObject(await postQuestion(profile.id, { content: content.current.value.trim() }));
    exitModal();
  };

  const clickOutsideModal = ({ target, currentTarget }) => {
    if (target === currentTarget) exitModal();
  };

  const changeContentHandler = () => {
    if (content.current.value.trim() !== '') setIsContent(true);
    else setIsContent(false);
  };

  if (!isModalOpen) return null;
  return (
    <div className='fixed inset-0 flex flex-col justify-center items-center px-6 bg-dim' onClick={clickOutsideModal} role='presentation'>
      <form
        action='POST'
        onSubmit={postFormHandler}
        className=' flex fixed flex-col w-4/5 h-3/5 rounded-3xl p-6 bg-gray-10 left-1/2 -translate-x-1/2 shadow-3pt md:max-w-lg md:h-2/5 animate-slide-up-fade-modal'
      >
        <label htmlFor='questionContent' className='flex flex-col flex-1'>
          <div className='flex w-full items-center gap-2'>
            <MessagesIcon className='w-[22px] h-[22px] fill-gray-60 md:w-[24px] md:h-[24px]' />
            <p className='flex-1 text-xl text-left font-actor'>질문을 작성해주세요</p>
            <button type='button' onClick={exitModal}>
              <img src={icClose} alt='닫기 아이콘' className='w-3 h-3 md:w-4 md:h-4' />
            </button>
          </div>
          <div className='flex items-center gap-1 mt-6 mb-2'>
            <span className='text-l font-actor'>To.</span>
            <img src={profile.imageSource} alt='프로필' className='w-7 h-7 rounded-full' />
            <p className='flex-1 text-left'>{profile.name}</p>
          </div>
          <textarea
            name='question-content'
            id='questionContent'
            className='flex-1 w-full rounded-lg p-4 bg-gray-20 resize-none focus:outline focus:outline-1 focus:outline-brown-40'
            placeholder='질문을 입력해주세요'
            onChange={changeContentHandler}
            ref={content}
          />
        </label>
        <button type='submit' disabled={!isContent} className={`mt-2 py-3 rounded-lg text-gray-10 ${isContent ? 'bg-brown-40' : 'bg-brown-30'}`}>
          질문 보내기
        </button>
      </form>
    </div>
  );
};

export default Modal;
