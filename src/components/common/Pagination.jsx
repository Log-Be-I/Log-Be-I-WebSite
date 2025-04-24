export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages < 1) return null; // 페이지가 1 미만일때는 표시 X.

  const safeTotalPages = Math.max(totalPages, 1); // 최소 1페이지 이상으로 보장.
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀
      </button>
      {[...Array(safeTotalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-300" : "bg-white"}`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === safeTotalPages}
      >
        ▶
      </button>
    </div>
  );
}
