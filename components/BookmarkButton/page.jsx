// components/BookmarkButton.jsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Bookmark from "../svgs/bookmarks";
import BookmarkDelete from "../svgs/bookmarksDelete";

export default function BookmarkButton({ postId, currentUserId }) {
  const supabase = createClient();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select()
        .eq("post_id", postId)
        .eq("user_id", currentUserId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching bookmark status:", error);
      } else {
        setIsBookmarked(!!data);
      }
    };

    fetchBookmarkStatus();
  }, [postId, currentUserId]);

  const toggleBookmark = async () => {
    if (isBookmarked) {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", currentUserId);

      if (!error) {
        setIsBookmarked(false);
      } else {
        console.error("Error removing bookmark:", error);
      }
    } else {
      const { error } = await supabase
        .from("bookmarks")
        .insert([{ post_id: postId, user_id: currentUserId }]);

      if (!error) {
        setIsBookmarked(true);
      } else {
        console.error("Error adding bookmark:", error);
      }
    }
  };

  return (
    <button onClick={toggleBookmark}>
      {isBookmarked ? <BookmarkDelete /> : <Bookmark />}
    </button>
  );
}
