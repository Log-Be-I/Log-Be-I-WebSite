import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNoticeDetail,
  deleteNotice,
  updateNotice,
} from "../../api/noticeApi";
import NoticeForm from "../../components/notice/NoticeForm";
import Modal from "../../components/common/Modal";
import Toast from "../../components/common/Toast";
import PinnedIcon from "../../components/notice/PinnedIcon";
import NoticeImageGallery from "../../components/notice/NoticeImageGallery";
import { format } from "date-fns";
import ConfirmButton from "../../components/common/ConfirmButton";
import Spinner from "../../components/common/Spinner";
import { FaArrowLeft } from "react-icons/fa";

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getNoticeDetail(id);
        setNotice(res.data);
      } catch {
        setToast("공지사항을 불러오는 데 실패했습니다.");
        setToastType("error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getNoticeDetail(id);
      setNotice(res.data);
    } catch {
      setToast("공지사항을 불러오는 데 실패했습니다.");
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotice(id);
      setToast("공지사항이 삭제되었습니다.");
      setToastType("success");
      setTimeout(() => navigate("/notice"), 1500);
    } catch {
      setToast("삭제 실패");
      setToastType("error");
    }
    setShowModal(false);
  };

  const handleUpdate = async (updatedData) => {
    try {
      // 기존 이미지 URL과 새 파일을 FormData로 구성
      const patchDto = {
        title: updatedData.title,
        content: updatedData.content,
        isPinned: updatedData.isPinned,
        fileUrls: updatedData.existingImages, // 유지할 기존 이미지 URL 배열
      };
      const formData = new FormData();
      formData.append(
        "noticePatchDto",
        new Blob([JSON.stringify(patchDto)], { type: "application/json" })
      );
      if (updatedData.newFiles && updatedData.newFiles.length > 0) {
        updatedData.newFiles.forEach((file) => {
          formData.append("images", file);
        });
      }
      await updateNotice(id, formData);
      await fetchData();
      setToast("수정이 완료되었습니다.");
      setToastType("success");
      setEditMode(false);
    } catch {
      setToast("수정 실패");
      setToastType("error");
    }
  };

  if (loading) return <Spinner />;
  if (!notice)
    return (
      <div className="text-center text-gray-500">
        공지사항을 찾을 수 없습니다.
      </div>
    );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-lg space-y-10">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/notice")}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-3xl font-bold text-gray-800">
              공지사항 상세 조회
            </h2>
          </div>
        </div>

        {editMode ? (
          <NoticeForm initialData={notice} onSubmit={handleUpdate} />
        ) : (
          <div className="space-y-8">
            <div>
              <span className="text-lg font-semibold text-gray-700">제목</span>
              <p className="mt-3 text-gray-900">{notice.title}</p>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-700">
                중요도
              </span>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-gray-600">
                  {notice.isPinned === "URGENT_PINNED"
                    ? "긴급 고정"
                    : notice.isPinned === "PINNED"
                      ? "상단 고정"
                      : "고정 없음"}
                </span>
                <PinnedIcon isPinned={notice.isPinned} />
              </div>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-700">내용</span>
              <div className="mt-4 p-5 bg-gray-50 rounded-lg text-gray-800 min-h-24 whitespace-pre-wrap">
                {notice.content}
              </div>
            </div>
            <NoticeImageGallery images={notice.fileUrls} />
            <div className="text-sm text-gray-400 text-right mt-6">
              작성일: {format(new Date(notice.createdAt), "yyyy-MM-dd")}
            </div>
          </div>
        )}

        {!editMode && (
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-primary text-white px-5 py-2 rounded hover:bg-secondary"
            >
              수정
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-400 text-white px-5 py-2 rounded hover:bg-red-500"
            >
              삭제
            </button>
          </div>
        )}

        {/* Confirm Modal */}
        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">공지사항 삭제</h3>
              <p className="text-gray-600 mb-6">
                정말로 이 공지사항을 삭제하시겠습니까?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                >
                  삭제
                </button>
              </div>
            </div>
          </Modal>
        )}

        {toast && (
          <Toast
            message={toast}
            onClose={() => setToast("")}
            type={toastType}
          />
        )}
      </div>
    </div>
  );
}
