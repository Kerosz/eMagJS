import Home from './Home.js';

const App = () => {
	const storeSection = document.querySelector('[data-store]');

	storeSection.innerHTML = Home.render();
};

export default App;
