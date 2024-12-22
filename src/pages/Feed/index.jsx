import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById } from 'api/subjects';
import { getQuestionBySubjectId } from 'api/questions';

import { AppContext } from 'components/Context';
import Header from 'components/Header';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';

const Feed = () => {
  const { id: subjectId } = useParams();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profile, setProfile] = useState(null);

  const { openModal, postObject } = useContext(AppContext);

  const [questionList, setQuestionList] = useState([]);

  const [listLoading, setListLoading] = useState(false);

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

        const params = { limit: 10, offset };
        const response = await getQuestionBySubjectId(subjectId, params);
        if (response.results) {
          setQuestionList((prev) => {
            // 새로운 질문을 기존 데이터에 중복 없이 추가
            const updatedList = [...prev];
            response.results.forEach((newQuestion) => {
              if (!updatedList.some((question) => question.id === newQuestion.id)) {
                updatedList.push(newQuestion);
              }
            });
            return updatedList;
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
      setQuestionList((prev) => [postObject, ...prev]); // 새 질문을 리스트 맨 앞에 삽입
      setOffset((prev) => prev + 1); // 페이지네이션 offset을 유지
      setProfile((prev) => ({ ...prev, questionCount: prev.questionCount + 1 }));
    }
  }, [postObject]);

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
    </div>
  );
};

export default Feed;
