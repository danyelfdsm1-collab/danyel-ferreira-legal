import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2, ShieldX } from 'lucide-react';

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isAdmin, loading, isAuthenticated } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
          <p className="text-cream/70">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <ShieldX className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-cream mb-2">Acesso Negado</h1>
          <p className="text-cream/70 mb-6">
            Você não tem permissão para acessar esta área. 
            Entre em contato com o administrador do sistema.
          </p>
          <a 
            href="/"
            className="inline-block bg-gold text-navy px-6 py-2 rounded-md font-medium hover:bg-gold/90 transition-colors"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
