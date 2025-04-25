import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/main";
import Dashboard from "../pages/Dashboard";
import MemberList from "../pages/member/MemberList";
import QnaList from "../pages/qna/QnaList";
import NoticeList from "../pages/notice/NoticeList";
import NoticeRegister from "../pages/notice/NoticeRegister";
import NoticeDetail from "../pages/notice/NoticeDetail";
import QnaDetail from "../pages/qna/QnaDetail";
import LoginPage from "../pages/LoginPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="member" element={<MemberList />} />
          <Route path="qna" element={<QnaList />} />
          <Route path="qna/:id" element={<QnaDetail />} />
          <Route path="notice" element={<NoticeList />} />
          <Route path="notice/register" element={<NoticeRegister />} />
          <Route path="notice/:id" element={<NoticeDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// /login 진입 후 로그인 성공 시 /dashbord로 이동
// 토큰이 없으면 무조건 /login으로 리다이렉트
