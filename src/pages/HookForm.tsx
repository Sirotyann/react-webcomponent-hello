import React from 'react';
import styles from '@/styles/Login.module.css';
import { useForm } from 'react-hook-form';
import { wrapWc } from './Wc';
// import { wrapWc } from 'wc-react';
import WcComponent from './WcComponent';;
import SubmitButton from './SubmitButton';

const WCInput = wrapWc('tj-input')

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
                <WcComponent tag='tj-input' {...register("first-name", { required: true })} />
                {/* <WCInput {...register("first-name", { required: true })} name='first-name' /> */}
                {/* <tj-input type='string' {...register("first-name", { required: true })} /> */}
                {errors.firstName?.type === 'required' && <p role="alert" className={styles.error}>First name is required</p>}
            </div>

            <div className={styles.row}>
                <label>Last name:</label>
                <WcComponent tag='tj-input' {...register("last-name", { required: true })} />
                {/* <tj-input type='string' {...register("last-name", { required: true })} /> */}
                {/* <WCInput {...register("last-name", { required: true })} /> */}
                {/* <WCInput name='lastName' onChange={() => { console.log("change last-name")}} {...register("last-name", { required: true })} /> */}
                {errors.lastName?.type === 'required' && <p role="alert" className={styles.error}>Last name is required</p>}
            </div>

            <div className={styles.row}>
                <label>Email:</label>
                {/* <WCInput name='email' onChange={() => { console.log("change email")}}  />  */}
                <WcComponent tag='tj-input' {...register("email", { required: true })} />
                {/* <WcComponent tag='tj-input' onChange={() => { console.log("change email") }} onClick={() => { console.log("click email") }} /> */}
                {/* <WCInput {...register("email", { required: true })} /> */}
                {/* <tj-input type='string' {...register("email", { required: true })} /> */}
                {errors.lastName?.type === 'required' && <p role="alert" className={styles.error}>Last name is required</p>}
            </div>


            {/* <div className={styles.row}>
                <label>Password:</label>
                <tj-input name='password' type='password' {...register("password", { required: true })}/>
                {errors.password?.type === 'required' && <p role="alert" className={styles.error}>Password is required</p>}
            </div> */}

            {/* <button type="submit">Login</button> */}
            {/* <input type='submit'/> */}

            <SubmitButton />

            {/* <tj-button form='hook-form' onClick={(e) => {
                console.log(" should submit ", { e, handleSubmit });
                handleSubmit(onSubmit, (errors) => {
                    console.log("errors", errors)
                })
                // handleSubmit(onSubmit)
            }}>hello</tj-button>
            <WcComponent tag='tj-button' form='hook-form'  type='submit' onClick={() => {
                console.log("Clicked!!!!!")
                handleSubmit(onSubmit, (errors) => {
                    console.log("errors", errors)
                })
            }}>WcComponent</WcComponent> */}
        </form>
    </div>
}

export default HookForm;