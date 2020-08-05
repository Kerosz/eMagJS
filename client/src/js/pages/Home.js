// import Data from '../Data.js';

const Home = {
	getData: async () => {
		const response = await fetch('http://localhost:5000/api', {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});

		if (!response || !response.ok) {
			console.error('Error in getting data');
			return `<div>Error in getting data</div>`;
		}
		const data = await response.json();

		return data.products;
	},

	render: async () => {
		const Data = await Home.getData();

		return `
			<ul class="store__products">
				${Data.map(product => {
					const {
						name,
						img,
						price,
						onSale,
						salePrice,
						// rating,
						// reviews,
					} = product;
					const saleValue = Math.floor(((price - salePrice) / price) * 100);

					return `
						<li class="store__products-item">
							<div class="product">
								${onSale ? `<div class="product__badge">-${saleValue}%</div>` : ''}
								<a href="/#/product/1" class="product__image">
									<img src="${img}" alt="${name}" />
								</a>
								<a href="/#/product/1" class="product__title">
									${name}
								</a>
								${
									onSale
										? `
											<div class="product__price">
												<div class="product__price-discount">
													<span>${price} Lei</span> (-${saleValue}%)
												</div>
												${salePrice} Lei
											</div>
									  `
										: `
											<div class="product__price">
												${price} Lei
											</div>
									  `
								}
								<div class="product__more">
									<a href="/#/" class="product__detail btn-emag">View details</a>
									<button class="product_basket btn-emag">
										<svg width="1.45em" height="1.45em" viewBox="0 0 16 16" class="bi bi-cart-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M8.5 5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z"/>
											<path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0v-2z"/>
											<path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
										</svg>
									</button>
								</div>
							</div>
						</li>
					`;
				}).join('')}
			</ul>
		`;
	},
};

export default Home;
