import {html, fixture, expect} from '@open-wc/testing'
import {ShaplaWcCross} from '../dist/bundle.js'

window.customElements.define('shapla-wc-cross', ShaplaWcCross)

describe('ShaplaWcCross', () => {
  it('has a default size \'normal\' and ariaLabel \'close\'', async () => {
    const el = await fixture(html`
      <shapla-wc-cross></shapla-wc-cross>`)
    expect(el.size).to.equal('normal')
    expect(el.ariaLabel).to.equal('Close')
  })

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <shapla-wc-cross></shapla-wc-cross>`)
    await expect(el).shadowDom.to.be.accessible()
  })
})
