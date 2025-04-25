import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQnaDetail, deleteAnswer } from "../../api/qnaApi";
import Spinner from "../../components/common/Spinner";
import Toast from "../../components/common/Toast";
import AnswerForm from "../../components/qna/AnswerForm";
import Modal from "../../components/common/Modal";

export default function QnaDetail() {
  const { id } = useParams();
  const [qna, setQna] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQnaDetail(id);
        setQna(data);
      } catch (error) {
        setToast("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Spinner />;
  if (!qna)
    return (
      <div className="text-center text-gray-500">존재하지 않는 질문입니다.</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        QnA 상세조회
      </h2>

      {/* 질문 정보 */}
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-600">제목:</span> {qna.title}
        </div>
        <div>
          <span className="font-semibold text-gray-600">작성자:</span>{" "}
          {qna.writer}
        </div>
        <div>
          <span className="font-semibold text-gray-600">내용:</span>
          <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700">
            {qna.content}
          </div>
        </div>
        <div className="text-sm text-gray-400">등록일: {qna.createdAt}</div>
      </div>

      <AnswerForm answer={qna.answer} />
    </div>
  );
}
