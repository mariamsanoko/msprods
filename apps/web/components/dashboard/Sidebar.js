import Link from 'next/link';

const links = [
  ['/dashboard', 'Vue d’ensemble'],
  ['/dashboard/formations', 'Formations'],
  ['/dashboard/ai-coach', 'Coach IA'],
  ['/dashboard/billing', 'Facturation'],
  ['/dashboard/settings', 'Paramètres']
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link className="brand" href="/"><span className="brand-mark">MS</span><span>MS Prods</span></Link>
      <nav>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    </aside>
  );
}
