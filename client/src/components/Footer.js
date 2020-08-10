const Footer = {
  render: () => {
    return `
    <footer class="footer">
      <div class="footer-container wrapper">
        <ul class="footer__menu">
          <li class="footer__menu-title">Client Services</li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link"
              >Open package at delivery</a
            >
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link"
              >Right of return in 30 days</a
            >
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">Black Friday eMag</a>
          </li>
        </ul>
        <ul class="footer__menu">
          <li class="footer__menu-title">Orders and Delivery</li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">How do I order</a>
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">My eMag Account</a>
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">Order delivery</a>
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">Return form</a>
          </li>
        </ul>
        <ul class="footer__menu">
          <li class="footer__menu-title">eMag Store</li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">Terms and Conditions</a>
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">Data Privacy</a>
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">Cookies Policy</a>
          </li>
          <li class="footer__menu-item">
            <a href="/#/" class="footer__menu-link">Return form</a>
          </li>
        </ul>
      </div>
      <div class="footer__copyright">
        Copyright © 2020 | All Rights Reserved
      </div>
    </footer>
    `;
  },
};

export default Footer;
