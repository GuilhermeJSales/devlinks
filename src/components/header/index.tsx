import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router";
import { auth } from "../../services/firebaseConnection";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="mt-4 w-full max-w-2xl px-1">
      <nav className="flex h-12 w-full items-center justify-between rounded-md bg-white px-3">
        <div className="flex gap-4 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin/social">Redes Sociais</Link>
        </div>

        <button onClick={handleLogout} className="cursor-pointer">
          <BiLogOut size={28} color="#db2629" />
        </button>
      </nav>
    </header>
  );
}
