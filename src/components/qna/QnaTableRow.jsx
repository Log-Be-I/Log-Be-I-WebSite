import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function QnaTableRow({ qna, index }) {
  const navigate = useNavigate();

  const isNew = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now - created);
    return diffTime < 3 * 1000 * 60 * 60 * 24; // 3일
  };

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/qna/${qna.questionId}`)}
    >
      <td className="py-3">{index}</td>
      <td className="py-3">
        {isNew(qna.createdAt) && <span className="text-red-500 ml-2">NEW</span>}
      </td>
      <td className="py-3">{qna.title}</td>
      <td className="py-3">{qna.email || `회원번호 ${qna.memberId}`}</td>
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
