import Logo from 'assets/images/img_Logo.svg';
import CardList from 'components/CardList';
import { Link } from 'react-router-dom';

const QuestionList = () => (
  <div className='min-w-[375px] mt-10 mb-10'>
    <div className='ml-6 mr-6'>
      <header className='flex flex-col items-center gap-[20px] mb-[52px]'>
        <div>
          <Link to='/'>
            <img className='w-[146px] h-[57px]' src={Logo} alt='site-logo' />
          </Link>
        </div>
        <div>
          <button className='flex flex-row justify-bettwen gap-[4px] bg-brown-10 border-brown-40 border rounded-lg px-3 py-2 text-sm text-brown-40 font-normal whitespace-nowrap' type='button'>
            <div>답변하러 가기</div>
            <div>→</div>
          </button>
        </div>
      </header>
      <section className='flex flex-row justify-between gap-[42px] whitespace-nowrap mb-4'>
        <h1 className='text-2xl font-normal flex-1'>누구에게 질문할까요?</h1>
        <div className='bg-gray-10 border-gray-40 border rounded-lg border-solid px-3 py-2 text-sm text-gray-40 font-normal'>
          <select className='cursor-pointer'>
            <option>최신순</option>
            <option>이름순</option>
          </select>
        </div>
      </section>
      <CardList />
    </div>
  </div>
);

export default QuestionList;
