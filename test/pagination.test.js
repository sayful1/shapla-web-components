import {expect, fixture, html, oneEvent} from "@open-wc/testing";
import '../public/bundle.js';

describe('ShaplaWcPagination', () => {
    it('has default args totalItems 0, currentPage 1 and perPage 20', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination></shapla-wc-pagination>`);
        expect(el.totalItems).to.equal(0);
        expect(el.currentPage).to.equal(1);
        expect(el.perPage).to.equal(20);
    })

    it('can change totalItems page', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination total-items="100"></shapla-wc-pagination>`);
        expect(el.totalItems).to.equal(100);
        expect(el.totalPages()).to.equal(5);
    })

    it('can not go page less than 1', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination current-page="0"></shapla-wc-pagination>`);
        expect(el._currentPage()).to.equal(1);
    })

    it('can not go page more than total pages', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination current-page="1000"></shapla-wc-pagination>`);
        expect(el.totalPages()).to.equal(1);
        expect(el._currentPage()).to.equal(1);
    })

    it('has ellipsis on if total pages is more than 6', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination current-page="1000"></shapla-wc-pagination>`);
        expect(el.hasEllipsis()).to.equal(false);
    })

    it('has start ellipsis if current page is more than 3', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination current-page="1000"></shapla-wc-pagination>`);
        expect(el.hasStartEllipsis()).to.equal(false);
    })

    it('has end ellipsis if current page less than total pages by upto 4 page', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination total-items="200" current-page="6"></shapla-wc-pagination>`);
        expect(el.hasEndEllipsis()).to.equal(true);
    })

    it('throws an event with the expected value when click previous button', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination total-items="200" current-page="6"></shapla-wc-pagination>`);
        const listener = oneEvent(el, 'paginate');
        el.shadowRoot.querySelector('.pagination-previous').click();
        let {detail} = await listener;
        expect(detail.nextPage).to.equal(5);
    });

    it('throws an event with the expected value when click next button', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination total-items="200" current-page="6"></shapla-wc-pagination>`);
        const listener = oneEvent(el, 'paginate');
        el.shadowRoot.querySelector('.pagination-next').click();
        let {detail} = await listener;
        expect(detail.nextPage).to.equal(7);
    });

    it('throws an event with the expected value when click on item', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination total-items="200" current-page="6"></shapla-wc-pagination>`);
        const listener = oneEvent(el, 'paginate');
        el.shadowRoot.querySelector('.pagination-link').click();
        let {detail} = await listener;
        expect(detail.nextPage).to.equal(1);
    });

    it('can change pre and next text', async () => {
        const el = await fixture(html`
            <shapla-wc-pagination text-previous="&laquo;" text-next="&raquo;"></shapla-wc-pagination>`);
        expect(el.textPrevious).to.equal('«');
        expect(el.textNext).to.equal('»');
    })

    // it('passes the a11y audit', async () => {
    //     const el = await fixture(html`
    //         <shapla-wc-pagination></shapla-wc-pagination>`)
    //     await expect(el).shadowDom.to.be.accessible();
    // })
})