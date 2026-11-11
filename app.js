(() => {
  'use strict';
  const dialog = document.getElementById('checkout-dialog');
  const checkoutButtons = document.querySelectorAll('[data-checkout]');
  let checkoutUrl = null;
  try {
    const candidate = new URL(window.NATAL_CONFIG?.checkoutUrl || '');
    if (candidate.protocol === 'https:' || candidate.protocol === 'http:') checkoutUrl = candidate.href;
  } catch { /* Um checkout vazio mantém a página em modo de pré-lançamento. */ }

  // Meta Pixel & Conversions API (CAPI) Integration
  const getCookie = name => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    } catch {}
    return null;
  };

  const getFbc = () => {
    const cookieFbc = getCookie('_fbc');
    if (cookieFbc) return cookieFbc;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const fbclid = urlParams.get('fbclid');
      if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
    } catch {}
    return null;
  };

  const sendCapi = (eventName, customData = null, eventId = null) => {
    try {
      const payload = {
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getFbc(),
        customData
      };
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/capi', blob);
      } else {
        fetch('/api/capi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    } catch (e) {}
  };

  // Enviar PageView para a API de Conversões do Meta (CAPI)
  sendCapi('PageView');

  const trackCheckout = () => {
    const eventId = 'ic_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    const customData = {
      content_name: 'Natal em Feltro',
      value: 29.90,
      currency: 'BRL'
    };
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', customData, { eventID: eventId });
    }
    sendCapi('InitiateCheckout', customData, eventId);
  };

  checkoutButtons.forEach(button => {
    if (checkoutUrl) {
      button.href = checkoutUrl;
      button.removeAttribute('aria-haspopup');
      button.addEventListener('click', () => {
        trackCheckout();
      });
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
