import Home from './Home.js';

const Router = () => {
	const storeSection = document.querySelector('[data-store]');

	storeSection.innerHTML = Home.render();
};

export default Router;
