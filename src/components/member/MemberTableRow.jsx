import { useState } from "react";
import MemberDetailModal from "./MemberDetailModal";

export default function MemberTableRow({ member, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <td className="py-4">
          <span
            className={`px-2 py-1 rounded-full text-white ${member.status === "활동 중" ? "bg-green-400" : "bg-gray-400"}`}
          >
            {member.status}
          </span>
        </td>
        <td className="py-4">{member.lastLogin}</td>
      </tr>
      <MemberDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={member}
      />
    </>
  );
}
