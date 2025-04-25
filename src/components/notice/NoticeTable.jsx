import NoticeTableRow from "./NoticeTableRow";

export default function NoticeTable({ notices }) {
  return (
    <table className="w-full border text-center">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2">No</th>
          <th className="py-2">제목</th>
          <th className="py-2">글쓴이</th>
          <th className="py-2">작성일</th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice, index) => (
          <NoticeTableRow
            key={notice.noticeId}
            notice={notice}
            index={index + 1}
          />
        ))}
      </tbody>
    </table>
  );
}
