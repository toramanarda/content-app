import { createClient } from "@/utils/supabase/server";
import "./allPost.css";

export default async function PostsPage() {
  const supabase = createClient();
  const { data: posts, error } = await supabase.from("posts").select();

  if (error) {
    console.error(error);
    return <div>Bir hata oluştu.</div>;
  }

  // Postları ters çevir
  const reversedPosts = posts.reverse();

  return (
    <div className="allPost">
      <h1>Tüm Gönderiler</h1>
      <ul>
        {reversedPosts.map(post => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
