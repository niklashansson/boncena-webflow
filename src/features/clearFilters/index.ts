import type { CMSFilters } from 'src/types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fsAttributes: any;
  }
}

window.fsAttributes = window.fsAttributes || [];

window.fsAttributes.push([
  'cmsfilter',
  (filterInstances: CMSFilters[]) => {
    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances;

    const totalItemsCount = filterInstance.listInstance.items.length;

    const resetButtons = filterInstance.resetButtonsData;

    // The `renderitems` event runs whenever the list renders items after filtering.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterInstance.listInstance.on('renderitems', (renderedItems: any) => {
      const shownItemsCount = renderedItems.length;

      if (totalItemsCount === shownItemsCount) {
        resetButtons.forEach((_, key) => {
          key.classList.add('is-active');
        });
      } else {
        resetButtons.forEach((_, key) => key.classList.remove('is-active'));
      }
    });
  },
]);
