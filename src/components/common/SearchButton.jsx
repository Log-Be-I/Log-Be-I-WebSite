import { useState, useEffect } from "react";

export default function SearchButton({ onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  // const handleClick = () => {
  //   setIsClicked(true);
  //   if (onClick) onClick(); // 안전하게 호출
  //   setTimeout(() => setIsClicked(false), 300);
  // };

  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-1 rounded text-white transition-colors duration-200
                 bg-primary hover:bg-secondary active:bg-secondary active:scale-95"
    >
      조회
    </button>
  );
}
