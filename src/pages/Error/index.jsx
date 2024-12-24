import { Link } from 'react-router-dom';
import imgLogo from 'assets/images/img_Logo.svg';

const Error = () => (
  <div className='relative flex flex-col items-center min-h-screen bg-gray-20'>
    <img src={imgLogo} alt='오픈마인드 로고' className='absolute w-[248px] h-[98px] mt-[80px] mx-auto mb-[24px] md:w-[456px] md:h-[180px] md:mt-[160px] opacity-30' />
    <div className='relative flex flex-col items-center max-w-[340px] mx-[20px] mt-[290px] p-[40px] rounded-lg bg-white shadow-lg z-10 md:w-[450px] md:mt-[360px]'>
      <p className='text-brown-50 text-4xl font-bold font-actor'>404</p>
      <p className='mt-[5px] mb-[20px] text-brown-40 text-lg'>페이지를 찾을 수 없어요</p>
      <Link
        to='/'
        className='flex items-center justify-center w-[127px] h-[34px] px-3 py-2 rounded-md bg-brown-40 text-gray-10 text-sm md:w-[166px] md:h-[46px] md:gap-[8px] md:text-base transition-colors duration-300 hover:bg-brown-50'
      >
        처음으로 돌아가기
      </Link>
    </div>
  </div>
);

export default Error;
