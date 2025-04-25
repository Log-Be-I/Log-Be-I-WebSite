// src/mock/noticeMockData.js
export const noticeMockData = {
  data: [
    {
      noticeId: 5,
      title: "긴급 서버 점검 안내",
      content: "서버 점검이 12시에 진행됩니다.",
      image: "server.png",
      memberId: 1,
      noticeType: "NOTICE",
      noticeStatus: "NOTICE_REGISTERED",
      isPinned: "URGENT_PINNED",
      createdAt: "2025-04-25",
    },
    {
      noticeId: 4,
      title: "이벤트 공지",
      content: "봄맞이 이벤트 시작!",
      image: "event.png",
      memberId: 1,
      noticeType: "EVENT",
      noticeStatus: "NOTICE_REGISTERED",
      isPinned: "PINNED",
      createdAt: "2025-04-20",
    },
    {
      noticeId: 1,
      title: "일반 공지사항",
      content: "정기 점검 일정 안내",
      image: "normal.png",
      memberId: 1,
      noticeType: "NOTICE",
      noticeStatus: "NOTICE_REGISTERED",
      isPinned: "NONE",
      createdAt: "2025-04-15",
    },
  ],
  pageInfo: {
    page: 1,
    size: 3,
    totalElements: 3,
    totalPages: 1,
  },
};
