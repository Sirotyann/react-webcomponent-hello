import {register} from "./tjWebComponent";

@register('tj-button')
export class TjInput extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.append(TjInput.build());

    this.internals = this.attachInternals();
    this.input = this.shadow.querySelector('input');
  }

  initAttribute(attrNames) {
    attrNames.forEach(attrName => {
      this[attrName] = this.getAttribute(attrName);
      this[attrName] !== null && this.input.setAttribute(attrName, this[attrName]);
    });
  }

  static listenedAttributes = [
    'value',
    'disabled',
    'placeholder',
    'type',
    'name',
    'onChange',
    'onBlur',
    'onSubmit',
    'width',
    'align',
    'ref'
  ];

  static style = `
            input {
                box-sizing: border-box;
                margin: 0px;
                border: 1px solid #ffcccc;
                outline: none;
                text-align: left;
                border-radius: 5px;
                padding: 5px;
                height: 28px;
                font-size: 12px;
                background-color: #fff;
                text-align: left;
                box-shadow: none;
                -moz-box-shadow: none;
                -webkit-box-shadow: none;
                color: rgba(0, 0, 0, 0.75);
                display: inline-block;
                width: 100%;
            }
        `;

  get value() {
    return this.input?.value;
  }

  set value(value) {
    this.input.value = value;
    this.internals.setFormValue(value);
  }

  static build() {
    const template = document.createElement('template');
    template.innerHTML = `<style>${TjInput.style}</style><input />`;
    return template.content.cloneNode(true);
  }

  static formAssociated = true;

  static get observedAttributes() {
    return ['type', 'value'];
  }

  initEvent(name) {
    this.input.addEventListener(name, (e) => {
      const clone = new e.constructor(e.type, e); // clone the event
      this.dispatchEvent(clone); // and then forward it
      this.value = this.input.value;
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log('TjInput attributeChangedCallback', {name, oldVal, newVal});
    this.initAttribute([name]);
  }

  connectedCallback() {
    // console.log('__ connectedCallback', this.getAttribute('onChange'), this.getAttribute('fn'))
    this.initAttribute(TjInput.listenedAttributes);
    this.initEvent('change');
    this.initEvent('blur');
    // this.initEvent('input', this.getAttribute('onChange'));
    // this.input.addEventListener('change', (e) => {
    //     console.log('__ changes event', this.input.value);
    //     const clone = new e.constructor(e.type, e); // clone the event
    //     this.dispatchEvent(clone); // and then forward it
    //     this.value = this.input.value;
    //     this.getAttribute('onChange')?.(e); // React only allows string attr, so onChange would be always null
    // });

    // this.input.addEventListener('blur', (e) => {
    //     console.log('__ blur event', this.input.value);
    //     const clone = new e.constructor(e.type, e); // clone the event
    //     this.dispatchEvent(clone); // and then forward it
    //     this.value = this.input.value;
    //     this.getAttribute('onBlur')?.(e); // React only allows string attr, so onChange would be always null
    // });
  }
}