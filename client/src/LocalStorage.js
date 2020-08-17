export const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

  return cartItems;
};

export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const setUserInfo = ({
  _id = '',
  username = '',
  email = '',
  password = '',
  name = '',
  alias = '',
  phone = '',
  adresses = '',
  birthday,
  avatar,
  token = '',
  isAdmin = false,
  date,
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      _id,
      username,
      email,
      password,
      name,
      alias,
      phone,
      adresses,
      birthday,
      avatar,
      token,
      isAdmin,
      date,
    })
  );
};

export const getUserInfo = () => {
  return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { username: '', password: '', email: '' };
};

export const logOut = () => {
  return localStorage.getItem('userInfo')
    ? localStorage.removeItem('userInfo')
    : null;
};
