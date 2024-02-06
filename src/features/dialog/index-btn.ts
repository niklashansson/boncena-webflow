import type { ModalInstance } from './types';

window.Webflow = window.Webflow || [];

window.Webflow.push(() => {
  const dialog: HTMLDialogElement | null = document.querySelector('dialog.dialog');
  if (!dialog) return;

  const closeBtns: HTMLButtonElement[] = Array.from(
    dialog.querySelectorAll('[dialog-element="close"]')
  );
  if (!closeBtns.length) return;

  const instances: HTMLElement[] = Array.from(dialog.querySelectorAll('[dialog-instance]'));
  if (!instances.length) return;

  instances.map((instanceEl) => {
    const id = instanceEl.getAttribute('id');
    if (!id) return;
    const triggers: HTMLLinkElement[] = Array.from(document.querySelectorAll(`a[href="#${id}"]`));
    if (!triggers.length) return;
    const index = Number(instanceEl.getAttribute('dialog-instance'));
    if (!index) return;
    const ariaLabel = instanceEl.getAttribute('dialog-aria');

    triggers.forEach((trigger) => {
      const markup = createBtnMarkup(trigger, ariaLabel ? ariaLabel : '');
      const newBtn = document.createElement('div');
      newBtn.innerHTML = markup;
      const btn = newBtn.querySelector('button');

      if (btn) {
        trigger.parentNode?.replaceChild(newBtn.firstElementChild!, trigger);

        btn.addEventListener('keydown', (e) => {
          e.preventDefault();
          if (e.key === 'Enter' || e.key === ' ') openDialog(index, dialog);
        });
        btn.addEventListener('click', () => openDialog(index, dialog));
      }
    });

    const instance: ModalInstance = {
      id,
      dialog,
      triggers,
      index,
      ariaLabel,
    };

    return instance;
  });

  closeBtns.forEach((btn) => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('click', () => closeDialog(dialog));
  });
});

function openDialog(instanceIndex: number, dialog: HTMLDialogElement) {
  dialog.setAttribute('dialog-active', `${instanceIndex}`);
  dialog.showModal();
}

function closeDialog(dialog: HTMLDialogElement) {
  dialog.setAttribute('dialog-active', '');
  dialog.close();
}

function createBtnMarkup(element: HTMLElement, ariaLabel: string) {
  const text = element.innerText;
  const className = element.getAttribute('class');
  const markup = `<button type="button" class=${className} aria-label="${ariaLabel}">${text}</button>`;

  return markup;
}
