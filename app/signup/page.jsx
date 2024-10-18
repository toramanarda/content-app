import SignUpForm from "@/components/signup-fom";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function SignUpPage(){
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    if(token){
        redirect("/")
    }
    
    return <SignUpForm />
}