// components/dashboard/StatsCard.tsx
export default function StatsCard({ title, value, subtitle, color }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      <div className={`w-10 h-10 rounded-lg ${color}`} />
    </div>
  );
}