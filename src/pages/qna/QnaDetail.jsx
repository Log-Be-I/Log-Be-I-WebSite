import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQnaDetail, deleteAnswer } from "../../api/qnaApi";
import Spinner from "../../components/common/Spinner";
import AnswerForm from "../../components/qna/AnswerForm";
import { format } from "date-fns";
import ConfirmButton from "../../components/common/ConfirmButton";

export default function QnaDetail() {
  const { id } = useParams();
  const [qna, setQna] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await getQnaDetail(id);
      console.log("💾 불러온 데이터:", response.data);
      setQna(response.data);
    } catch (error) {
      setToast("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!qna)
    return (
      <div className="text-center text-gray-500">존재하지 않는 질문입니다.</div>
    );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-lg space-y-10">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">
          QnA 상세조회
        </h2>

        {/* 질문 정보 */}
        <div className="space-y-6">
          <div>
            <span className="text-lg font-semibold text-gray-700">제목</span>
            <p className="mt-2 text-gray-900">{qna.title}</p>
          </div>
          <div>
            <span className="text-lg font-semibold text-gray-700">작성자</span>
            <p className="mt-2 text-gray-900">{qna.writer || qna.memberId}</p>
          </div>
          <div>
            <span className="text-lg font-semibold text-gray-700">내용</span>
            <div className="mt-3 p-5 bg-gray-50 rounded-lg text-gray-800 min-h-24 relative">
              {qna.content}
              <div className="absolute bottom-2 right-4 text-sm text-gray-400">
                등록일 {format(new Date(qna.createdAt), "yyyy-MM-dd")}
              </div>
            </div>
          </div>
        </div>
        {qna && (
          <AnswerForm
            answer={qna.answer}
            questionId={qna.questionId}
            refreshQnA={fetchData}
          />
        )}
      </div>

      <ConfirmButton label="확인" />
    </div>
  );
}
