export default function WelcomeMessage() {
  return (
    <div className="flex items-center bg-white p-6 rounded-2xl shadow">
      <img
        src="/assets/character.png"
        alt="캐릭터"
        className="w-20 h-20 mr-4"
      />
      <div>
        <p className="text-xl font-semibold">
          승아님, 오늘도 멋진 하루네요! 🌱
        </p>
        <p className="text-gray-500">사용자들의 기록을 지켜봐 주세요.</p>
      </div>
    </div>
  );
}
