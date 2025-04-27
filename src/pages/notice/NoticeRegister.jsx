import { useState } from "react";
import { createNotice } from "../../api/noticeApi";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/common/Toast";

export default function NoticeRegister() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [importance, setImportance] = useState("NONE");
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("info");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setToast("제목과 내용을 입력하세요.");
      return;
    }

    try {
      await createNotice({
        title,
        content,
        image: file ? file.name : null,
        noticeType: "NOTICE",
        isPinned: importance,
      });
      setToastType("success");
      setToast("공지사항이 등록되었습니다!");
      setTimeout(() => navigate("/notice"), 1500);
    } catch (error) {
      setToast("등록 실패");
      setToastType("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">공지사항 등록</h2>
      {toast && (
        <Toast message={toast} type={toastType} onClose={() => setToast("")} />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">중요도</label>
          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            className="border rounded w-full p-2 mt-1"
          >
            <option value="NONE">일반</option>
            <option value="PINNED">상단 고정</option>
            <option value="URGENT_PINNED">긴급 고정</option>
          </select>
        </div>
        <div>
          <label className="font-semibold">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2 mt-1"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div>
          <label className="font-semibold">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded w-full p-2 mt-1"
            rows="6"
            placeholder="내용을 입력하세요"
          />
        </div>
        <div>
          <label className="font-semibold">첨부파일</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1"
          />
          {file && (
            <p className="text-sm text-gray-500 mt-1">
              선택된 파일: {file.name}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded"
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
