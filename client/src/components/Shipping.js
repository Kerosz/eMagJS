import Api from '../Api';
import { getProductCost, setShippingDetails } from '../LocalStorage';
import Checkout from '../pages/Checkout';
import App from './App';

const Shipping = {
  deliveryType: 'standard',

  componentDidUpdate: () => {
    // Handles on submit event and gets the information
    document
      .querySelector('[data-shipping-form]')
      .addEventListener('submit', (e) => {
        e.preventDefault();

        const shippingMethod = document.querySelector(
          'input[name="shipping"]:checked'
        ).value;
        const deliveryAddress = document.querySelector(
          'input[name="address"]:checked'
        ).value;

        setShippingDetails({
          shipping: shippingMethod,
          addressId: deliveryAddress,
        });

        document.location.hash = '#/checkout?ref=payment';
      });

    // Handles selecting of radio buttons
    Array.from(document.querySelectorAll('[data-delivery]')).forEach(
      (delivery) => {
        delivery.addEventListener('click', () => {
          delivery.firstElementChild.checked = true;
          Shipping.deliveryType = delivery.firstElementChild.value;

          App.rerender(Checkout);
        });
      }
    );

    Array.from(document.querySelectorAll('[data-address]')).forEach(
      (address) => {
        address.addEventListener('click', () => {
          address.firstElementChild.checked = true;
        });
      }
    );
  },

  getShippingFee: (shippingType) => {
    return {
      standard: 15,
      express: 34,
    }[shippingType];
  },

  render: async () => {
    const { addresses } = await Api.getAddress();
    const { getShippingFee, deliveryType } = Shipping;
    const productCost = getProductCost() + getShippingFee(deliveryType);

    return `
      <form action="POST" class="checkout__shipping" data-shipping-form>
        <h1 class="checkout__title">Shipping Details</h1>
          <ul class="checkout__container">
            <li class="checkout__container-title"><span class="step">1 </span>Delivery Method</li>
            <li class="checkout__delivery-option">
              <div class="checkout__delivery-inner" data-delivery>
                <input class="delivery__input" type="radio" name="shipping" value="standard" ${
                  deliveryType === 'standard' ? 'checked' : null
                } />
                <label class="delivery__label" for="standard">Standard Shipping</label>
              </div>
              <div class="checkout__delivery-inner" data-delivery>
                <input class="delivery__input" type="radio" name="shipping" value="express" ${
                  deliveryType === 'express' ? 'checked' : null
                } />
                <label class="delivery__label" for="express">Express Shipping</label>
              </div>
            </li>
          </ul>
          <ul class="checkout__container">
            <li class="checkout__container-title"><span class="step">2 </span>Shipping address</li>
            <li class="checkout__address">
              ${
                addresses.length > 0
                  ? addresses
                      .map(
                        ({
                          id,
                          fullname,
                          phone,
                          address,
                          city,
                          postcode,
                          state,
                        }) => {
                          return `
                          <div class="checkout__address-inner" data-address>
                            <input class="address__input" type="radio" name="address" value="${id}" />
                            <label class="address__label" for="${id}">
                              <div class="address__label-group"><span>Name and phone number: </span> <p>${fullname} - ${phone}</p> </div>
                              <div class="address__label-group"><span>Address: </span> <p>${address} - ${city} ${state} ${postcode}</p> </div> 
                            </label>
                          </div>
                        `;
                        }
                      )
                      .join('')
                  : `<p class="settings__info-warn">No address added yet</p>`
              }
            </li>
            <li class="checkout__address">
              ${
                addresses.length > 0
                  ? `<a href="/#/myaccount?ref=settings" class="btn__shipping btn-secondary m-l4">Manage addresses</a>`
                  : `<a href="/#/myaccount?ref=settings" class="btn__shipping btn-secondary">+ Add new address</a>`
              }
            </li>
          </ul>
          <div class="cart__sidebar">
            <div class="cart__summary">
              <h3 class="cart__summary-title">
                Order summary
              </h3>
              <div class="cart__summary-group">
                <div class="cart__summary-left">
                  <span>Product cost:</span>
                  <span>Delivery cost:</span>
                  <span>Delivery type:</span>
                </div>
                <div class="cart__summary-right">
                  <span>${getProductCost()} Lei</span>
                  <span>${getShippingFee(deliveryType)} Lei</span>
                  <span>${deliveryType}</span>
                </div>
              </div>
              <div class="products-divider"></div>
              <div class="cart__summary-total">
                <span>Total:</span>
                <span>${productCost} Lei</span>
              </div>
              <button type="submit" class="cart__summary-btn btn-emag">
                <div class="red">>></div>
                <span>Continue</span>
              </button>
            </div>
        </div>
      </form>
    `;
  },
};

export default Shipping;
