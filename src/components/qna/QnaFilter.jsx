import { useState } from "react";
import ResetButton from "../common/ResetButton";
import SearchButton from "../common/SearchButton";

export default function QnaFilter({
  filters,
  setFilters,
  onSearch,
  totalCount,
  sortType,
  setSortType,
  setPage,
}) {
  const handleReset = () => {
    const reset = { title: "", writerEmail: "", onlyNotAnswer: false };
    setFilters(reset);
    setSortType("newest");
    setPage(1);
    onSearch();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          type="text"
          placeholder="제목"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          className="border px-4 py-2 rounded text-base"
        />
        <input
          type="text"
          placeholder="작성자"
          value={filters.writerEmail}
          onChange={(e) =>
            setFilters({ ...filters, writerEmail: e.target.value })
          }
          className="border px-4 py-2 rounded text-base"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.onlyNotAnswer}
            onChange={(e) =>
              setFilters({ ...filters, onlyNotAnswer: e.target.checked })
            }
          />
          답변 미등록만 보기
        </label>
        <div className="flex gap-2">
          <SearchButton onClick={onSearch} />
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700 text-sm">
          총 <span className="font-semibold">{totalCount}</span> 건
        </div>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="h-10 border rounded px-3 text-base"
        >
          <option value="newest">등록일순 (최신)</option>
          <option value="oldest">등록일순 (오래된)</option>
        </select>
      </div>
    </div>
  );
}
