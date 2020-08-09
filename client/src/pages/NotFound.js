const NotFound = {
  render: () => {
    document.location.hash = '/not-found';
    return `
      <div class="notfound">
        <a href="/#/" class="btn-emag notfound">Return to Homepage</a>
        <img src="/img/error404.svg" alt="Error 404"/>
      </div>
    `;
  },
};

export default NotFound;
