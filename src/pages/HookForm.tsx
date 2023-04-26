import React from 'react';
import styles from '@/styles/Login.module.css'
import { useForm } from 'react-hook-form'
const fn = () => {
    console.log(" value changed")
}
function HookForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: Object) => console.log(`- HookForm - submit - `, data);
    // const theRegister = register("lastName", { required: true });
    // console.log({ theRegister });
    // {name: 'theName', onChange: ƒ, onBlur: ƒ, ref: ƒ}

    return <div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className={styles.row}>
            <label>First name:</label>
                {/* <input defaultValue="test" {...register("firstName", { required: true })} /> */}
                <hello-input name='firstName' type='string' {...register("firstName", { required: true })} />
                {errors.firstName?.type === 'required' && <p role="alert" className={styles.error}>First name is required</p>}
            </div>

            {/* <input name="example" type='text' /> */}

            <div className={styles.row}>
                <label>Last name:</label>
                {/* <hello-input name='lastName' type='string' {...register("lastName")}/> */}
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
            <hello-button onClick={handleSubmit(onSubmit)}>Login</hello-button>
        </form>
    </div>
}

export default HookForm;