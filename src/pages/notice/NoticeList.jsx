import { useEffect, useState } from "react";
import { getNotices } from "../../api/noticeApi";
import NoticeTable from "../../components/notice/NoticeTable";
import Pagination from "../../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import { noticeMockData } from "../../mock/noticeMockData";

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await getNotices(page);
        // const sortedNotices = [...res.data].sort((a, b) => {
        //   const priority = { URGENT_PINNED: 1, PINNED: 2, NONE: 3 };
        //   if (priority[a.isPinned] !== priority[b.isPinned]) {
        //     return priority[a.isPinned] - priority[b.isPinned];
        //   }
        //   return new Date(b.createdAt) - new Date(a.createdAt);
        // });
        // setNotices(sortedNotices);
        setNotices(noticeMockData.data);
        setTotalPages(res.pageInfo.totalPages);
      } catch (error) {
        console.error("공지사항 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">공지사항 관리</h1>
        <button
          onClick={() => navigate("/notice/register")}
          className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded"
        >
          공지 등록
        </button>
      </div>
      {notices.length > 0 ? (
        <>
          <NoticeTable notices={notices} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          등록된 공지사항이 없습니다.
        </div>
      )}
    </div>
  );
}
