const Register = {
  render: () => {
    return `
    <section class="signin">
      <div class="signin-container wrapper">
        <a class="header__branding signin__branding" href="/#/" title="eMag - Buy with ease">
          <img src="./img/logo.svg" alt="eMag" />
        </a>
        <div class="signin__panel">
          <h1 class="sigin__title">Welcome friend,</h1>
          <form action="POST" class="signin__form" data-form>
            <div class="signin__form-container">
              <label for="username" class="signin__label">Your neat username</label>
              <input type="text" name="username" class="signin__input" data-username/>
            </div>
            <div class="signin__form-container">
              <label for="email" class="signin__label">Your cool mailbox</label>
              <input type="email" name="email" class="signin__input" data-email/>
            </div>
            <div class="signin__form-container">
              <label for="password" class="signin__label">Your secret code</label>
              <input type="password" name="password" class="signin__input" data-password/>
            </div>
            <div class="signin__error" data-error></div>
            <button type="submit" class="btn-emag signin__btn">Sign Up</button>

          </form>
          <p class="signin__note">You already have an account? Great! 
            <span>You can <a href="/#/signin/">sign in</a> and surf our store</span>
          </p>
        </div>
      </div>
    </section>
  `;
  },
};

export default Register;
