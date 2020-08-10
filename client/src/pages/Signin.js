import Api from '../Api';
import { getUserInfo, setUserInfo } from '../LocalStorage';

const Signin = {
  componentDidUpdate: () => {
    document
      .querySelector('[data-form]')
      .addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = await Api.signin({
          username: document.querySelector('[data-username]').value,
          password: document.querySelector('[data-password]').value,
        });

        if (data.error) {
          const errorContainer = document.querySelector('[data-error]');
          errorContainer.innerHTML = `<div><p>${data.error}</p></div>`;
        } else {
          setUserInfo(data);
          document.location.hash = '/myaccount';
        }
      });
  },

  render: () => {
    if (getUserInfo().username) {
      document.location.hash = '/';
    }

    return `
      <section class="signin">
        <div class="signin-container">
          <a class="header__branding signin__branding" href="/#/" title="eMag - Buy with ease">
            <img src="./img/logo.svg" alt="eMag" />
          </a>
          <div class="signin__panel">
            <h1 class="sigin__title">Hello friend,</h1>
            <form action="POST" class="signin__form" data-form>
              <div class="signin__form-container">
                <label for="username" class="signin__label">Your neat username</label>
                <input type="text" name="username" class="signin__input" data-username/>
              </div>
              <div class="signin__form-container">
                <label for="password" class="signin__label">Your secret code</label>
                <input type="password" name="password" class="signin__input" data-password/>
              </div>
              <div class="signin__error" data-error></div>
              <button type="submit" class="btn-emag signin__btn">Sign in</button>

            </form>
            <p class="signin__note">You don't have an account? Don't worry! 
              <span>You can <a href="/#/register/">create a new account</a> and enjoy the goodies</span>
            </p>
          </div>
        </div>
      </section>
    `;
  },
};

export default Signin;
