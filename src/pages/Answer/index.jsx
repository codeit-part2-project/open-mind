import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById, deleteSubject } from 'api/subjects';
import { getQuestionBySubjectId } from 'api/questions';
import Header from 'components/Common/Header';
import DeleteIdBtn from 'components/DeleteIdBtn';
import CountQuestion from 'components/Common/CountQuestion';
import QnAList from 'components/Common/QnAList';
import ToastDeleteId from 'components/UI/Toast/ToastDeleteId';
import questionBoxImg from 'assets/images/img_QuestionBox.svg';
import ConfirmModal from 'components/UI/Modals/ConfirmModal';
import ToastDelete from 'components/UI/Toast/ToastSuccess';
import getDynamicLimit from 'utils/getDynamicLimit';

const Answer = () => {
  const { id: subjectId } = useParams();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [questionCount, setQuestionCount] = useState(0);
  const [isDeleteId, setIsDeleteId] = useState(false);
  const [isToast, setIsToast] = useState(null);
  const LocalId = localStorage.getItem('id');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const [questionList, setQuestionList] = useState([]);

  const [listLoading, setListLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const observerRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    document.body.style.overflow = '';
    document.body.style.paddingRight = 0;
  };

  const handleModalConfirm = async () => {
    setShowModal(false);
    try {
      const response = await deleteSubject(subjectId);
      if (!response.ok) {
        throw new Error('삭제 중 오류가 발생했습니다.');
      }
      localStorage.removeItem('id');
      setIsDeleteId(true);
      setTimeout(() => {
        setIsDeleteId(true);
        navigate('/');
      }, 2000);
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  const handleQuestionDelete = () => {
    setProfile((prevSubject) => ({
      ...prevSubject,
      questionCount: prevSubject.questionCount - 1,
    }));
    setQuestionCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        setProfileLoading(true);

        if (!isDeleteId) {
          if (LocalId === subjectId) {
            const response = await getSubjectById(subjectId);
            if (typeof response === 'string' && response.includes('에러')) {
              throw new Error('존재하지 않는 답변 페이지입니다.');
            } else {
              setProfile(response);
              setQuestionCount(response.questionCount);
            }
          } else {
            throw new Error('허용되지 않은 페이지 접근입니다.');
          }
        }
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setProfileLoading(false);
      }
    };

    getProfile();
  }, [subjectId, isDeleteId, LocalId, navigate]);

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
      <div className='flex flex-col items-center justify-center gap-1.5 px-[24px] md:px-[32px] pt-[176px] md:pt-[189px] pb-[168px] md:pb-[140px] bg-gray-20 md:gap-[9px]'>
        <DeleteIdBtn onClick={handleDelete} id={subjectId} />
        {isDeleteId ? (
          <div className='w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[714px] md:max-w-[704px]'>
            <CountQuestion count={0} />
            <img src={questionBoxImg} alt='질문 박스 이미지' className='mx-auto mt-[50px] mb-[86px] h-[118px] w-[114px] md:mt-[54px] md:mb-[49px] md:h-[154px] md:w-[150px]' />
          </div>
        ) : (
          <ul className='w-full max-w-full bg-brown-10 border border-brown-20 rounded-[16px] pb-[16px] desktop:max-w-[716px] md:max-w-[704px]'>
            <CountQuestion count={questionCount} />
            <QnAList
              name={profile.name}
              imageSource={profile.imageSource}
              questionList={questionList}
              setQuestionList={setQuestionList}
              onDeleteQuestion={handleQuestionDelete}
              setIsToast={setIsToast}
            />
            {listLoading && (
              <div className='flex justify-center items-center my-10'>
                <div className='w-10 h-10 border-4 border-t-transparent border-brown-30 rounded-full animate-spin' />
              </div>
            )}
            <div ref={observerRef} className='h-[12px]' />
          </ul>
        )}
      </div>
      {isDeleteId && <ToastDeleteId />}
      {isToast && <ToastDelete toastMsg={isToast} />}
      <ConfirmModal isOpen={showModal} onConfirm={handleModalConfirm} onCancel={handleModalCancel} message='정말로 삭제하시겠습니까?' />
    </div>
  );
};

export default Answer;
