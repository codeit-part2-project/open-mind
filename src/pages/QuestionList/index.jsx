import { useState, useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import CardList from 'components/CardList';
import Pagination from 'components/Pagination';
import SortDropDown from 'components/SortDropDown';
import { getSubject } from 'api/subjects';
import Logo from 'assets/images/img_Logo.svg';

const QuestionList = () => {
  const navigate = useNavigate();
  const cardLimit = useMediaQuery({ query: '(max-width : 867px)' });
  const [limit, setLimit] = useState(cardLimit ? 6 : 8);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState('time');
  const [count, setCount] = useState();
  const [cards, setCards] = useState([]);

  const readSubject = useCallback(async () => {
    const subjects = await getSubject({ limit, offset, sort });
    setCount(Number(subjects.count));
    setCards([...subjects.results]);
  }, [limit, offset, sort]);

  const changeSort = (sortName) => {
    if (sortName === '이름순') setSort('name');
    else setSort('time');
    setLimit(cardLimit ? 6 : 8);
    setOffset(0);
  };

  useEffect(() => {
    readSubject();
  }, [readSubject]);

  const onClickPageMove = () => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      navigate(`/post/${storedId}/answer`);
    } else {
      navigate('/');
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
            className='flex flex-row justify-bettwen gap-[4px] bg-brown-10 border-brown-40 border rounded-lg px-3 py-2 text-sm text-brown-40 font-normal whitespace-nowrap'
            type='button'
            onClick={onClickPageMove}
          >
            <div>답변하러 가기</div>
            <div>→</div>
          </button>
        </div>
      </header>

      <div className='flex justify-between gap-1 mx-6 mb-4 md:flex-col md:items-center md:gap-5 md:mx-8 md:mb-6'>
        <h1 className='flex-1 text-2xl font-normal md:text-[40px]'>누구에게 질문할까요?</h1>
        <SortDropDown changeSort={changeSort} />
      </div>
      <CardList cards={cards} />
      <Pagination data={{ limit, sort, count, cardLimit, setLimit, setOffset }} />
    </>
  );
};

export default QuestionList;
