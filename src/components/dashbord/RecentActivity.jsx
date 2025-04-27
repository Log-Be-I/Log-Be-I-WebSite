export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">최근 활동 로그</h2>
      <ul className="list-disc pl-5 text-gray-700">
        {activities.map((activity, idx) => (
          <li key={idx} className="mb-2">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
