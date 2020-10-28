const template = document.createElement('template');
template.innerHTML = `
  <h1>Self Check Question</h1>
  <slot name="question"></slot>
  <slot></slot>
`;

export class SelfCheck extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}