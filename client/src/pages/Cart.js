import App from '../components/App';
import Api from '../Api';
import { parseRequestUrl } from '../Config';
import { getCartItems, setCartItems } from '../LocalStorage';

const Cart = {
  addToCart: (newItem, updateCart = false) => {
    // Redirects user to basket
    document.location.hash = '/cart';

    // Gets the items from local storage
    let cartItems = getCartItems();

    // Finds if the product already exsits in the cart
    const itExists = cartItems.find((item) => item.product === newItem.product);

    // Updates the local storage
    if (itExists) {
      if (updateCart) {
        cartItems = cartItems.map((oldItem) =>
          oldItem.product === itExists.product ? newItem : oldItem
        );
      }
    } else {
      cartItems = [...cartItems, newItem];
    }

    setCartItems(cartItems);

    if (updateCart) {
      App.rerender(Cart);
    }
  },

  removeFromCart: (id) => {
    // Filters out the item that matches the id and returns all other items
    const newItems = getCartItems().filter((item) => item.product !== id);
    setCartItems(newItems);

    App.rerender(Cart);
  },

  componentDidUpdate: () => {
    // Handle logic for changing the qty of products
    const qtySelect = document.querySelectorAll('[data-qty]');
    qtySelect.forEach((select) => {
      Array.from(select).forEach((option) => {
        option.addEventListener('click', (e) => {
          const newQty = Number(e.target.value);
          const matchItem = getCartItems().find(
            (item) => item.product === select.id
          );

          Cart.addToCart({ ...matchItem, qty: newQty }, true);
        });
      });
    });

    // Handle logic for removing the product from cart
    const removeButton = document.querySelectorAll('[data-remove]');
    removeButton.forEach((button) => {
      button.addEventListener('click', () => {
        const { id } = button;

        Cart.removeFromCart(id);
      });
    });

    // Handle redirect to checkout page
    const continueButton = document.querySelector('[data-checkout]');

    continueButton.addEventListener('click', () => {
      document.location.hash = '/signin';
    });
  },

  render: async () => {
    const request = parseRequestUrl();

    if (request.id) {
      const {
        id,
        name,
        img,
        price,
        onSale,
        salePrice,
        stock,
      } = await Api.getProduct(request.id.toUpperCase());

      Cart.addToCart({
        product: id,
        name,
        img,
        price,
        salePrice,
        onSale,
        stock,
        qty: 1,
      });
    }

    const data = await getCartItems();
    const productCost = data.reduce((total, currentItem) => {
      if (currentItem.onSale) {
        return total + currentItem.salePrice * currentItem.qty;
      }
      return total + currentItem.price * currentItem.qty;
    }, 0);
    const deliveryCost = 15;

    return `
      <section class="cart">
        <div class="cart-container wrapper">
          ${
            data.length === 0
              ? `<div class="cart__empty">
                    <h1>Your basket is empty</h1>
                    <p>To add products to your basket please return to shop</p>
                    <a href="/#/" class="btn-emag">Return to shop</a>
                  </div>`
              : `
              <header class="cart__header">
                <h1>My Basket</h1>
              </header>
              <div class="products-divider"></div>
              <div class="cart__content">
                <div class="cart__main">
                  <ul class="cart__list">
                    ${data
                      .map((item) => {
                        const {
                          product: id,
                          name,
                          img,
                          price,
                          onSale,
                          salePrice,
                          stock,
                          qty,
                        } = item;
                        const onStock = stock >= 1;

                        return `
                              <li class="cart__item">
                                <a href="/#/product/${id}" class="cart__item-image">
                                  <img src="${img}" alt="${name}"/>
                                </a>
                                <div class="cart__item-group">
                                  <h3 class="cart__item-title">
                                    <a href="/#/product/${id}">${name}</a>
                                  </h3>
                                  <div class="cart__item-more">
                                    <div class="cart__item-stock">
                                      <span>Disponibility: ${
                                        onStock
                                          ? `<span style="color: #009900; font-weight: 500;" title="${stock} items">In Stock</span>`
                                          : '<span style="color: #EF2100; font-weight: 500;">No Stock</span>'
                                      }</span>
                                      <span>
                                        Qty <select id="${id}" data-qty>
                                        ${[
                                          ...Array(item.stock).keys(),
                                        ].map((num) =>
                                          qty === num + 1
                                            ? `<option selected value="${
                                                num + 1
                                              }">${num + 1}</option>`
                                            : `<option value="${num + 1}">${
                                                num + 1
                                              }</option>`
                                        )}
                                        </select>
                                      </span>
                                    </div>
                                    <div class="cart__item-details">
                                      ${
                                        onSale
                                          ? `
                                        <h5 class="sale-price">${salePrice} Lei</h5>
                                        <span class="price">${price} Lei</span>
                                        <span class="save">Save on buy:</span>
                                        <span class="amount">${
                                          price - salePrice
                                        } Lei</span>`
                                          : `<span class="normal">${price} Lei</span>`
                                      }

                                      <div class="cart__item-details--buttons">
                                        <button type="button" id="${id}" data-save>Move to Favorites</button>
                                        <button type="button" id="${id}" data-remove>Remove</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            `;
                      })
                      .join('')}
                  </ul>
                ${
                  data.length === 0
                    ? ''
                    : `<div class="cart__details">
                    <div class="cart__details-left">
                      <span>Product cost:</span>
                      <span>Delivery cost:</span>
                      <span>Subtotal:</span>
                    </div>
                    <div class="cart__details-right">
                      <span>${productCost} Lei</span>
                      <span>${deliveryCost} Lei</span>
                      <span>${productCost + deliveryCost} Lei</span>
                    </div>
                  </div>`
                }
                </div>
                ${
                  data.length === 0
                    ? ''
                    : `
                <aside class="cart__sidebar">
                    <div class="cart__summary">
                      <h3 class="cart__summary-title">
                        Order summary
                      </h3>
                      <div class="cart__summary-group">
                        <div class="cart__summary-left">
                          <span>Product cost:</span>
                          <span>Delivery cost:</span>
                        </div>
                        <div class="cart__summary-right">
                          <span>${productCost} Lei</span>
                          <span>${deliveryCost} Lei</span>
                        </div>
                      </div>
                      <div class="products-divider"></div>
                      <div class="cart__summary-total">
                        <span>Total:</span>
                        <span>${productCost + deliveryCost} Lei</span>
                      </div>
                      <button class="cart__summary-btn btn-emag" data-checkout>
                        <div class="red">>></div>
                        <span>Continue</span>
                      </button>
                    </div>
                </aside>
                `
                }
              </div>`
          }
        </div>
      </section>
    `;
  },
};

export default Cart;
