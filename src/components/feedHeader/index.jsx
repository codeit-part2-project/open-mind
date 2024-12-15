import headerImg from 'assets/images/img_Header.svg';
import logo from 'assets/images/img_Logo.svg';
import { Link } from 'react-router-dom';
import urlCopy from 'assets/images/icons/ic_Link.svg';
import kakaotalk from 'assets/images/icons/ic_Kakaotalk.svg';
import facebook from 'assets/images/icons/ic_Facebook.svg';
import { getSubject } from 'api/subjects';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const style = {
  filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(192deg) brightness(107%) contrast(105%)',
};

const FeedHeader = ({ onClick }) => {
  // 프로필 사진과 이름을 getSubject 함수로 불러옵니다.
  // 테스트용으로 만들었으며 차후에 id 값으로 고유한 이미지와 이름을 불러오도록 수정해야합니다.

  FeedHeader.propTypes = {
    onClick: PropTypes.func,
  };

  const [name, setName] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const handleLoad = useCallback(async () => {
    const { results } = await getSubject();

    setProfileImg(results[0].imageSource);
    setName(results[0].name);
  }, []);

  const currentUrl = window.location.href;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    onClick();
  };

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div className='fixed'>
      <div className='flex flex-col items-center relative'>
        <div className='w-screen overflow-hidden flex justify-center'>
          <img className='min-w-[906px] md:min-w-[1200px]' src={headerImg} alt='Header_Image' />
        </div>
        <div className='flex flex-col items-center gap-3 absolute top-[40px] md:top-[50px]'>
          <Link to='/'>
            <img className='max-w-[124px] md:max-w-[170px]' src={logo} alt='Logo' />
          </Link>
          <img className='rounded-full max-w-[104px] max-h-[104px] md:max-w-[136px] md:max-h-[136px]' src={profileImg} alt='Profile_Img' />
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
  );
};

export default FeedHeader;
