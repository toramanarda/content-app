"use client";

import { signup } from "@/app/signup/actions";
import { useFormState } from "react-dom";

export default function SignUpForm() {
    const [state, action] = useFormState(signup, {
        errors: {
            username: null,
            password: null,
            firstName: null,
            lastName: null,
            email: null,
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
                <input type="text" name="firstName" placeholder="Adınızı yazınız" /> <br />
                {state?.errors?.firstName && (<small className="errorMessage">{state.errors.firstName}</small>)} <br />
                <input type="text" name="lastName" placeholder="Soyadınızı yazınız" /> <br />
                {state?.errors?.lastName && (<small className="errorMessage">{state.errors.lastName}</small>)} <br />
                <input type="text" name="username" placeholder="Kullanıcı adınızı yazınız" /> <br />
                {state?.errors?.username && (<small className="errorMessage">{state.errors.username}</small>)} <br />
                <input type="email" name="email" placeholder="E-posta adresinizi yazınız" /> <br />
                {state?.errors?.email && (<small className="errorMessage">{state.errors.email}</small>)} <br />
                <input type="password" name="password" placeholder="*********" /> <br />
                {state?.errors?.password && (<small className="errorMessage">{state.errors.password}</small>)} <br />
                <button className="signup-btn">Kayıt Ol</button>
            </form>
        </>
    )
}