export function Sidebar() {
  const links = [
    ['Dashboard', '/dashboard'],
    ['Formations', '/dashboard/formations'],
    ['Coach IA', '/dashboard/ai-coach'],
    ['Facturation', '/dashboard/billing'],
    ['Réglages', '/dashboard/settings']
  ];

  return `<nav class="dashboard-sidebar">${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</nav>`;
}
