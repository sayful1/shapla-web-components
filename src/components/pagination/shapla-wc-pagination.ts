import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './style.scss';

interface ItemStructureInterface {
  type: string,
  number: number,
  position?: string
}

customElement('shapla-wc-pagination');

class ShaplaWcPagination extends LitElement {
  static override styles = style({css});

  @property({type: Number, attribute: 'total-items'})
  totalItems = 0;

  @property({type: Number, attribute: 'per-page'})
  perPage = 0;

  @property({type: Number, attribute: 'current-page'})
  currentPage = 0;

  @property({type: Number, attribute: 'max-links'})
  maxLinks = 6;

  @property({type: String, attribute: 'text-previous'})
  textPrevious = 'Previous';

  @property({type: String, attribute: 'text-next'})
  textNext = 'Next';

  @property({type: String, attribute: 'item-aria-label'})
  itemAriaLabel = 'Goto page %#%';

  @property({type: String, attribute: 'current-item-aria-label'})
  currentItemAriaLabel = 'Page %#%';

  @property({type: String, attribute: 'size'})
  size = 'default';

  @property({type: String, attribute: 'url-format'})
  urlFormat = undefined;

  override render() {
    const ellipsis = html`
      <li><span class="pagination-ellipsis">&hellip;</span></li>`;
    const itemsHtml = this.itemStructure();
    return html`
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous" ?disabled=${this._disabledPrevious()}
           @click=${this._previous}>${this.textPrevious}</a>
        <a class="pagination-next" ?disabled=${this._disabledNext()}
           @click=${this._next}>${this.textNext}</a>
        <ul class="pagination-list">
          ${itemsHtml.map((i) => {
            if (i.type === 'ellipsis') {
              return html`${ellipsis}`;
            }
            return this.itemHtml(i.number);
          })}
        </ul>
      </nav>`;
  }

  itemStructure(): ItemStructureInterface[] {
    const itemsHtml: ItemStructureInterface[] = [];
    if (!this.hasEllipsis()) {
      this.range(1, this.totalPages()).forEach((page) => {
        itemsHtml.push({type: 'page', number: page});
      });
      return itemsHtml;
    }

    itemsHtml.push({type: 'page', number: 1});
    if (this._currentPage() < 4) {
      this.range(2, 4).forEach((page) => {
        itemsHtml.push({type: 'page', number: page});
      });
    }
    if (this.hasStartEllipsis()) {
      itemsHtml.push({type: 'ellipsis', position: 'start', number: -1});
    }
    if (this._currentPage() >= 4 && this._currentPage()
      <= (this.totalPages() - 3)) {
      itemsHtml.push({type: 'page', number: this._currentPage() - 1});
      itemsHtml.push({type: 'page', number: this._currentPage()});
      itemsHtml.push({type: 'page', number: this._currentPage() + 1});
    }
    if (this.hasEndEllipsis()) {
      itemsHtml.push({type: 'ellipsis', position: 'end', number: -1});
    }
    if (this._currentPage() > (this.totalPages() - 3)) {
      this.range(this.totalPages() - 3, this.totalPages() - 1)
        .forEach((page) => {
          itemsHtml.push({type: 'page', number: page});
        });
    }
    itemsHtml.push({type: 'page', number: this.totalPages()});
    return itemsHtml;
  }

  itemHtml(pageNumber: number, href: string = '') {
    const classes = ['pagination-link'];
    const areaLabel = this.itemAriaLabel.replace('%#%', pageNumber.toString());
    const currentAreaLabel = this.currentItemAriaLabel.replace('%#%', pageNumber.toString());

    if (pageNumber === this._currentPage()) {
      return html`
        <li><span class="pagination-link is-current"
                  aria-label="${currentAreaLabel}"
                  aria-current="page">${pageNumber}</span></li>`;
    }
    return html`
      <li><a class="${classes.join(' ')}" aria-label="${areaLabel}"
             ?href="${href}" @click=${(event: Event) => this._itemClick(event, pageNumber)}>${pageNumber}</a></li>`;
  }

  _disabledPrevious() {
    return this._currentPage() <= 1;
  }

  _disabledNext() {
    return this._currentPage() >= this.totalPages();
  }

  _itemClick(event: Event, pageNumber: number) {
    const target = event.target as Element;
    if (!target.hasAttribute('href')) {
      event.preventDefault();
    }
    this._paginate(pageNumber);
  }

  _previous() {
    if (!this._disabledPrevious()) {
      this._paginate(this._currentPage() - 1);
    }
  }

  _next() {
    if (!this._disabledNext()) {
      this._paginate(this._currentPage() + 1);
    }
  }

  _paginate(pageNumber: number) {
    if (pageNumber !== this._currentPage() && pageNumber > 0 && pageNumber
      <= this.totalPages()) {
      const data = {
        currentPage: this.currentPage,
        nextPage: pageNumber,
        totalPages: this.totalPages(),
        totalItems: this.totalItems,
        perPage: this.perPage,
      };
      this.dispatchEvent(new CustomEvent('paginate', {detail: data}));
    }
  }

  range(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, index: number) => start + index);
  }

  hasEllipsis() {
    return this.totalPages() > this.maxLinks;
  }

  hasStartEllipsis() {
    return this.hasEllipsis() && this._currentPage() > 3;
  }

  hasEndEllipsis() {
    return (this._currentPage() < (this.totalPages() - 2));
  }

  totalPages() {
    return Math.max(1, Math.ceil(this.totalItems / this.perPage));
  }

  _currentPage() {
    if (this.currentPage < 1) {
      return 1;
    }
    if (this.currentPage > this.totalPages()) {
      return this.totalPages();
    }
    return this.currentPage;
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', event => this._keyDownArrow(event));
    setTimeout(() => {
      const links = this.shadowRoot?.querySelectorAll('.pagination-link');
      links?.forEach((link: Element) => {
        link.addEventListener('focus', () => {
          console.log('focus element.');
        });
      });
    }, 100);
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', event => this._keyDownArrow(event));
    super.disconnectedCallback();
  }

  _keyDownArrow(event: KeyboardEvent) {
    if (['ArrowRight', 'ArrowUp'].indexOf(event.code) !== -1) {
      console.log('Go next', event);
    }
    if (['ArrowLeft', 'ArrowDown'].indexOf(event.code) !== -1) {
      console.log('Go pre', event);
    }
  }
}

export default ShaplaWcPagination;
