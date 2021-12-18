import {
  html, fixture, expect, oneEvent,
} from '@open-wc/testing';
import '../public/bundle.js';

describe('ShaplaWcModal', () => {
  it("has a default active 'false' and type 'card'", async () => {
    const el = await fixture(html`
            <shapla-wc-modal></shapla-wc-modal>`);
    expect(el.active).to.equal(false);
    expect(el.type).to.equal('card');
    expect(el._isCard()).to.equal(true);
  });

  it('can be used for any content type', async () => {
    const el = await fixture(html`
            <shapla-wc-modal type="box"></shapla-wc-modal>`);
    expect(el.type).to.equal('box');
  });

  it('can be disabled card footer', async () => {
    const el = await fixture(html`
            <shapla-wc-modal disabled-footer></shapla-wc-modal>`);
    expect(el.shadowRoot.querySelector('.shapla-modal-card__footer')).to.have.class('no-content');
  });

  it('trigger close event when click on background', async () => {
    const el = await fixture(html`
            <shapla-wc-modal></shapla-wc-modal>`);
    const listener = oneEvent(el, 'close');
    el.shadowRoot.querySelector('.shapla-modal-background').click();
    const { detail } = await listener;
    expect(detail).to.equal(null);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
            <shapla-wc-modal></shapla-wc-modal>`);
    await expect(el).shadowDom.to.be.accessible();
  });
});
