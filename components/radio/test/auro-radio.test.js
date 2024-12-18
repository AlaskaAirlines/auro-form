import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../src/index.js';

describe('auro-radio', () => {
  it('auro-radio is accessible', async () => {
    const el = await fixture(html`
      <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-radio custom element is defined', async () => {
    const el = await !!customElements.get("auro-radio");

    await expect(el).to.be.true;
  });

  it('web component is successfully created in the document', async () => {
    // This test fails when attributes are put onto the component before it is attached to the DOM
    const radio = document.createElement('auro-radio');
    const radioGroup = document.createElement('auro-radio-group');

    await expect(radio.localName).to.equal('auro-radio');
    await expect(radioGroup.localName).to.equal('auro-radio-group');
  });

  it('properly handles user input', async () => {
    const el = await fixture(html`
      <auro-radio-group>
        <span slot="legend">Form label goes here</span>
        <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
        <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
        <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
      </auro-radio-group>
    `);

    const radioButton = el.querySelector('#radio1');
    const input = radioButton.shadowRoot.querySelector('input');

    const eventPromise = new Promise(resolve => {
      el.addEventListener('toggleSelected', resolve);
    });

    input.click();

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.target).to.equal(radioButton);
  });

  it('validity is in error state when error attribute is present', async () => {
    const el = await fixture(html`
      <auro-radio-group error="customError">
        <span slot="legend">Form label goes here</span>
        <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
        <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
        <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
      </auro-radio-group>
    `);

    await expect(el.validity).to.equal('customError');
  });

  it('disables all radio buttons when group has disabled attribute', async () => {
    const el = await fixture(html`
      <auro-radio-group disabled>
        <span slot="legend">Form label goes here</span>
        <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
        <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
      </auro-radio-group>
    `);

    const radioButtonOne = el.querySelector('#radio1');
    const radioButtonTwo = el.querySelector('#radio2');

    await expect(radioButtonOne.hasAttribute('disabled')).to.be.true;
    await expect(radioButtonTwo.hasAttribute('disabled')).to.be.true;
  });

  it('handles resetting all radio buttons', async () => {
    const el = await fixture(html`
      <auro-radio-group>
        <span slot="legend">Form label goes here</span>
        <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes" checked></auro-radio>
        <auro-radio id="radio2" label="No" name="radioDemo" value="no" checked></auro-radio>
      </auro-radio-group>
    `);

    const radioButtonOne = el.querySelector('#radio1');
    const radioButtonTwo = el.querySelector('#radio2');

    el.reset();

    await elementUpdated(el);

    await expect(radioButtonOne.hasAttribute('checked')).to.be.false;
    await expect(radioButtonTwo.hasAttribute('checked')).to.be.false;
  });

  it('selects radio button by keyboard', async () => {
    const el = await fixture(html`
      <auro-radio-group error="customError">
        <span slot="legend">Form label goes here</span>
        <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
        <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
        <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
      </auro-radio-group>
    `);

    const radioButtonOne = el.querySelector('#radio1');

    radioButtonOne.focus();

    await elementUpdated(el);

    const event = new KeyboardEvent('keydown', { key: ' ' });
    el.dispatchEvent(event);

    await elementUpdated(el);

    await expect(radioButtonOne.hasAttribute('checked')).to.be.true;
  });

  it('removing error attribute reruns validity even when value is undefined', async () => {
    const el = await errorFixture();

    await expect(el.getAttribute('validity')).to.equal('customError');

    el.removeAttribute('error');

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.equal('valid');
  });


  it('selected radio button is correctly assigned to optionSelected attribute', async () => {
    const el = await fixture(html`
      <auro-radio-group>
        <span slot="legend">Form label goes here</span>
        <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
        <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
        <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
      </auro-radio-group>
    `);

    await expect(el.hasAttribute('optionSelected')).to.be.false;
    await expect(el.hasAttribute('value')).to.be.false;

    const radioButtons = [...el.querySelectorAll('auro-radio')];
    const radioOne = radioButtons[0];

    radioOne.checked = true;

    await elementUpdated(el);

    await expect(el.optionSelected).to.equal(radioOne);
    await expect(el.value).to.equal('yes');
  });
});

async function errorFixture() {
  return await fixture(html`
  <auro-radio-group error="There is an error with this form entry">
    <span slot="legend">Form label goes here</span>
    <auro-radio label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  `);
}
