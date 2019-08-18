export default class GlobalAlerts {

  constructor() {
    this.containerID = 'alerts-container';
    this.count = 0;
  }

  get container() {
    return document.getElementById(this.containerID);
  }

  sendAlert(text, type = 'primary', duration = 5000) {
    if (!text) {
      return;
    }
    const newCount = this.count + 1;
    this.count = newCount;
    this._renderAlertContainer()
    this._renderAlert(text, type);
    setTimeout(() => {
      this.count = this.count - 1;
      this._removeAlert(newCount);
    }, duration);
  }

  _renderAlertContainer() {
    const container = this.container;
    if (!container) {
      const container = document.createElement('div');
      container.setAttribute('id', this.containerID);
      document.body.appendChild(container);
    }
  }

  _removeAlertContainer() {
    const container = this.container;
    container.remove();
  }

  _renderAlert (text, type) {
    const container = document.getElementById('alerts-container');
    const el = document.createElement('div');
    el.textContent = 'id: ' + this.count + ' ' + text;
    el.setAttribute('data-id', this.count);
    el.classList.add('alert', `alert--${type}`, 'alert--fade-out');
    container.appendChild(el);
    setTimeout(() => {
      el.classList.remove('alert--fade-out');
    }, 0);
  }

  _removeAlert(id) {
    const alerts = document.querySelectorAll(`[data-id='${id}']`);
    const alert = alerts[0];
    alert.classList.add('alert--fade-out');
    setTimeout(() => {
      alert.remove();
      if (this.count === 0) {
        this._removeAlertContainer();
      }
    }, 500);
  }
}

window.alertsService = new GlobalAlerts();