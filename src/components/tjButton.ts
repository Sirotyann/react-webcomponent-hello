import {define, AsWebComponent} from "./tjWebComponent";

@define('tj-button')
export class TjButton extends AsWebComponent(HTMLElement, 'button') {
  constructor() {
    super();

    const disabled = this.getAttribute('disabled');
    const type = this.getAttribute('type');

    this.append(TjButton.build({
      disabled: disabled === 'true',
      type: type ?? 'button'
    }));
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

  static build(props: { disabled: boolean, type: string }) {
    const {disabled, type} = props;
    const template = document.createElement('template');
    template.innerHTML = `
        <style>${TjButton.style}</style>
        <button disabled="${disabled}" type="${type}">\
            <slot></slot>
        </button>
    `;
    return template.content.cloneNode(true);
  }
}