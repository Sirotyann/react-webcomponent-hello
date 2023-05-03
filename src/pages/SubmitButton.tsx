import React, { useRef } from 'react';
import WcComponent from './WcComponent';

function SubmitButton() {

    const buttonRef = useRef(null)

    return (<>
        <button type="submit" ref={buttonRef} style={{ display: 'none' }}>Login</button>
        <WcComponent tag='hello-button' form='hook-form' type='submit' onClick={() => {
            (buttonRef.current as HTMLButtonElement | null)?.click();
        }}>
            Submit
        </WcComponent>
    </>)
}

export default SubmitButton