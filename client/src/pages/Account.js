import { getUserInfo } from '../LocalStorage';

const Account = {
  render: () => {
    const { username: user, email } = getUserInfo();

    if (!user) {
      document.location.hash = '/signin';
    }

    return `
      <section class="account">
        <div class="account-container wrapper">
          <aside class="account__sidebar">
            <ul class="account__menu">
              <li class="account__title">
                My Account
              </li>
              <li class="account__item">
                <a href="/#/myaccount/orders" class="account__link">My Orders</a>
              </li>
              <li class="account__item">
                <a href="/#/myaccount/address" class="account__link">My Address</a>
              </li>
              <li class="account__item">
                <a href="/#/myaccount/wishlist" class="account__link">My Wishlist</a>
              </li>
            </ul>
          </aside>
          <div class="account__content">
            <div class="account__panel">
              <p class="account__panel-title">Account Details</p>
              <div class="account__panel-body">
                <div class="account__panel-image">
                  <img src="/img/avatar.jpg" alt="Avatar"/>
                </div>
                <div class="account__panel-data">
                  <p>
                    <span class="account__panel-field--name">User:</span>
                    <span class="account__panel-field-value">${user}</span>
                  </p>
                  <p>
                    <span class="account__panel-field--name">Alias:</span>
                    <a href="/#/" class="account__panel-field-value">add alias</a>
                  </p>
                  <p>
                    <span class="account__panel-field--name">Name:</span>
                    <a href="/#/" class="account__panel-field-value">add name</a>
                  </p>
                  <p>
                    <span class="account__panel-field--name">Email:</span>
                    <span class="account__panel-field-value">${email}</span>
                  </p>
                  <p>
                    <span class="account__panel-field--name">Phone:</span>
                    <a href="/#/" class="account__panel-field-value">add phone number</a>
                  </p>
                </div>
              </div>
              <a href="/#/" class="accout__panel-action">account data administration</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },
};

export default Account;
