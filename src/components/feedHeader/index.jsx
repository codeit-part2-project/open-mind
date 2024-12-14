import banner from 'assets/images/img_Banner.svg';
import logo from 'assets/images/img_Logo.svg';
import { Link } from 'react-router-dom';
import urlCopy from 'assets/images/icons/ic_Link.svg';
import kakaotalk from 'assets/images/icons/ic_Kakaotalk.svg';
import facebook from 'assets/images/icons/ic_Facebook.svg';

const FeedHeader = () => (
  <div className='fixed'>
    <div className='flex flex-col items-center relative'>
      <div className='w-screen overflow-hidden flex justify-center'>
        <img className='min-w-[906px] md:min-w-[1200px]' src={banner} alt='Banner_Image' />
      </div>
      <div className='flex flex-col items-center gap-3 absolute top-[40px] md:top-[50px]'>
        <Link to='/'>
          <img className='max-w-[124px] md:max-w-[170px]' src={logo} alt='Logo' />
        </Link>
        {/* <img className='rounded-full max-w-[104px] max-h-[104px] md:max-w-[136px] md:max-h-[136px]' src={profileImg} alt='Banner' /> */}
        {/* 프로필 이미지입니다. 이미지 src는 서버에서 데이터 요청 후 반영할 예정입니다. */}
        <div className='font-normal text-2xl/[30px] md:text-[32px]/[40px]'>이름</div>
        <div className='flex gap-3'>
          <img src={urlCopy} alt='url_copy' />
          <img src={kakaotalk} alt='kakaotalk_share' />
          <img src={facebook} alt='facebook_share' />
        </div>
      </div>
    </div>
  </div>
);

export default FeedHeader;
