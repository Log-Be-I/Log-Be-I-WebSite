import QnaTableRow from "./QnaTableRow";

export default function QnaTable({ qnaList }) {
  return (
    <table className="w-full border-t text-center">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2">No</th>
          <th className="py-2 text-left pl-4">제목</th>
          <th className="py-2">작성자</th>
          <th className="py-2">답변여부</th>
          <th className="py-2">등록일</th>
        </tr>
      </thead>
      <tbody>
        {qnaList.map((qna, idx) => (
          <QnaTableRow key={qna.questionId} qna={qna} index={idx + 1} />
        ))}
      </tbody>
    </table>
  );
}
