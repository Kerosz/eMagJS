import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Register from '../pages/Register';
import Signin from '../pages/Signin';
import Account from '../pages/Account';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import NotFound from '../pages/NotFound';
import { parseRequestUrl } from '../Config';
import Admin from '../pages/Admin';

const App = {
  routes: {
    '/': Home,
    '/not-found': NotFound,
    '/myaccount': Account,
    '/myaccount?ref=orders': Account,
    '/myaccount?ref=wishlist': Account,
    '/myaccount?ref=settings': Account,
    '/admin-dashboard': Admin,
    '/product/:id': Products,
    '/cart/:id': Cart,
    '/cart': Cart,
    '/signin': Signin,
    '/register': Register,
    '/checkout': Checkout,
    '/checkout?ref=shipping': Checkout,
    '/checkout?ref=payment': Checkout,
    '/checkout?ref=order': Checkout,
  },

  // Handles URL routing based on added routes
  router: () => {
    const { routes } = App;
    const { resource, id, action } = parseRequestUrl();

    const parseUrl =
      (resource ? `/${resource}` : '/') +
      (id ? '/:id' : '') +
      (action ? `/${action}` : '');

    return routes[parseUrl] ? routes[parseUrl] : NotFound;
  },

  render: async () => {
    const page = App.router();

    const root = document.querySelector('[data-root]');

    root.innerHTML =
      page === Signin ||
      page === Register ||
      page === Admin ||
      page === Checkout
        ? await page.render()
        : page === Home
        ? Header.render('sticky') + (await page.render()) + Footer.render()
        : Header.render() + (await page.render()) + Footer.render();

    if (page.componentDidUpdate) await page.componentDidUpdate();
    if (page !== Checkout) Header.componentDidUpdate();

    // Checks for changes in the URL and rerenders
    window.onhashchange = () => {
      App.render();
    };
  },

  // Custom rerender
  rerender: async (component) => {
    document.querySelector('[data-root]').innerHTML =
      component === Signin ||
      component === Register ||
      component === Admin ||
      component === Checkout
        ? await component.render()
        : component === Home
        ? Header.render('sticky') + (await component.render()) + Footer.render()
        : Header.render() + (await component.render()) + Footer.render();

    if (component.componentDidUpdate) await component.componentDidUpdate();
    if (component !== Checkout) Header.componentDidUpdate();
  },
};

export default App;
