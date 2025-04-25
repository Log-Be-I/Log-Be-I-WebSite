import { useState, useEffect } from "react";
import QnaFilter from "../../components/qna/QnaFilter";
import QnaTable from "../../components/qna/QnaTable";
import Pagination from "../../components/common/Pagination";
import Spinner from "../../components/common/Spinner";
import Toast from "../../components/common/Toast";
import SortDropdown from "../../components/common/SortDropdown";
// import { fetchQnaList } from "../api/qnaApi";  // 실제 API 연동 시

export default function QnaList() {
  const [filters, setFilters] = useState({
    title: "",
    writer: "",
    noAnswer: false,
  });
  const [sort, setSort] = useState("latest");
  const [qnaList, setQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleSearch = async () => {
    setLoading(true);
    try {
      // const res = await fetchQnaList(filters, sort, page);
      const res = MOCK_DATA; // 임시 Mock 데이터
      setQnaList(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      setToast({ show: true, message: "조회 실패했습니다.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const sortOptions = [
    { value: "latest", label: "등록일순 (최신)" },
    { value: "oldest", label: "등록일순 (오래된)" },
  ];

  const [sortType, setSortType] = useState("lastest");

  useEffect(() => {
    handleSearch();
  }, [page, sort]);

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

const MOCK_DATA = {
  data: [
    {
      questionId: 1,
      title: "배송 관련 문의",
      writer: "홍길동",
      questionStatus: "QUESTION_REGISTERED",
      questionAnswerStatus: "DONE_ANSWER",
      createdAt: "2025-04-19",
    },
    {
      questionId: 2,
      title: "환불 요청합니다",
      writer: "김철수",
      questionStatus: "QUESTION_REGISTERED",
      questionAnswerStatus: "NONE_ANSWER",
      createdAt: "2025-04-18",
    },
  ],
  totalPages: 1,
};
