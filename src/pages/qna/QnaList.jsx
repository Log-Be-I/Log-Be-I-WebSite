import { useState, useEffect } from "react";
import QnaFilter from "../../components/qna/QnaFilter";
import QnaTable from "../../components/qna/QnaTable";
import Pagination from "../../components/common/Pagination";
import Spinner from "../../components/common/Spinner";
import Toast from "../../components/common/Toast";
import SortDropdown from "../../components/common/SortDropdown";
import { fetchAnswers } from "../../api/qnaApi";

export default function QnaList() {
  const [filters, setFilters] = useState({
    title: "",
    email: "",
    noAnswer: false,
  });
  const [qnaList, setQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // 정렬 상태는 단일 sortType만!
  const [sortType, setSortType] = useState("newest");

  const handleSearch = async (resetPage = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAnswers(filters, page, sortType);
      setQnaList(res.data);
      setTotalPages(res.pageInfo.totalPages);
      if (resePage) setPage(1);
    } catch (err) {
      setToast({ show: true, message: "조회 실패했습니다.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [page, sortType]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 2000); // 2초 뒤 자동 종료
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QnA 관리</h1>
      <QnaFilter
        filters={filters}
        setFilters={setFilters}
        onSearch={() => handleSearch(true)}
        totalCount={qnaList.length}
        sortType={sortType}
        setSortType={setSortType}
        setPage={setPage}
      />
      {/* <div className="flex justify-end mb-2">
        <SortDropdown
          value={sortType}
          onChange={setSortType}
          options={sortOptions}
        />
      </div> */}
      {loading ? (
        <Spinner />
      ) : qnaList.length > 0 ? (
        <>
          <QnaTable qnaList={qnaList} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          문의 내역이 없습니다.
        </div>
      )}
      {error && <Toast message={error} type="error" />}
    </div>
  );
}
