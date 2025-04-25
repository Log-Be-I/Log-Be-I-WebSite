import { useState } from "react";
import ResetButton from "../common/ResetButton";
import SearchButton from "../common/SearchButton";

export default function QnaFilter({ filters, setFilters, onSearch }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleReset = () => {
    const reset = { title: "", writer: "", noAnswer: false };
    setLocalFilters(reset);
    setFilters(reset);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <input
        type="text"
        placeholder="제목"
        value={localFilters.title}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, title: e.target.value })
        }
        className="border px-4 py-2 rounded text-base"
      />
      <input
        type="text"
        placeholder="작성자"
        value={localFilters.writer}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, writer: e.target.value })
        }
        className="border px-4 py-2 rounded text-base"
      />
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={localFilters.noAnswer}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, noAnswer: e.target.checked })
          }
        />
        답변 미등록만
      </label>
      <div className="flex gap-2">
        <SearchButton onClick={() => setFilters(localFilters) || onSearch()} />
        <ResetButton onClick={handleReset} />
      </div>
    </div>
  );
}
