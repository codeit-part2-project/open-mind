import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import headerImg from 'assets/images/img_Header.svg';
import logo from 'assets/images/img_Logo.svg';
import urlCopy from 'assets/images/icons/ic_Link.svg';
import kakaotalk from 'assets/images/icons/ic_Kakaotalk.svg';
import facebook from 'assets/images/icons/ic_Facebook.svg';
import useKakaoShare from 'hooks/useKakaoShare';
import useFacebookShare from 'hooks/useFacebookShare';

const style = {
  filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(192deg) brightness(107%) contrast(105%)',
};

const Header = ({ imageSource, name }) => {
  Header.propTypes = {
    imageSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  const [isToastUrlCopy, setIsToastUrlCopy] = useState(false);

  const currentUrl = window.location.href;
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  const { shareKakao } = useKakaoShare(name);
  const { shareFacebook } = useFacebookShare();

  const handleToastUrlCopyLoad = () => {
    setIsToastUrlCopy(true);

    setTimeout(() => {
      setIsToastUrlCopy(false);
    }, 5000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    handleToastUrlCopyLoad();
  };

  const ToastUrlCopy = () => (
    <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 w-[167px] h-[42px] px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade-urlCopy'>
      URL이 복사되었습니다
    </div>
  );

  return (
    <>
      <header className={`w-[calc(100vw - ${scrollBarWidth}px)] bg-white`}>
        <div className='flex justify-center relative'>
          <div className='w-screen overflow-hidden flex justify-center'>
            <object className='min-w-[906px] md:min-w-[1200px] h-60' data={headerImg} aria-labelledby='Header_Image' type='image/svg+xml' />
          </div>
          <div className='flex flex-col items-center absolute gap-3 top-[40px] md:top-[50px]'>
            <Link to='/'>
              <img className='w-[124px] h-16 md:w-[170px] md:h-12' src={logo} alt='Logo' />
            </Link>
            {imageSource && <img className='rounded-full w-[104px] h-[104px] md:w-[136px] md:h-[136px]' src={imageSource} alt='Profile_Img' />}
            <div className='font-normal text-2xl/[30px] md:text-[32px]/[40px]'>{name}</div>
            <div className='flex gap-3'>
              <button className='flex justify-center items-center w-10 h-10 rounded-full bg-brown-40' type='button' onClick={handleCopyUrl}>
                <img className='w-[18px] h-[18px]' style={style} src={urlCopy} alt='url_copy' />
              </button>
              <button className='flex justify-center items-center w-10 h-10 rounded-full bg-yellow-50' type='button' onClick={shareKakao}>
                <img className='w-[18px] h-[18px]' src={kakaotalk} alt='kakaotalk_share' />
              </button>

              <button type='button' className='flex justify-center items-center w-10 h-10 rounded-full bg-blue-50' onClick={shareFacebook}>
                <img className='w-[18px] h-[18px]' style={style} src={facebook} alt='facebook_share' />
              </button>
            </div>
          </div>
        </div>
      </header>
      {isToastUrlCopy && <ToastUrlCopy />}
    </>
  );
};

export default Header;
