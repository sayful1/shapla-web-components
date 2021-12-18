import { LitElement, html, css } from 'lit';
import style from './index.scss';
import ToggleUtils from './ToggleUtils.js';

class ShaplaWcToggle extends LitElement {
  static get properties() {
    return {
      name: { type: String, attribute: 'data-title' },
      subtext: { type: String, attribute: 'data-subtitle' },
      selected: { type: Boolean, attribute: 'data-selected' },
      accordion: { type: Boolean, attribute: 'data-accordion' },
      boxMode: { type: Boolean, attribute: 'data-box-mode' },
      showDivider: { type: Boolean, attribute: 'data-show-divider' },
      iconPosition: { type: Boolean, attribute: 'data-icon-position' },
      titleColor: { type: Boolean, attribute: 'data-title-color' },
    };
  }

  static get styles() {
    return style({ css });
  }

  constructor() {
    super();

    this.name = '';
    const parentDataset = this.parentNode.dataset;
    this.iconPosition = parentDataset.iconPosition ?? 'left';
    this.titleColor = parentDataset.titleColor ?? 'default';
    this.boxMode = parentDataset.boxMode ?? true;
    this.showDivider = parentDataset.showDivider ?? true;
    this.parentUUID = parentDataset.uuid;
    this.accordion = parentDataset.accordion ?? true;
    this.selected = false;
    this.isOverflowVisible = this.selected || false;
    this.itemUUID = ToggleUtils.createUUID();

    this.watchCloseEvent();
    this.watchChangeEvent();
  }

  watchCloseEvent() {
    ToggleUtils.on('close.ShaplaWcToggle', (data) => {
      if (data.togglesUUID === this.parentUUID) {
        const panelBody = this.shadowRoot.querySelector('.shapla-toggle-panel__body');
        if (data.toggleUUID === this.itemUUID) {
          panelBody.classList.toggle('is-active');
        } else if (this.selected) {
          this.selected = false;
          this.isOverflowVisible = false;
          panelBody.classList.remove('is-active');
        }
      }
    });
  }

  watchChangeEvent() {
    ToggleUtils.on('changed.ShaplaWcToggle', async (data) => {
      if (data.uuid === this.parentUUID) {
        if (this.accordion !== data.accordion) {
          this.accordion = data.accordion;
        }
        if (this.boxMode !== data.boxMode) {
          this.boxMode = data.boxMode;
        }
        if (this.iconPosition !== data.iconPosition) {
          this.iconPosition = data.iconPosition;
        }
        if (this.showDivider !== data.showDivider) {
          this.showDivider = data.showDivider;
        }
        if (this.titleColor !== data.titleColor) {
          this.titleColor = data.titleColor;
        }
      }
    });
  }

  render() {
    return html`
            <div class="${this._panelClass()}">
                <div class="${this._headingClasses()}" @click="${event => this._toggleActive(event)}">
                    <div class="shapla-toggle-panel__title">
                        <h4 class="shapla-toggle-panel__title-text">
                            <slot name="title">${this.name}</slot>
                        </h4>
                        <div class="shapla-toggle-panel__title-subtext">${this.subtext}</div>
                    </div>
                    <div class="${this._iconClass()}">
                        ${this.selected ? this._icon('minus') : this._icon('plus')}
                    </div>
                </div>
                <div class="${this._panelBodyClass()}">
                    <div class="shapla-toggle-panel__content">
                        <slot></slot>
                    </div>
                </div>
            </div>`;
  }

  _icon(name) {
    if (name === 'minus') {
      return html`
                <slot name="icon-close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19 13H5v-2h14v2z"/>
                    </svg>
                </slot>`;
    }
    return html`
            <slot name="icon-open">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            </slot>`;
  }

  _checked(value) {
    return ['yes', 'on', 'true', true, 1, '1'].indexOf(value) !== -1;
  }

  _panelClass() {
    const classes = ['shapla-toggle-panel', 'shapla-toggle-panel--default'];
    if (this._checked(this.boxMode)) classes.push('shapla-toggle-panel--boxed-mode');
    if (!this._checked(this.showDivider) && !this._checked(this.boxMode)) {
      classes.push('shapla-toggle-panel--no-divider');
    }
    return classes.join(' ');
  }

  _headingClasses() {
    const classes = ['shapla-toggle-panel__heading'];
    if (this.iconPosition !== 'left') {
      classes.push(`has-icon-${this.iconPosition}`);
    }
    if (['primary', 'secondary'].indexOf(this.titleColor) !== -1) {
      classes.push(`is-color-${this.titleColor}`);
    }
    return classes.join(' ');
  }

  _panelBodyClass() {
    const panelBodyClass = ['shapla-toggle-panel__body'];
    if (this.selected) panelBodyClass.push('is-active');
    if (this.isOverflowVisible) panelBodyClass.push('is-overflow-visible');
    return panelBodyClass.join(' ');
  }

  _iconClass() {
    const classes = ['shapla-toggle-panel__icon', `is-icon-${this.iconPosition}`];
    return classes.join(' ');
  }

  _toggleActive(event) {
    event.preventDefault();
    this.selected = !this.selected;
    this.isOverflowVisible = this.selected;
    if (this._checked(this.accordion)) {
      ToggleUtils.dispatch('close.ShaplaWcToggle', {
        togglesUUID: this.parentUUID,
        toggleUUID: this.itemUUID,
      });
    }
  }
}

export default ShaplaWcToggle;
