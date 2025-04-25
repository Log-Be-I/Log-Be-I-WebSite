import { FaFlag } from "react-icons/fa";

export default function PinnedIcon({ isPinned, index, className = "" }) {
  if (isPinned === "URGENT_PINNED") {
    return <FaFlag className={`text-red-500 ${className}`} size={16} />;
  }
  if (isPinned === "PINNED") {
    return <FaFlag className={`text-orange-400 ${className}`} size={16} />;
  }
  return <span className={className}>{index}</span>;
}
