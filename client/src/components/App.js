import Home from '../pages/Home';
import Products from '../pages/Products';
import Account from '../pages/Account';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';
import { parseRequestUrl } from '../Config';

const App = {
  routes: {
    '/': Home,
    '/myaccount': Account,
    '/product/:id': Products,
    '/cart/:id': Cart,
    '/cart': Cart,
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
    const root = document.querySelector('[data-root]');
    root.innerHTML = await page.render();
    await page.componentDidUpdate();

    window.onhashchange = () => {
      App.render();
    };
  },
};

export default App;
