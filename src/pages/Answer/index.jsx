import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById, deleteSubject } from 'api/subjects';
import Header from 'components/Header';
import DeleteIdBtn from 'components/DeleteIdBtn';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';
import ToastDeleteId from 'components/ToastDeleteId';

const Answer = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const isLocalId = localStorage.getItem('id');
  const navigate = useNavigate();

  const handleToastDelete = () => {
    setIsDelete(true);

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleDelete = async () => {
    // const userConfirmed = window.confirm('정말로 삭제하시겠습니까?', ''); // user 확인작업은 confirm으로 임시로 만들었습니다.
    // if (userConfirmed) {
    // }
    // NOTE: 사용자에게 정말로 삭제할 것인지 2차로 확인하는 동작 구현을 위해 작성한 코드 입니다.
    //       window.confirm이 린터 규칙 문제가 있을 것 같아서 일단은 주석처리 하였습니다.

    try {
      const response = await deleteSubject(id);
      if (!response.ok) {
        throw new Error('삭제 중 오류가 발생했습니다. 페이지를 새로고침 합니다.');
      }
      localStorage.removeItem('id');
      handleToastDelete();
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (!isDelete) {
          if (isLocalId) {
            const response = await getSubjectById(id);
            setSubject(response);
          } else {
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }
        }
      } catch (err) {
        setError('질문 대상을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubject();
  }, [id, isDelete, isLocalId, navigate]);

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
      <div className='flex flex-col w-screen mt-[145px] justify-center items-center'>
        <DeleteIdBtn onClick={handleDelete} id={id} />
        {isDelete ? (
          <CountQuestion count={0} />
        ) : (
          <ul>
            <CountQuestion count={subject.questionCount} />
            <QnAList subjectId={subject.id} name={subject.name} imageSource={subject.imageSource} />
          </ul>
        )}
      </div>
      {isDelete && <ToastDeleteId />}
    </>
  );
};

export default Answer;
