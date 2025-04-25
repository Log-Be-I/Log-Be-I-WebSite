import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import Toast from "../components/common/Toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await loginApi({ username, password });
      localStorage.setItem("adminToken", token);
      setToast("로그인 성공!");
      console.log("로그인 성공", token);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setToast("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h2>
        <input
          type="username"
          placeholder="이메일"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary"
        >
          로그인
        </button>
        {toast && (
          <Toast
            message={toast}
            type={toast.includes("성공") ? "success" : "error"}
            onClose={() => setToast("")}
          />
        )}
      </div>
    </div>
  );
}
