import WelcomeMessage from "../components/dashbord/WelcomeMessage";
import SummaryCard from "../components/dashbord/SummaryCard";
import QuickActionButton from "../components/dashbord/QuickActionButton";
import RecentActivity from "../components/dashbord/RecentActivity";

export default function Dashboard() {
  const summaryData = [
    { title: "오늘 가입한 회원", value: "5명", icon: "👥" },
    { title: "미답변 QnA", value: "3건", icon: "💬" },
    { title: "최근 공지", value: "2024-04-25", icon: "📢" },
  ];

  const actions = [
    { label: "공지사항 작성하기", icon: "📝" },
    { label: "회원 목록 보기", icon: "📋" },
    { label: "미답변 QnA", icon: "❓" },
  ];

  const recentActivities = [
    '회원 "홍길동" 가입했습니다.',
    "새 QnA가 등록되었습니다.",
    '공지사항 "서비스 점검 안내" 작성됨.',
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Log Be I Admin Console
      </h1>
      <WelcomeMessage />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {summaryData.map((item, idx) => (
          <SummaryCard key={idx} {...item} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {actions.map((action, idx) => (
          <QuickActionButton key={idx} {...action} />
        ))}
      </div>

      <RecentActivity activities={recentActivities} />
    </div>
  );
}
