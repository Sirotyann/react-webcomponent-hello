type TagName = `tj-${string}`;

interface TJWebComponentOptions extends ElementDefinitionOptions {}

export function TJWebComponent (tagName: TagName, opts?: TJWebComponentOptions) {
  return function (target: new () => HTMLElement) {
    customElements.define(tagName, target, opts ?? {});
  }
}
