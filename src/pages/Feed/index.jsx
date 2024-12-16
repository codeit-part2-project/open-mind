import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionBySubjectId } from 'api/questions';
import thumbsUpIcon from 'assets/images/icons/thumbs-up.svg';
import thumbsDownIcon from 'assets/images/icons/thumbs-down.svg';
import messagesIcon from 'assets/images/icons/Messages.svg';
import qusetionBoxImg from 'assets/images/img_QusetionBox.svg';

const Feed = () => {
  const { id: subjectId } = useParams(); // URL에서 subjectId를 가져옴
  const [questions, setQuestions] = useState([]); // 질문 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(''); // 오류 메시지 상태
  const [favoriteCount, setFavoriteCount] = useState(0); // 좋아요 상태
  const [unFavoriteCount, setUnFavoriteCount] = useState(0); // 싫어요 상태

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError('');
        const params = { page: 1, pageSize: 10 }; // 필요한 경우 쿼리 파라미터 설정
        const response = await getQuestionBySubjectId(subjectId, params);
        if (response.results) {
          setQuestions(response.results);
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
  }, [subjectId]);

  if (loading) return <div className='feed-loading'>로딩 중...</div>;
  if (error) return <div className='feed-error'>오류: {error}</div>;

  const countingFavorite = () => {
    setFavoriteCount(favoriteCount + 1);
  };

  const countingUnFavorite = () => {
    setUnFavoriteCount(unFavoriteCount + 1);
  };

  return (
    <>
      <header className='bg-blue-50 h-[177px] '>헤더 입니다</header>
      <section className='feed__section flex flex-col gap-[48px] justify-center items-center box-border bg-gray-20 p-[24px] pt-[176px] md:p-[32px]'>
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
                    <div className='like__container flex gap-[32px] text-gray-60 border-t pt-[25px] '>
                      <button type='button' onClick={countingFavorite} className='like-count__container flex justify-center items-center gap-[6px]'>
                        <img src={thumbsUpIcon} alt='좋아요' />
                        <p className='text-sm leading-[18px] font-medium text-gray-40'>좋아요 {favoriteCount}</p>
                      </button>
                      <button type='button' onClick={countingUnFavorite} className='unlike-count__container flex justify-center items-center gap-[6px]'>
                        <img src={thumbsDownIcon} alt='싫어요' />
                        <p className='text-sm leading-[18px] font-medium text-gray-40'>싫어요 {unFavoriteCount}</p>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <img src={qusetionBoxImg} alt='질문박스 이미지' />
          )}
        </div>
        <button type='button' className='bg-brown-40 shadow-3pt px-[24px] py-[12px] rounded-[200px] text-gray-10 text-xl font-normal leading-[25px] self-end'>
          <span className='block md:hidden'>질문 작성</span>
          <span className='hidden md:block'>질문 작성하기</span>
        </button>
      </section>
    </>
  );
};

export default Feed;
