import { FaTimes } from "react-icons/fa";
import { format } from "date-fns";

export default function MemberDetailModal({ isOpen, member, onClose }) {
  if (!isOpen || !member) return null; // isOpen 체크 추가!
  const formatDate = (dateTime) => {
    if (!dateTime) return "접속 기록 없음";
    const date = new Date(dateTime);
    return isNaN(date) ? "잘못된 날짜" : format(date, "yyyy-MM-dd");
  };

  const {
    name,
    birth,
    nickname,
    profile,
    memberStatus,
    notification,
    createdAt,
  } = member;

  const isValidProfile = profile && profile.startsWith("http");
  const profileSrc = isValidProfile ? profile : "/aegiRogiProfile.svg";

  console.log("현재 profile 값:", profile);
  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // 모달 안 클릭 방지
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">회원 상세 정보</h2>
        <div className="border-t border-gray-300 w-3/4 mx-auto mb-6"></div>

        <div className="flex flex-col items-center gap-4">
          <img
            src={profileSrc}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full border-2 bg-white p-2 object-contain"
          />
          <div className="w-full mt-4 space-y-4 text-center text-gray-700">
            <p>
              <span className="font-semibold text-gray-600">이름:</span> {name}
            </p>
            <p>
              <span className="font-semibold text-gray-600">생년월일:</span>{" "}
              {birth}
            </p>
            <p>
              <span className="font-semibold text-gray-600">닉네임:</span>{" "}
              {nickname}
            </p>
            <p>
              <span className="font-semibold text-gray-600">가입일:</span>{" "}
              {formatDate(createdAt)}
            </p>
            <p>
              <span className="font-semibold text-gray-600">상태:</span>{" "}
              {memberStatus === "MEMBER_ACTIVE"
                ? "✅ 활동 중"
                : memberStatus === "MEMBER_SLEEP"
                  ? "⏸️ 휴면"
                  : "🚫 탈퇴"}
            </p>
            <p>
              <span className="font-semibold text-gray-600">알림 여부:</span>{" "}
              {notification ? "🔔 ON" : "🔕 OFF"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
