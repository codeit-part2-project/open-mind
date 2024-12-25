import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById } from 'api/subjects';
import { getQuestionBySubjectId } from 'api/questions';

import { AppContext } from 'components/Context';
import Header from 'components/Common/Header';
import CountQuestion from 'components/Common/CountQuestion';
import QnAList from 'components/Common/QnAList';
import ToastPostQuestion from 'components/UI/Toast/ToastPostQuestion';
import getDynamicLimit from 'utils/getDynamicLimit';

const Feed = () => {
  const { id: subjectId } = useParams();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

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
        const response = await getSubjectById(subjectId);
        if (typeof response === 'string' && response.includes('에러')) {
          throw new Error('존재하지 않는 피드입니다.');
        }
        setProfile(response);
      } catch (e) {
        setErrorMsg(e.message);
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
          throw new Error('질문 목록을 불러올 수 없습니다.');
        }
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setListLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId, offset, navigate]);

  useEffect(() => {
    if (postObject) {
      setIsToastState(true);

      setTimeout(() => {
        setIsToastState(false);
      }, 3000);

      setQuestionList((prev) => {
        const alreadyExists = prev.some((question) => question.id === postObject.id);
        if (alreadyExists) {
          return prev;
        }
        return [postObject, ...prev];
      });

      setOffset((prev) => prev + 1);

      setProfile((prev) => {
        const questionCount = prev && prev.questionCount ? prev.questionCount : 0;
        return {
          ...prev,
          questionCount: questionCount + 1,
        };
      });

      setPostObject(null);
    }
  }, [postObject, setPostObject]);

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

  if (errorMsg) {
    navigate('/error', { state: { message: errorMsg } });
  }

  if (profileLoading)
    return (
      <div className='flex justify-center items-center h-screen bg-brown-10'>
        <div className='w-10 h-10 border-4 border-t-transparent border-brown-30 rounded-full animate-spin' />
      </div>
    );

  return (
    <div className='h-screen bg-gray-20'>
      <Header imageSource={profile.imageSource} name={profile.name} />
      <div className='flex flex-col items-center justify-center gap-[8px] px-[24px] md:px-[32px] pt-[176px] md:pt-[189px] pb-[168px] md:pb-[140px] bg-gray-20 md:gap-[19px]'>
        <ul className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
          <CountQuestion count={profile.questionCount} />
          <QnAList name={profile.name} imageSource={profile.imageSource} questionList={questionList} />
          {listLoading && (
            <div className='flex justify-center items-center my-10'>
              <div className='w-10 h-10 border-4 border-t-transparent border-brown-30 rounded-full animate-spin' />
            </div>
          )}
          <div ref={observerRef} className='h-[12px]' />
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
