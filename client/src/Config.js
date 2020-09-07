import { getCartItems } from './LocalStorage';

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');

  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

export const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = '/checkout?ref=shipping';
  } else {
    document.location.hash = '/myaccount';
  }
};

const Config = {
  apiUrl: 'http://localhost:5000',
};

export default Config;
