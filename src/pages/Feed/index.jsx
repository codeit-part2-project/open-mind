import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById } from 'api/subjects';
import { getQuestionBySubjectId } from 'api/questions';

import { AppContext } from 'components/Context';
import Header from 'components/Header';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';
import ToastPostQuestion from 'components/ToastPostQuestion';

const getDynamicLimit = () => {
  const screenHeight = window.innerHeight;
  if (screenHeight <= 600) {
    return 5;
  }
  if (screenHeight <= 1200) {
    return 10;
  }
  return 15;
};

const Feed = () => {
  const { id: subjectId } = useParams();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profile, setProfile] = useState({});

  const { openModal, postObject, setPostObject } = useContext(AppContext);

  const [questionList, setQuestionList] = useState([]);

  const [listLoading, setListLoading] = useState(false);

  const [isToastState, setIsToastState] = useState(false);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const observerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError('');
        const response = await getSubjectById(subjectId);
        if (typeof response === 'string' && response.includes('에러')) {
          throw new Error('존재하지 않는 피드로 접근하여 오류가 발생했습니다. 잠시 후 홈으로 이동합니다.');
        }
        setProfile(response);
      } catch (e) {
        setProfileError(e.message);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } finally {
        setProfileLoading(false);
      }
    };
    getProfile();
  }, [subjectId, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setListLoading(true);

        const limit = getDynamicLimit();
        const params = { limit, offset };
        const response = await getQuestionBySubjectId(subjectId, params);
        if (response.results) {
          setQuestionList((prev) => {
            const newQuestions = response.results.filter((newQuestion) => !prev.some((question) => question.id === newQuestion.id));
            return [...prev, ...newQuestions];
          });
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

  // 새 질문이 추가되면 질문 리스트 맨 앞에 삽입
  useEffect(() => {
    if (postObject) {
      setIsToastState(true);

      setTimeout(() => {
        setIsToastState(false);
      }, 3000);

      setQuestionList((prev) => {
        const alreadyExists = prev.some((question) => question.id === postObject.id);
        if (alreadyExists) {
          return prev; // 중복되지 않으면 추가하지 않음
        }

        return [postObject, ...prev]; // 새 질문을 맨 앞에 추가
      });

      setOffset((prev) => prev + 1); // 페이지네이션 offset 유지

      setProfile((prev) => {
        const questionCount = prev && prev.questionCount ? prev.questionCount : 0;
        return {
          ...prev,
          questionCount: questionCount + 1,
        };
      });

      // postObject가 추가된 후 상태를 null로 리셋하여 다시 추가되지 않도록 방지
      setPostObject(null); // postObject 상태를 null로 리셋
    }
  }, [postObject, setPostObject]); // postObject가 변경될 때만 실행

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
  if (profileError) return <div className='feed-error'>{profileError}</div>;

  return (
    <div className='h-screen bg-gray-20'>
      <Header imageSource={profile.imageSource} name={profile.name} />
      <div className='flex flex-col items-center justify-center gap-[8px] p-[24px] pt-[176px] pb-[120px] bg-gray-20 md:gap-[19px] md:pt-[189px] md:px-[32px]'>
        <ul className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
          <CountQuestion count={profile.questionCount} />
          <QnAList name={profile.name} imageSource={profile.imageSource} questionList={questionList} />
          {listLoading && (
            <div className='flex justify-center items-center my-10'>
              <div className='w-10 h-10 border-4 border-t-transparent border-brown-30 rounded-full animate-spin' />
            </div>
          )}
          <div ref={observerRef} className='h-10' />
        </ul>
        <button
          type='button'
          className='fixed bottom-[16px] md:bottom-[24px] w-auto h-auto px-[16px] py-[8px] md:px-[24px] md:py-[12px] rounded-[200px] bg-brown-40 shadow-2pt text-gray-10 text-base md:text-xl font-normal leading-[25px]'
          style={{
            right: `calc(16px + var(--scroll-bar-width, 0px))`,
          }}
          onClick={openModal({ id: profile.id, name: profile.name, imageSource: profile.imageSource })}
        >
          <span className='block md:hidden'>질문 작성</span>
          <span className='hidden md:block'>질문 작성하기</span>
        </button>
      </div>
      {isToastState && <ToastPostQuestion />}
    </div>
  );
};

export default Feed;
