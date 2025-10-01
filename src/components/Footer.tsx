import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-gradient-primary">SNKR</div>
            <p className="text-sm text-muted-foreground">
              Os melhores sneakers premium com entrega rápida e garantida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog?category=masculino" className="hover:text-primary transition-colors">Masculino</Link></li>
              <li><Link to="/catalog?category=feminino" className="hover:text-primary transition-colors">Feminino</Link></li>
              <li><Link to="/catalog?category=unissex" className="hover:text-primary transition-colors">Unissex</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Lançamentos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ajuda</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Rastreamento</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Formas de Pagamento</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Nossa História</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SNKR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
