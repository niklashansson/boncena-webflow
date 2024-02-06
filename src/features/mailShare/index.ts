window.Webflow = window.Webflow || [];

window.Webflow.push(async () => {
  const instances = Array.from(document.querySelectorAll('[mailto-instance]'));
  if (instances.length === 0) return;

  const allLinks = Array.from(document.querySelectorAll('a[id^="mailto-"]'));
  if (allLinks.length === 0) return;

  instances.forEach((instance) => {
    const index = instance.getAttribute('mailto-instance');
    const href = instance.getAttribute('mailto-href');

    const relevantLinks = allLinks.filter((link) => link.id === `mailto-${index}`);

    relevantLinks.forEach((link) => {
      if (href !== null) {
        // Only set href if it's not null
        link.setAttribute('href', href);
      }
    });
  });
});
