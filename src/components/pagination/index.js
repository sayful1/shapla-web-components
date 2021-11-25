import {css, html, LitElement} from "lit";
import style from './index.scss';

class ShaplaWcPagination extends LitElement {
    static get properties() {
        return {
            totalItems: {type: Number, attribute: 'total-items'},
            perPage: {type: Number, attribute: 'per-page'},
            currentPage: {type: Number, attribute: 'current-page'},
            prevText: {type: String, attribute: 'prev-text'},
            nextText: {type: String, attribute: 'next-text'},
            ariaLabel: {type: String, attribute: 'aria-label'},
            screenReaderText: {type: String, attribute: 'screen-reader-text'},
            urlFormat: {type: String, attribute: 'url-format'},
            size: {type: String},
            maxLinks: {type: Number, attribute: 'max-links'},
            textPrevious: {type: String, attribute: 'text-previous'},
            textNext: {type: String, attribute: 'text-next'},
            itemAriaLabel: {type: String, attribute: 'item-aria-label'},
            currentItemAriaLabel: {type: String, attribute: 'current-item-aria-label'},
        }
    }

    static get styles() {
        return style({css});
    }

    constructor() {
        super();
        this.totalItems = 0;
        this.currentPage = 1;
        this.perPage = 20;
        this.maxLinks = 6;
        this.textPrevious = 'Previous'
        this.textNext = 'Next'
        this.itemAriaLabel = 'Goto page %#%'
        this.currentItemAriaLabel = 'Page %#%'
    }

    render() {
        const ellipsis = html`
            <li><span class="pagination-ellipsis">&hellip;</span></li>`
        let itemsHtml = this.itemStructure();
        const pagination = html`
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous" ?disabled=${this._disabledPrevious()}
                   @click=${this._previous}>${this.textPrevious}</a>
                <a class="pagination-next" ?disabled=${this._disabledNext()} @click=${this._next}>${this.textNext}</a>
                <ul class="pagination-list">
                    ${itemsHtml.map(i => {
                        if (i.type === "ellipsis") {
                            return html`${ellipsis}`
                        } else {
                            return this.itemHtml(i.number);
                        }
                    })}
                </ul>
            </nav>`;
        return pagination;
    }

    itemStructure() {
        let itemsHtml = [];
        if (!this.hasEllipsis()) {
            this.range(1, this.totalPages()).forEach(page => {
                itemsHtml.push({type: 'page', number: page});
            })
            return itemsHtml;
        }

        itemsHtml.push({type: 'page', number: 1});
        if (this._currentPage() < 4) {
            this.range(2, 4).forEach(page => {
                itemsHtml.push({type: 'page', number: page});
            })
        }
        if (this.hasStartEllipsis()) {
            itemsHtml.push({type: 'ellipsis', position: 'start'});
        }
        if (this._currentPage() >= 4 && this._currentPage() <= (this.totalPages() - 3)) {
            itemsHtml.push({type: 'page', number: this._currentPage() - 1});
            itemsHtml.push({type: 'page', number: this._currentPage()});
            itemsHtml.push({type: 'page', number: this._currentPage() + 1});
        }
        if (this.hasEndEllipsis()) {
            itemsHtml.push({type: 'ellipsis', position: 'end'});
        }
        if (this._currentPage() > (this.totalPages() - 3)) {
            this.range(this.totalPages() - 3, this.totalPages() - 1).forEach(page => {
                itemsHtml.push({type: 'page', number: page});
            })
        }
        itemsHtml.push({type: 'page', number: this.totalPages()});
        return itemsHtml;
    }

    itemHtml(pageNumber, href = '') {
        let classes = ['pagination-link'],
            areaLabel = this.itemAriaLabel.replace("%#%", pageNumber),
            currentAreaLabel = this.currentItemAriaLabel.replace("%#%", pageNumber);

        if (pageNumber === this._currentPage()) {
            return html`
                <li><span class="pagination-link is-current" aria-label="${currentAreaLabel}"
                          aria-current="page">${pageNumber}</span></li>`
        }
        return html`
            <li><a class="${classes.join(' ')}" aria-label="${areaLabel}" ?href="${href}"
                   @click=${event => this._itemClick(event, pageNumber)}>${pageNumber}</a></li>`
    }

    _disabledPrevious() {
        return this._currentPage() <= 1;
    }

    _disabledNext() {
        return this._currentPage() >= this.totalPages();
    }

    _itemClick(event, pageNumber) {
        if (!event.target.hasAttribute('href')) {
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

    _paginate(pageNumber) {
        if (pageNumber !== this._currentPage() && pageNumber > 0 && pageNumber <= this.totalPages()) {
            let data = {
                currentPage: this.currentPage,
                nextPage: pageNumber,
                totalPages: this.totalPages(),
                totalItems: this.totalItems,
                perPage: this.perPage,
            }
            this.dispatchEvent(new CustomEvent('paginate', {detail: data}));
        }
    }

    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
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
        return Math.max(1, Math.ceil(this.totalItems / this.perPage))
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
}

export default ShaplaWcPagination;