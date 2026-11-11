(() => {
  'use strict';
  const dialog = document.getElementById('checkout-dialog');
  const checkoutButtons = document.querySelectorAll('[data-checkout]');
  let checkoutUrl = null;
  try {
    const candidate = new URL(window.NATAL_CONFIG?.checkoutUrl || '');
    if (candidate.protocol === 'https:' || candidate.protocol === 'http:') checkoutUrl = candidate.href;
  } catch { /* Um checkout vazio mantém a página em modo de pré-lançamento. */ }

  checkoutButtons.forEach(button => {
    if (checkoutUrl) {
      button.href = checkoutUrl;
      button.removeAttribute('aria-haspopup');
    } else {
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', event => {
        event.preventDefault();
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else window.alert('As compras ainda não estão disponíveis. Volte em breve.');
      });
    }
  });

  document.querySelectorAll('[data-close-dialog]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    }
  });

  const mobileBar = document.getElementById('mobile-bar');
  const hero = document.getElementById('inicio');
  const offer = document.getElementById('oferta');
  const narrowScreen = window.matchMedia('(max-width: 767px)');
  let heroVisible = true;
  let offerVisible = false;
  const updateBar = () => {
    const passedHero = hero.getBoundingClientRect().bottom <= 0;
    mobileBar.hidden = !narrowScreen.matches || heroVisible || !passedHero || offerVisible;
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === offer) offerVisible = entry.isIntersecting;
      });
      updateBar();
    }, { threshold: 0 });
    observer.observe(hero);
    observer.observe(offer);
  }
  narrowScreen.addEventListener?.('change', updateBar);
})();
