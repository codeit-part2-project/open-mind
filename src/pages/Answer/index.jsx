import FeedHeader from 'components/feedHeader';
import ToastUrlCopy from 'components/toastUrlCopy';
import { useState } from 'react';
import Delete from 'pages/Answer/delete';
import { useNavigate } from 'react-router-dom';
import ToastDelete from 'components/toastDelete';
// import { deleteSubject } from 'api/subjects';

const Answer = () => {
  const [isToastUrlCopy, setIsToastUrlCopy] = useState(false);
  const [isToastDelete, setIsToastDelete] = useState(false);

  const id = localStorage.getItem('id');

  const navigate = useNavigate();

  const handleToastUrlCopyLoad = () => {
    setIsToastUrlCopy(true);

    setTimeout(() => {
      setIsToastUrlCopy(false);
    }, 4950);
  };

  const handleToastDelete = () => {
    setIsToastDelete(true);

    setTimeout(() => {
      setIsToastDelete(false);
      navigate('/');
    }, 4950);
  };

  const handleDelete = () => {
    // deleteSubject(id);
    // ↑위 함수는 서버 데이터를 삭제하는 함수라서 일부로 막아뒀습니다. 삭제 동작은 확인했습니다.
    localStorage.removeItem('id');
    handleToastDelete();
  };

  return (
    <>
      <FeedHeader onClick={handleToastUrlCopyLoad} />
      <div className='pt-[322px] md:pt-[369px] flex w-screen justify-center'>
        <Delete onClick={handleDelete} id={id} />
        {/* 민서님이 작업하신 공용 컴포넌트 자리입니다. */}
      </div>
      {isToastUrlCopy && <ToastUrlCopy />}
      {isToastDelete && <ToastDelete />}
    </>
  );
};

export default Answer;
