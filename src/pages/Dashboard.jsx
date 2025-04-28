import WelcomeMessage from "../components/dashbord/WelcomeMessage";
import SummaryCard from "../components/dashbord/SummaryCard";
import QuickActionButton from "../components/dashbord/QuickActionButton";
import RecentActivity from "../components/dashbord/RecentActivity";
import { getDashbord } from "../api/dashbord";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Dashboard() {
  const [dashbordData, setDashbordData] = useState(null);

  useEffect(() => {
    fetchDashbord();
  }, []);

  const fetchDashbord = async () => {
    try {
      const response = await getDashbord();
      console.log("🚀 Dashboard 응답", response);
      setDashbordData(response);
    } catch (error) {
      console.error("🚨 Dashboard 데이터 가져오기 실패:", error);
    }
  };

  const actions = [
    { label: "공지사항 작성하기", icon: "📝", link: "/notice/register" },
    { label: "회원 목록 보기", icon: "📋", link: "/member" },
    { label: "미답변 QnA", icon: "❓", link: "/qna" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-darkblue">LogBe</span>
        <span className="text-[#1170DF]">I</span>
        <span className="text-xl text-gray-500 ml-2">Admin Console</span>
      </h1>
      <WelcomeMessage />

      {/* dashbordData가 있을 경우에만 map 실행 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {/* SummaryCard 렌더링 */}
        {dashbordData ? (
          <>
            <SummaryCard
              title="오늘 가입한 회원"
              value={`${dashbordData.todayMemberCount}명`}
              icon="👥"
            />
            <SummaryCard
              title="미답변 QnA"
              value={`${dashbordData.unansweredQuestionCount}건`}
              icon="💬"
            />
            <SummaryCard
              title="최근 공지"
              value={
                dashbordData.recentNotices.length
                  ? dashbordData.recentNotices[0].title
                  : "최근 공지가 없습니다."
              }
              createdAt={
                dashbordData.recentNotices.length
                  ? format(
                      new Date(dashbordData.recentNotices[0].createdAt),
                      "yyyy-MM-dd"
                    ) // 날짜 포맷팅
                  : ""
              }
              icon="📢"
            />
          </>
        ) : (
          <p>Loading dashboard data...</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {actions.map((action, idx) => (
          <QuickActionButton key={idx} {...action} />
        ))}
      </div>

      <RecentActivity
        questionTitles={dashbordData?.questionTitles || []}
        recentNotices={
          dashbordData?.recentNotices?.length
            ? dashbordData.recentNotices
            : [{ title: "최근 소식이 없습니다." }]
        }
        todayMemberNames={dashbordData?.todayMemberNames || []}
      />
    </div>
  );
}
