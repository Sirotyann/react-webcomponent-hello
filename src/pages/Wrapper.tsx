import React, { useRef, Fragment } from 'react';

function Wrapper(props) {
    const { children } = props;
    const ref = useRef(null);

    console.log('ref', ref)

    return <span ref={ref}>
        {children}
    </span>
}

export default Wrapper;