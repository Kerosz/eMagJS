import { getUserInfo } from '../LocalStorage';

const Account = {
  render: () => {
    const { username: user } = getUserInfo();

    return `
      ${user ? `<h1>Welcome ${user}</h1>` : `<h1>Account page</h1>`}
    `;
  },
};

export default Account;
