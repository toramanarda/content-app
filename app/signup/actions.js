'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(prevState, formData) {
  const supabase = createClient();

  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get("username"),
  };

  const errors = {};

  // Hata kontrolü
  if (!data.firstName) {
    errors.firstName = "Ad kısmı boş olamaz";
  }
  if (!data.lastName) {
    errors.lastName = "Soyad kısmı boş olamaz";
  }
  if (!data.email) {
    errors.email = "E-posta alanı boş olamaz";
  }
  if (!data.username) {
    errors.username = "Kullanıcı adı boş olamaz";
  }
  if (!data.password) {
    errors.password = "Şifre alanı boş olamaz";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
      }
    }
  });

  if (error) {
    redirect('/error');
    return;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
