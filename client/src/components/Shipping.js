import Api from '../Api';

const Shipping = {
  componentDidUpdate: () => {
    const deliverySelector = document.querySelectorAll('[data-delivery]');

    Array.from(deliverySelector).forEach((delivery) => {
      delivery.addEventListener('click', () => {
        delivery.firstElementChild.checked = true;

        const deliveryType = delivery.firstElementChild.value;

        console.log(deliveryType);
      });
    });

    const addressSelector = document.querySelectorAll('[data-address]');

    Array.from(addressSelector).forEach((address) => {
      address.addEventListener('click', () => {
        address.firstElementChild.checked = true;

        const addressId = address.firstElementChild.value;

        console.log(addressId);
      });
    });
  },

  render: async () => {
    const { addresses } = await Api.getAddress();

    return `
      <div class="checkout__shipping">
        <h1 class="checkout__title">Shipping Details</h1>
          <ul class="checkout__container">
            <li class="checkout__container-title"><span class="step">1 </span>Delivery Method</li>
            <li class="checkout__delivery-option">
              <div class="checkout__delivery-inner" data-delivery>
                <input class="delivery__input" type="radio" name="shipping" value="standard" checked />
                <label class="delivery__label" for="standard">Standard Shipping</label>
              </div>
              <div class="checkout__delivery-inner" data-delivery>
                <input class="delivery__input" type="radio" name="shipping" value="express"  />
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
                            <input class="address__input" type="radio" name="address" value="${id}" checked />
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

      </div>
    `;
  },
};

export default Shipping;
