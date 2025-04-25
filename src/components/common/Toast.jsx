import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  if (!message) return null;
  const bgColor = type === "success" ? "bg-green-400" : "bg-red-400";

  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-16 right-5 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce`}
    >
      {message}
      <button className="ml-2 font-bold" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
