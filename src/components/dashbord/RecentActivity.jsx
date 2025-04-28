export default function RecentActivity({
  questionTitles,
  recentNotices,
  todayMemberNames,
}) {
  // QnA 활동 로그 생성
  const qnaActivities = (questionTitles || [])
    .slice(0, 2) // 최근 3개만
    .map((question, idx) => (
      <li key={`qna-${idx}`} className="mb-2">
        새로운 QnA '{question.title}'이 등록되었습니다.
      </li>
    ));

  // 공지사항 활동 로그 생성
  const noticeActivities = (recentNotices || [])
    .slice(0, 2) // 최근 3개만
    .map((notice, idx) => (
      <li key={`notice-${idx}`} className="mb-2">
        공지사항 '{notice.title}'이 작성되었습니다.
      </li>
    ));

  // 새로운 회원 가입 활동 로그 생성
  const memberActivities = (todayMemberNames || [])
    .slice(0, 2) // 최근 3명만
    .map((member, idx) => (
      <li key={`member-${idx}`} className="mb-2">
        '{member.name}'님이 새로 가입하였습니다.
      </li>
    ));

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">최근 활동 로그</h2>
      <ul className="list-disc pl-5 text-gray-700">
        {/* QnA 활동과 공지사항 활동을 합쳐서 표시 */}
        {qnaActivities}
        {noticeActivities}
        {memberActivities}
      </ul>
    </div>
  );
}
