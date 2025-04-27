import { useEffect, useState } from "react";
import { fetchMembers } from "../../api/memberApi";
import MemberFilter from "../../components/member/MemberFilter";
import MemberTable from "../../components/member/MemberTable";
import Pagination from "../../components/common/Pagination";
import Toast from "../../components/common/Toast";

export default function MemberList() {
  const [filters, setFilters] = useState({
    memberStatus: "",
    birth: "",
    name: "",
    email: "",
    region: "",
  });
  const [members, setMembers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("lastLoginAt");
  const [order, setOrder] = useState("desc");
  const [resetTrigger, setResetTrigger] = useState(false);
  const handleSearch = async (resetPage = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchMembers(filters, page, sortBy, order);
      setMembers(res.data);
      setTotalCount(res.pageInfo.totalElements); // 총 인원 수 표시용
      setTotalPages(res.pageInfo.totalPages); //  서버에서 받은 totalPages 사용

      if (resetPage) setPage(1);
    } catch (err) {
      setError("회원 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resetTrigger) {
      handleSearch();
      setResetTrigger(false); // 트리거 초기화
    }
  }, [resetTrigger]);

  useEffect(() => {
    handleSearch();
  }, [page, sortBy, order]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">회원관리</h1>

      {/* 필터 영역 */}
      <MemberFilter
        filters={filters}
        setFilters={setFilters}
        onSearch={() => handleSearch(true)} // 검색 시 페이지 초기화
        totalCount={totalCount}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        setPage={setPage}
        setResetTrigger={setResetTrigger}
      />

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
