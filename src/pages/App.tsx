import React from 'react';
import Login from './Login';
import HookForm from './HookForm';
import Wrapper from './Wrapper'

function App() {
    return <div>
        <h1>A React Web component test field.</h1>
        <React.Suspense fallback="Loading...">
            {/* <Login /> */}
            {/* <Wrapper> */}
                <HookForm />
            {/* </Wrapper> */}
        </React.Suspense>
    </div>
}

export default App;