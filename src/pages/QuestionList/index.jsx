import { useState, useCallback, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import CardList from 'components/CardList';
import Pagination from 'components/Pagination';
import SortDropDown from 'components/SortDropDown';
import { getSubjects } from 'api/subjects';
import Logo from 'assets/images/img_Logo.svg';

const useServerState = () => {
  const [state, setState] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async ({ queryFn, params }) => {
    try {
      setLoading(true);
      const data = await queryFn(params);
      setState(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { state, error, loading, fetchData };
};

const useGetSubjects = (listQuery) => {
  const { state, error, loading, fetchData } = useServerState();

  useEffect(() => {
    fetchData({ queryFn: getSubjects, params: listQuery });
  }, [fetchData, listQuery]);

  return { data: state, error, loading };
};

const QuestionList = () => {
  const navigate = useNavigate();
  const mediaQuery = useMediaQuery({ query: '(max-width : 1023px)' });
  const cardLimit = useMemo(() => (mediaQuery ? 6 : 8), [mediaQuery]);
  const [listQuery, setListQuery] = useState({ limit: cardLimit, offset: 0, sort: 'time' });
  const { data, error, loading } = useGetSubjects(listQuery);

  const count = useMemo(() => {
    if (error) {
      return null;
    }
    return Number(data.count);
  }, [error, data]);

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  const onClickPageMove = () => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      navigate(`/post/${storedId}/answer`);
    } else {
      navigate('/');
    }
  };

  const changeSort = (sortName) => {
    if (sortName === '이름순') setListQuery((prev) => ({ ...prev, sort: 'name' }));
    else setListQuery((prev) => ({ ...prev, sort: 'time' }));
    setListQuery((prev) => ({ ...prev, limit: cardLimit, offset: 0 }));
  };

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
        <section className='flex flex-row justify-between gap-[42px] mx-6 whitespace-nowrap mb-4 md:flex-col md:items-center md:gap-3 md:mb-[30px]'>
          <h1 className='text-2xl font-normal flex-1 md:text-[40px] md:leading-[47px]'>누구에게 질문할까요?</h1>
          <SortDropDown changeSort={changeSort} />
        </section>
        {loading ? <div>리스트 스켈레톤 UI</div> : <CardList cards={data.results} />}
      </div>
      <Pagination data={{ count, cardLimit, listQuery, setListQuery }} />
    </div>
  );
};

export default QuestionList;
