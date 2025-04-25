import { useState } from "react";
import Toast from "../common/Toast";

export default function AnswerForm({ answer }) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(answer?.content || "");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  const handleDelete = () => {
    setContent("");
    setToastMessage("답변이 삭제되었습니다.");
    setToastType("error");
    setShowToast(true);
    setEditMode(false);
  };

  const handleSave = () => {
    if (!content.trim()) {
      setToastMessage("내용을 입력하세요.");
      setToastType("error");
    } else {
      setToastMessage("답변이 저장되었습니다.");
      setToastType("success");
      setEditMode(false);
    }
    setShowToast(true);
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg space-y-3 mt-6">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      {!editMode ? (
        <>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-700">답변:</span>
            {/*<span>{content ? content : "아직 등록된 답변이 없습니다."}</span>*/}
          </div>

          {content && (
            <div className="text-sm text-gray-400">
              답변일:{" "}
              {answer?.createdAt || new Date().toISOString().split("T")[0]}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setEditMode(true)}
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded"
            >
              {content ? "수정하기" : "등록하기"}
            </button>
            {content && (
              <button
                onClick={handleDelete}
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                삭제하기
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="답변 내용을 입력하세요..."
          />
          <div className="flex gap-3 justify-end">
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
          </div>
        </>
      )}
    </div>
  );
}
