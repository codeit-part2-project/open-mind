import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById, deleteSubject } from 'api/subjects';
import Header from 'components/Header';
import DeleteIdBtn from 'components/DeleteIdBtn';
import CountQuestion from 'components/CountQuestion';
import QnAList from 'components/QnAList';
import ToastDeleteId from 'components/ToastDeleteId';
import questionBoxImg from 'assets/images/img_QuestionBox.svg';

const Answer = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const localId = localStorage.getItem('id');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await deleteSubject(id);
      if (!response.ok) {
        throw new Error('삭제 중 오류가 발생했습니다. 3초 후 페이지를 새로고침 합니다.');
      }
      localStorage.removeItem('id');
      setIsDelete(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
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
        if (!isDelete) {
          if (localId === id) {
            const response = await getSubjectById(id);
            setIsLoading(true);
            if (typeof response === 'string' && response.includes('에러')) {
              throw new Error('존재하지 않는 피드로 접근하여 오류가 발생했습니다. 잠시 후 홈으로 이동합니다.');
            } else {
              setSubject(response);
            }
          } else {
            throw new Error('잘못된 접근입니다. 잠시 후 홈으로 이동합니다.');
          }
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubject();
  }, [id, isDelete, localId, navigate]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <>
      <Header imageSource={subject.imageSource} name={subject.name} />
      <div className='flex flex-col items-center justify-center gap-[8px] md:gap-[19px] box-border bg-gray-20 pt-[145px] md:pt-[135px] p-[24px] pb-[168px] md:p-[32px] md:pb-[140px]'>
        <DeleteIdBtn onClick={handleDelete} id={id} />
        {isDelete ? (
          <div className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
            <CountQuestion count={0} />
            <img src={questionBoxImg} alt='질문 박스 이미지' className='mx-auto mt-[50px] mb-[86px] h-[118px] w-[114px] md:mt-[54px] md:mb-[49px] md:h-[154px] md:w-[150px]' />
          </div>
        ) : (
          <ul className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
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
