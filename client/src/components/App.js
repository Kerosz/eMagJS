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

const App = {
  routes: {
    '/': Home,
    '/not-found': NotFound,
    '/myaccount': Account,
    '/product/:id': Products,
    '/cart/:id': Cart,
    '/cart': Cart,
    '/signin': Signin,
    '/register': Register,
    '/checkout': Checkout,
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
      page === Signin || page === Register
        ? await page.render()
        : Header.render() + (await page.render()) + Footer.render();

    if (page.componentDidUpdate) {
      await page.componentDidUpdate();
    }
    Header.componentDidUpdate();

    // Checks for changes in the URL and rerenders
    window.onhashchange = () => {
      App.render();
    };
  },

  // Custom rerender
  rerender: async (component) => {
    document.querySelector('[data-root]').innerHTML =
      Header.render() + (await component.render()) + Footer.render();

    if (component.componentDidUpdate) {
      await component.componentDidUpdate();
    }
  },
};

export default App;
