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
  const [isDelete, setIsDelete] = useState(false);
  const [error, setError] = useState(null);
  const isLocalId = localStorage.getItem('id');

  const [questionList, setQuestionList] = useState([]);

  const [listLoading, setListLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const observerRef = useRef(null);

  const navigate = useNavigate();

  const handleToastDelete = () => {
    setIsDelete(true);

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleDelete = async () => {
    // const userConfirmed = window.confirm('정말로 삭제하시겠습니까?', ''); // user 확인작업은 confirm으로 임시로 만들었습니다.
    // if (userConfirmed) {
    // }
    // NOTE: 사용자에게 정말로 삭제할 것인지 2차로 확인하는 동작 구현을 위해 작성한 코드 입니다.
    //       window.confirm이 린터 규칙 문제가 있을 것 같아서 일단은 주석처리 하였습니다.

    try {
      const response = await deleteSubject(subjectId);
      if (!response.ok) {
        throw new Error('삭제 중 오류가 발생했습니다. 페이지를 새로고침 합니다.');
      }
      localStorage.removeItem('id');
      handleToastDelete();
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
        setProfileError('');
        if (!isDelete) {
          if (isLocalId === subjectId) {
            setProfile(await getSubjectById(subjectId));
          } else {
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }
        }
      } catch (e) {
        setProfileError(e.toString());
      } finally {
        setProfileLoading(false);
      }
    };

    getProfile();
  }, [subjectId, isDelete, isLocalId, navigate]);

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
    <>
      <Header imageSource={profile.imageSource} name={profile.name} />
      <div className='flex flex-col items-center justify-center gap-[8px] h-full md:gap-[19px] box-border bg-gray-20 pt-[145px] md:pt-[135px] p-[24px] pb-[168px] md:p-[32px] md:pb-[140px]'>
        <DeleteIdBtn onClick={handleDelete} id={subjectId} />
        {isDelete ? (
          <div className='flex flex-col justify-center w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
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
    </>
  );
};

export default Answer;
