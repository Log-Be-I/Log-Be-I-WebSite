import { useState } from "react";
import MemberDetailModal from "./MemberDetailModal";
import { format } from "date-fns";

export default function MemberTableRow({ member, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateTime) => {
    if (!dateTime) return "접속 기록 없음";
    const date = new Date(dateTime);
    return isNaN(date) ? "잘못된 날짜" : format(date, "yyyy-MM-dd HH:mm");
  };

  // 상태에 따른 색상과 텍스트 매핑
  const getStatusBadge = (status) => {
    switch (status) {
      case "MEMBER_ACTIVE":
        return (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="text-black-500 font-medium">활동 중</span>
          </span>
        );
      case "MEMBER_SLEEP":
        return (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span className="text-black500 font-medium">휴면 상태</span>
          </span>
        );
      case "MEMBER_DELETEED":
        return (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="text-black-500 font-medium">탈퇴 상태</span>
          </span>
        );
      default:
        return status;
    }
  };
  return (
    <>
      <tr
        className="border-b text-center cursor-pointer hover:bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <td className="py-4">{index}</td>
        <td className="py-4">{member.name}</td>
        <td className="py-4">{member.email}</td>
        <td className="py-4">{member.birth}</td>
        <td className="py-4">{member.region}</td>
        <td className="py-4">{getStatusBadge(member.memberStatus)}</td>
        <td className="py-4">{formatDate(member.lastLoginAt)}</td>
      </tr>
      <MemberDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={member}
      />
    </>
  );
}
