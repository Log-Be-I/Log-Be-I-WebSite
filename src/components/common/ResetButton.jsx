import { useState } from "react";

export default function ResetButton({ onReset }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onReset(); // 전달받은 초기화 함수 실행
    setTimeout(() => setIsClicked(false), 300); // 클릭 애니메이션
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded transition-colors duration-300
      ${isClicked ? "bg-gray-400" : "bg-gray-300 hover:bg-gray-400"} text-black`}
    >
      초기화
    </button>
  );
}
