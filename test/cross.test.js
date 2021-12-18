import { html, fixture, expect } from '@open-wc/testing';
import '../public/bundle.js';

describe('ShaplaWcCross', () => {
  it("has a default size 'normal' and ariaLabel 'close'", async () => {
    const el = await fixture(html`
            <shapla-wc-cross></shapla-wc-cross>`);
    expect(el.size).to.equal('normal');
    expect(el.ariaLabel).to.equal('close');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
            <shapla-wc-cross></shapla-wc-cross>`);
    await expect(el).shadowDom.to.be.accessible();
  });
});
