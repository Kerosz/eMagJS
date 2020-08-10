import Home from '../pages/Home';
import Products from '../pages/Products';
import Account from '../pages/Account';
import Cart from '../pages/Cart';
import Signin from '../pages/Signin';
import NotFound from '../pages/NotFound';
import { parseRequestUrl } from '../Config';
import Header from './Header';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';

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

    const header = document.querySelector('[data-head]');
    const root = document.querySelector('[data-root]');

    header.innerHTML = await Header.render();
    root.innerHTML = await page.render();

    if (page.componentDidUpdate) {
      await page.componentDidUpdate();
    }

    window.onhashchange = () => {
      App.render();
    };
  },

  rerender: async (component) => {
    document.querySelector('[data-root]').innerHTML = await component.render();
    await component.componentDidUpdate();
  },
};

export default App;
