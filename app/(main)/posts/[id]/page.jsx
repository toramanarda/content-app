import { createClient } from "@/utils/supabase/server";
import LikeButton from "@/components/likes-btn/LikeButton";
import CommentSection from "@/components/comments/comments";
import BookmarkButton from "@/components/BookmarkButton/page";
import "./pageId.css";

export default async function PostDetailPage({ params }) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return notFound();
  }

  const { data, error } = await supabase.from("posts").select().eq("id", params.id).single();

  if (!data) return notFound();

  return (
    <div className="showPost">
      <h1 className="postTitle">{data.title}</h1>
      <div className="postContent" dangerouslySetInnerHTML={{ __html: data.content }} />
      <div className="buttonContainer">
        <BookmarkButton postId={params.id} currentUserId={userData.user.id} />
        <LikeButton postId={params.id} currentUserId={userData.user.id} />
      </div>
      <CommentSection postId={params.id} currentUserId={userData.user.id} />
    </div>
  );
}
