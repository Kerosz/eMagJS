import moment from 'moment';
import { getUserInfo, logOut } from '../LocalStorage';
import Sidebar from '../components/Sidebar';
import Orders from '../components/Orders';
import Address from '../components/Address';
import Wishlist from '../components/Wishlist';
import Settings from '../components/Settings';

const Account = {
  icons: {
    pen: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
      <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
      </svg>
    `,
  },

  getTimeSinceClient: () => {
    const { date } = getUserInfo();
    const timeSinceClient = moment(date).fromNow(true);

    return timeSinceClient;
  },

  logOutUser: () => {
    const { username } = getUserInfo();

    if (username) {
      document.querySelector('[data-logout]').addEventListener('click', () => {
        logOut();
        document.location.hash = '/';
      });
    }
  },

  componentDidUpdate: () => {
    Sidebar.update();
    Account.logOutUser();
  },

  render: () => {
    const { username: user, email, name, alias, phone, avatar } = getUserInfo();
    const { pen } = Account.icons;

    if (!user) {
      document.location.hash = '/signin';
    }

    if (document.location.hash === '#/myaccount?ref=orders') {
      return `
      <section class="account">
        <div class="account-container wrapper">
          ${Sidebar.render()}
          ${Orders.render()}
        </div>
      </section>
      `;
    }

    if (document.location.hash === '#/myaccount?ref=address') {
      return `
      <section class="account">
        <div class="account-container wrapper">
          ${Sidebar.render()}
          ${Address.render()}
        </div>
      </section>
      `;
    }

    if (document.location.hash === '#/myaccount?ref=wishlist') {
      return `
      <section class="account">
        <div class="account-container wrapper">
          ${Sidebar.render()}
          ${Wishlist.render()}
        </div>
      </section>
      `;
    }

    if (document.location.hash === '#/myaccount?ref=settings') {
      return `
      <section class="account">
        <div class="account-container wrapper">
          ${Sidebar.render()}
          ${Settings.render()}
        </div>
      </section>
      `;
    }

    return `
      <section class="account">
        <div class="account-container wrapper">
        ${Sidebar.render(false)}
          <div class="account__content">
            <div class="account__panel">
              <p class="account__panel-title">Account Details</p>
              <div class="account__panel-body">
                <div class="account__panel-image">
                  <img src="${avatar}" alt="Avatar"/>
                </div>
                <div class="account__panel-data">
                  <p>
                    <span class="account__panel-field--name">User:</span>
                    <span class="account__panel-field-value">${user}</span>
                  </p>
                  <p>
                    <span class="account__panel-field--name">Alias:</span>
                    ${
                      alias
                        ? `<span class="account__panel-field-value">${alias}</span>`
                        : `<a href='/#/myaccount?ref=settings' class='account__panel-field-value'>
                          add alias${pen}
                        </a>`
                    }
                  </p>
                  <p>
                    <span class="account__panel-field--name">Name:</span>
                    ${
                      name
                        ? `<span class="account__panel-field-value">${name}</span>`
                        : `<a href='/#/myaccount?ref=settings' class='account__panel-field-value'>
                          add name${pen}
                        </a>`
                    }
                  </p>
                  <p>
                    <span class="account__panel-field--name">Email:</span>
                    <span class="account__panel-field-value">${email}</span>
                  </p>
                  <p>
                    <span class="account__panel-field--name">Phone:</span>
                    ${
                      phone
                        ? `<span class="account__panel-field-value">${phone}</span>`
                        : `<a href='/#/myaccount?ref=settings' class='account__panel-field-value'>
                          add phone number${pen}
                        </a>`
                    }
                  </p>
                </div>
                <div class="account__panel-stats">
                    Thank you for being our client for
                    <span>${Account.getTimeSinceClient()}</span>
                </div>
              </div>
              <a href="/#/myaccount?ref=settings" class="accout__panel-action">account data administration</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },
};

export default Account;
