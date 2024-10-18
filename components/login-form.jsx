"use client";

import { loginAction } from "@/app/login/actions";
import { useFormState } from "react-dom";

export default function LoginForm(prevState, formData){
    const [state, action] = useFormState(loginAction, {
        errors: {
            email: null,
            password: null,
        }
    })

    return (
        <>
            {state?.errors?.global && (
                <div className="bg-red-500 py-2 text-white px-3">
                    <p>{state.errors.global}</p>
                </div>
            )}
            <form action={action}>
                <label htmlFor="">Your email</label><br />
                <input 
                    type="email" 
                    name="email" 
                /> 
                <br />
                <label htmlFor="">Your password</label>
                {state?.errors?.email && (<small>{state.errors.email}</small>)} <br />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="*********" 
                /> 
                <br />
                {state?.errors?.password && (<small>{state.errors.password}</small>)} <br />
                <button className="login-btn">Login</button>
            </form>
        </>
    );
}
