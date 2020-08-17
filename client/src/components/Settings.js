import { getUserInfo } from '../LocalStorage';

const Settings = {
  icons: {
    eye: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill eyeToggle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
      <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg>
    `,
  },

  render: () => {
    const { username, email, name, alias, phone, birthdate } = getUserInfo();

    return `
      <div class="account__content">
        <div class="settings__panel">
          <h1 class="settings__title">
            My Information
          </h1>
          <form action="PUT" class="settings__info">
            <div class="settings__info-container">
              <label for="gender" class="settings__label">Address as</label>
              <div class="settings__info-group">
                <input type="radio" name="gender" value="male">
                <label for="male">Mr.</label>
                <input type="radio" name="gender" value="female">
                <label for="female">Mrs.</label>
              </div>
            </div>
            <div class="settings__info-container">
              <label for="name" class="settings__label">Full Name</label>
              <input type="text" class="settings__input" name="name" value="${
                name || ''
              }" placeholder="eg. John Murphy" />
            </div>
            <div class="settings__info-container">
              <label for="alias" class="settings__label">Nickname</label>
              <input type="text" class="settings__input" name="alias" value="${
                alias || ''
              }" placeholder="eg. jphy07" />
            </div>
            <div class="settings__info-container">
              <label for="phone" class="settings__label">Phone Number</label>
              <input type="tel" class="settings__input" placeholder="eg. 07xxxxxxxx" name="phone" value="${
                phone || ''
              }" / >
            </div>
            <div class="settings__info-container">
              <label for="birthdate" class="settings__label">Birthdate</label>
              <input type="date" class="settings__input" name="birthdate" value=${
                birthdate || ``
              } />
            </div>
            <button type="submit" class="account__btn btn-emag">Save Data</button>
          </form>
          <h1 class="settings__title">
            Account Data
          </h1>
          <form action="PUT" class="settings__info">
            <div class="settings__info-container">
              <label for="username" class="settings__label">Username</label>
              <input type="text" class="settings__input" name="username" value="${username}" placeholder="New username" />
            </div>
            <div class="settings__info-container">
              <label for="email" class="settings__label">Email address</label>
              <input type="email" class="settings__input" name="email" value=${email} placeholder="New email address" />
            </div>
            <div class="settings__info-container">
              <label for="password" class="settings__label">Password</label>
                <input type="password" class="settings__input" name="password" placeholder="${'*'.repeat(
                  12
                )}" />
            </div>
            <button type="submit" class="account__btn btn-emag">Save Data</button>
          </form>
        </div>
      </div>
    `;
  },
};

export default Settings;
