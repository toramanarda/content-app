"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Clap from "../svgs/clap";
import ClapActive from "../svgs/clapActive";


export default function LikeButton({ postId, currentUserId }) {
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeStatusAndCount = async () => {

      const { data: userLike, error: likeError } = await supabase
        .from("post_likes")
        .select("*")
        .eq("post_id", postId)
        .eq("user_id", currentUserId)
        .single();

      if (likeError && likeError.code !== "PGRST116") {
        console.error("Error fetching like status:", likeError);
        return;
      }

      setIsLiked(!!userLike);


      const { count, error: countError } = await supabase
        .from("post_likes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (countError) {
        console.error("Error fetching like count:", countError);
      } else {
        setLikeCount(count || 0);
      }
    };

    fetchLikeStatusAndCount();
  }, [postId, currentUserId]);

  const toggleLike = async () => {
    if (isLiked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", currentUserId);

      if (!error) {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        console.error("Error removing like:", error);
      }
    } else {
      const { error } = await supabase
        .from("post_likes")
        .insert([{ post_id: postId, user_id: currentUserId }]);

      if (!error) {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      } else {
        console.error("Error adding like:", error);
      }
    }
  };

  return (
    <button onClick={toggleLike}>
      <div className="clap">
        {isLiked ? <ClapActive /> : <Clap />} ({likeCount})
      </div>
    </button>
  );
}
