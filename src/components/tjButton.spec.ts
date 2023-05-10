import {fixture} from "@open-wc/testing-helpers";
import {fireEvent, screen} from "@testing-library/dom";

import "../components/tjButton";

describe('TJ Button', () => {
  it('should render a button initially', async () => {
    const buttonText = 'ailurus';
    await fixture(`<tj-button>${buttonText}</tj-button>`);

    await customElements.whenDefined('tj-button')

    expect(screen.getByRole('button', {name: buttonText})).toBeTruthy();
  });

  it('should call onClick handler when clicked', async () => {
    const buttonText = 'ailurus';
    const spiedFunction = vi.fn();
    const component = await fixture(`<tj-button>${buttonText}</tj-button>`);

    component.addEventListener('click', spiedFunction);

    fireEvent.click(component);

    expect(spiedFunction).toHaveBeenCalled();
  });
})