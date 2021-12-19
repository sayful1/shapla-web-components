import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './style.scss';

/**
 * A simple cross element
 */
customElement('shapla-wc-cross')
class ShaplaWcCross extends LitElement {

  static override styles = [style({css})]

  /**
   * The size of cross icon. Possible values are 'normal', 'small', 'medium', 'large'
   */
  @property({type: String})
  size = 'normal';

  /**
   * The value for aria-label
   */
  @property({type: String, attribute: 'aria-label'})
  override ariaLabel = 'Close';

  override render() {
    const classes = ['shapla-delete-icon'];
    if (['normal', 'small', 'medium', 'large'].indexOf(this.size) !== -1) {
      classes.push(`is-${this.size}`);
    }
    return html`<span class="${classes.join(' ')}" aria-label="${this.ariaLabel}" role="button"></span>`;
  }
}

export default ShaplaWcCross;
