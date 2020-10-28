const template = document.createElement('template');
template.innerHTML = `
  <li>
    <slot></slot>
  </li>
`;


export class SelfCheckItem extends HTMLElement {
  /**
   * Guards against loops when reflecting observed attributes.
   * @param  {String} name Attribute name
   * @param  {any} value
   * @protected
   */
  safeSetAttribute(name, value) {
    if (this.getAttribute(name) !== value) this.setAttribute(name, value);
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this._liElement = this.shadowRoot.querySelector('li');
    if (!this.hasAttribute('correct')) {
      this.setAttribute('correct', 1);
    }
  }

  static get observedAttributes() {
    return ['correct'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "correct") {
      if (newVal) {
        console.log('newVal:', newVal)
        this._liElement.setAttribute("aria-correct", true);
      }
    }
    this[name] = newVal
  }

  get correct() {
    return this.hasAttribute("correct");
  }

  set correct(value) {
    if (value) {
      this.setAttribute('correct', '');
    } else {
      this.removeAttribute('correct');
    }
  }
}