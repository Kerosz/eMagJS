import { getUserInfo, getCartItems } from '../LocalStorage';
import Account from '../pages/Account';

const Header = {
  icons: {
    headset: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-headset" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 1a5 5 0 0 0-5 5v4.5H2V6a6 6 0 1 1 12 0v4.5h-1V6a5 5 0 0 0-5-5z"/>
      <path d="M11 8a1 1 0 0 1 1-1h2v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8zM5 8a1 1 0 0 0-1-1H2v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8z"/>
      <path fill-rule="evenodd" d="M13.5 8.5a.5.5 0 0 1 .5.5v3a2.5 2.5 0 0 1-2.5 2.5H8a.5.5 0 0 1 0-1h3.5A1.5 1.5 0 0 0 13 12V9a.5.5 0 0 1 .5-.5z"/>
      <path d="M6.5 14a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1z"/>
      </svg>
    `,
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
    account: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-bounding-box" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
      <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
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

  getBasketQty: () => {
    const basket = getCartItems();

    return basket.reduce((total, product) => total + product.qty, 0);
  },

  componentDidUpdate: () => {
    Account.logOutUser();
  },

  render: (position) => {
    const { human, account, cart, arrow, headset } = Header.icons;
    const { isAdmin: admin, username: user, avatar, alias } = getUserInfo();
    const counter = Header.getBasketQty();

    return `
    <header class="header" style="position: ${position || 'relative'}">
      <div class="header-container wrapper">
      <a class="header__branding" href="/" title="eMag - Buy with ease">
        <img src="./img/logo.svg" alt="eMag" />
      </a>
      <nav class="header__nav-container">
        <ul class="header__nav">
          <li class="header__nav-item">
            <a href="/#/myaccount" class="header__nav-link">
              ${
                user
                  ? `<img class="header__nav-icon" src="${avatar}" alt="Avatar"/>`
                  : human
              }
              <span>
              My Account
              ${arrow}
              </span>
            </a>
            <ul class="header__nav-detail" style="width: ${
              user ? '21rem' : '27rem'
            }">
            ${
              user
                ? `
                  <li class="header__nav-detail--title">
                      Hi there, ${alias || user}
                  </li>
                  <div class="products-divider"></div>
                  ${
                    admin
                      ? `
                    <li class="header__nav-detail--item btn-secondary" style="justify-content:center; margin: 0.4rem 0;">
                      <a href='/#/admin-dashboard' target="_blank" class="header__nav-detail--link ">Admin Dashboard</a>
                    </li>
                  `
                      : ''
                  }
                  <li class="header__nav-detail--item">
                    <a href="/#/myaccount" class="header__nav-detail--link">Profile</a>
                  </li>
                  <li class="header__nav-detail--item">
                    <a href="/#/myaccount?ref=orders" class="header__nav-detail--link">Orders</a>
                  </li>
                  <li class="header__nav-detail--item">
                    <a href="/#/myaccount?ref=address" class="header__nav-detail--link">Addresses</a>
                  </li>
                  <li class="header__nav-detail--item">
                    <a href="/#/myaccount?ref=wishlist" class="header__nav-detail--link">Wishlist</a>
                  </li>
                  <li class="header__nav-detail--item">
                    <a href="/#/myaccount?ref=settings" class="header__nav-detail--link">Settings</a>
                  </li>
                  <div class="products-divider"></div>
                  <li class="header__nav-detail--item">
                    <button class="header__nav-detail--link" data-logout>Log Out</button>
                  </li>
                `
                : `
                  <li class="header__nav-detail--item m-b1">
                    ${account}
                    <p>Log in your eMag account and have full control of our awesome offers</p>
                  </li>
                  <div class="products-divider"></div>
                  <li class="header__nav-detail--item">
                    <a href="/#/signin" class="btn-header btn-emag">
                      <span>Sign In</span>
                    </a>
                    <a href="/#/register" class="btn-s">Register</a>
                  </li>
              `
            }
            </ul>
          </li>
          <li class="header__nav-item">
            <a href="/#/cart" class="header__nav-link">
              ${cart}
              <span>
              Basket
              ${arrow}
              </span>
            </a>
            ${
              counter > 0
                ? `
              <div class="header__nav-counter">
                <span>${counter}</span>
              </div>`
                : ''
            }
            
            <ul class="header__nav-detail basket">
              <li class="header__nav-detail--item">
                ${
                  counter > 0
                    ? `<p>You have <span>${counter}</span> ${
                        counter > 1 ? 'products' : 'product'
                      } in basket</p>`
                    : `<p>Your basket is empty</p>`
                }
              </li>
              <li class="header__nav-detail--item">
                <a href="/#/cart" class="cart__summary-btn btn-emag btn-detail">
                  <div class="red">>></div>
                  <span>See details</span>
                </a>
              </li>
            </ul>
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
              <a href="/#/" class="header__auxiliary-link btn" title="Fashion"
                >Fashion</a
              >
            </li>
            <li class="header__auxiliary-item">
              <a href="/#/" class="header__auxiliary-link btn" title="Fashion"
                >Sports</a>
            </li>
            <li class="header__auxiliary-item">
              <a href="/#/" class="header__auxiliary-link btn" title="Auto"
                >Motors</a
              >
            </li>
            <li class="header__auxiliary-item">
              <a href="/#/" class="header__auxiliary-link btn" title="Auto"
                >Home & Garden</a>
            </li>
            <li class="header__auxiliary-item">
              <a href="/#/" class="header__auxiliary-link btn" title="Auto"
                >Hot Deals</a>
            </li>
          </ul>
          <a href="/#/help" class="header__help btn" title="Help Desk"
            >${headset} eMAG Help</a
          >
        </div>
      </div>
    </header>
    `;
  },
};

export default Header;
