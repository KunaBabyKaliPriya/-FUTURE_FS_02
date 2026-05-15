const styles = {
  New: 'bg-sky-100 text-sky-700',
  Contacted: 'bg-amber-100 text-amber-700',
  Converted: 'bg-emerald-100 text-emerald-700',
};
export default function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[status] || 'bg-slate-100'}`}>
      {status}
    </span>
  );
}
