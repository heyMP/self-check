import { LitElement, html } from "https://unpkg.com/lit-element?module"


export class SelfCheckItem extends LitElement {

  static get properties() {
    return {
      correct: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.correct = false;
  }

  render() {
    return html`
      <li ?aria-role-correct="${this.correct}">
        <slot></slot>
      </li>
    `
  }
}