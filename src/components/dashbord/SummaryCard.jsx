export default function SummaryCard({ title, value, icon, createdAt }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center relative">
      <span className="text-3xl mr-4">{icon}</span>
      <div>
        <p className="text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        {createdAt && (
          <p className="text-xs text-gray-500 absolute bottom-1 right-2">
            작성일: {createdAt}
          </p>
        )}
      </div>
    </div>
  );
}
