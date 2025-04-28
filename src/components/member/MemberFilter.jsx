import { useState } from "react";
import ResetButton from "../../components/common/ResetButton";

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

export default function MemberFilter({
  filters,
  setFilters,
  onSearch,
  totalCount,
  sortBy,
  setSortBy,
  order,
  setOrder,
  setResetTrigger,
  setPage,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleSearch = () => {
    setIsClicked(true);
    onSearch(); // 부모에게 필터링 요청청

    setTimeout(() => {
      setIsClicked(false);
    }, 100);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 mb-4 items-center  mb-4">
        <select
          value={filters.memberStatus}
          onChange={(e) =>
            setFilters({ ...filters, memberStatus: e.target.value })
          }
          className="border px-3 py-2 rounded text-base"
        >
          <option value="">전체</option>
          <option value="MEMBER_ACTIVE">활동 중</option>
          <option value="MEMBER_SLEEP">휴면</option>
          <option value="MEMBER_DELETEED">탈퇴</option>
        </select>

        <select
          value={filters.birth}
          onChange={(e) => setFilters({ ...filters, birth: e.target.value })}
          className="border px-4 py-2 rounded text-base max-h-30 overflow-y-auto"
        >
          <option value="">연도</option>
          {[...Array(42)].map((_, i) => (
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
            onClick={handleSearch}
            className={`px-4 py-1 rounded text-white transition-colors duration-300
            ${isClicked ? "bg-secondary" : "bg-primary hover:bg-secondary"}`}
          >
            조회
          </button>

          <ResetButton
            onReset={() => {
              setFilters({
                memberStatus: "",
                birth: "",
                name: "",
                email: "",
                region: "",
              });
              setSortBy("lastLoginAt");
              setOrder("desc");
              setPage(1); // 초기화 후 자동 조회 !
              setResetTrigger(true);
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          />
        </div>
      </div>

      {/* 정렬 및 총 인원 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700 text-sm">
          총 <span className="font-semibold">{totalCount}</span> 명
        </div>
        <select
          value={JSON.stringify({ sortBy, order })}
          onChange={(e) => {
            const selected = JSON.parse(e.target.value);
            setSortBy(selected.sortBy);
            setOrder(selected.order);
          }}
          className="h-10 border rounded px-3 text-base"
        >
          <option value='{"sortBy":"lastLoginAt","order":"desc"}'>
            접속순 (최신)
          </option>
          <option value='{"sortBy":"lastLoginAt","order":"asc"}'>
            접속순 (오래된)
          </option>
          <option value='{"sortBy":"memberId","order":"desc"}'>
            가입순 (최신)
          </option>
          <option value='{"sortBy":"memberId","order":"asc"}'>
            가입순 (오래된)
          </option>
        </select>
      </div>
    </div>
  );
}
