export default function Stats() {
  const stats = [
    ['7', 'modules actifs'],
    ['82%', 'progression moyenne'],
    ['24/7', 'coach IA']
  ];
  return <div className="stats-grid">{stats.map(([value, label]) => <div className="card" key={label}><h3>{value}</h3><p>{label}</p></div>)}</div>;
}
