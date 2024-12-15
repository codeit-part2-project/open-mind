import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionBySubjectId } from 'api/questions';
import thumbsUpIcon from '../../assets/images/icons/thumbs-up.svg';
import thumbsDownIcon from '../../assets/images/icons/thumbs-down.svg';
import messagesIcon from '../../assets/images/icons/Messages.svg';
import qusetionBoxImg from '../../assets/images/img_QusetionBox.svg';

const Feed = () => {
  const { id: subjectId } = useParams(); // URL에서 subjectId를 가져옴
  const [questions, setQuestions] = useState([]); // 질문 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(''); // 오류 메시지 상태

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

  return (
    <>
      <header className='bg-blue-50 h-[177px] mb-[176px]'>헤더 입니다</header>
      <section className='feed__section flex justify-center items-center'>
        <div className='feed__container bg-brown-10 border border-brown-20 rounded-[16px]'>
          <div className='question-count__container flex justify-center items-center py-[16px] gap-[8px]'>
            <img src={messagesIcon} alt='말풍선 이미지' />
            {questions.length > 0 ? <h1>{questions.length}개의 질문이 있습니다</h1> : <h1>아직 질문이 없습니다.</h1>}
          </div>
          {questions.length > 0 ? (
            <ul className='feed-questions__ul'>
              {questions.map((question) => (
                <li key={question.id} className='feed-question__li '>
                  <div className='question__container flex flex-col justify-center p-[24px] gap-[24px] bg-gray-10 shadow-1pt'>
                    <p className='checked-answer '>답변 확인 표시</p>
                    <div className='question-title__container'>
                      <h2 className='question__title w-[247px]'>{question.content}</h2>
                      <p>2주 전</p>
                    </div>
                    {question.answer !== null && (
                      <div className='answer__container '>
                        <img src='' alt='유저 이미지' />
                        <div className='answer-text__container'>
                          <div className='user__text'>
                            <h3>유저 닉네임</h3>
                            <p>2주 전</p>
                          </div>
                          <p>{question.answer.content}</p>
                        </div>
                      </div>
                    )}
                    <div className='like__container'>
                      <div className='like-count__container'>
                        <img src={thumbsUpIcon} alt='좋아요' />
                        <p>좋아요</p>
                      </div>
                      <div className='unlike-count__container'>
                        <img src={thumbsDownIcon} alt='싫어요' />
                        <p>싫어요</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <img src={qusetionBoxImg} alt='질문박스 이미지' />
          )}
          <button type='button'>질문 작성하기</button>
        </div>
      </section>
    </>
  );
};

export default Feed;
