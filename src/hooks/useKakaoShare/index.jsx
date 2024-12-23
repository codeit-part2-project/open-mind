import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const { Kakao } = window;

const useKakaoShare = (name) => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const shareURL = `${process.env.REACT_APP_DEPLOY_URL}post/${id}`;

  useEffect(() => {
    Kakao.cleanup();
    // Kakao SDK 초기화
    Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
  }, []);

  // 카카오 공유 함수
  const shareKakao = () => {
    try {
      if (Kakao.isInitialized()) {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: `${name}님의 피드를 소개합니다!`,
            description: '다른 사람과 소통해보세요!',
            imageUrl: 'https://raw.githubusercontent.com/tokyun02/tokyun02.github.io/main/logo.jpg',
            imageWidth: 1200,
            imageHeight: 600,

            link: {
              mobileWebUrl: shareURL,
              webUrl: shareURL,
            },
          },

          buttons: [
            {
              title: '소통하러 가기',
              link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
              },
            },
          ],
        });
      } else {
        throw new Error('Kakao SDK not intialized');
      }
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  };

  return {
    shareKakao,
  };
};

export default useKakaoShare;
