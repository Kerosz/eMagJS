const Signin = {
  render: () => {
    return `
      <section class="signin">
        <div class="signin-container wrapper">
          <a class="header__branding signin__branding" href="/#/" title="eMag - Buy with ease">
            <img src="./img/logo.svg" alt="eMag" />
          </a>
          <div class="signin__panel">
            <h1 class="sigin__title">Hello friend,</h1>
            <form action="POST" class="signin__form">
              <div class="signin__form-container">
                <label for="username" class="signin__label">Your neat username</label>
                <input type="text" name="username" class="signin__input" />
              </div>
              <div class="signin__form-container">
                <label for="password" class="signin__label">Your secret code</label>
                <input type="password" name="password" class="signin__input" />
              </div>
              <button type="submit" class="btn-emag signin__btn">Sign in</button>
            </form>
            <p class="signin__note">You don't have an account? Don't worry! 
              <span>You can create one in the next step.</span>
            </p>
          </div>
        </div>
      </section>
    `;
  },
};

export default Signin;
