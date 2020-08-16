import Api from '../Api';
import Rating from '../components/Rating';
import Newsletter from '../components/Newsletter';

const Home = {
  render: async () => {
    const data = await Api.getData();

    return `
    <main class="main">
      <section class="hero">
        <div class="hero__inner wrapper">
          <a href="/#/promo-outlet/" class="cta">View More</a>
        </div>
      </section> 
      <section class="store wrapper">
        <ul class="store__products">
          ${data
            .map(
              ({
                id,
                name,
                img,
                price,
                onSale,
                salePrice,
                rating,
                reviews,
              }) => {
                const saleValue = Math.floor(
                  ((price - salePrice) / price) * 100
                );

                return `
              <li class="store__products-item">
                <div class="product">
                  ${
                    onSale
                      ? `<div class="product__badge">-${saleValue}%</div>`
                      : ''
                  }
                  <a href="/#/product/${id}" class="product__image" title="${name}">
                    <img src="${img[0]}" alt="${name}" />
                  </a>
                  <a href="/#/product/${id}" class="product__title" title="${name}">
                    ${name.slice(0, 71)}${name.length > 71 ? '...' : ''}
                  </a>
                  ${Rating.render({
                    starCount: rating,
                    reviewCount: reviews,
                    id,
                  })}
                  ${
                    onSale
                      ? `
                      <div class="product__price">
                        <div class="product__price-discount">
                          <span>${price} Lei</span> (-${saleValue}%)
                        </div>
                        ${salePrice} Lei
                      </div>`
                      : `
                      <div class="product__price">
                        ${price} Lei
                      </div>
                    `
                  }
                  <div class="product__more">
                    <a href="/#/product/${id}" class="product__detail btn-emag">View details</a>
                    <a href="/#/cart/${id}" class="product__basket btn-emag">
                      <svg width="1.45em" height="1.45em" viewBox="0 0 16 16" class="bi bi-cart-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8.5 5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z"/>
                        <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0v-2z"/>
                        <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            `;
              }
            )
            .join('')}
        </ul>
      </section>
      ${Newsletter.render()}
    </main>
    `;
  },
};

export default Home;
