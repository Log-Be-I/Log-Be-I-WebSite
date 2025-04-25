import { useNavigate } from "react-router-dom";
import PinnedIcon from "./PinnedIcon";

export default function NoticeTableRow({ notice, index }) {
  const navigate = useNavigate();

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/notice/${notice.noticeId}`)}
    >
      <td className="py-3">
        <div className="flex justify-center">
          <PinnedIcon isPinned={notice.isPinned} />
        </div>
      </td>
      <td className="py-3">{notice.title}</td>
      <td className="py-3">관리자</td>
      <td className="py-3">{notice.createdAt || "2024-04-25"}</td>
    </tr>
  );
}
