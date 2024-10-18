import LoginForm from "@/components/login-form";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage(){
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    if(token){
        revalidatePath("/", "layout")
        redirect("/")
    }
    
    return <LoginForm />
}