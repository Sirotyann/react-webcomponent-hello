import {TJWebComponent} from "@/components/BaseWebComponent";

@TJWebComponent('tj-button')
export class TjButton extends HTMLElement {
  constructor() {
    super();
    const disabled = this.getAttribute('disabled');
    const type = this.getAttribute('type');

    this.shadow = this.attachShadow({mode: 'open'});
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

  static build(props) {
    const {disabled, type} = props;
    const template = document.createElement('template');
    template.innerHTML = `<style>${TjButton.style}</style><Button disabled="${disabled}" type="${type}"><slot></slot></Button>`;
    return template.content.cloneNode(true);
  }

}