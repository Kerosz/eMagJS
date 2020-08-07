export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');

  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

const Config = {
  apiUrl: 'http://localhost:5000',
};

export default Config;
