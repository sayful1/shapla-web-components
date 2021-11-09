import {LitElement, html, css} from "lit";
import style from './index.scss';

class ShaplaWcModal extends LitElement {
    static get properties() {
        return {
            active: {type: Boolean},
            type: {type: String},
            contentSize: {type: String, attribute: 'content-size'},
            backgroundTheme: {type: String, attribute: 'bg-theme'},
            disabledBackgroundClick: {type: Boolean, attribute: 'disabled-bgclick'},
            hideCloseIcon: {type: Boolean, attribute: 'disabled-close'},
            // Card
            heading: {type: String},
            hideCardFooter: {type: Boolean, attribute: 'disabled-footer'},
        }
    }

    static get styles() {
        return style({css});
    }

    constructor() {
        super();
        this.active = false;
        this.backgroundTheme = 'dark';
        this.contentSize = 'medium';
        this.type = 'card';
        this.hideCloseIcon = false;
        this.disabledBackgroundClick = false;
        this.heading = 'Untitled';
        this.hideCardFooter = false;
    }

    render() {
        let modalClasses = ['shapla-modal'];
        if (this.active) modalClasses.push('is-active');

        let contentClasses = ['shapla-modal-content', `shapla-modal-${this.type}`, `is-${this.contentSize}`];

        let cartFooterClasses = ['shapla-modal-card__footer'];
        if (this.hideCardFooter) {
            cartFooterClasses.push('no-content');
        }
        const closeSvg = html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>`;

        const cardClose = html`
            <button class="shapla-modal-card__close" @click=${this._close} aria-label="Close">${closeSvg}</button>`;

        let cardInnerStructure = html`
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
            <button class="shapla-modal-close" @click=${this._close} aria-label="Close" title="Close">
                ${closeSvg}
            </button>`;

        return html`
            <div class="${modalClasses.join(' ')}">
                <div class="shapla-modal-background is-${this.backgroundTheme}" @click=${this._bgClick}></div>
                ${this._isCard() || this.hideCloseIcon ? '' : modalClose}
                <div class="${contentClasses.join(' ')}">
                    ${this._isCard() ? cardInnerStructure : html`
                        <slot></slot>`}
                </div>
            </div>`;
    }

    _isCard() {
        return 'card' === this.type;
    }

    _close() {
        this.active = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    _bgClick() {
        if (!this.disabledBackgroundClick) {
            this._close();
        }
    }
}

export default ShaplaWcModal;