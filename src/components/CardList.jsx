import { useState, useEffect, useCallback } from 'react';
import { getSubject } from 'api/subjects';
import QuestionImage from 'assets/images/icons/ic_Messages.svg';

const Card = () => {
  const [data, setData] = useState([]); // API 응답 데이터 저장

  // API에서 데이터 받아오기
  const userList = useCallback(async () => {
    setData(await getSubject());
  }, []);

  useEffect(() => {
    userList();
  }, [userList]);

  return (
    <div className='grid grid-cols-2 gap-4 '>
      {Array.isArray(data.results) &&
        data.results.map((item) => (
          <div className='border rounded-2xl border-gray-40 bg-gray-10 px-4 py-4' key={item.id}>
            <div className='flex flex-col'>
              <img className='rounded-full object-cover size-12 leading-6 mb-3' src={item.imageSource} alt='유저프로필' />
              <div className='text-[18px] text-gray-60 font-normal mb-[30px]'>{item.name}</div>
            </div>
            <div className='flex items-center text-gray-40 text-[14px] leading-[18px] font-normal gap-1'>
              <img className='size-4' src={QuestionImage} alt='질문아이콘' />
              <div className='flex-1'>받은 질문</div>
              <div>{item.questionCount}개</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Card;
