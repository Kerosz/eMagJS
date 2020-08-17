import axios from 'axios';
import Config from './Config';
import { getUserInfo } from './LocalStorage';

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

  register: async ({ username, email, password }) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/users/register`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username,
          email,
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

  subscribe: async ({ name, email }) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/newsletter/subscribe`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          name,
          email,
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

  update: async ({
    name,
    alias,
    phone,
    birthday,
    username,
    email,
    password,
  }) => {
    const { _id, token } = getUserInfo();

    try {
      const response = await axios({
        url: `${apiUrl}/api/users/update`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: _id,
          name,
          alias,
          phone,
          birthday,
          username,
          email,
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
