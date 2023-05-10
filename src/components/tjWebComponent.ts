import {ARIARole} from "aria-query";

type TagName = `tj-${string}`;

interface TJWebComponentOptions extends ElementDefinitionOptions {}

interface RegisteredTJWebComponentClass {
  tjwc: {
    role: ARIARole
  }
}

export function define (tagName: TagName, opts?: TJWebComponentOptions) {
  return function (target: new () => HTMLElement) {
    customElements.define(tagName, target, opts ?? {});
  }
}

export function AsWebComponent<C extends new(...args: any[]) => HTMLElement>(baseClass: C, role: ARIARole) {
  return class TjWebComponent extends baseClass implements RegisteredTJWebComponentClass {
    tjwc = {
      role
    }

    constructor (...args: any[]) {
      super(...args);
      this.attachShadow({mode: 'open'})
    }

    connectedCallback () {
      this.setUp();
    }

    protected append (el: HTMLElement) {
      this.shadowRoot?.append(el)
    }

    protected setUp () {
      this.role = this.tjwc.role;
      this.setAttribute('role', this.role);
    }
  }
}
