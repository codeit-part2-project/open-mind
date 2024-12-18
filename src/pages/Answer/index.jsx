import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById } from 'api/subjects';
// import { deleteSubject } from 'api/subjects';
import Header from 'components/Header';
import Delete from 'components/DeleteBtn';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';
import ToastDelete from 'components/ToastDeleteTxt';

const Answer = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isToastDelete, setIsToastDelete] = useState(false);

  const navigate = useNavigate();

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
      <Header imageSource={subject.imageSource} name={subject.name} />
      <div className='flex w-screen mt-[145px] justify-center'>
        <Delete onClick={handleDelete} id={id} />
        <ul className='pt-[353px] md:pt-[423px]'>
          <CountQuestion count={subject.questionCount} />
          <QnAList subjectId={subject.id} name={subject.name} imageSource={subject.imageSource} />
        </ul>
      </div>
      {isToastDelete && <ToastDelete />}
    </>
  );
};

export default Answer;
