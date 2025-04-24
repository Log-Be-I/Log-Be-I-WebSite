import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/users/UserList";
import QnaList from "../pages/qna/QnaList";
import NoticeList from "../pages/notice/NoticeList";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/qna" element={<QnaList />} />
        <Route path="/notice" element={<NoticeList />} />
      </Routes>
    </BrowserRouter>
  );
}
