// Copyright (c) 2024 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If using litElement base class
import { LitElement, html } from "lit";

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { LitElement, html } from "lit";
// import AuroElement from '@aurodesignsystem/webcorestylesheets/dist/auroElement/auroElement';

// Import touch detection lib
import styleCss from "./style-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * The auro-form element provides users a way to ... (it would be great if you fill this out).
 *
 * @attr {Boolean} fixed - Uses fixed pixel values for element shape
 * @attr {String} cssClass - Applies designated CSS class to demo element - you want to delete me!
 */

// build the component class
export class AuroForm extends LitElement {
  // constructor() {
  //   super();
  // }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit.dev/docs/components/properties/
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      // this property is DEMO ONLY! Please delete.
      cssClass:   { type: String }
    };
  }

  static get styles() {
    return [styleCss];
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`

      <!-- this is demo code, DO NOT USE IN YOUR ELEMENT -->
      <div class=${this.cssClass} tabindex="0">
        <slot></slot>
      </div>
    `;
  }
}

// default internal definition
if (!customElements.get("auro-form")) {
  customElements.define("auro-form", AuroForm);
}
