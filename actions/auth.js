"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function loginAction(prevState, formData) {
    console.log(formData);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email) {
        return {
            errors: {
                email: "Kullanıcı adı boş olamaz"
            }
        }
    }
    if (!password) {
        return {
            errors: {
                password: "Şifre alanı boş olamaz"
            }
        }
    }


    const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            expiresInMins: 30
        })
    })

    const data = await response.json();
    if (data.message) {
        return {
            errors: {
                global: data.message
            }
        }
    }


    cookies().set("accessToken", data.accessToken)
    revalidatePath("/", "layout")
    redirect("/");

}

export async function signUpAction(prevState, formData) {
    console.log(formData);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    if (!firstName) {
        return {
            errors: {
                firstName: "Ad kısmı boş olamaz"
            }
        }
    }
    if (!lastName) {
        return {
            errors: {
                lastName: "Soyad kısmı boş olamaz"
            }
        }
    }
    if (!email) {
        return {
            errors: {
                email: "E-posta alanı boş olamaz"
            }
        }
    }
    if (!username) {
        return {
            errors: {
                username: "Kullanıcı adı boş olamaz"
            }
        }
    }
    if (!password) {
        return {
            errors: {
                password: "Şifre alanı boş olamaz"
            }
        }
    }


    const response = await fetch("https://dummyjson.com/auth/signUp", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    user_name: username
                }
            }
        })
    })

    const data = await response.json();
    if (data.message) {
        return {
            errors: {
                global: data.message
            }
        }
    }


    cookies().set("accessToken", data.accessToken)

    redirect("/");

}


export async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    revalidatePath("/", "layout")
    redirect("/");
}