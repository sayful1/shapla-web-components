import {LitElement, html, css} from "lit";
import style from './index.scss';

class ShaplaWcCross extends LitElement {
    static get properties() {
        return {
            size: {type: String},
            ariaLabel: {type: String, attribute: 'content-size'},
        }
    }

    static get styles() {
        return style({css});
    }

    constructor() {
        super();

        this.size = 'normal';
        this.ariaLabel = 'close';
    }

    render() {
        let classes = ['shapla-delete-icon'];
        if (['normal', 'small', 'medium', 'large'].indexOf(this.size) !== -1) {
            classes.push(`is-${this.size}`);
        }
        return html`<span class="${classes.join(' ')}" aria-label="${this.ariaLabel}" role="button"></span>`;
    }
}

export default ShaplaWcCross;