import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as IconLeftArrow } from 'assets/images/icons/ic_Arrow-left.svg';
import { ReactComponent as IconRightArrow } from 'assets/images/icons/ic_Arrow-right.svg';

const Pagination = ({ data }) => {
  Pagination.propTypes = {
    data: PropTypes.shape({
      limit: PropTypes.number.isRequired,
      sort: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      pageWidth: PropTypes.number.isRequired,
      setLimit: PropTypes.func.isRequired,
      setOffset: PropTypes.func.isRequired,
    }).isRequired,
  };
  const { limit, sort, count, pageWidth, setLimit, setOffset } = data;
  const [activeNum, setActiveNum] = useState(1);
  const [disabledArrowLeft, setDisabledArrowLeft] = useState(true);
  const [disabledArrowRight, setDisabledArrowRight] = useState(false);

  const btnHoverAnimation = 'hover:transform hover:translate-y-[-5px] transition-transform duration-300 ease-in-out';

  const startNum = Math.floor((activeNum - 1) / 5) * 5 + 1;

  const pages = Array.from({ length: Math.min(5, Math.ceil(count / limit - startNum) + 1) }, (_, i) => startNum + i);

  const pageSelect = useCallback(
    (pageNum) => {
      setActiveNum(pageNum);
      setLimit(limit);
      setOffset((pageNum - 1) * limit);
    },
    [limit, setOffset, setLimit],
  );

  const checkArrowBtn = useCallback(() => {
    const divActiveNum = Math.floor((activeNum - 1) / 5);
    const divTotalPageNum = Math.floor((Math.ceil(count / limit) - 1) / 5);
    if (activeNum > 5) setDisabledArrowLeft(false);
    else setDisabledArrowLeft(true);

    if (count <= limit * 5) {
      setDisabledArrowRight(true);
    }
    // 현재 페이지네이션이 마지막 단계인지 검사
    if (divActiveNum === divTotalPageNum) setDisabledArrowRight(true);
    else setDisabledArrowRight(false);
  }, [limit, activeNum, count]);

  const prevClick = () => {
    pageSelect(startNum - 5);
  };

  const nextClick = () => {
    pageSelect(startNum + 5);
  };

  useEffect(() => {
    setActiveNum(1);
  }, [sort]);

  useEffect(() => {
    checkArrowBtn();
  }, [checkArrowBtn]);

  useEffect(() => {
    const cardCnt = pageWidth <= 867 ? 6 : 8;
    setLimit(cardCnt);
    if (activeNum > Math.ceil(count / cardCnt)) {
      setActiveNum(Math.ceil(count / cardCnt));
      setOffset((Math.ceil(count / cardCnt) - 1) * cardCnt);
    } else {
      setOffset((activeNum - 1) * cardCnt);
    }
  }, [pageWidth, count, setLimit, setOffset, activeNum]);

  return (
    <div className='flex justify-center items-center relative font-actor my-8 md:mt-20 md:mb-16'>
      {pages.length === 0 ? (
        <div className='absolute top-0 bottom-0 w-[300px] h-[28px] border rounded-2xl flex justify-center items-center bg-gray-20 z-10' />
      ) : (
        <>
          <button type='button' onClick={prevClick} disabled={disabledArrowLeft} className={`px-3 ${disabledArrowLeft ? '' : btnHoverAnimation}`}>
            <IconLeftArrow alt='왼쪽 화살표' className='fill-gray-40' />
          </button>
          {pages.map((value) => {
            const activeColor = activeNum === value ? 'font-semibold text-brown-40' : 'text-gray-40';
            return (
              <button type='button' key={value} onClick={() => pageSelect(value)} className={`px-3 text-xl ${activeColor} ${btnHoverAnimation}`}>
                {value}
              </button>
            );
          })}
          <button type='button' onClick={nextClick} disabled={disabledArrowRight} className={`px-3 ${disabledArrowRight ? '' : btnHoverAnimation}`}>
            <IconRightArrow alt='오른쪽 화살표' className='fill-gray-40' />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
