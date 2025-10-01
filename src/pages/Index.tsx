import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const { data: products = [], isLoading } = useProducts();
  
  const newProducts = products.filter(p => p.is_new).slice(0, 4);
  const saleProducts = products.filter(p => p.original_price).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroBanner}
              alt="Hero Banner"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Coleção
                <span className="text-gradient-primary block">Sneakers 2025</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Os lançamentos mais esperados do ano chegaram. Estilo premium, conforto incomparável.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog">
                  <Button size="lg" variant="hero" className="group">
                    Explorar Agora
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/catalog?category=sale">
                  <Button size="lg" variant="outline">
                    Ver Promoções
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-y border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Entrega Rápida</h3>
                  <p className="text-sm text-muted-foreground">Receba em até 3 dias úteis</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Compra Segura</h3>
                  <p className="text-sm text-muted-foreground">100% autenticado e garantido</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Últimas Tendências</h3>
                  <p className="text-sm text-muted-foreground">Sempre atualizados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Releases */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Lançamentos</h2>
                <p className="text-muted-foreground">Os sneakers mais quentes do momento</p>
              </div>
              <Link to="/catalog">
                <Button variant="ghost" className="group">
                  Ver Todos
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-96 bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Sale Section */}
        {saleProducts.length > 0 && (
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    <span className="text-primary">Promoções</span> Imperdíveis
                  </h2>
                  <p className="text-muted-foreground">Descontos de até 50% em produtos selecionados</p>
                </div>
                <Link to="/catalog?category=sale">
                  <Button variant="ghost" className="group">
                    Ver Todas
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {saleProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
              <div className="relative p-12 md:p-20 text-center space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Cadastre-se e Ganhe 10% OFF
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Na primeira compra + frete grátis em pedidos acima de R$ 299
                </p>
                <Link to="/auth">
                  <Button size="lg" variant="hero">
                    Criar Conta Grátis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
