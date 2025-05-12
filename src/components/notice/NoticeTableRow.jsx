import { useNavigate } from "react-router-dom";
import PinnedIcon from "./PinnedIcon";
import { format } from "date-fns";

export default function NoticeTableRow({ notice, index }) {
  const navigate = useNavigate();

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/notice/${notice.noticeId}`)}
    >
      <td className="py-3 text-center">
        {notice.noticeType === "NOTICE" ? "공지" : "이벤트"}
      </td>
      <td className="py-3 text-left pl-6">
        {notice.isPinned !== "NONE" && (
          <span className="inline-block align-middle mr-2">
            <PinnedIcon isPinned={notice.isPinned} />
          </span>
        )}
        <span className="align-middle">{notice.title}</span>
      </td>
      <td className="py-3">관리자</td>
      <td className="py-3">
        {format(new Date(notice.createdAt), "yyyy-MM-dd")}
      </td>
    </tr>
  );
}
