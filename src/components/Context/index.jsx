import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  /**
   * children prop 유효성 검사
   * PropType.node : 해당 prop 값이 렌더링 가능한 값이어야 됨
   * isRequired : children prop은 필수임
   */
  AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [postObject, setPostObject] = useState(null);
  /**
   * openModal 함수 사용 시 data 객체를 아래처럼 주어야합니다.
   * return 되는 값은 data 객체를 가지고 있는 내부 함수 입니다.
   * onClick={openModal({ id : 1, name : 'test', imageSource : 'https://example.com'})}처럼 리턴받는 함수를 핸들러로 등록하면 됩니다.
   * @param {{ id : 1, name : 'test', imageSource : 'https://exmaple.com/'}} data
   * @returns { () => {setProfile(data); setIsModalOpen(true); } }
   */
  const openModal = (data) => () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.documentElement.style.setProperty('--scroll-bar-width', `${scrollBarWidth}px`); // CSS 변수 설정

    setProfile(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = 0;
    document.documentElement.style.removeProperty('--scroll-bar-width'); // CSS 변수 제거
    setIsModalOpen(false);
  };

  const contextValue = useMemo(() => ({ isModalOpen, profile, openModal, closeModal, postObject, setPostObject }), [isModalOpen, profile, postObject]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
