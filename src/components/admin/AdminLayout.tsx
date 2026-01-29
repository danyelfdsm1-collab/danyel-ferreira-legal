import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Users, 
  ChevronLeft,
  Menu,
  LogOut,
  Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Artigos', href: '/admin/artigos', icon: FileText },
  { label: 'Consultas', href: '/admin/consultas', icon: Calendar },
  { label: 'Usuários', href: '/admin/usuarios', icon: Users },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-navy-light border-r border-navy-light/50 flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-navy-light/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-cream font-serif text-lg font-semibold">Admin</span>
                <span className="text-gold text-xs">Painel de Controle</span>
              </div>
            )}
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors",
                  isActive 
                    ? "bg-gold/20 text-gold" 
                    : "text-cream/70 hover:bg-navy hover:text-cream"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-navy-light/50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-cream/70 hover:bg-navy hover:text-cream transition-colors"
          >
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Recolher</span>
              </>
            )}
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-red-400 hover:bg-red-500/10 transition-colors mt-1"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
