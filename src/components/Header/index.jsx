import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import headerImg from 'assets/images/img_Header.svg';
import logo from 'assets/images/img_Logo.svg';
import urlCopy from 'assets/images/icons/ic_Link.svg';
import kakaotalk from 'assets/images/icons/ic_Kakaotalk.svg';
import facebook from 'assets/images/icons/ic_Facebook.svg';

const style = {
  filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(192deg) brightness(107%) contrast(105%)',
};

const Header = ({ imageSource, name }) => {
  Header.propTypes = {
    imageSource: PropTypes.number,
    name: PropTypes.string,
  };

  const [isToastUrlCopy, setIsToastUrlCopy] = useState(false);

  const currentUrl = window.location.href;

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

  // ↓ URL 복사 알림 컴포넌트
  const ToastUrlCopy = () => (
    <div className='fixed bottom-[100px] md:bottom-[60px] left-1/2 w-[167px] h-[42px] px-5 py-3 bg-black rounded-lg text-sm/[18px] font-medium text-white -translate-x-1/2 shadow-2pt animate-slide-up-fade'>
      URL이 복사되었습니다
    </div>
  );

  return (
    <>
      <div>
        <div className='flex justify-center relative'>
          <div className='w-screen overflow-hidden flex justify-center'>
            <img className='min-w-[906px] md:min-w-[1200px]' src={headerImg} alt='Header_Image' />
          </div>
          <div className='flex flex-col items-center absolute gap-3 top-[40px] md:top-[50px]'>
            <Link to='/'>
              <img className='max-w-[124px] md:max-w-[170px]' src={logo} alt='Logo' />
            </Link>
            {imageSource && <img className='rounded-full max-w-[104px] max-h-[104px] md:max-w-[136px] md:max-h-[136px]' src={imageSource} alt='Profile_Img' />}
            <div className='font-normal text-2xl/[30px] md:text-[32px]/[40px]'>{name}</div>
            <div className='flex gap-3'>
              <button className='flex justify-center items-center w-10 h-10 rounded-full bg-brown-40' type='button' onClick={handleCopyUrl}>
                <img className='w-[18px] h-[18px]' style={style} src={urlCopy} alt='url_copy' />
              </button>
              <div className='flex justify-center items-center w-10 h-10 rounded-full bg-yellow-50'>
                <img className='w-[18px] h-[18px]' src={kakaotalk} alt='kakaotalk_share' />
              </div>
              <div className='flex justify-center items-center w-10 h-10 rounded-full bg-blue-50'>
                <img className='w-[18px] h-[18px]' style={style} src={facebook} alt='facebook_share' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isToastUrlCopy && <ToastUrlCopy />}
    </>
  );
};

export default Header;
