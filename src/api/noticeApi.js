import axiosInstance from "./axios";

export const getNotices = async (page = 1) => {
  const response = await axiosInstance.get(`/notices?page=${page}&size=10`);
  return response.data;
};

export const registerNotice = async (noticeData) => {
  const response = await axiosInstance.post("/notices", noticeData);
  return response.data;
};

export const getNoticeDetail = async (noticeData) => {
  const response = await axiosInstance.get("/notices", noticeData);
  return response.data;
};

export const deleteNotice = async (noticeData) => {
  const response = await axiosInstance.delete("/notices", noticeData);
  return response.data;
};

export const updateNotice = async (noticeData) => {
  const response = await axiosInstance.patch("/notices", noticeData);
  return response.data;
};
