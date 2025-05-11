import axiosInstance from "./axios";

// 공지사항 목록 조회
export const getNotices = async (page = 1, pageSize = 10) => {
  // TODO: 검색 기능 구현 시 searchTerm 파라미터 추가 필요
  // export const getNotices = async (page = 1, pageSize = 10, searchTerm = "") => {
  const response = await axiosInstance.get(
    // TODO: 검색 기능 구현 시 search 파라미터 추가 필요
    // `/notices?page=${page}&size=${pageSize}&search=${encodeURIComponent(searchTerm)}`
    `/notices?page=${page}&size=${pageSize}`
  );
  return response.data;
};

// 공지사항 상세 조회
export const getNoticeDetail = async (noticeId) => {
  const response = await axiosInstance.get(`/notices/${noticeId}`);
  console.log(response.data);
  return response.data;
};

// 공지사항 등록
export const createNotice = async (formData) => {
  // // FormData 내용 확인
  // for (let pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }
  const response = await axiosInstance.post("/notices", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 공지사항 수정
export const updateNotice = async (noticeId, formData) => {
  const response = await axiosInstance.patch(`/notices/${noticeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 공지사항 삭제
export const deleteNotice = async (noticeId) => {
  const response = await axiosInstance.delete(`/notices/${noticeId}`);
  return response.data;
};
