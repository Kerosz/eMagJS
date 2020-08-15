import { getUserInfo } from '../LocalStorage';
import Sidebar from '../components/Sidebar';

const Account = {
  render: () => {
    const { username: user, email, name, alias, phone, avatar } = getUserInfo();

    if (!user) {
      document.location.hash = '/signin';
    }

    return `
      <section class="account">
        <div class="account-container wrapper">
        ${Sidebar.render()}
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
                        : `<a href='/#/' class='account__panel-field-value'>
                          add alias
                        </a>`
                    }
                  </p>
                  <p>
                    <span class="account__panel-field--name">Name:</span>
                    ${
                      name
                        ? `<span class="account__panel-field-value">${name}</span>`
                        : `<a href='/#/' class='account__panel-field-value'>
                          add name
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
                        : `<a href='/#/' class='account__panel-field-value'>
                          add phone number
                        </a>`
                    }
                  </p>
                </div>
                <div class="account__panel-stats">
                    Thank you for being our client for
                    <span>3 hours</span>
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
