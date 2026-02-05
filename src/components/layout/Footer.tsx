import { Link } from 'react-router-dom';
import { Scale, Mail, Phone, Instagram, Facebook, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold">
                  Danyel Ferreira
                </span>
                <span className="text-gold text-xs tracking-wider uppercase">
                  Advocacia & Consultoria
                </span>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Atendimento jurídico moderno, humanizado e acessível. 
              Comprometidos com a excelência e a ética profissional.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/adv.danyelferreira/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold hover:text-navy transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/danyelfsm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold hover:text-navy transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-gold">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Início', href: '/' },
                { label: 'Quem Somos', href: '/quem-somos' },
                { label: 'Áreas de Atuação', href: '/areas-atuacao' },
                { label: 'Consulta Virtual', href: '/consulta' },
                { label: 'Artigos Jurídicos', href: '/artigos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-gold">
              Informações Legais
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Termos de Uso', href: '/termos' },
                { label: 'Política de Privacidade', href: '/privacidade' },
                { label: 'Código de Ética OAB', href: '/codigo-etica-oab' },
                { label: 'LGPD', href: '/lgpd' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-gold">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  advdanyelferreira@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  (67) 99144-3348
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  Seg a Sex: 8h às 11h e 14h às 18h
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-light mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Danyel Ferreira Advocacia. Todos os direitos reservados.
            </p>
            <p className="text-cream/50 text-xs text-center md:text-right">
              OAB/MS 00.000 | Este site não oferece consultoria jurídica. 
              O atendimento é realizado exclusivamente por advogados habilitados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
