/* eslint-disable consistent-return */
import CheckoutSteps from '../components/CheckoutSteps';
import Header from '../components/Header';
import Shipping from '../components/Shipping';

const Checkout = {
  stepHandler: (step) => {
    return {
      step1: CheckoutSteps.render({ step1: true }),
      step2: CheckoutSteps.render({ step1: true, step2: true }),
      step3: CheckoutSteps.render({ step1: true, step2: true, step3: true }),
      step4: CheckoutSteps.render({
        step1: true,
        step2: true,
        step3: true,
        step4: true,
      }),
    }[step];
  },

  navigation: (step) => {
    const { cart } = Header.icons;
    const counter = Header.getBasketQty();

    return `
      <div class="checkout__header">
        <a class="header__branding" href="/#/" title="eMag - Buy with ease">
          <img src="./img/logo.svg" alt="eMag" />
        </a>
        ${Checkout.stepHandler(step)}
        <ul class="header__nav">
          <li class="header__nav-item">
            <a href="/#/cart" class="header__nav-link">
              ${cart}
            </a>
            ${
              counter > 0
                ? `
              <div class="header__nav-counter">
                <span>${counter}</span>
              </div>`
                : ''
            }
          </li>
        </ul>
      </div>
    `;
  },

  componentDidUpdate: () => {
    Shipping.componentDidUpdate();
  },

  render: async () => {
    if (document.location.hash === '#/checkout?ref=shipping') {
      return `
        <section class="checkout">
          <div class="checkout-container wrapper">
            ${Checkout.navigation('step2')}
            ${await Shipping.render()}
          </div>
        </section>
      `;
    }

    if (document.location.hash === '#/checkout?ref=payment') {
      return `
        <section class="checkout">
          <div class="checkout-container wrapper">
            ${Checkout.navigation('step3')}
          </div>
        </section>
      `;
    }

    if (document.location.hash === '#/checkout?ref=order') {
      return `
        <section class="checkout">
          <div class="checkout-container wrapper">
            ${Checkout.navigation('step4')}
          </div>
        </section>
    `;
    }
  },
};

export default Checkout;
