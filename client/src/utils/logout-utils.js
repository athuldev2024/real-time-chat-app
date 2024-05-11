const logout = (callBack) => {
  localStorage.clear();
  callBack && callBack();
};

export default logout;
