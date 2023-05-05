/* eslint-disable max-classes-per-file */
/**
 * Button.
 */
if (typeof TjButton === 'undefined') {
    class TjButton extends HTMLElement {
        /**
         *
         */
        constructor() {
            super();
            const disabled = this.getAttribute('disabled');
            const type = this.getAttribute('type');

            this.shadow = this.attachShadow({ mode: 'open' });
            this.shadow.append(TjButton.build({
                disabled: disabled ?? false,
                type: type ?? 'button'
            }));

            this.internals = this.attachInternals();
            this.button = this.shadow.querySelector('button');

        }

        static style = `
        button {
            background-color: #ff7777;
            border: 1px solid #ff9999;
            color: #fff;
            border-radius: 5px;
            font-size: 12px;
            padding: 5px 10px;
            cursor: pointer;
            line-height: normal;
            font-family: "Open Sans",sans-serif;
        }
        button:hover {
            background-color: #425ca3;
        }
        `;

        /**
         *
         * @param props
         */
        static build(props) {
            const { disabled, type } = props;
            const template = document.createElement('template');
            template.innerHTML = `<style>${TjButton.style}</style><Button disabled="${disabled}" type="${type}"><slot></slot></Button>`;
            return template.content.cloneNode(true);
        }

    }


    try {
        // console.log("# define hello-button")
        customElements.define('tj-button', TjButton);
    } catch (e) {
        console.error('Cannot define tj-button', e);
    }
}

/**
 * Input.
 */
if (typeof TjInput === 'undefined') {
    class TjInput extends HTMLElement {
        /**
         *
         */
        constructor() {
            super();

            this.shadow = this.attachShadow({ mode: 'open' });
            this.shadow.append(TjInput.build());

            this.internals = this.attachInternals();
            this.input = this.shadow.querySelector('input');
        }

        /**
         *
         * @param attrNames
         */
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

        /**
         *
         */
        get value() {
            return this.input?.value;
        }

        /**
         *
         */
        set value(value) {
            this.input.value = value;
            this.internals.setFormValue(value);
        }

        /**
         *
         */
        static build() {
            const template = document.createElement('template');
            template.innerHTML = `<style>${TjInput.style}</style><input />`;
            return template.content.cloneNode(true);
        }

        /**
         *
         */
        static formAssociated = true;

        /**
         *
         */
        static get observedAttributes() {
            return ['type', 'value'];
        }

        /**
         *
         * @param name
         */
        initEvent(name) {
            this.input.addEventListener(name, (e) => {
                const clone = new e.constructor(e.type, e); // clone the event
                this.dispatchEvent(clone); // and then forward it
                this.value = this.input.value;
            });
        }

        /**
         *
         * @param name
         * @param oldVal
         * @param newVal
         */
        attributeChangedCallback(name, oldVal, newVal) {
            console.log('TjInput attributeChangedCallback', { name, oldVal, newVal });
            this.initAttribute([name]);
        }

        /**
         *
         */
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


    try {
        // console.log("# define hello-input")
        customElements.define('tj-input', TjInput);
    } catch (e) {
        console.error('Cannot define tj-input', e);
    }
}
