import { useState, useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import CardList from 'components/CardList/index';
import Pagination from 'components/Pagination';
import SortDropDown from 'components/SortDropDown';
import { getSubject } from 'api/subjects';
import Logo from 'assets/images/img_Logo.svg';

const QuestionList = () => {
  const cardLimit = useMediaQuery({ query: '(max-width : 1023px)' });
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

  return (
    <div className='min-w-[436px] max-w-[1200px] mx-auto'>
      <div className=' md:mb-[76px] lg:mb-[91px] pc:mb-[97px] mt-10 mb-10'>
        <header className='flex flex-col items-center gap-[20px] mb-[52px] md:flex-row md:justify-between md:mx-[50px] md:mb-10 lg:mx-[50px] pc:mx-[130px]'>
          <div>
            <Link to='/'>
              <img className='w-[146px] h-[57px]' src={Logo} alt='site-logo' />
            </Link>
          </div>
          <div>
            <button className='flex flex-row justify-bettwen gap-[4px] bg-brown-10 border-brown-40 border rounded-lg px-3 py-2 text-sm text-brown-40 font-normal whitespace-nowrap' type='button'>
              <div>답변하러 가기</div>
              <div>→</div>
            </button>
          </div>
        </header>
        <section className='flex flex-row justify-between gap-[42px] mx-6 whitespace-nowrap mb-4 md:flex-col md:items-center md:gap-3 md:mb-[30px]'>
          <h1 className='text-2xl font-normal flex-1 md:text-[40px] md:leading-[47px]'>누구에게 질문할까요?</h1>
          <SortDropDown changeSort={changeSort} />
        </section>
        <CardList cards={cards} />
      </div>
      <Pagination data={{ limit, sort, count, cardLimit, setLimit, setOffset }} />
    </div>
  );
};

export default QuestionList;
