// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import styleCss from "./styles/countergroup-css.js";

export class AuroCountergroup extends LitElement {

  static get styles() {
    return [styleCss];
  }

  static get properties() {
    return {
      common: {
        type: Boolean,
        reflect: true
      },
      inset: {
        type: Boolean,
        reflect: true
      },
      rounded: {
        type: Boolean,
        reflect: true
      }
    };
  }

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}
