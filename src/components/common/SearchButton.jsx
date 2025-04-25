import { useState, useEffect } from "react";

export default function SearchButton({ onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-1 rounded text-white transition-colors duration-300
    ${isClicked ? "bg-secondary" : "bg-primary hover:bg-secondary"}`}
    >
      조회
    </button>
  );
}
