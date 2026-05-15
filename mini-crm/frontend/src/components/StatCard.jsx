export default function StatCard({ label, value, accent = 'indigo' }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-700',
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    sky: 'bg-sky-50 text-sky-700',
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-3 ${colors[accent]}`}>
        {label}
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
