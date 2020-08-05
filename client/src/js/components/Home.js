import Data from '../Data.js';

const Home = {
	render: () => {
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

					return `
						<li class="store__products-item">
							<div class="product">
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
													<span>${price} Lei</span> (-35%)
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
								<a href="/#/" class="product__basket">Add to Basket</a>
							</div>
						</li>
					`;
				}).join('\n')}
			</ul>
		`;
	},
};

export default Home;
