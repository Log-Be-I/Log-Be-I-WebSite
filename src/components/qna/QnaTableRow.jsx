import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function QnaTableRow({ qna, index }) {
  const navigate = useNavigate();

  const isNew = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now - created);
    return diffTime < 2 * 1000 * 60 * 60 * 24; // 2일
  };

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/qna/${qna.questionId}`)}
    >
      <td className="py-3 w-16">{qna.questionId}</td>
      <td className="py-3 text-left pl-4">
        <div className="flex items-center gap-2">
          {isNew(qna.createdAt) && (
            <span className="inline-block bg-orange-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              NEW
            </span>
          )}
          <span>{qna.title}</span>
        </div>
      </td>
      <td className="py-3">{qna.writerEmail || `회원번호 ${qna.memberId}`}</td>
      <td className="py-3">
        {qna.questionAnswerStatus === "DONE_ANSWER" ? (
          <span className="text-green-500 font-semibold">답변완료</span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="py-3">{format(new Date(qna.createdAt), "yyyy-MM-dd")}</td>
    </tr>
  );
}
