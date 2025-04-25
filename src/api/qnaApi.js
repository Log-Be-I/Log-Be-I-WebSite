import axiosInstance from "./axios";

export const getQnaDetail = async (id) => {
  const response = await axiosInstance.get(`/questions/${id}`);
  return response.data;
};

export const postAnswer = async (qnaId, content) => {
  const response = await axiosInstance.post(`/questions/${qnaId}/answers`, {
    content,
  });
  return response.data;
};

export const patchAnswer = async (qnaId, content) => {
  const response = await axiosInstance.patch(`/answers/${qnaId}`, { content });
  return response.data;
};

export const deleteAnswer = async (answerId) => {
  const response = await axiosInstance.delete(`/answers/${answerId}`);
  return response.data;
};

// export const getQnaList = async (filters, sort, page) => {
//   const response = await axiosInstance.get("/questions", {
//     params: { filters, sort, page },
//   });
//   return response.data;
// };
