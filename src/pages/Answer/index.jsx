import FeedHeader from 'components/feedHeader';
import Toast from 'components/toast';
import { useState } from 'react';
import Delete from 'pages/Answer/delete';

const Answer = () => {
  const [isToast, setIsToast] = useState(false);

  const handleToastLoad = () => {
    setIsToast(true);

    setTimeout(() => {
      setIsToast(false);
    }, 4950);
  };

  return (
    <>
      <FeedHeader onClick={handleToastLoad} />
      <div className='pt-[322px] md:pt-[369px] flex w-screen justify-center'>
        <Delete />
        {/* 민서님이 작업하신 공용 컴포넌트 자리입니다. */}
      </div>
      {isToast && <Toast />}
    </>
  );
};

export default Answer;
