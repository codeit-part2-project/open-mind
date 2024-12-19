import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById } from 'api/subjects';
import FeedHeader from 'components/feedHeader';
import Delete from 'components/delete';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';
import ToastUrlCopy from 'components/toastUrlCopy';
import ToastDelete from 'components/toastDelete';
// import { deleteSubject } from 'api/subjects';

const Answer = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isToastUrlCopy, setIsToastUrlCopy] = useState(false);
  const [isToastDelete, setIsToastDelete] = useState(false);

  const navigate = useNavigate();

  const handleToastUrlCopyLoad = () => {
    setIsToastUrlCopy(true);

    setTimeout(() => {
      setIsToastUrlCopy(false);
    }, 5000);
  };

  const handleToastDelete = () => {
    setIsToastDelete(true);

    setTimeout(() => {
      setIsToastDelete(false);
      navigate('/');
    }, 5000);
  };

  const handleDelete = () => {
    // deleteSubject(id);
    // ↑위 함수는 서버 데이터를 삭제하는 함수라서 일부로 막아뒀습니다. 삭제 동작은 확인했습니다.
    localStorage.removeItem('id');
    handleToastDelete();
  };

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
      <FeedHeader onClick={handleToastUrlCopyLoad} />
      <div className='flex flex-col items-center justify-center gap-[8px] md:gap-[19px] box-border bg-gray-20 pt-[145px] md:pt-[135px] p-[24px] pb-[168px] md:p-[32px] md:pb-[140px]'>
        <Delete onClick={handleDelete} id={id} />
        <ul className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
          <CountQuestion count={subject.questionCount} />
          <QnAList subjectId={subject.id} name={subject.name} imageSource={subject.imageSource} />
        </ul>
      </div>
      {isToastUrlCopy && <ToastUrlCopy />}
      {isToastDelete && <ToastDelete />}
    </>
  );
};

export default Answer;
