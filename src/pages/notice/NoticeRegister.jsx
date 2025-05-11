import { useState } from "react";
import { createNotice } from "../../api/noticeApi";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/common/Toast";
import NoticeForm from "../../components/notice/NoticeForm";

export default function NoticeRegister() {
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("info");
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const noticePostDto = {
        title: formData.title,
        content: formData.content,
        noticeType: "NOTICE",
        isPinned: formData.isPinned,
      };

      const formDataToSend = new FormData();
      formDataToSend.append(
        "noticePostDto",
        new Blob([JSON.stringify(noticePostDto)], {
          type: "application/json",
        })
      );

      // 이미지 파일들을 FormData에 추가
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }

      await createNotice(formDataToSend);
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
      <NoticeForm onSubmit={handleSubmit} />
    </div>
  );
}
