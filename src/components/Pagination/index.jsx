import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import IconLeftArrow from 'assets/images/icons/ic_Arrow-left.svg';
import IconRightArrow from 'assets/images/icons/ic_Arrow-right.svg';

const Pagination = ({ data }) => {
  const { limit, sort, count, mobile, setLimit, setOffset } = data;
  const [activeNum, setActiveNum] = useState(1);
  const [disabledArrowLeft, setDisabledArrowLeft] = useState(true);
  const [disabledArrowRight, setDisabledArrowRight] = useState(false);

  // 페이지네이션의 시작 번호 계산 (ex.두번째 페이지네이션 : 6)
  const startNum = Math.floor((activeNum - 1) / 5) * 5 + 1;
  // 페이지네이션 번호 버튼 배열
  const pages = Array.from({ length: Math.min(5, Math.ceil(count / limit - startNum) + 1) }, (_, i) => startNum + i);

  // 페이지 번호 선택에 따른 상태 변경 함수
  const pageSelect = useCallback(
    (pageNum) => {
      setActiveNum(pageNum);
      setLimit(limit);
      setOffset((pageNum - 1) * limit);
    },
    [limit, setOffset, setLimit],
  );

  // 페이지네이션 이동 버튼 유효성 검사
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
    const cardCnt = mobile ? 6 : 8;
    setLimit(cardCnt);
    if (activeNum > Math.ceil(count / cardCnt)) {
      setActiveNum(Math.ceil(count / cardCnt));
      setOffset((Math.ceil(count / cardCnt) - 1) * cardCnt);
    } else {
      setOffset((activeNum - 1) * cardCnt);
    }
  }, [mobile, count, setLimit, setOffset, activeNum]);

  return (
    <div className='flex gap-6'>
      <button type='button' onClick={prevClick} disabled={disabledArrowLeft}>
        <img src={IconLeftArrow} alt='왼쪽 화살표' />
      </button>
      {pages.map((value) => {
        const active = activeNum === value ? 'bg-red-50' : 'bg-yellow-50';
        return (
          <button type='button' key={value} onClick={() => pageSelect(value)} className={`${active}`}>
            {value}
          </button>
        );
      })}
      <button type='button' onClick={nextClick} disabled={disabledArrowRight}>
        <img src={IconRightArrow} alt='오른쪽 화살표' />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  data: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    sort: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    mobile: PropTypes.bool.isRequired,
    setLimit: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
  }).isRequired,
};
export default Pagination;
