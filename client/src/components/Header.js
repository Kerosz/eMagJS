import { getUserInfo } from '../LocalStorage';

const Header = {
  icons: {
    human: `
      <svg
      width="1.7em"
      height="1.7em"
      viewBox="0 0 16 16"
      class="bi bi-person"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
      />
      </svg>
    `,
    arrow: `
      <svg
      width="0.7em"
      height="0.7em"
      viewBox="0 0 16 16"
      class="bi bi-caret-down-fill"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
      />
      </svg>
    `,
    cart: `
      <svg
      width="1.7em"
      height="1.7em"
      viewBox="0 0 16 16"
      class="bi bi-cart"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
      />
      </svg>
    `,
  },

  render: () => {
    const { username } = getUserInfo();
    const { human, cart, arrow } = Header.icons;

    return `
      <div class="header-container wrapper">
      <a class="header__branding" href="/#/" title="eMag - Buy with ease">
        <img src="./img/logo.svg" alt="eMag" />
      </a>
      <nav class="header__nav-container">
        <ul class="header__nav">
          ${
            username
              ? `
              <li class="header__nav-item">
                <a href="/#/myaccount/" class="header__nav-link">
                  ${human}
                  My Account
                  ${arrow}
                </a>
              </li>
              `
              : `
              <li class="header__nav-item">
                <a href="/#/signin/" class="header__nav-link">
                  ${human}
                  Sign In
                  ${arrow}
                </a>
              </li>
            `
          }
          <li class="header__nav-item">
            <a href="/#/cart/" class="header__nav-link">
              ${cart}
              Basket
              ${arrow}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header__menu">
      <div class="header__menu-container wrapper">
        <ul class="header__auxiliary">
          <li class="header__auxiliary-item">
            <a
              href="/#/"
              class="header__auxiliary-link btn"
              title="Products"
              >All Products</a
            >
          </li>
          <li class="header__auxiliary-item">
            <a
              href="/#/"
              class="header__auxiliary-link btn"
              title="Electronics"
              >Electronics</a
            >
          </li>
          <li class="header__auxiliary-item">
            <a href="/#/" class="header__auxiliary-link btn" title="Grocery"
              >Grocery</a
            >
          </li>
          <li class="header__auxiliary-item">
            <a href="/#/" class="header__auxiliary-link btn" title="Auto"
              >Auto</a
            >
          </li>
        </ul>
        <a href="/#/help" class="header__help btn" title="Help Desk"
          >eMag Help</a
        >
      </div>
    </div>
    `;
  },
};

export default Header;
