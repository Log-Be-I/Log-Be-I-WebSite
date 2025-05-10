export default function PageSizeSelector({ pageSize, onPageSizeChange }) {
  const pageSizeOptions = [10, 20, 30, 50];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm text-gray-600">
        페이지 크기:
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border rounded px-2 py-1 text-sm"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}개
          </option>
        ))}
      </select>
    </div>
  );
}
