import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { getUserInfo, setUserInfo } from '../LocalStorage';
import Api from '../Api';
import App from './App';
import Account from '../pages/Account';

const Settings = {
  icons: {
    eye: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill eyeToggle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
      <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg>
    `,

    close: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
      <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
      </svg>
    `,
  },

  componentDidUpdate: () => {
    // Toggle address model
    document
      .querySelector('[data-add-address]')
      .addEventListener('click', () => {
        document.querySelector('.settings__model').classList.add('open');
        document.querySelector('.overlay').classList.add('open');
        document.body.style.cssText = 'overflow: hidden';
      });
    document.querySelectorAll('[data-close-address]').forEach((btn) =>
      btn.addEventListener('click', () => {
        document.querySelector('.settings__model').classList.remove('open');
        document.querySelector('.overlay').classList.remove('open');
        document.body.style.cssText = 'overflow: auto';
      })
    );

    // Update informations
    const formSelector = document.querySelectorAll('[data-form]');

    formSelector.forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (form.dataset.form === 'update') {
          const {
            name,
            alias,
            phone,
            birthday,
            username,
            email,
            password,
          } = getUserInfo();
          const formData = {
            name,
            alias,
            phone,
            birthday,
            username,
            email,
            password,
          };
          let errorSelector;

          Array.from(form.children).forEach((element) => {
            if (element.className === 'settings__info-container') {
              Array.from(element.children).forEach((child) => {
                if (child.className === 'settings__input') {
                  const { name: key, value } = child;

                  formData[key] = value;
                }
              });
            }
            if (element.className === 'newsletter__error') {
              errorSelector = element;
            }
          });

          const data = await Api.update(formData);

          if (data.error) {
            errorSelector.innerHTML = `<div><p>${data.error}</p></div>`;
          } else {
            setUserInfo(data);
            App.rerender(Account);

            errorSelector.innerHTML = `<div><p>You succesfully changed account data</p></div>`;
          }
        }

        if (form.dataset.form === 'create') {
          const formData = { id: uuid() };
          let errorSelector;

          Array.from(form.children).forEach((element) => {
            if (element.className === 'settings__info-container') {
              Array.from(element.children).forEach((child) => {
                if (child.className === 'settings__input') {
                  const { name: key, value } = child;

                  formData[key] = value;
                }
              });
            }
            if (element.className === 'newsletter__error') {
              errorSelector = element;
            }
          });

          console.log(formData);
          const data = await Api.addAddress(formData);

          if (data.error) {
            errorSelector.innerHTML = `<div><p>${data.error}</p></div>`;
          } else {
            errorSelector.innerHTML = `<div><p>You succesfully changed account data</p></div>`;
            App.rerender(Account);
          }
        }
      });
    });
  },

  render: async () => {
    const { close } = Settings.icons;
    const { username, email, name, alias, phone, birthday } = getUserInfo();
    const { addresses } = await Api.getAddress();
    const formatedDate = moment(birthday).format('YYYY-MM-DD');

    return `
      <div class="overlay"></div>
      <div class="account__content">
        <div class="settings__panel">
          <h1 class="settings__title">
            My information
          </h1>
          <form action="PUT" class="settings__info" data-form="update">
            <div class="settings__info-container">
              <label for="gender" class="settings__label">Address as</label>
              <div class="settings__info-group">
                <input class="settings__input" type="radio" name="gender" value="male" checked>
                <label for="male">Mr.</label>
                <input class="settings__input" type="radio" name="gender" value="female">
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
              }" placeholder="eg. jphy07"/>
            </div>
            <div class="settings__info-container">
              <label for="phone" class="settings__label">Phone Number</label>
              <input type="tel" class="settings__input" placeholder="eg. 07xxxxxxxx" name="phone" value="${
                phone || ''
              }" />
            </div>
            <div class="settings__info-container">
              <label for="birthdate" class="settings__label">Birthday</label>
              <input type="date" class="settings__input" name="birthday" value="${
                formatedDate || ''
              }" />
            </div>
            <div class="newsletter__error"></div>
            <button type="submit" class="account__btn btn-emag">Save Data</button>
          </form>

          <h1 class="settings__title">
            Delivery address
          </h1>
          <form action="POST" class="settings__info settings__model" data-form="create">
            <div class="settings__info-close" data-close-address>${close}</div>
            <div class="settings__info-container">
             <label for="name" class="settings__label">Full Name</label>
             <input type="text" class="settings__input" name="fullname" placeholder="Full Name" required />
            </div>
             <div class="settings__info-container">
              <label for="phone" class="settings__label">Phone Number</label>
              <input type="tel" class="settings__input" name="phone" placeholder="Phone Number" required />
            </div>
            <div class="settings__info-container">
              <label for="address" class="settings__label">Address</label>
              <input type="text" class="settings__input" name="address" placeholder="Street, number, flat" required />
            </div>
            <div class="settings__info-container">
              <label for="city" class="settings__label">City</label>
              <input type="text" class="settings__input" name="city" placeholder="City" required />
            </div>
            <div class="settings__info-container">
              <label for="state" class="settings__label">State</label>
                <input type="text" class="settings__input" name="state" placeholder="State" required />
            </div>
            <div class="settings__info-container">
              <label for="postcode" class="settings__label">Post Code</label>
              <input type="text" class="settings__input" name="postcode" placeholder="Post Code" required />
            </div>
            <div class="newsletter__error"></div>
            <div>
              <button type="submit" class="account__btn btn-emag">Add Address</button>
              <div class="account__btn btn-s" data-close-address>Cancel</div>
            </div>
          </form>
          <div class="settings__info">
            ${
              addresses.length > 0
                ? addresses
                    .map(
                      ({
                        fullname,
                        phone: addressPhone,
                        address,
                        city,
                        postcode,
                        state,
                      }) => {
                        return `
                      <ul class="settings__info-address">
                        <li class="settings__info-address--item">
                          <h4>${fullname} - ${addressPhone}</h4>
                          <p>${address}</p>
                          <p>${state}, ${city} ${postcode}</p>
                        </li>
                      </ul>
                      `;
                      }
                    )
                    .join('')
                : `<p class="settings__info-warn">No address added yet</p>`
            }
            <button class="settings__btn btn-secondary" data-add-address>+ Add new address</button>
          </div>

          <h1 class="settings__title">
            Account data
          </h1>
          <form action="PUT" class="settings__info" data-form="update">
            <div class="settings__info-container">
              <label for="username" class="settings__label">Username</label>
              <input type="text" class="settings__input" name="username" value="${username}" placeholder="New username" required />
            </div>
            <div class="settings__info-container">
              <label for="email" class="settings__label">Email address</label>
              <input type="email" class="settings__input" name="email" value="${email}" placeholder="New email address" required />
            </div>
            <div class="settings__info-container">
              <label for="password" class="settings__label">Password</label>
                <input type="password" class="settings__input" name="password" placeholder="${'*'.repeat(
                  12
                )}" required />
            </div>
            <div class="newsletter__error" data-error></div>
            <button type="submit" class="account__btn btn-emag">Save Data</button>
          </form>
        </div>
      </div>
    `;
  },
};

export default Settings;
