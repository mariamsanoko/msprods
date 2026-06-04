import AuthGuard from '../../components/auth/AuthGuard';
import Sidebar from '../../components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  return <AuthGuard><div className="dashboard-shell"><Sidebar /><main className="main">{children}</main></div></AuthGuard>;
}
