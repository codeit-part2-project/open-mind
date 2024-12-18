import FeedHeader from 'components/feedHeader';
import Toast from 'components/toast';
import { useState } from 'react';
import Delete from 'pages/Answer/delete';
import { useNavigate } from 'react-router-dom';
// import { deleteSubject } from 'api/subjects';

const Answer = () => {
  const [isToast, setIsToast] = useState(false);
  const id = localStorage.getItem('id');

  const navigate = useNavigate();

  const handleToastLoad = () => {
    setIsToast(true);

    setTimeout(() => {
      setIsToast(false);
    }, 4950);
  };

  const handleDelete = () => {
    // deleteSubject(id);
    // ↑위 함수는 서버 데이터를 삭제하는 함수라서 일부로 막아뒀습니다. 삭제 동작은 확인했습니다.
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <>
      <FeedHeader onClick={handleToastLoad} />
      <div className='pt-[322px] md:pt-[369px] flex w-screen justify-center'>
        <Delete onClick={handleDelete} id={id} />
        {/* 민서님이 작업하신 공용 컴포넌트 자리입니다. */}
      </div>
      {isToast && <Toast />}
    </>
  );
};

export default Answer;
