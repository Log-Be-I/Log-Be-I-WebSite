// Header.jsx
export default function Header() {
  return (
    <header className="bg-primary px-6 py-4 flex justify-between items-center shadow-md">
      <h2 className="text-lg md:text-xl font-semibold text-white">
        관리자 페이지
      </h2>
      <div className="flex items-center gap-2 text-white text-sm">
        <span className="material-icons">account_circle</span>
        관리자님, 환영합니다!
      </div>
    </header>
  );
}
