import { axiosWithToken } from "./axios";

export const getNotices = async (page = 1) => {
  const response = await axiosWithToken.get(`/notices?page=${page}&size=10`);
  return response.data;
};

export const registerNotice = async (noticeData) => {
  const response = await axiosWithToken.post("/notices", noticeData);
  return response.data;
};

export const getNoticeDetail = async (noticeData) => {
  const response = await axiosWithToken.get("/notices", noticeData);
  return response.data;
};

export const deleteNotice = async (noticeData) => {
  const response = await axiosWithToken.delete("/notices", noticeData);
  return response.data;
};

export const updateNotice = async (noticeData) => {
  const response = await axiosWithToken.patch("/notices", noticeData);
  return response.data;
};
