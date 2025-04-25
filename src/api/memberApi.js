import { axiosWithToken } from "../api/axios";

export const fetchMembers = async (filters, page, sort) => {
  // // 실제 API 호출 예시

  // const response = await axiosWithToken.get("/members", {
  //   params: { ...filters, page, sort },
  // });
  // return response.data;

  // Mock 데이터
  return {
    data: [
      {
        id: 1,
        name: "승아",
        email: "sa@naver.com",
        birth: 1997,
        status: "활동 중",
        lastLogin: "2024-04-24",
      },
      {
        id: 2,
        name: "홍길동",
        email: "test@test.com",
        birth: 1995,
        status: "휴면",
        lastLogin: "2024-01-10",
      },
      // 추가 데이터 ...
    ],
    totalCount: 13, // 총 회원 수
  };
};
