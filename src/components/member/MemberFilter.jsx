const cities = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

export default function MemberFilter({ filters, setFilters, onSearch }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border px-3 py-2 rounded text-base"
      >
        <option value="">전체</option>
        <option value="활동 중">활동 중</option>
        <option value="휴면">휴면</option>
      </select>

      <select
        value={filters.birth}
        onChange={(e) => setFilters({ ...filters, birth: e.target.value })}
        className="border px-4 py-2 rounded text-base"
      >
        <option value="">연도</option>
        {[...Array(50)].map((_, i) => (
          <option key={i} value={1980 + i}>
            {1980 + i}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="이름"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        className="border px-4 py-2 rounded text-base"
      />

      <input
        type="text"
        placeholder="이메일"
        value={filters.email}
        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        className="border px-4 py-2 rounded text-base"
      />

      <select
        value={filters.region}
        onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        className="border px-4 py-2 rounded text-base"
      >
        <option value="">지역</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          className="bg-blue-400 text-white px-6 py-2 rounded text-base"
          onClick={onSearch}
        >
          조회
        </button>

        <button
          onClick={() =>
            setFilters({
              status: "",
              birth: "",
              name: "",
              email: "",
              region: "",
            })
          }
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
