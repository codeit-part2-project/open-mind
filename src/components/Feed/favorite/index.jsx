import { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ThumbsUpIcon } from 'assets/images/icons/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from 'assets/images/icons/thumbs-down.svg';

// const handlePostReaction = async (questionId, reactionType) => {
//   try {

//   }
// }

const CountingFavorite = ({ like, dislike }) => {
  const [favoriteCount, setFavoriteCount] = useState(like);
  const [unFavoriteCount, setUnFavoriteCount] = useState(dislike);
  const [clickFavorite, setClickFavorite] = useState(false);
  const [clickUnFavorite, setClickUnFavorite] = useState(false);

  // const [postLoading, setPostLoading] = useState(true);
  // const [postError, setPostError] = useState('');

  CountingFavorite.propTypes = {
    like: PropTypes.number.isRequired,
    dislike: PropTypes.number.isRequired,
  };

  const countingHandleFavorite = () => {
    if (clickFavorite) {
      setClickFavorite(false);
      setFavoriteCount(favoriteCount - 1);
    } else {
      setClickFavorite(true);
      setFavoriteCount(favoriteCount + 1);
    }
  };

  const countingHandleUnFavorite = () => {
    if (clickUnFavorite) {
      setClickUnFavorite(false);
      setUnFavoriteCount(unFavoriteCount - 1);
    } else {
      setClickUnFavorite(true);
      setUnFavoriteCount(unFavoriteCount + 1);
    }
  };

  return (
    <div className=' flex gap-[32px] text-gray-60 border-t pt-[25px] '>
      <button type='button' onClick={countingHandleFavorite} className='flex justify-center items-center gap-[6px]'>
        <ThumbsUpIcon className={`${clickFavorite ? 'fill-blue-50' : 'fill-black'}`} onClick={countingHandleFavorite} />
        <p className={`text-sm leading-[18px] font-medium  ${clickFavorite ? 'text-blue-50' : 'text-gray-40'}`}>좋아요 {favoriteCount}</p>
      </button>
      <button type='button' onClick={countingHandleUnFavorite} className='flex justify-center items-center gap-[6px]'>
        <ThumbsDownIcon className={`${clickUnFavorite ? 'fill-red-50' : 'fill-black'}`} onClick={countingHandleUnFavorite} />
        <p className={`text-sm leading-[18px] font-medium ${clickUnFavorite ? 'text-red-50' : 'text-gray-40'} `}>싫어요 {unFavoriteCount}</p>
      </button>
    </div>
  );
};

export default CountingFavorite;
