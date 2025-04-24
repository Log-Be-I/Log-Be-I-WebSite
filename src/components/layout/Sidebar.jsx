// Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-48 md:w-56 h-screen bg-darkblue text-white p-4 md:p-6 transition-all duration-300">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Admin</h1>
      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className="hover:bg-primary hover:text-darkblue px-3 py-2 rounded-md transition"
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className="hover:bg-primary hover:text-darkblue px-3 py-2 rounded-md transition"
        >
          회원관리
        </Link>
        <Link
          to="/qna"
          className="hover:bg-primary hover:text-darkblue px-3 py-2 rounded-md transition"
        >
          QnA
        </Link>
        <Link
          to="/notice"
          className="hover:bg-primary hover:text-darkblue px-3 py-2 rounded-md transition"
        >
          공지사항
        </Link>
      </nav>
    </aside>
  );
}

//모서리 둥글게 rounded-md
//부드러운 효과 transition
