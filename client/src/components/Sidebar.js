const Sidebar = {
  render: () => {
    return `
      <div class='account__sidebar'>
        <ul class='account__menu'>
          <li class='account__title'>Account Menu</li>
          <li class='account__item'>
            <a href='/#/myaccount/orders' class='account__link'>
              My Orders
            </a>
          </li>
          <li class='account__item'>
            <a href='/#/myaccount/address' class='account__link'>
              My Address
            </a>
          </li>
          <li class='account__item'>
            <a href='/#/myaccount/wishlist' class='account__link'>
              My Wishlist
            </a>
          </li>
        </ul>
      </div>
    `;
  },
};

export default Sidebar;
