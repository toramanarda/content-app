'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function loginAction(prevState, formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if(!data.email){
    return {
      errors: {
          email: "Kullanıcı adı boş olamaz"
      }
    }
  }
  if(!data.password){
    return {
      errors: {
        password: "Şifre alanı boş olamaz"
      }
    }
  }

  if (error) {
    console.log(error);
    return;
  }

  revalidatePath('/', 'layout')  // sayfayı yenilemeye gerek kalmadan ekran değiştiriyor server taraflı calisiyor
  redirect('/')  // kullanıcı basarili bir sekilde giris yaparsa anasayfaya gonder.
}