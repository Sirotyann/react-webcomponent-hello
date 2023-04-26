import React from 'react';
import styles from '@/styles/Login.module.css'

function Login() {

    const formRef = React.useRef(null);

    const submitForm = () => {
        console.log("submit form", formRef.current, formRef.current?.dataset)
        const form = formRef.current;
        if (form) {
            const data = new FormData(form);
            console.log(`## FormData :: username - ${data.get('username')}  password - ${data.get('password')}`)
        }

    }

    return <div>
        <form ref={formRef} action='/api/login' method='POST' onSubmit={(evt) => {
            console.log("On Submit", evt);
            evt.stopPropagation();
            evt.preventDefault();
        }}>
            <div className={styles.row}>
                <label>Username:</label>
                <input type='text' name='username' />
            </div>
            <div className={styles.row}>
                <label>Password:</label>
                <hello-input name='password' type='password' />
            </div>
            <hello-button type="submit ">Login</hello-button>
            <button onClick={submitForm}>Submit</button>
        </form>
    </div>
}

export default Login;