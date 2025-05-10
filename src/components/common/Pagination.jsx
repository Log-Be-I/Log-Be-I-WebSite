export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages < 1) return null; // 페이지가 1 미만일때는 표시 X.

  const safeTotalPages = Math.max(totalPages, 1); // 최소 1페이지 이상으로 보장.

  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const delta = 2; // 현재 페이지 앞뒤로 표시할 페이지 수
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= safeTotalPages; i++) {
      if (
        i === 1 ||
        i === safeTotalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        이전
      </button>

      {getPageNumbers().map((pageNum, idx) => (
        <button
          key={idx}
          onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
          className={`px-3 py-1 rounded ${
            pageNum === currentPage
              ? "bg-primary text-white"
              : pageNum === "..."
                ? "bg-transparent cursor-default"
                : "bg-white hover:bg-gray-100"
          }`}
          disabled={pageNum === "..."}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === safeTotalPages}
        className={`px-3 py-1 rounded ${
          currentPage === safeTotalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        다음
      </button>
    </div>
  );
}
