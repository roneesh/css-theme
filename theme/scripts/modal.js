export default class GlobalModals {

  constructor() {
    this.modalOpenId = null;
  }

  openModal(options) {
    if (this.modalOpenId) {
      console.warn(`Can not open modal. Modal with attr: ${this.modalOpenId} is already opened.`);
      return;
    }
    const modal = document.getElementById(options.id);
    const id = options.id;
    if (modal) {
      const id = options.id;
      console.log(`Opening modal: ${id}`);
      this.modalOpenId = id;
      console.log('this: ', this);
      this._showModal(modal);
      this._bindEvents();
    } else {
      console.warn(`Can not find modal with id ${id}.`);
      return;
    }
  }

  closeActiveModal() {
    if (!this.modalOpenId) {
      console.warn('No active modal being shown');
    }
    const modal = document.getElementById(this.modalOpenId);
    if (modal) {
      this._hideModal(modal);
      this._removeBoundEvents();
      this.modalOpenId = null;
    } else {
      console.warn(`Can not find modal of id ${this.modalOpenId} that is being shown. Please refresh the page.`);
      return;
    }
  }

  _showModal(modal) {
    document.body.classList.add('modal-open');
    modal.setAttribute("style", "display: block;");
    modal.classList.add('modal--show');
  }

  _bindEvents() {
    document.body.addEventListener("keydown", this._onKeyPress.bind(this), {passive: true});
  }

  _hideModal(modal) {
    document.body.classList.remove('modal-open');
    modal.removeAttribute("style");
    modal.classList.remove('modal--show');
  }

  _removeBoundEvents() {
    document.body.removeEventListener("keydown", this._onKeyPress.bind(this), {passive: true});
  }

  _onKeyPress(evt) {
    if (evt.code === 'Escape') {
      this.closeActiveModal();
    }
  }

}

window.modalService = new GlobalModals();