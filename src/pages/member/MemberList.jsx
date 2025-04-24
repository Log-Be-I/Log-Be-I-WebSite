import { useEffect, useState } from "react";
import { fetchMembers } from "../../api/memberApi";
import MemberFilter from "../../components/member/MemberFilter";
import MemberTable from "../../components/member/MemberTable";
import Pagination from "../../components/common/Pagination";
import Toast from "../../components/common/Toast";

export default function MemberList() {
  const [filters, setFilters] = useState({
    status: "",
    birth: "",
    name: "",
    email: "",
    region: "",
  });
  const [members, setMembers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("lastLoginDesc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MEMBERS_PER_PAGE = 10;

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchMembers(filters, page, sort);
      setMembers(res.data);
      setTotalCount(res.totalCount);
    } catch (err) {
      setError("회원 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [page, sort]);

  const totalPages = Math.ceil(totalCount / MEMBERS_PER_PAGE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">회원관리</h1>

      {/* 필터 영역 */}
      <MemberFilter
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />

      {/* 총 인원수 + 정렬 옵션 */}
      <div className="flex justify-between items-center mt-4 mb-2">
        <div className="text-gray-700">총 {totalCount}명</div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 border rounded px-3"
        >
          <option value="lastLoginDesc">접속순 (최신)</option>
          <option value="lastLoginAsc">접속순 (오래된)</option>
          <option value="joinDesc">가입순 (최신)</option>
          <option value="joinAsc">가입순 (오래된)</option>
        </select>
      </div>

      {/* 테이블 */}
      <MemberTable members={members || []} loading={loading} />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <Toast message={error} onClose={() => setError(null)} />
    </div>
  );
}
