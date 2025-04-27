export default function QuickActionButton({ label, icon }) {
  return (
    <button className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition">
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
}
