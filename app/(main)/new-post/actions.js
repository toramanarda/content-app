"use server"
import { redirect } from 'next/navigation';
import { createClient } from "@/utils/supabase/server";

export async function SavePostAction(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if(!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({ title, content, user_id: user.id })
    .select()
    .single()  // data bize dizi olarak geldigi icin direkt data.id calistiramiyoruz
    // bu yuzden single ekleyip bunun tekil donmesini saglıyoruz

    if(error) {
      console.log(error);
    }

    redirect(`/posts/`)
}