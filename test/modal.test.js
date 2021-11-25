import {html, fixture, expect} from '@open-wc/testing';
import '../public/bundle.js';

describe("ShaplaWcModal", () => {
    it("has a default active 'false' and type 'card'", async () => {
        const el = await fixture(html`
            <shapla-wc-modal></shapla-wc-modal>`);
        expect(el.active).to.equal(false);
        expect(el.type).to.equal('card');
    })

    // it('passes the a11y audit', async () => {
    //     const el = await fixture(html`
    //         <shapla-wc-cross></shapla-wc-cross>`)
    //     await expect(el).shadowDom.to.be.accessible();
    // })
})