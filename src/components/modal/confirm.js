import ShaplaWcModal from "./index";
import {html} from "lit";

class Confirm extends ShaplaWcModal {
    constructor() {
        super();
        this.type = 'confirm';
    }

    getContent() {
        return html`
            <div class="shapla-modal-confirm__content">
                <div class="shapla-modal-confirm__icon" :class="\`is-${icon}\`" v-if="icon">
                    <div class="shapla-modal-confirm__icon-content">!</div>
                </div>
                <h3 class="shapla-modal-confirm__title" v-if="title" v-html="title"></h3>
                <div class="shapla-modal-confirm__message" v-html="message"></div>
            </div>
            <div class="shapla-modal-confirm__actions">
                <slot name="actions">
                    <button class="shapla-button" @click.prevent="handleClick(false)" v-if="cancelButton">{{
                        cancelButton }}
                    </button>
                    <button class="shapla-button is-primary" @click.prevent="handleClick(true)" v-if="confirmButton">
                        {{ confirmButton }}
                    </button>
                </slot>
            </div>`;
    }
}