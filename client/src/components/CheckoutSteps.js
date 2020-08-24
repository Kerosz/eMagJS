const CheckoutSteps = {
  render: (props) => {
    return `
      <div class="checkout__steps">
        <a href="/#/cart" class="checkout__steps-item ${
          props.step1 ? 'active' : ''
        }">Cart</a>
        <div class="checkout__steps-item ${
          props.step2 ? 'active' : ''
        }">Shipping</div>
        <div class="checkout__steps-item ${
          props.step3 ? 'active' : ''
        }">Payment</div>
        <div class="checkout__steps-item ${
          props.step4 ? 'active' : ''
        }">Place Order</div>
      </div>
    `;
  },
};

export default CheckoutSteps;
