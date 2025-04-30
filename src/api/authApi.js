import axiosInstance from "./axios";

export const loginApi = async ({ username, password }) => {
  console.log("🔥 로그인 요청 데이터:", { username, password });
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  // 헤더에서 AUthorzation 꺼내기 !!
  const authHeader = response.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token;
  } else {
    throw new Error("토큰이 응답에 없습니다.");
  }
};
