const getDynamicLimit = () => {
  const screenHeight = window.innerHeight;
  if (screenHeight <= 600) {
    return 5;
  }
  if (screenHeight <= 1200) {
    return 10;
  }
  return 15;
};

export default getDynamicLimit;
