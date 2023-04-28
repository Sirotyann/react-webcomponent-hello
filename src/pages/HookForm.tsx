import React, { useEffect, useRef } from 'react';
import styles from '@/styles/Login.module.css'
import { useForm } from 'react-hook-form'
import HelloInputWrapper from './HelloInput'
import { wrap } from './Wrapper';
import { wrapWc } from './Wc'
import WcComponent from './WcComponent';

const WCInput = wrapWc('hello-input')

function HookForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: Object) => console.log(`- HookForm - submit - `, data);

    const ref = useRef(null)

    const firstNameRegister = register("firstName", { required: true });
    console.log({ firstNameRegister })
    console.log({
        buttonRef: ref
    })

    return <div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className={styles.row}>
                <label>First name:</label>
                <WcComponent tagName='hello-input' {...register("firstName", { required: true })} />
                {errors.firstName?.type === 'required' && <p role="alert" className={styles.error}>First name is required</p>}
            </div>

            <div className={styles.row}>
                <label>Last name:</label>
                {/* <hello-input name='lastName' type='string' {...register("lastName")}/> */}
                <hello-input name='lastName' type='string' {...register("lastName", { required: true })} onSubmit={() => console.log("input submit")} />
                {errors.lastName?.type === 'required' && <p role="alert" className={styles.error}>Last name is required</p>}
            </div>


            {/* <div className={styles.row}>
                <label>Password:</label>
                <hello-input name='password' type='password' {...register("password", { required: true })}/>
                {errors.password?.type === 'required' && <p role="alert" className={styles.error}>Password is required</p>}
            </div> */}

            {/* <button type="submit">Login</button> */}
            {/* <input type='submit'/> */}
            {/* <hello-button type='submit'>Login</hello-button> */}
            <hello-button onClick={() => {
                console.log('submit')
            }}>Login</hello-button>
            {/* <WcComponent tagName='hello-button' onClick={() => {
                console.log("Clicked!!!!!")
            }} >Click</WcComponent> */}
        </form>
    </div>
}

export default HookForm;