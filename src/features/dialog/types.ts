export interface ModalInstance {
  id: string | null;
  // componentElement: HTMLElement;
  dialog: HTMLDialogElement;
  index: number | null;
  triggers: HTMLElement[];
  ariaLabel: string | null;
}
