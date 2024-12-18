import { useState } from 'react';
import PropTypes from 'prop-types';
import DropDonwUpImg from 'assets/images/icons/ic_Arrow-up.svg';
import DropDownUnderImg from 'assets/images/icons/ic_Arrow-down.svg';

const SortDropDown = ({ changeSort }) => {
  SortDropDown.propTypes = {
    changeSort: PropTypes.func.isRequired,
  };
  const [isOpen, setIsOpen] = useState(false);

  const [sortText, setSortText] = useState('최신순');

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onClick = ({ target }) => {
    setIsOpen(false);
    if (sortText === target.textContent) return;
    setSortText(target.textContent);
    changeSort(target.textContent);
  };

  return (
    <div className='relative'>
      <button type='button' className={`flex items-center gap-2 border rounded-lg py-2 px-3 text-sm  ${isOpen ? 'border-gray-60' : 'border-gray-40'} `} onClick={toggleDropdown}>
        <span className={`text-sm ${isOpen ? 'text-gray-40' : 'text-gray-60'}`}>{sortText}</span>
        <img src={isOpen ? DropDonwUpImg : DropDownUnderImg} alt='화살표 이미지' />
      </button>
      {isOpen && (
        <ul className='flex flex-col items-center mt-2 border rounded-lg border-gray-30 text-sm cursor-pointer'>
          <li className={`py-1 ${sortText === '이름순' ? 'text-blue-50' : ''}`} onClick={onClick} role='presentation'>
            이름순
          </li>
          <li className={`py-1 ${sortText === '최신순' ? 'text-blue-50' : ''}`} onClick={onClick} role='presentation'>
            최신순
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortDropDown;
