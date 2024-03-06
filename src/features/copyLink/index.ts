window.Webflow = window.Webflow || [];

window.Webflow.push(() => {
  const modalShareEl = document.querySelector('.modal_share_1') as HTMLElement;
  const input = modalShareEl?.querySelector('input') as HTMLInputElement;
  const btn = modalShareEl?.querySelector('.button') as HTMLLinkElement;
  if (!input || !modalShareEl) return;
  const { href } = window.location;

  input.value = href;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(href);
      btn.textContent = 'Kopierad!';

      setTimeout(() => {
        btn.textContent = 'Kopiera';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });
});
