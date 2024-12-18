import { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionBySubjectId } from 'api/questions';

import { AppContext } from 'components/Context';

import messagesIcon from 'assets/images/icons/Messages.svg';
import qusetionBoxImg from 'assets/images/img_QusetionBox.svg';
import CountingFavorite from 'components/Feed/favorite';

const Feed = () => {
  const { id: subjectId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const observerRef = useRef(null);

  const { openModal } = useContext(AppContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError('');
        const params = { limit: 3, offset };
        const response = await getQuestionBySubjectId(subjectId, params);
        if (response.results) {
          setQuestions((prev) => [...prev, ...response.results]);
          setHasMore(response.results.length > 0);
        } else {
          throw new Error('질문 데이터를 가져오는 데 실패했습니다.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId, offset]);

  const loadMoreQuestions = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        setOffset((prev) => prev + 3);
      }
    },
    [hasMore, loading],
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

  if (loading && questions.length === 0) return <div className='feed-loading'>로딩 중...</div>;
  if (error) return <div className='feed-error'>오류: {error}</div>;

  return (
    <section className='feed__section flex flex-col gap-[48px] justify-center items-center bg-gray-20 p-[24px] pt-[176px] md:p-[32px]'>
      <div className='feed__container bg-brown-10 border border-brown-20 rounded-[16px] w-full pb-[16px] max-w-[327px] desktop:max-w-[716px] md:max-w-[704px]'>
        <div className='question-count__container flex justify-center items-center py-[16px] gap-[8px] '>
          <img src={messagesIcon} alt='말풍선 이미지' />
          {questions.length > 0 ? (
            <h1 className='text-lg font-normal text-brown-40 leading-6 md:text-xl md:leading-[25px]'>{questions.length}개의 질문이 있습니다</h1>
          ) : (
            <h1 className='text-lg font-normal text-brown-40 leading-6 md:text-xl md:leading-[25px]'>아직 질문이 없습니다.</h1>
          )}
        </div>
        {questions.length > 0 ? (
          <ul className='feed-questions__ul flex flex-col gap-[16px]'>
            {questions.map((question) => (
              <li key={question.id} className='feed-question__li '>
                <div className='question__container flex flex-col justify-center p-[24px] gap-[24px] bg-gray-10 shadow-1pt rounded-2xl mx-[16px] box-border'>
                  <span className='checked-answer inline-block w-auto max-w-max border-brown-40 border rounded-lg border-solid text-sm font-medium text-brown-40 px-[12px] py-[4px]'>
                    답변 확인 표시
                  </span>
                  <div className='question-title__container flex flex-col gap-[4px]'>
                    <p className='text-sm leading-[18px] font-normal text-gray-40'>질문·2주 전</p>
                    <h2 className='question__title text-base font-normal leading-[22px] md:text-lg md:leading-6'>{question.content}</h2>
                  </div>
                  {question.answer !== null && (
                    <div className='answer__container '>
                      <img src='' alt='유저 이미지' />
                      <div className='answer-text__container'>
                        <div className='user__text'>
                          <h3>유저 닉네임</h3>
                          <p>2주 전</p>
                        </div>
                        <p className='border-b-1 border-gray-30'>{question.answer.content}</p>
                      </div>
                    </div>
                  )}
                  <CountingFavorite like={question.like} dislike={question.dislike} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <img src={qusetionBoxImg} alt='질문박스 이미지' />
        )}
        <div ref={observerRef} className='h-1' />
      </div>
      <button
        type='button'
        className='bg-brown-40 shadow-3pt px-[24px] py-[12px] rounded-[200px] text-gray-10 text-xl font-normal leading-[25px] self-end'
        onClick={openModal({ id: 9425, name: '테스트', imageSource: 'https://fastly.picsum.photos/id/208/200/200.jpg?hmac=J1BdqRgAAAId9wernbPINrW38haBGOtrpEqn3m2wjlY' })}
      >
        <span className='block md:hidden'>질문 작성</span>
        <span className='hidden md:block'>질문 작성하기</span>
      </button>
    </section>
  );
};

export default Feed;
