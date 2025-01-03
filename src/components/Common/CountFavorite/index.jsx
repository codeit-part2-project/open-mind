import { useState } from 'react';
import { postReaction } from 'api/questions';
import { ReactComponent as ThumbsUpIcon } from 'assets/images/icons/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from 'assets/images/icons/thumbs-down.svg';
import PropTypes from 'prop-types';

const CountFavorite = ({ like, dislike, id }) => {
  CountFavorite.propTypes = {
    like: PropTypes.number.isRequired,
    dislike: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  };

  const [favoriteCount, setFavoriteCount] = useState(like);
  const [unFavoriteCount, setUnFavoriteCount] = useState(dislike);
  const [clickFavorite, setClickFavorite] = useState(false);
  const [clickUnFavorite, setClickUnFavorite] = useState(false);

  const countingHandleFavorite = () => {
    if (!clickFavorite && !clickUnFavorite) {
      setClickFavorite(true);
      setClickUnFavorite(false);
      setFavoriteCount((prev) => prev + 1);
      postReaction(id, { type: 'like' });
    }
  };

  const countingHandleUnFavorite = () => {
    if (!clickFavorite && !clickUnFavorite) {
      setClickFavorite(false);
      setClickUnFavorite(true);
      setUnFavoriteCount((prev) => prev + 1);
      postReaction(id, { type: 'dislike' });
    }
  };

  return (
    <div className=' flex gap-[32px] text-gray-60 border-t pt-[25px] '>
      <button type='button' onClick={countingHandleFavorite} className='flex justify-center items-center gap-[6px]'>
        <ThumbsUpIcon className={`${clickFavorite ? 'fill-blue-50' : 'fill-gray-40'}`} />
        <p className={`text-sm leading-[18px] font-medium  ${clickFavorite ? 'text-blue-50' : 'text-gray-40'}`}>좋아요 {`${favoriteCount || ''}`}</p>
      </button>
      <button type='button' onClick={countingHandleUnFavorite} className='flex justify-center items-center gap-[6px]'>
        <ThumbsDownIcon className={`${clickUnFavorite ? 'fill-gray-60' : 'fill-gray-40'}`} />
        <p className={`text-sm leading-[18px] font-medium ${clickUnFavorite ? 'text-gray-60' : 'text-gray-40'} `}>싫어요 {`${unFavoriteCount || ''}`}</p>
      </button>
    </div>
  );
};

export default CountFavorite;
