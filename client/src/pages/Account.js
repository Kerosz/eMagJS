import { getUserInfo } from '../LocalStorage';

const Account = {
  render: () => {
    const { username } = getUserInfo();

    return `
      ${username ? `<h1>Welcome ${username}</h1>` : `<h1>Account page</h1>`}
    `;
  },
};

export default Account;
