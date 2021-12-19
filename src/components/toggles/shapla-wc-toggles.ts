import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js';
import ToggleUtils from './ToggleUtils.js'

customElement('shapla-wc-toggles')

class ShaplaWcToggles extends LitElement {

  @property({type: String, attribute: 'data-uuid'})
  uuid

  @property({type: String, attribute: 'data-accordion'})
  accordion = 'true'

  @property({type: String, attribute: 'data-box-mode'})
  boxMode = 'true'

  @property({type: String, attribute: 'data-show-divider'})
  showDivider = 'true'

  @property({type: String, attribute: 'data-icon-position'})
  iconPosition = 'left'

  @property({type: String, attribute: 'data-title-color'})
  titleColor = 'default'

  constructor() {
    super()
    this.uuid = this.hasAttribute('id')
      ? this.getAttribute('id')
      : ToggleUtils.createUUID()
    this._setAttributeIfNotSet('data-uuid', this.uuid ?? '')
    this._setAttributeIfNotSet('data-accordion', 'true')
    this._setAttributeIfNotSet('data-box-mode', 'true')
    this._setAttributeIfNotSet('data-show-divider', 'true')
    this._setAttributeIfNotSet('data-icon-position', 'left')
    this._setAttributeIfNotSet('data-title-color', 'default')
  }

  _setAttributeIfNotSet(name: string, value: string = '') {
    if (!this.hasAttribute(name)) {
      this.setAttribute(name, value)
    }
  }

  override updated() {
    ToggleUtils.dispatch('changed.ShaplaWcToggle', this.dataset)
  }

  override render() {
    return html`
      <div class="shapla-toggles">
        <slot></slot>
      </div>`
  }
}

export default ShaplaWcToggles
