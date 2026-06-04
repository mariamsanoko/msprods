import { AuthGuard } from '../../components/auth/AuthGuard.js';
import { Sidebar } from '../../components/dashboard/Sidebar.js';

export default function DashboardLayout({ session, children = '' } = {}) {
  const shell = `<div class="dashboard-shell">${Sidebar()}<main class="dashboard-content">${children}</main></div>`;
  return AuthGuard(session, shell);
}
