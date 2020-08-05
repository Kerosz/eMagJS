import Home from '../pages/Home.js';
import Products from '../pages/Products.js';
import NotFound from '../pages/NotFound.js';

const App = {
	routes: {
		'/': Home,
		'/product/:id': Products,
	},

	parseRequestUrl: () => {
		const url = document.location.hash.toLowerCase();
		const request = url.split('/');

		return {
			resource: request[1],
			id: request[2],
			action: request[3],
		};
	},

	router: () => {
		const { routes } = App;
		const { resource, id, action } = App.parseRequestUrl();

		const parseUrl =
			(resource ? `/${resource}` : '/') +
			(id ? '/:id' : '') +
			(action ? `/${action}` : '');
		return routes[parseUrl] ? routes[parseUrl] : NotFound;
	},

	render: async () => {
		const page = App.router();
		const storeSection = document.querySelector('[data-store]');
		storeSection.innerHTML = await page.render();

		window.onhashchange = () => {
			App.render();
		};
	},
};

export default App;
