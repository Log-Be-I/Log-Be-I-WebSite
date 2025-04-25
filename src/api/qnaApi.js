// Mock 기반 주석처리
export const getQnaDetail = async (id) => {
  // const res = await axiosWithToken.get(`/questions/${id}`);
  // return res.data;

  // Mock
  return {
    questionId: id,
    title: "배송관련 문의",
    writer: "홍길동",
    content: "언제 배송되나요?",
    createdAt: "2025-04-20",
    questionStatus: "QUESTION_REGISTERED",
    questionAnswerStatus: "DONE_ANSWER",
    answer: {
      answerId: 1,
      content: "금일 출고 예정입니다.",
    },
    answerDate: "2025-04-21",
  };
};

export const postAnswer = async (qnaId, content) => {
  // await axiosWithToken.post(`/questions/${qnaId}/answers`, { content });
  return true;
};

export const patchAnswer = async (qnaId, content) => {
  // await axiosWithToken.patch(`/answers/${qnaId}`, { content });
  return true;
};

export const deleteAnswer = async (answerId) => {
  // await axiosWithToken.delete(`/answers/${answerId}`);
  return true;
};
