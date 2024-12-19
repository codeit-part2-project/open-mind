import PropTypes from 'prop-types';
import { ReactComponent as QuestionImage } from 'assets/images/icons/ic_Messages.svg';
import { useNavigate } from 'react-router-dom';

const CardList = ({ cards }) => {
  const Navigate = useNavigate();

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

  const cardMove = (id) => {
    Navigate(`/post/${id}`);
  };

  return (
    <div className='mx-6 md:mx-8'>
      <div className='grid grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5 tablet:grid-cols-tabletLow tablet:justify-center'>
        {cards.map((item) => (
          <div onClick={() => cardMove(item.id)} role='presentation' className='flex flex-col justify-between border rounded-2xl border-gray-40 bg-gray-10 px-4 py-4 cursor-pointer' key={item.id}>
            <div className='flex flex-col'>
              <img className='rounded-full object-cover size-12 leading-6 mb-3' src={item.imageSource} alt='유저프로필' />
              <div className='text-[18px] text-gray-60 font-normal mb-[30px]'>{item.name}</div>
            </div>
            <div className='flex items-center text-gray-40 text-[14px] leading-[18px] font-normal gap-1'>
              <QuestionImage alt='질문아이콘' className='size-4 fill-gray-40' />
              <div className='flex-1'>받은 질문</div>
              <div>{item.questionCount}개</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
