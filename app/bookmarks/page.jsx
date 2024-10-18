"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import "./bookmarks.css"; // CSS dosyasını import et

export default function BookmarksPage() {
  const supabase = createClient();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else if (user) {
        setCurrentUserId(user.id);
      } else {
        console.error("No user logged in");
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    const fetchBookmarks = async () => {
      setLoading(true);
      console.log("Current User ID:", currentUserId);

      const { data: bookmarkData, error: bookmarkError } = await supabase
        .from("bookmarks")
        .select("post_id")
        .eq("user_id", currentUserId);

      console.log("Bookmark Data:", bookmarkData);

      if (bookmarkError) {
        console.error("Error fetching bookmarks:", bookmarkError);
        setLoading(false);
        return;
      }

      if (bookmarkData.length === 0) {
        setBookmarkedPosts([]);
        setLoading(false);
        return;
      }

      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("id, title")
        .in("id", bookmarkData.map((bookmark) => bookmark.post_id));

      console.log("Post Data:", postData);

      if (postError) {
        console.error("Error fetching posts:", postError);
      } else {
        setBookmarkedPosts(postData);
      }

      setLoading(false);
    };

    fetchBookmarks();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading...
      </div>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return <div>Henüz herhangi bir post bookmarklamadınız.</div>;
  }

  return (
    <div>
      <h1>Kaydedilen Postlar</h1>
      <ul>
        {bookmarkedPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
