import axios from 'axios';
import Config from './Config';

const { apiUrl } = Config;

const Api = {
  // eslint-disable-next-line consistent-return
  getData: async () => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response || response.statusText !== 'OK') {
        console.error(`
          Error: ${response.status}
          Message: ${JSON.stringify(response.data.message)}
        `);
        throw new Error(response.data.message);
      }

      if (!response.data.products) {
        console.warn('There was no products data in the response');
      }
      return response.data.products;
    } catch (err) {
      console.error(err);
      return { error: err.message };
    }
  },

  getProduct: async (id) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/products/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response || response.statusText !== 'OK') {
        console.error(`
          Error: ${response.status}
          Message: ${JSON.stringify(response.data.message)}
        `);
        throw new Error(response.data.message);
      }

      if (!response.data) {
        console.warn('There was no data in the response');
      }
      return response.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.message || err.message };
    }
  },

  signin: async ({ username, password }) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/users/signin`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username,
          password,
        },
      });

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.message };
    }
  },
};

export default Api;
