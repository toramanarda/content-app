import { SavePostAction } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import '../../../css/new-post.css';

export default async function NewPost() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user.user_metadata);

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="new-post-container">
      <h1 className="title">Yeni Yazı Paylaş</h1>
      <form action={SavePostAction} className="post-form">
        <input type="text" required name="title" placeholder="Yazı Başlığı" className="input-title" />
        <textarea name="content" placeholder="Yazı içeriği" required className="input-content"></textarea>
        <button className="submit-button">Yazıyı Paylaş</button>
      </form>
    </div>
  )
}
