import {html, LitElement} from "lit";
import ToggleUtils from "./ToggleUtils";

class ShaplaWcToggles extends LitElement {

    static get properties() {
        return {
            uuid: {type: String, attribute: 'data-uuid'},
            accordion: {type: Boolean, attribute: 'data-accordion'},
            boxMode: {type: Boolean, attribute: 'data-box-mode'},
            showDivider: {type: Boolean, attribute: 'data-show-divider'},
            iconPosition: {type: Boolean, attribute: 'data-icon-position'},
            titleColor: {type: Boolean, attribute: 'data-title-color'},
        }
    }

    constructor() {
        super();
        this.uuid = this.hasAttribute('id') ? this.getAttribute('id') : ToggleUtils.createUUID();
        this._setAttributeIfNotSet('data-uuid', this.uuid);
        this._setAttributeIfNotSet('data-accordion', 'true')
        this._setAttributeIfNotSet('data-box-mode', 'true')
        this._setAttributeIfNotSet('data-show-divider', 'true')
        this._setAttributeIfNotSet('data-icon-position', 'left')
        this._setAttributeIfNotSet('data-title-color', 'default')
    }

    _setAttributeIfNotSet(name, value = '') {
        if (!this.hasAttribute(name)) {
            this.setAttribute(name, value);
        }
    }

    updated() {
        ToggleUtils.dispatch('changed.ShaplaWcToggle', this.dataset);
    }

    render() {
        return html`
            <div class="shapla-toggles">
                <slot></slot>
            </div>`
    }
}

export default ShaplaWcToggles;