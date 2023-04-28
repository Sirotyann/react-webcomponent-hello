/**
 * Button
 */
if (typeof HelloButton === 'undefined') {
    class HelloButton extends HTMLElement {
        constructor() {
            super();
            const disabled = this.getAttribute('disabled');
            const type = this.getAttribute('type');

            this.shadow = this.attachShadow({ mode: 'open' });
            this.shadow.append(HelloButton.build({
                disabled: disabled ?? false,
                type: type ?? 'button'
            }));

            this.internals = this.attachInternals();
            this.button = this.shadow.querySelector('button');

        }

        static style = `
        button {
            background-color: #577bdf;
            border: 1px solid #499139;
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

        static build(props) {
            const { disabled, type } = props;
            const template = document.createElement('template');
            template.innerHTML = `<style>${HelloButton.style}</style><Button disabled="${disabled}" type="${type}"><slot></slot></Button>`;
            return template.content.cloneNode(true);
        }

        connectedCallback() {
            this.shadow.addEventListener('click', () => {
                console.log(this.getAttribute('type'))
                if(this.getAttribute('type') === 'submit') {
                    this.parentNode.submit();
                }

                console.log("Button onclick", this.getAttribute('onClick'))
            });
        }
    }


    try {
        // console.log("# define hello-button")
        customElements.define('hello-button', HelloButton);
    } catch (e) { }
}

/**
 * Input
 */
if (typeof HelloInput === 'undefined') {
    class HelloInput extends HTMLElement {
        constructor() {
            super();

            this.shadow = this.attachShadow({ mode: 'open' });
            this.shadow.append(HelloInput.build());

            this.internals = this.attachInternals();
            this.input = this.shadow.querySelector('input');
        }

        initAttribute(...attrNames) {
            attrNames.forEach(attrName => {
                this[attrName] = this.getAttribute(attrName)
            });

            // attrNames.forEach(attrName => {
            //     console.log(` -- init attr: ${attrName}`, this[attrName])
            // });
        }

        static style = `
            input {
                box-sizing: border-box;
                margin: 0px;
                border: 1px solid #cccccc;
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
            }
        `;

        /**
         *
         */
        get value() {
            return this.input?.value;
        }

        set value(value) {
            this.input.value = value;
            this.internals.setFormValue(value);
        }

        /**
         *
         */
        static build() {
            const template = document.createElement('template');
            template.innerHTML = `<style>${HelloInput.style}</style><input />`;
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
         * @param oldVal
         * @param newVal
         */
        attributeChangedCallback(name, oldVal, newVal) {
            // console.log('# input attr changed', { name, oldVal, newVal });
            // this.internals.setFormValue(newVal)
        }

        adoptedCallback() {
            console.log('__ adoptedCallback', this.getAttribute('onChange'), this.getAttribute('fn'))
        }

        /**
         *
         */
        connectedCallback() {
            // console.log('__ connectedCallback', this.getAttribute('onChange'), this.getAttribute('fn'))
            this.initAttribute('disabled', 'placeholder', 'type', 'name', 'onChange', 'onBlur', 'onSubmit', 'ref');

            this.input.setAttribute('name', this.name);
            this.placeholder && this.input.setAttribute('placeholder', this.placeholder);
            this.input.setAttribute('type', this.type);
            this.disabled && this.input.setAttribute('disabled', this.disabled);

            this.input.addEventListener('change', (e) => {
                const clone = new e.constructor(e.type, e); // clone the event
                this.dispatchEvent(clone); // and then forward it
                this.value = this.input.value;

                console.log("## this.onChange", { clone, onchange: this.getAttribute('onChange') })
                this.getAttribute('onChange')?.(e); // React only allows string attr, so onChange would be always null
            });

            this.input.addEventListener('blur', (e) => {
                const clone = new e.constructor(e.type, e); // clone the event
                this.dispatchEvent(clone); // and then forward it
                this.value = this.input.value;

                console.log("## this.onBlur", { clone, onchange: this.getAttribute('onBlur') })
                this.getAttribute('onBlur')?.(e); // React only allows string attr, so onChange would be always null
            });
        }
    }


    try {
        // console.log("# define hello-input")
        customElements.define('hello-input', HelloInput);
    } catch (e) { }
}
