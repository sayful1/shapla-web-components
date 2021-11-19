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
    }

    render() {
        const ellipsis = html`
            <li><span class="pagination-ellipsis">&hellip;</span></li>`
        let itemsHtml = this.itemStructure();
        const pagination = html`
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous" ?disabled=${this._disabledPrevious()}
                   @click=${this._previous}>Previous</a>
                <a class="pagination-next" ?disabled=${this._disabledNext()} @click=${this._next}>Next page</a>
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
        if (this.currentPage < 4) {
            this.range(2, 4).forEach(page => {
                itemsHtml.push({type: 'page', number: page});
            })
        }
        if (this.hasStartEllipsis()) {
            itemsHtml.push({type: 'ellipsis', position: 'start'});
        }
        if (this.currentPage >= 4 && this.currentPage <= (this.totalPages() - 3)) {
            itemsHtml.push({type: 'page', number: this.currentPage - 1});
            itemsHtml.push({type: 'page', number: this.currentPage});
            itemsHtml.push({type: 'page', number: this.currentPage + 1});
        }
        if (this.hasEndEllipsis()) {
            itemsHtml.push({type: 'ellipsis', position: 'end'});
        }
        if (this.currentPage > (this.totalPages() - 3)) {
            this.range(this.totalPages() - 3, this.totalPages() - 1).forEach(page => {
                itemsHtml.push({type: 'page', number: page});
            })
        }
        itemsHtml.push({type: 'page', number: this.totalPages()});
        return itemsHtml;
    }

    itemHtml(pageNumber, href = '#') {
        let classes = ['pagination-link'], areaLabel = `Goto page ${pageNumber}`;

        if (pageNumber === this.currentPage) {
            return html`
                <li><span class="pagination-link is-current" aria-label="Page ${pageNumber}"
                          aria-current="page">${pageNumber}</span></li>`
        }
        return html`
            <li><a class="${classes.join(' ')}" aria-label="${areaLabel}" href="${href}"
                   @click=${() => this._paginate(pageNumber)}>${pageNumber}</a></li>`
    }

    _disabledPrevious() {
        return this.currentPage <= 1;
    }

    _disabledNext() {
        return this.currentPage >= this.totalPages();
    }

    _previous() {
        if (!this._disabledPrevious()) {
            this._paginate(this.currentPage - 1);
        }
    }

    _next() {
        if (!this._disabledNext()) {
            this._paginate(this.currentPage + 1);
        }
    }

    _paginate(pageNumber) {
        if (pageNumber !== this.currentPage && pageNumber > 0 && pageNumber <= this.totalPages()) {
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
        return this.hasEllipsis() && this.currentPage > 3;
    }

    hasEndEllipsis() {
        return (this.currentPage < (this.totalPages() - 2));
    }

    totalPages() {
        return Math.ceil(this.totalItems / this.perPage)
    }
}

export default ShaplaWcPagination;