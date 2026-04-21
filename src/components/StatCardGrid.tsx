type StatCardGridProps = {
  title: string;
  symbol?: string;
  value: string | number;
  color?: string;
  desc?: string; // optional
};

const StatCardGrid = ({
  title,
  symbol,
  value,
  color,
  desc,
}: StatCardGridProps) => {
  return (
    <div className="p-6 rounded-2xl shadow-sm bg-white text-center border border-gray-200">
      <p className="text-gray-500 text-xm">{title}</p>
      <h2 className={`text-2xl font-semibold mt-2 ${color}`}>
        {symbol}
        {value}
      </h2>
      {desc && <p className="text-gray-500 text-sm mt-1">{desc}</p>}
    </div>
  );
};

export default StatCardGrid;
