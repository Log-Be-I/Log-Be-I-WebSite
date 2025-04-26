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
    writer: "",
    noAnswer: false,
  });
  const [qnaList, setQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetchAnswers(sortType, page, 10);
      setQnaList(res.data);
      setTotalPages(res.pageInfo.totalPages);
    } catch (err) {
      setToast({ show: true, message: "조회 실패했습니다.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const sortOptions = [
    { value: "newest", label: "등록일순 (최신)" },
    { value: "oldest", label: "등록일순 (오래된)" },
  ];

  const [sortType, setSortType] = useState("newest");

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
        onSearch={handleSearch}
      />
      <div className="flex justify-end mb-2">
        <SortDropdown
          value={sortType}
          onChange={setSortType}
          options={sortOptions}
        />
      </div>
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
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
