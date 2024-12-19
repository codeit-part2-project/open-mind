import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectById } from 'api/subjects';
import Header from 'components/Header';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';

const Feed = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getSubjectById(id);
        setSubject(response);
      } catch (err) {
        setError('질문 대상을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  if (!subject) {
    return <div>질문 대상을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <>
      <Header imageSource={subject.imageSource} name={subject.name} />
      <div className='flex flex-col items-center justify-center gap-[8px] md:gap-[19px] box-border bg-gray-20 pt-[176px] md:pt-[189px] p-[24px] pb-[168px] md:p-[32px] md:pb-[140px]'>
        <ul className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
          <CountQuestion count={subject.questionCount} />
          <QnAList subjectId={subject.id} name={subject.name} imageSource={subject.imageSource} />
        </ul>
        <button
          type='button'
          className='fixed bottom-[16px] right-[16px] self-end md:bottom-[24px] md:right-[24px] w-auto h-auto px-[16px] py-[8px] md:px-[24px] md:py-[12px] rounded-[200px] bg-brown-40 shadow-2pt text-gray-10 text-base md:text-xl font-normal leading-[25px]'
        >
          <span className='block md:hidden'>질문 작성</span>
          <span className='hidden md:block'>질문 작성하기</span>
        </button>
      </div>
    </>
  );
};

export default Feed;
