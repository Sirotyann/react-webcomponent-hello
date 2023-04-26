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
                this.parentNode.submit();
            });
        }
    }


    try {
        console.log("# define hello-button")
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

            const disabled = this.getAttribute('disabled');
            const placeholder = this.getAttribute('placeholder');
            const type = this.getAttribute('type');
            const name = this.getAttribute('name');

            this.shadow = this.attachShadow({ mode: 'open' });
            this.shadow.append(HelloInput.build({
                disabled: disabled ?? false,
                name,
                placeholder: placeholder ?? '',
                type: type ?? 'text'
            }));

            this.internals = this.attachInternals();
            this.input = this.shadow.querySelector('input');
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
         * @param props
         */
        static build(props) {
            console.log(props);
            const { disabled, placeholder, type, name } = props;
            const template = document.createElement('template');
            template.innerHTML = `<style>${HelloInput.style}</style>
            <input name="${name}" ${disabled ? 'disabled' : ''} type="${type}" ${placeholder ? `placeholder="${placeholder}"` : ''}/>`;

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
            console.log('# input attr changed', { name, oldVal, newVal });
            this.internals.setFormValue(newVal)
        }

        /**
         *
         */
        connectedCallback() {
            const disabled = this.getAttribute('disabled');
            const placeholder = this.getAttribute('placeholder');
            const type = this.getAttribute('type');
            const name = this.getAttribute('name');

            this.input.setAttribute('name', name);
            placeholder && this.input.setAttribute('placeholder', placeholder);
            this.input.setAttribute('type', type);
            disabled && this.input.setAttribute('disabled', disabled);

            console.log('# connectedCallback  ', { name, type, placeholder, disabled });

            this.input.addEventListener('change', (e) => {
                const clone = new e.constructor(e.type, e); // clone the event
                this.dispatchEvent(clone); // and then forward it
                this.value = this.input.value;
            });
        }
    }


    try {
        console.log("# define hello-input")
        customElements.define('hello-input', HelloInput);
    } catch (e) { }
}

