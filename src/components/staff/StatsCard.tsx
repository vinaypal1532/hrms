// components/dashboard/StatsCard.tsx
export default function StatsCard({ title, value, subtitle, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
      <div className="flex flex-col">
        <span className="text-gray-400 font-semibold text-[13px]">{title}</span>
        <span className="text-3xl font-bold text-gray-900 mt-1">{value}</span>
        <span className="text-[11px] text-gray-500 mt-1.5 font-medium">{subtitle}</span>
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${color} shrink-0`}>
        {icon}
      </div>
    </div>
  );
}