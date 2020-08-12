const Newsletter = {
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
            <form action="POST" class="newsletter__form">
              <input type="text" name="name" placeholder="Name" class="newsletter__form-field"/>
              <input type="email" name="email" placeholder="Mailbox" class="newsletter__form-field"/>
              <button type="submit" class="newsletter__form-field newsletter__btn" >Subscribe me</button>
            </form>
          </div>
        </div>
      </section>
    `;
  },
};

export default Newsletter;
