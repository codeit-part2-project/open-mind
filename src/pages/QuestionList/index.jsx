import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardList from 'components/CardList';
import Pagination from 'components/UI/Pagination';
import SortDropDown from 'components/UI/SortDropDown';
import { getSubject } from 'api/subjects';
import Logo from 'assets/images/img_Logo.svg';
import useViewport from 'hooks/useViewport';
import ToastMovePage from 'components/UI/Toast/ToastMovePage';
import { ReactComponent as IcArrowDashRight } from 'assets/images/icons/ic_Arrow-dash-right.svg';

const QuestionList = () => {
  const navigate = useNavigate();
  const width = useViewport();
  const [limit, setLimit] = useState(width <= 867 ? 6 : 8);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState('time');
  const [count, setCount] = useState();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const readSubject = useCallback(async () => {
    setLoading(true);
    const subjects = await getSubject({ limit, offset, sort });
    setCount(Number(subjects.count));
    setCards([...subjects.results]);
    setLoading(false);
  }, [limit, offset, sort]);

  const changeSort = (sortName) => {
    if (sortName === '이름순') setSort('name');
    else setSort('time');
    setLimit(width <= 867 ? 6 : 8);
    setOffset(0);
  };

  useEffect(() => {
    readSubject();
  }, [readSubject]);

  const onClickPageMove = () => {
    const storedId = localStorage.getItem('id');
    if (!storedId) {
      setToastMessage('로그인 후 이용 가능한 페이지입니다.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setToastMessage('답변페이지로 이동합니다.');
      setTimeout(() => {
        navigate(`/post/${storedId}/answer`);
      }, 2000);
    }
  };

  return (
    <>
      <header className='mx-6 tablet:mx-[50px] pc:mx-auto pc:w-[940px]'>
        <div className='flex flex-col items-center gap-[20px] my-10 md:flex-row md:justify-between'>
          <Link to='/'>
            <img className='w-[146px] h-[57px]' src={Logo} alt='site-logo' />
          </Link>

          <button
            className='flex flex-row items-center justify-center gap-[4px] bg-brown-10 border-brown-40 border rounded-lg px-3 py-2 text-sm text-brown-40 font-normal whitespace-nowrap w-[127px] h-[34px] md:w-[166px] md:h-[46px] md:gap-[8px] md:text-base transition-colors duration-300 hover:bg-brown-20'
            type='button'
            onClick={onClickPageMove}
          >
            <div>답변하러 가기</div>
            <IcArrowDashRight alt='답변하러가기_화살표' className='fill-brown-40 w-[18px] h-[18px]' />
          </button>
        </div>
      </header>

      <div className='flex justify-between gap-1 mx-6 mb-4 md:flex-col md:items-center md:gap-5 md:mx-8 md:mb-6'>
        <h1 className='flex-1 text-2xl font-normal md:text-[40px]'>누구에게 질문할까요?</h1>
        <SortDropDown changeSort={changeSort} />
      </div>

      <div className='mx-6 md:mx-8'>
        <div className='relative w-full h-full min-h-[539px] md:min-h-[358px]'>
          {loading && (
            <div className='absolute inset-0 border rounded-2xl flex justify-center items-center bg-gray-20 z-10'>
              <div className='w-10 h-10 border-4 border-t-transparent border-brown-30 rounded-full animate-spin' />
            </div>
          )}
          <CardList cards={cards} pageWidth={width} />
        </div>
      </div>

      <Pagination data={{ limit, sort, count, pageWidth: width, setLimit, setOffset }} />
      {ToastMovePage && <ToastMovePage toastMessage={toastMessage} />}
    </>
  );
};

export default QuestionList;
