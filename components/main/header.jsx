import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOut } from "@/actions/auth";
import Modal from "@/components/get-started-modal/modal"
import Write from "@/components/svgs/write"
import Logo from "@/components/svgs/logo"
import Bookmarks from "@/components/svgs/bookmarks"
import Search from "@/components/svgs/search"


export default async function MainHeader() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  console.log("user", user);

  return (
    <header>
      <div className="Wrapper">
        <div className="LogoInput">
          <Logo />

        </div>
        {user ? (
          <ul className="userHeader">
            <li>
              <input type="text" name="searchInput" placeholder="Search" />
            </li>
            <li><Link href={'/new-post'}> <Write /> Write</Link></li>
            <li><Link href={'/bookmarks'}> <Bookmarks /> </Link></li>
            <li>
              <form action={signOut}>
                <button> Çık </button>
              </form>
            </li>
          </ul>
        ) : (
          <ul className="notUserHeader">
            <Modal />
          </ul>
        )}
      </div>
    </header>
  )
}