import React from 'react';
import styles from '@/styles/Login.module.css';
import { useForm } from 'react-hook-form';
// import { wrapWc } from './Wc';
import { wrapWc } from 'wc-react';
import WcComponent from './WcComponent';;
import SubmitButton from './SubmitButton';

// const WCInput = wrapWc('hello-input')

function HookForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: Object) => {
        console.log(`- HookForm - submit - `, data)
        alert("submit")
    };


    return <div>
        <form id='hook-form' onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("errors", errors)
        })} >
            <div className={styles.row}>
                <label>First name:</label>
                <WcComponent tag='hello-input' {...register("firstName", { required: true })} />
                {errors.firstName?.type === 'required' && <p role="alert" className={styles.error}>First name is required</p>}
            </div>

            <div className={styles.row}>
                <label>Last name:</label>
                <hello-input name='lastName' type='string' {...register("lastName", { required: true })} />
                {errors.lastName?.type === 'required' && <p role="alert" className={styles.error}>Last name is required</p>}
            </div>


            {/* <div className={styles.row}>
                <label>Password:</label>
                <hello-input name='password' type='password' {...register("password", { required: true })}/>
                {errors.password?.type === 'required' && <p role="alert" className={styles.error}>Password is required</p>}
            </div> */}

            {/* <button type="submit">Login</button> */}
            {/* <input type='submit'/> */}

            <SubmitButton />

            {/* <hello-button form='hook-form' onClick={(e) => {
                console.log(" should submit ", { e, handleSubmit });
                handleSubmit(onSubmit, (errors) => {
                    console.log("errors", errors)
                })
                // handleSubmit(onSubmit)
            }}>hello</hello-button>
            <WcComponent tag='hello-button' form='hook-form'  type='submit' onClick={() => {
                console.log("Clicked!!!!!")
                handleSubmit(onSubmit, (errors) => {
                    console.log("errors", errors)
                })
            }}>WcComponent</WcComponent> */}
        </form>
    </div>
}

export default HookForm;