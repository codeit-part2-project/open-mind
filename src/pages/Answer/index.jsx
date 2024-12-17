import FeedHeader from 'components/feedHeader';
import Toast from 'components/toast';
import { useState } from 'react';

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
      {isToast && <Toast />}
    </>
  );
};

export default Answer;
