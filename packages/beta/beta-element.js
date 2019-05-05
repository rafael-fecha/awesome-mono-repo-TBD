import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `beta-element`
 * beta element in polymer
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BetaElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'beta-element',
      },
    };
  }
}

window.customElements.define('beta-element', BetaElement);
