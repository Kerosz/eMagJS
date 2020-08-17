import Api from '../Api';

const Newsletter = {
  componentDidUpdate: () => {
    document
      .querySelector('[data-form]')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('[data-name]');
        const email = document.querySelector('[data-email]');
        const feedbackContainer = document.querySelector('[data-error]');

        const data = await Api.subscribe({
          name: name.value,
          email: email.value,
        });

        if (data.error) {
          feedbackContainer.innerHTML = `<div><p>${data.error}</p></div>`;
        } else {
          document.location.hash = '/';
          name.value = '';
          email.value = '';
          feedbackContainer.innerHTML = `<div><p>You are succesfully subscribed to eMAG newsletter</p></div>`;
        }
      });
  },

  render: () => {
    return `
      <section class="newsletter">
        <div class="newsletter-container wrapper">
          <div class="newsletter__image">
            <img src="/img/newsletter.png" alt="Happiness"/>
          </div>
          <div class="newsletter__content">
            <h1 class="newsletter__title">Subscribe to eMAG newsletter and find out all about our limited offers</h1>
            <p class="newsletter__agreement">By subscribing to eMAG newsletter I confirm that I am at least 16 years old</p>
            <form action="POST" class="newsletter__form" data-form>
              <input type="text" name="name" placeholder="Name" class="newsletter__form-field" data-name />
              <input type="email" name="email" placeholder="Mailbox" class="newsletter__form-field" data-email />
              <button type="submit" class="newsletter__form-field newsletter__btn" >Subscribe me</button>
            </form>
            <div class="newsletter__error" data-error></div>
          </div>
        </div>
      </section>
    `;
  },
};

export default Newsletter;
