import { useLocation } from 'react-router-dom';

const useFacebookShare = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const shareURL = `${process.env.REACT_APP_DEPLOY_URL}post/${id}`;

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`, '페이스북 공유하기', 'width=600,height=800,location=no,status=no,scrollbars=yes');
  };

  return { shareFacebook };
};

export default useFacebookShare;
