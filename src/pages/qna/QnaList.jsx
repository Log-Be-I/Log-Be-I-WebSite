import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; //useLocation을 사용해 URL 쿼리 파라미터를 읽기
import QnaFilter from "../../components/qna/QnaFilter";
import QnaTable from "../../components/qna/QnaTable";
import Pagination from "../../components/common/Pagination";
import Spinner from "../../components/common/Spinner";
import Toast from "../../components/common/Toast";
import SortDropdown from "../../components/common/SortDropdown";
import { fetchAnswers } from "../../api/qnaApi";

export default function QnaList() {
  const location = useLocation();
  const navigate = useNavigate(); // useHistory를 사용해 URL 을 변경할 수 있다.
  const [filters, setFilters] = useState({
    title: "",
    writerEmail: "",
    onlyNotAnswer: "false",
    page: 1,
    size: 10,
    sortType: "newest", // 기본값 "newest"
  });
  const [qnaList, setQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // 정렬 상태는 단일 sortType만!
  const [sortType, setSortType] = useState("newest");

  // URL의 쿼리 파라미터에서 'onlyNotAnswer' 값을 읽어온다.
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const onlyNotAnswer = queryParams.get("onlyNotAnswer") === "true"; // 쿼리 파라미터가 true일 경우
    const pageFromUrl = queryParams.get("page") || 1; // 기본값 1
    const sizeFromUrl = queryParams.get("size") || 10; // 기본값 10
    const sortTypeFromUrl = queryParams.get("sortType") || "newest"; // 기본값 "newest"
    // filters 상태 업데이트
    setFilters((prev) => ({
      ...prev,
      onlyNotAnswer,
      page: Number(pageFromUrl),
      size: Number(sizeFromUrl),
      sortType: sortTypeFromUrl,
    }));
  }, [location.search]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAnswers(filters, filters.page, filters.sortType);
      setQnaList(res.data);
      //setTotalPages(res.pageInfo.totalPages);
      const calculatedTotalPages = Math.ceil(
        res.pageInfo.totalElements / res.pageInfo.size
      );
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      setToast({ show: true, message: "조회 실패했습니다.", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  // 상태 업데이트 후 한 번만 API 호출
  useEffect(() => {
    if (filters) {
      handleSearch();
    } // 페이지, 필터, 정렬 상태 변경 시 데이터 요청
  }, [filters]); // filters 상태가 변경될 때마다 호출

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 2000); // 2초 뒤 자동 종료
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // URL에 쿼리 파라미터로 반영(필터 변경 시)
    const queryParams = new URLSearchParams(location.search);
    if (newFilters.onlyNotAnswer) {
      queryParams.set("onlyNotAnswer", "true");
    } else {
      queryParams.delete("onlyNotAnswer");
    }
    queryParams.set("page", 1); // 필터 변경 시 페이지는 1로 리셋
    queryParams.set("size", newFilters.size || 10); // 페이지 사이즈 기본값 10
    queryParams.set("sortType", newFilters.sortType || "newest"); // 정렬 타입 반영

    navigate(`/qna?${queryParams.toString()}`); // url 에 쿼리 파라미터 업데이트
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QnA 관리</h1>
      <QnaFilter
        filters={filters}
        setFilters={setFilters}
        onFilterChange={handleFilterChange}
        onSearch={() => handleSearch()}
        totalCount={qnaList.length}
        sortType={filters.sortType}
        setSortType={(sortType) => handleFilterChange({ sortType })}
        setPage={(page) => handleFilterChange({ page })}
      />
      {loading ? (
        <Spinner />
      ) : qnaList.length > 0 ? (
        <>
          <QnaTable qnaList={qnaList} />
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => handleFilterChange({ page })}
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
