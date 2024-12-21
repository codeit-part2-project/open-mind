import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById, deleteSubject } from 'api/subjects';
import { getQuestionBySubjectId } from 'api/questions';
import Header from 'components/Header';
import DeleteIdBtn from 'components/DeleteIdBtn';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';
import ToastDeleteId from 'components/ToastDeleteId';
import questionBoxImg from 'assets/images/img_QuestionBox.svg';

const Answer = () => {
  const { id: subjectId } = useParams();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const LocalId = localStorage.getItem('id');

  const navigate = useNavigate();

  const [questionList, setQuestionList] = useState([]);

  const [listLoading, setListLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const observerRef = useRef(null);

  const handleDelete = async () => {
    try {
      const response = await deleteSubject(subjectId);
      if (!response.ok) {
        throw new Error('삭제 중 오류가 발생했습니다. 3초 후 페이지를 새로고침 합니다.');
      }
      localStorage.removeItem('id');
      setIsDelete(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        setProfileLoading(true);

        if (!isDelete) {
          if (LocalId === subjectId) {
            const response = await getSubjectById(subjectId);
            if (typeof response === 'string' && response.includes('에러')) {
              throw new Error('존재하지 않는 피드로 접근하여 오류가 발생했습니다. 잠시 후 홈으로 이동합니다.');
            } else {
              setProfile(response);
            }
          } else {
            throw new Error('잘못된 접근입니다. 잠시 후 홈으로 이동합니다.');
          }
        }
      } catch (err) {
        setProfileError(err.toString());
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } finally {
        setProfileLoading(false);
      }
    };

    getProfile();
  }, [subjectId, isDelete, LocalId, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setListLoading(true);

        const params = { limit: 3, offset };
        const response = await getQuestionBySubjectId(subjectId, params);
        if (response.results) {
          setQuestionList((prev) => [...prev, ...response.results]);
          setHasMore(response.next !== null);
        } else {
          throw new Error('질문 목록을 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error(err.toString());
      } finally {
        setListLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId, offset]);
  const loadMoreQuestions = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && listLoading === false) {
        setOffset((prev) => prev + 3);
      }
    },
    [hasMore, listLoading],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreQuestions, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    const targetCurrent = observerRef.current;
    if (targetCurrent) {
      observer.observe(targetCurrent);
    }
    return () => {
      if (targetCurrent) {
        observer.unobserve(targetCurrent);
      }
    };
  }, [loadMoreQuestions]);

  if (profileLoading) return <div className='feed-loading'>로딩 중...</div>;
  if (profileError) return <div className='feed-error'>오류: {profileError}</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className='h-screen bg-gray-20'>
      <Header imageSource={profile.imageSource} name={profile.name} />
      <div className='flex flex-col items-center gap-[8px] md:gap-[19px] box-border bg-gray-20 pt-[145px] md:pt-[135px] px-[24px] md:px-[32px] '>
        <DeleteIdBtn onClick={handleDelete} id={subjectId} />
        {isDelete ? (
          <div className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
            <CountQuestion count={0} />
            <img src={questionBoxImg} alt='질문 박스 이미지' className='mx-auto mt-[50px] mb-[86px] h-[118px] w-[114px] md:mt-[54px] md:mb-[49px] md:h-[154px] md:w-[150px]' />
          </div>
        ) : (
          <ul className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
            <CountQuestion count={profile.questionCount} />
            <QnAList name={profile.name} imageSource={profile.imageSource} questionList={questionList} />
            {listLoading && (
              <div className='flex justify-center items-center my-10'>
                <div className='w-10 h-10 border-4 border-t-transparent border-brown-30 rounded-full animate-spin' />
              </div>
            )}
            <div ref={observerRef} className='h-1' />
          </ul>
        )}
      </div>
      {isDelete && <ToastDeleteId />}
    </div>
  );
};

export default Answer;
