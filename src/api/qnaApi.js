import axiosInstance from "./axios";

export const getQnaDetail = async (id) => {
  const response = await axiosInstance.get(`/questions/${id}`);
  return response.data;
};

export const createAnswer = async (questionId, content) => {
  const response = await axiosInstance.post(
    `/questions/${questionId}/answers`,
    { content }
  );

  const locationUri = response.headers.location;
  return { locationUri, data: response.data };
};

export const updateAnswer = async (questionId, answerId, content) => {
  const response = await axiosInstance.patch(
    `/questions/${questionId}/answers/${answerId}`,
    { content }
  );
  return response.data;
};

export const deleteAnswer = async (questionId, answerId) => {
  const response = await axiosInstance.delete(
    `/questions/${questionId}/answers/${answerId}`
  );
  return response.data;
};

export const fetchAnswers = async (sortType, page, size) => {
  try {
    const params = { sortType, page, size };
    //console.log("QnA 요청 params:", params);
    const response = await axiosInstance.get("/questions/office", { params });
    return response.data;
  } catch (error) {
    console.error("QnA 조회 실패:", error);
    throw error; // 상위에서 Toast 처리 등 가능
  }
};
