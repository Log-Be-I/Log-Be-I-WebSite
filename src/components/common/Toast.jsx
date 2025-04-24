export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
      {message}
      <button className="ml-2" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
