import React, { useRef, useEffect } from 'react';

class WcComponent extends React.Component {
    constructor(props) {
        super(props);

        this.listeners = new Map(Object.keys(props).filter(it => it.startsWith('on')).map(key => ([key, props[key]])));
        this.elementRef = React.createRef();
        // this.listeners = {};
    }

    listenersAttached: false;

    addEventListeners() {
        console.log("## addEventListeners", this.listeners)
        if (!this.listenersAttached && this.elementRef.current !== null) {
            this.listeners.forEach((callback, key) => {
                this.elementRef.current.addEventListener(key, callback);
            })

            this.listenersAttached = true;
        }
    }

    removeEventListeners() {
        console.log("## removeEventListeners", this.listeners)
        if (this.listenersAttached && this.elementRef.current !== null) {
            this.listeners.forEach((callback, key) => {
                this.elementRef.current.removeEventListener(key, callback);
            })

            this.listenersAttached = false;
        }
    }

    componentDidMount(): void {
        this.addEventListeners();
    }

    componentWillUnmount(): void {
        this.removeEventListeners();
    }

    render() {
        console.log("## this.props", this.props)
        const { tagName, children } = this.props;
        const TagName = tagName;

        console.log(`## WcComponent render `, this.elementRef)
        this.addEventListeners();
        return <TagName {...this.props} ref={this.elementRef}>{children}</TagName>;
    }
}

// const Wrapper = (props) {
//     return  <></>
// }

export default WcComponent;