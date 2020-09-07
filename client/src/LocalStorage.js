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

export const setProductCost = (cost) => {
  localStorage.setItem('productCost', JSON.stringify(cost));
};

export const getProductCost = () => {
  return localStorage.getItem('productCost')
    ? JSON.parse(localStorage.getItem('productCost'))
    : null;
};

export const setShippingDetails = (details) => {
  localStorage.setItem('shippingDetails', JSON.stringify(details));
};

export const getShippingDetails = () => {
  return localStorage.getItem('shippingDetails')
    ? JSON.parse(localStorage.getItem('shippingDetails'))
    : null;
};
