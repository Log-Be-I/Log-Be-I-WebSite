import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/main";
import Dashboard from "../pages/Dashboard";
import MemberList from "../pages/member/MemberList";
import QnaList from "../pages/qna/QnaList";
import NoticeList from "../pages/notice/NoticeList";
import NoticeRegister from "../pages/notice/NoticeRegister";
import NoticeDetail from "../pages/notice/NoticeDetail";
import QnaDetail from "../pages/qna/QnaDetail";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/member" element={<MemberList />} />
          <Route path="/qna" element={<QnaList />} />
          <Route path="/qna/:id" element={<QnaDetail />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/register" element={<NoticeRegister />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
