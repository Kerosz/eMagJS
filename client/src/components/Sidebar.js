import { logOut, getUserInfo } from '../LocalStorage';

const Sidebar = {
  update: () => {
    document.getElementById('logout').addEventListener('click', () => {
      logOut();
      document.location.hash = '/';
    });
  },

  render: (profile = true) => {
    const { isAdmin: admin, name, username, avatar } = getUserInfo();

    return `
      <div class='account__sidebar'>
        <ul class='account__menu'>
          ${
            profile
              ? `
            <li class="account__profile">
              <img src="${avatar}" alt="${username}"/>
              <span>${name || username}</span>
            </li>
          `
              : `<li class='account__title'>Account Menu</li>`
          }
          <a href='/#/myaccount' class='account__link'>
            <li class='account__item'>
                Profile
            </li>
          </a>
          <a href='/#/myaccount?ref=orders' class='account__link'>
            <li class='account__item'>
                Orders
            </li>
          </a>
          <a href='/#/myaccount?ref=wishlist' class='account__link'>
            <li class='account__item'>
                Wishlist
            </li>
          </a>
          <a href='/#/myaccount?ref=settings' class='account__link'>
            <li class='account__item'>
                Settings
            </li>
          </a>
          <a class='account__link' id="logout">
            <li class='account__item'>
                Log Out
            </li>
          </a>
          ${
            admin
              ? `
          <a href='/#/admin-dashboard' target="_blank" class='account__link-admin btn-secondary'>
            <li class='account__item'>
                Admin Dashboard
            </li>
          </a>
          `
              : ''
          }
        </ul>
      </div>
    `;
  },
};

export default Sidebar;
