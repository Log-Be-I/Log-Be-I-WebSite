import axios from "axios";
export const loginApi = async ({ username, password }) => {
  console.log("🔥 로그인 요청 데이터:", { username, password });
  const response = await axios.post(
    "https://web.logbe-i.com/auth/login",
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );
  // 헤더에서 AUthorzation 꺼내기 !!
  const authHeader = response.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token;
  } else {
    throw new Error("토큰이 응답에 없습니다.");
  }
};
