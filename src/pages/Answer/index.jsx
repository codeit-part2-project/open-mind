import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectById } from 'api/subjects';
import FeedHeader from 'components/feedHeader';
import Toast from 'components/toast';

const Answer = () => {
  const { id } = useParams();
  const [isToast, setIsToast] = useState(false);
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToastLoad = () => {
    setIsToast(true);

    setTimeout(() => {
      setIsToast(false);
    }, 4950);
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
      <FeedHeader onClick={handleToastLoad} />
      {isToast && <Toast />}
    </>
  );
};

export default Answer;
