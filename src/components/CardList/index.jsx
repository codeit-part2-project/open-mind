import PropTypes from 'prop-types';
import QuestionImage from 'assets/images/icons/ic_Messages.svg';

const CardList = ({ cards }) => {
  CardList.propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        imageSource: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        questionCount: PropTypes.number.isRequired,
      }),
    ).isRequired,
  };

  return (
    <div className='grid gap-4 grid-cols-mobaileLow justify-center mx-6 mb-[31px] max-lg:hide-after-6 md:grid-cols-tabletLow md:mx-[130px] md:mb-[61px] md:gap-5 lg:grid-cols-pcLow lg:mx-[130px] lg:mb-[46px] pc:mb-10 pc:mx-[130px]'>
      {cards.map((item) => (
        <div className=' max-w-[220px] border rounded-2xl border-gray-40 bg-gray-10 px-4 py-4' key={item.id}>
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

export default CardList;
