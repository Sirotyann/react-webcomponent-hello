type TagName = `tj-${string}`;
export function TJWebComponent (tagName: TagName) {
  return function (target: new () => HTMLElement) {
    customElements.define(tagName, target);
  }
}
