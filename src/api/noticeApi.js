import axiosInstance from "./axios";

export const getNotices = async (page = 1) => {
  const response = await axiosInstance.get(`/notices?page=${page}&size=10`);
  return response.data;
};

export const createNotice = async (noticeData) => {
  const response = await axiosInstance.post("/notices", noticeData);
  return response.data;
};

export const getNoticeDetail = async (noticeId) => {
  const response = await axiosInstance.get(`/notices/${noticeId}`);
  return response.data;
};

export const deleteNotice = async (noticeId) => {
  const response = await axiosInstance.delete(`/notices/${noticeId}`);
  return response.data;
};

export const updateNotice = async (noticeId, noticeData) => {
  const response = await axiosInstance.patch(
    `/notices/${noticeId}`,
    noticeData
  );
  return response.data;
};
