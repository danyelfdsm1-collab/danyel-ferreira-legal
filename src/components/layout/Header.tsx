import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Scale, LogOut, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Quem Somos', href: '/quem-somos' },
  { label: 'Áreas de Atuação', href: '/areas-atuacao' },
  { label: 'Consulta Virtual', href: '/consulta' },
  { label: 'IA Jurídica', href: '/ia-juridica' },
  { label: 'Artigos', href: '/artigos' },
  { label: 'Contato', href: '/contato' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, isAuthenticated, signOut, loading } = useAuth();
  const { isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHome ? 'bg-transparent' : 'bg-navy shadow-lg'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className="text-cream font-serif text-xl font-semibold">
                Danyel Ferreira
              </span>
              <span className="text-gold text-xs tracking-wider uppercase">
                Advocacia & Consultoria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="nav"
                  className={location.pathname === item.href ? 'text-gold' : ''}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                        <Shield className="w-4 h-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link to="/perfil" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
                    <User className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {userName}
                    </span>
                  </Link>
                  <Button variant="goldOutline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Sair
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="nav">Entrar</Button>
                  </Link>
                  <Link to="/cadastro">
                    <Button variant="gold" size="sm">
                      Criar Conta
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-cream p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-navy border-t border-navy-light pb-6 animate-fade-in">
            <nav className="flex flex-col gap-1 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-cream/80 hover:text-gold hover:bg-navy-light transition-colors ${
                    location.pathname === item.href ? 'text-gold bg-navy-light' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-navy-light mt-4">
                {!loading && (
                  isAuthenticated ? (
                    <>
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 text-gold py-2 hover:text-gold/80 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          <span className="text-sm font-medium">Painel Admin</span>
                        </Link>
                      )}
                      <Link 
                        to="/perfil" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-cream py-2 hover:text-gold transition-colors"
                      >
                        <User className="w-4 h-4 text-gold" />
                        <span className="text-sm font-medium">Olá, {userName}</span>
                      </Link>
                      <Button variant="goldOutline" className="w-full" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="goldOutline" className="w-full">
                          Entrar
                        </Button>
                      </Link>
                      <Link to="/cadastro" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="gold" className="w-full">
                          Criar Conta
                        </Button>
                      </Link>
                    </>
                  )
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
