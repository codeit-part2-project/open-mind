import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSubjectById, postSubject } from 'api/subjects';
import ToastHome from 'components/ToastHome';
import imgLogo from 'assets/images/img_Logo.svg';
import imgBanner from 'assets/images/img_Banner.svg';
import { ReactComponent as IcArrowDashRight } from 'assets/images/icons/ic_Arrow-dash-right.svg';
import { ReactComponent as IcPerson } from 'assets/images/icons/ic_Person.svg';

const Home = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [toastHome, setToastHome] = useState(false);
  const navigate = useNavigate();

  const toastTimer = () => {
    setToastHome(true);
    setTimeout(() => {
      setToastHome(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('이름을 입력해주세요.');
      toastTimer();
      return;
    }

    const storedId = localStorage.getItem('id');

    if (storedId) {
      const storedSubject = await getSubjectById(storedId);

      if (storedSubject.name === name.trim()) {
        navigate(`/post/${storedId}/answer`);
      } else {
        setErrorMessage('이전에 등록했던 이름을 입력해 주세요.');
        toastTimer();
      }
    } else {
      const newSubject = await postSubject({ name: name.trim() });

      if (newSubject.id) {
        localStorage.setItem('id', newSubject.id);
        navigate(`/post/${newSubject.id}/answer`);
      }
    }
  };

  return (
    <div className='flex flex-col items-center relative overflow-hidden w-full h-screen bg-gray-20 z-[1]'>
      <img src={imgLogo} alt='오픈마인드 로고' className='w-[248px] h-[98px] mt-[80px] mb-[24px] md:w-[456px] md:h-[180px] md:mt-[160px] z-[1]' />
      <div className='w-full flex justify-center md:absolute md:top-[45px] md:right-[50px] md:w-auto xl:right-[130px] z-[1]'>
        <Link
          to='/list'
          className='flex items-center gap-1 bg-brown-10 border border-brown-40 text-brown-40 py-[8px] px-[12px] rounded-lg transition-colors duration-300 hover:bg-brown-20 md:py-[12px] md:px-[24px]'
        >
          질문하러 가기
          <IcArrowDashRight alt='질문하러 가기 버튼' className='fill-brown-40 w-[18px] h-[18px]' />
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col relative bg-white rounded-[16px] p-[24px] mt-[24px] mx-[35px] z-[1] w-[calc(100%-70px)] max-w-[350px] md:p-[32px] md:w-[calc(100%-368px)] md:max-w-[400px] md:mx-[184px]'
      >
        <IcPerson className='absolute top-[37px] left-[40px] w-[20px] h-[20px] md:top-[45px] md:left-[48px] fill-gray-40' />
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

      {toastHome && <ToastHome errorMessage={errorMessage} />}
    </div>
  );
};

export default Home;
