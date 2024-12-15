import FeedHeader from 'components/feedHeader';
import Toast from 'components/toast';
import { useState } from 'react';

const Answer = () => {
  const [isToast, setIsToast] = useState(false);

  const handleToastLoad = () => {
    setIsToast(true);

    setTimeout(() => {
      setIsToast(false);
    }, 5000);
  };

  return (
    <>
      <FeedHeader onClick={handleToastLoad} />
      <Toast isToast={isToast} />
    </>
  );
};
export default Answer;
