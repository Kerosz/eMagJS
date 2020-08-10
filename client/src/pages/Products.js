import moment from 'moment';
import Api from '../Api';
import Rating from '../components/Rating';
import { parseRequestUrl } from '../Config';

const Products = {
  icons: {
    truck: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-truck" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5v7h-1v-7a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5v1A1.5 1.5 0 0 1 0 10.5v-7zM4.5 11h6v1h-6v-1z"/>
      <path fill-rule="evenodd" d="M11 5h2.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5h-1v-1h1a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4.5h-1V5zm-8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      <path fill-rule="evenodd" d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      </svg>
    `,
    lighting: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lightning-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
      </svg>
    `,
    cart: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8.5 5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z"/>
      <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0v-2z"/>
      <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
    `,
    heart: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
      </svg>
    `,
    gift: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gift" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z"/>
      </svg>
    `,
    open: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-door-open" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
      <path fill-rule="evenodd" d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
      <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
      </svg>
    `,
    circle: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
      </svg>
    `,
    text: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"/>
      <path fill-rule="evenodd" d="M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
      </svg>
    `,
  },

  displayPromotion: () => {
    const promotions = [
      {
        promoImg: '/img/promo-2.png',
        promoLink: '/#/promo-outlet/',
      },
      {
        promoImg: '/img/promo-3.png',
        promoLink: '/#/promo-under120/',
      },
    ];
    const randomPromo = Math.floor(Math.random() * promotions.length);

    return promotions[randomPromo];
  },

  handleShippingDate: (type) => {
    const standardShippment = () => {
      const standardStart = moment().add(2, 'days').format('dddd, DD MMM');
      const standardEnds = moment().add(4, 'days').format('dddd, DD MMM');

      return `${standardStart}. – ${standardEnds}.`;
    };

    const expressShippment = () => {
      const expressStart = moment().add(1, 'days').format('dddd, DD MMM');
      const expressEnd = moment().add(2, 'days').format('dddd, DD MMM');

      return `${expressStart}. – ${expressEnd}.`;
    };

    return {
      standard: standardShippment(),
      express: expressShippment(),
    }[type];
  },

  componentDidUpdate: () => {
    const onClickHandler = () => {
      const { id } = parseRequestUrl();
      document.location.hash = `/cart/${id}`;
    };

    document
      .querySelector('[data-addButton]')
      .addEventListener('click', onClickHandler);
  },

  render: async () => {
    const { id } = parseRequestUrl();
    const product = await Api.getProduct(id.toUpperCase());
    const {
      name,
      img,
      price,
      onSale,
      salePrice,
      rating,
      reviews,
      stock,
    } = product;
    const {
      truck,
      lighting,
      cart,
      heart,
      gift,
      open,
      circle,
      text,
    } = Products.icons;
    const saleValue = Math.floor(((price - salePrice) / price) * 100);
    const giftPoints = (onSale ? salePrice / 100 : price / 100).toFixed(1);
    const onStock = stock >= 1;
    const { promoImg, promoLink } = Products.displayPromotion();
    const { handleShippingDate } = Products;

    if (product.error) return `<div>${product.error}</div>`;

    return `
      <section class="products">
        <a href="${promoLink}">
        <div style='background-position: center top; background-repeat: no-repeat;  background-image: url("${promoImg}"); height: 10rem'></div>
        </a>
        <div class="products-container wrapper">
          <header class="products__header">
            <div class="products__header-path">
              <a href="/#/">Homepage</a><span>/</span><span>${name}</span>
            </div>
            <h2 class="products__header-title">${name}</h2>
            <span class="products__header-id">Product code: ${id.toUpperCase()}</span>
          </header>
          <div class="products-divider"></div>
          <div class="products__details">
            <div class="products__details-showcase">
              <img src="${img}" alt="${name}"/>
              ${onSale ? `<div>${saleValue}% off<br /> get it now</div>` : ''}
            </div>
            <div class="products__details-more">
              <div class="products__details-more--reviews">
                <span>Customer ratings:</span>
                ${Rating.render({
                  starCount: rating,
                  reviewCount: reviews,
                  id,
                })}
              </div>
              <div class="products__details-more--sold">
                Sold and delivered by: <span>eMAG</span>
              </div>
              <div class="products__details-more--stock" style="background: ${
                onStock ? '#009900' : '#EF2100'
              };">
                ${onStock ? 'In Stock' : 'No Stock'}
              </div>
              <ul class="products__details-more--delivery">
                <li class="delivery">
                  ${truck} 
                  <div class="delivery__info">
                    <ul>
                      <li class="delivery__info-type">Standard delivery</li>
                      <li class="delivery__info-arrival">${handleShippingDate(
                        'standard'
                      )}</li>
                    </ul>
                    <span class="delivery__cost">15 Lei</span>
                  </div>
                </li>
                <li class="delivery">
                  ${lighting} 
                  <div class="delivery__info border">
                    <ul>
                      <li class="delivery__info-type">Express delivery</li>
                      <li class="delivery__info-arrival">${handleShippingDate(
                        'express'
                      )}</li>
                    </ul>
                    <span class="delivery__cost">34 Lei</span>
                  </div>
                </li>
              </ul>
              <ul class="products__details-more--benefits">
                <li>Benefits:</li>
                <li>${gift} <span>${giftPoints} points</span> with this purchase</li>
                <li>${open} Open package at delivery</li>
                <li>${circle} Free return in 30 days</li>
                <li>${text} Product waranty included</li>
              </ul>
            </div>
            <div class="products__details-sidebar">
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
                ${
                  onStock
                    ? `
                <button class="product__detail btn-emag" data-addButton>
                  <div class="red">${cart}</div>
                  <span>Add to basket</span>
                </button>
                `
                    : ''
                }
                <button class="product__detail btn-secondary">
                <div>${heart}</div>
                <span>Add to favorites</span>
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },
};

export default Products;
