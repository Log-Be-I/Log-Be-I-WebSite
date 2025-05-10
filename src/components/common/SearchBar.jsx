export default function SearchBar({ searchTerm, onSearchChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="border rounded px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-secondary text-white px-4 py-1 rounded"
      >
        검색
      </button>
    </form>
  );
}
