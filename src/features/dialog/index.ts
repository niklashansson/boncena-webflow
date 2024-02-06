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
      trigger.href = '';

      trigger.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === 'Enter' || e.key === ' ') openDialog(index, dialog);
      });
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog(index, dialog);
      });
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

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) closeDialog(dialog);
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
