import { createClient } from "@/utils/supabase/server";

export default async function GetStartedContainer() {
  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
  console.log("user", user);

  return (
    <div className="">
      {user ? (
        <p></p>
      ) : (
        <div className="get-started-container">
          <h1>Human <br />
          stories & ideas</h1>
          <h4>A place to read, write, and deepen your understanding</h4>
          <button className="start-reading-btn">Start reading</button>
        </div>
      )}
    </div>
  )
}