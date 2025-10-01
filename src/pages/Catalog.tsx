import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const Catalog = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);

  const categories = ["Basketball", "Running", "Casual", "Streetwear"];
  const brands = ["Jordan", "Premium", "Classic", "Sport"];
  const sizes = [38, 39, 40, 41, 42, 43, 44];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b border-border bg-card/30">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-2">Catálogo</h1>
            <p className="text-muted-foreground">
              {products.length} produtos encontrados
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0 space-y-6 sticky top-20 h-fit">
              <div>
                <h3 className="font-semibold mb-4">Categorias</h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <Label htmlFor={category} className="cursor-pointer text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Marcas</h3>
                <div className="space-y-3">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={brand} />
                      <Label htmlFor={brand} className="cursor-pointer text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Tamanhos</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <Button key={size} variant="outline" size="sm" className="h-10">
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Preço</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1500}
                    step={50}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border p-6 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filtros</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Same filter content as desktop */}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Catalog;
