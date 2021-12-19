import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './style.scss';

customElement('shapla-wc-modal')

class ShaplaWcModal extends LitElement {

  static override styles = style({css})

  /**
   * The status of the modal
   */
  @property({type: Boolean})
  active = false;

  /**
   * The modal type
   */
  @property({type: String})
  type = 'card';

  /**
   * The size of modal content. Value can be small, medium, large, fullscreen
   */
  @property({type: String, attribute: 'content-size'})
  contentSize = 'medium';

  @property({type: String, attribute: 'bg-theme'})
  backgroundTheme = 'dark'

  @property({type: Boolean, attribute: 'disabled-bgclick'})
  disabledBackgroundClick = false;

  @property({type: Boolean, attribute: 'disabled-close'})
  hideCloseIcon = false;

  @property({type: String})
  heading = 'Untitled';

  @property({type: Boolean, attribute: 'disabled-footer'})
  hideCardFooter = false;

  override render() {
    const modalClasses = ['shapla-modal'];
    if (this.active) modalClasses.push('is-active');

    const contentClasses = [
      'shapla-modal-content',
      `shapla-modal-${this.type}`,
      `is-${this.contentSize}`];

    const cartFooterClasses = ['shapla-modal-card__footer'];
    if (this.hideCardFooter) {
      cartFooterClasses.push('no-content');
    }
    const closeSvg = html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
      </svg>`;

    const cardClose = html`
      <button class="shapla-modal-card__close" @click=${this._close} @KeyDown=${this._keyDownEsc}
              aria-label="Close">${closeSvg}
      </button>`;

    const cardInnerStructure = html`
      <div class="shapla-modal-card__header">
        <p class="shapla-modal-card__title">${this.heading}</p>
        ${this.hideCloseIcon ? '' : cardClose}
      </div>
      <div class="shapla-modal-card__body">
        <slot></slot>
      </div>
      <div class="${cartFooterClasses.join(' ')}">
        <slot name="footer"></slot>
      </div>`;

    const modalClose = html`
      <button class="shapla-modal-close" @click=${this._close}
              aria-label="Close" title="Close">
        ${closeSvg}
      </button>`;

    return html`
      <div class="${modalClasses.join(' ')}">
        <div class="shapla-modal-background is-${this.backgroundTheme}"
             @click="${this._bgClick}"></div>
        ${this._isCard() || this.hideCloseIcon ? '' : modalClose}
        <div class="${contentClasses.join(' ')}">
          ${this._isCard() ? cardInnerStructure : html`
            <slot></slot>`}
        </div>
      </div>`;
  }

  _isCard() {
    return this.type === 'card';
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  _bgClick() {
    if (!this.disabledBackgroundClick) {
      this._close();
    }
  }

  // ESCAPE key pressed
  _keyDownEsc(event: KeyboardEvent) {
    if (event.code === 'Escape' && this.active) {
      this._close();
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', event => this._keyDownEsc(event));
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', event => this._keyDownEsc(event));
    super.disconnectedCallback();
  }
}

export default ShaplaWcModal;
