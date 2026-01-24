import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const isHome = location.pathname === '/';

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
            <Link to="/login">
              <Button variant="nav">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button variant="gold" size="sm">
                Criar Conta
              </Button>
            </Link>
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
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
