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
import { format } from "date-fns";

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
        const res = await getNoticeDetail(id);
        setNotice(res.data);
      } catch {
        setToast("공지사항을 불러오는 데 실패했습니다.");
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteNotice(id);
      setToast("공지사항이 삭제되었습니다.");
      setToastType("success");
      navigate("/notice");
    } catch {
      setToast("삭제 실패");
      setToastType("error");
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateNotice(id, updatedData);
      setToast("수정이 완료되었습니다.");
      setToastType("success");
      setEditMode(false);
      setNotice({ ...notice, ...updatedData });
    } catch {
      setToast("수정 실패");
      setToastType("error");
    }
  };

  if (!notice)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-lg space-y-10">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">
          공지사항 상세 조회
        </h2>

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
              <div className="mt-4 p-5 bg-gray-50 rounded-lg text-gray-800 min-h-24">
                {notice.content}
              </div>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-700">
                이미지
              </span>
              <p className="mt-3 text-gray-900">{notice.image}</p>
            </div>
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
            <p>정말 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                삭제
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                취소
              </button>
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
      <ConfirmButton label="확인" />
    </div>
  );
}
