const ProductSlider = {
  icons: {
    left: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-short arrow" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
      <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
      </svg>
    `,
    right: `
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-short arrow" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
      <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
      </svg>
    `,
  },

  update: () => {
    const featuredSelect = document.querySelector('[data-featured]');
    const thumbnailSelect = document.querySelectorAll('[data-thumbnail]');
    const activeImgSelect = document.getElementsByClassName('active');
    const controlsSelect = document.querySelectorAll('[data-controls]');
    const innerSelect = document.querySelector('[data-inner]');

    thumbnailSelect.forEach((thumbnail) => {
      thumbnail.addEventListener('mouseover', () => {
        if (activeImgSelect.length > 0) {
          activeImgSelect[0].classList.remove('active');
        }

        thumbnail.classList.add('active');
        featuredSelect.src = thumbnail.src;
      });
      thumbnail.addEventListener('click', () => {
        if (activeImgSelect.length > 0) {
          activeImgSelect[0].classList.remove('active');
        }

        thumbnail.classList.add('active');
        featuredSelect.src = thumbnail.src;
      });
    });

    controlsSelect.forEach((control) => {
      control.addEventListener('click', () => {
        const controlSelection = control.dataset.controls;

        if (controlSelection === 'left') {
          innerSelect.scrollLeft -= 200;
        }
        if (controlSelection === 'right') {
          innerSelect.scrollLeft += 200;
        }
      });
    });
  },

  render: ({ img: imgArr, name }) => {
    const { left, right } = ProductSlider.icons;

    return `
      <img class="productSlider__featured" src="${
        imgArr[0]
      }" alt="${name}" data-featured/>
      <div class="productSlider__container">
      <button data-controls="left">${left}</button>
      <div class="productSlider__inner" data-inner>
       <img class="productSlider__thumbnail active" src='${
         imgArr[0]
       }' alt='${name}' data-thumbnail/>
        ${imgArr
          .slice(1)
          .map((img) => {
            return `<img class="productSlider__thumbnail" src='${img}' alt='${name}' data-thumbnail/>`;
          })
          .join('')}
      </div>
       <button data-controls="right">${right}</button>
      </div>
    `;
  },
};

export default ProductSlider;
