import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/main";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/users/UserList";
import QnaList from "../pages/qna/QnaList";
import NoticeList from "../pages/notice/NoticeList";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/qna" element={<QnaList />} />
          <Route path="/notice" element={<NoticeList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
