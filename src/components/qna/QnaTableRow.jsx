import { useNavigate } from "react-router-dom";

export default function QnaTableRow({ qna, index }) {
  const navigate = useNavigate();

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/qna/${qna.questionId}`)}
    >
      <td className="py-3">{index}</td>
      <td className="py-3">{qna.title}</td>
      <td className="py-3">{qna.writer}</td>
      <td className="py-3">
        {qna.questionAnswerStatus === "DONE_ANSWER" ? (
          <span className="text-green-500 font-semibold">답변완료</span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="py-3">{qna.createdAt}</td>
    </tr>
  );
}
