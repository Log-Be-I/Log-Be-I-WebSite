import { useState } from "react";
import { createAnswer, deleteAnswer, updateAnswer } from "../../api/qnaApi";
import Toast from "../common/Toast";

export default function AnswerForm({ answer, questionId, refreshQnA }) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(answer?.content || "");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  const handleDelete = async () => {
    try {
      await deleteAnswer(questionId, answer.answerId);
      setContent("");
      setToastMessage("답변이 삭제되었습니다.");
      setToastType("success");
      setEditMode(false);
      setShowToast(true);
    } catch (error) {
      setToastMessage("답변 삭제에 실패했습니다.");
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      setToastMessage("내용을 입력하세요.");
      setToastType("error");
      setShowToast(true);
      return;
    }
    try {
      if (answer?.answerId) {
        await updateAnswer(questionId, answer.answerId, content);
        setToastMessage("답변이 수정되었습니다.");
      } else {
        await createAnswer(questionId, content);
        setToastMessage("답변이 등록되었습니다.");
      }

      await refreshQnA();
      setToastMessage("답변이 저장되었습니다.");
      setToastType("success");
      setEditMode(false);
      setShowToast(true);
    } catch (error) {
      setToastMessage("답변 저장에 실패했습니다.");
      setToastType("error");
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="p-6 bg-blue-50 rounded-lg space-y-6 mt-10 relative">
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}

        {!editMode ? (
          <>
            <div className="flex items-center gap-3  mb-4">
              <span className="text-lg font-semibold text-blue-700">답변:</span>
              {/*<span>{content ? content : "아직 등록된 답변이 없습니다."}</span>*/}
            </div>
            {content ? (
              <div className="min-h-24 p-4 bg-blue-50 rounded">{content}</div>
            ) : (
              <p className="text-gray-500">아직 등록된 답변이 없습니다.</p>
            )}

            {content && (
              <div className="absolute bottom-4 right-6 text-sm text-gray-400">
                답변일:{" "}
                {answer?.createdAt || new Date().toISOString().split("T")[0]}
              </div>
            )}
          </>
        ) : (
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="답변 내용을 입력하세요..."
          />
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        {!editMode ? (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded"
            >
              {content ? "수정하기" : "등록하기"}
            </button>
            {content && (
              <button
                onClick={handleDelete}
                className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded"
              >
                삭제하기
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded"
            >
              저장하기
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              취소
            </button>
          </>
        )}
      </div>
    </>
  );
}
