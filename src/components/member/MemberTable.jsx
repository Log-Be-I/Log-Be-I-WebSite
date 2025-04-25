import MemberTableRow from "./MemberTableRow";
import Spinner from "../common/Spinner";

export default function MemberTable({ members, loading }) {
  if (loading) return <Spinner />;
  if (!Array.isArray(members) || members.length === 0)
    return (
      <div className="text-center py-10 text-gray-500">회원이 없습니다.</div>
    );

  return (
    <table className="w-full table-auto border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th>No</th>
          <th>이름</th>
          <th>이메일</th>
          <th>출생연도</th>
          <th>상태</th>
          <th>마지막 접속</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, idx) => (
          <MemberTableRow key={member.id} member={member} index={idx + 1} />
        ))}
      </tbody>
    </table>
  );
}
