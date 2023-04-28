import React, { useEffect, useRef } from 'react';

interface IEvents {

}

const Wrapper = React.forwardRef((props, _ref) => {
    console.log("Wrapper render")
    const { children, onChange } = props;

    const ref = (_ref) => {
        console.log('!!! Ref method')
    };
    const listened = useRef(false)

    console.log('ref', { ref, listened })

    // children.setAttribute('ref', ref)
    const newElement = React.cloneElement(children, { ref: _ref });

    // useEffect(() => {
    //     if (ref?.current !== null && !listened.current) {
    //         console.log("@@ The ref addEventListener")

    //         Object.keys(props).filter(it => it.startsWith('on')).forEach(key => {
    //             console.log(`__key__${key}`);
    //             if (props[key]) {
    //                 const eventName = key.substring(2).toLowerCase();
    //                 ref?.current.addEventListener(eventName, props[key])
    //             }
    //         });

    //         // ref.current.addEventListener('change', (e) => {
    //         //     console.log("## ___ Changed", e)
    //         //     onChange?.(e);
    //         // });
    //         listened.current = true;
    //     }
    // }, [ref?.current === null])

    return newElement
}) 

function wrap(Element, props) {
    console.log("wrap")
    return <Wrapper {...props}>{Element}</Wrapper>
}

export default Wrapper;

export { wrap };