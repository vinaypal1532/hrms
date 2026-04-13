const StatCardGrid = ({ title, value, color }: any) => {
  return (
    <div className="p-6 rounded-2xl shadow-sm bg-white text-center border border-gray-200">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-2xl font-semibold mt-2 ${color}`}>{value}</h2>
    </div>
  );
};

export default StatCardGrid;
