import { useState } from 'react';
import { Link } from 'react-router-dom';
import imgLogo from 'assets/images/img_Logo.svg';
import imgBanner from 'assets/images/img_Banner.svg';
import icArrowDashRight from 'assets/images/icons/ic_Arrow-dash-right.svg';
import { ReactComponent as IcPerson } from 'assets/images/icons/ic_Person.svg';

const Home = () => {
  const [name, setName] = useState('');

  return (
    <div className='flex flex-col items-center relative overflow-hidden w-full h-screen bg-gray-20 z-[1]'>
      <img src={imgLogo} alt='오픈마인드 로고' className='w-[248px] h-auto mt-[80px] mb-[24px] md:w-[456px] md:mt-[160px] z-[1]' />
      <div className='w-full flex justify-center md:absolute md:top-[45px] md:right-[50px] md:w-auto xl:right-[130px] z-[1]'>
        <Link
          to='/list'
          className='flex gap-1 bg-brown-10 border border-brown-40 text-brown-40 py-[8px] px-[12px] rounded-lg transition-colors duration-300 hover:bg-brown-20 md:py-[12px] md:px-[24px]'
        >
          질문하러 가기
          <img src={icArrowDashRight} alt='질문하러 가기 버튼' />
        </Link>
      </div>

      <form className='flex flex-col relative bg-white rounded-[16px] p-[24px] mt-[24px] mx-[35px] z-[1] w-[calc(100%-70px)] max-w-[350px] md:p-[32px] md:w-[calc(100%-368px)] md:max-w-[400px] md:mx-[184px]'>
        <IcPerson className='absolute top-[37px] left-[40px] w-[20px] h-[20px] fill-gray-40 md:top-[45px] md:left-[48px] fill-gray-40' />
        <input
          type='text'
          placeholder='이름을 입력하세요'
          className='w-full py-[12px] pl-[40px] border border-gray-40 rounded-[8px] focus:outline-[1px] focus:outline-brown-40'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type='submit'
          className='w-full mt-[16px] bg-brown-40 text-white text-[16px] leading-[22px] py-[12px] px-[24px] rounded-[8px] border-none cursor-pointer transition-colors duration-300 hover:bg-brown-50'
        >
          질문 받기
        </button>
      </form>

      <img src={imgBanner} alt='오픈마인드 배너' className='absolute bottom-0 left-0 right-0 w-full z-0' />
    </div>
  );
};

export default Home;
