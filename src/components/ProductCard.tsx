import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Product } from "@/hooks/useProducts";
import { Link } from "react-router-dom";

interface ProductCardProps extends Omit<Product, 'description' | 'images' | 'stock'> {
}

const ProductCard = ({ id, name, price, original_price, image_url, is_new, category }: ProductCardProps) => {
  const discount = original_price ? Math.round(((original_price - price) / original_price) * 100) : 0;

  return (
    <Card className="group overflow-hidden bg-card hover:shadow-[var(--shadow-card)] transition-all duration-300">
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image_url}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {is_new && (
            <Badge variant="new" className="absolute top-3 left-3">
              Lançamento
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="default" className="absolute top-3 right-3">
              -{discount}%
            </Badge>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{category}</p>
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-bold">
              R$ {price.toFixed(2).replace('.', ',')}
            </p>
            {original_price && (
              <p className="text-sm text-muted-foreground line-through">
                R$ {original_price.toFixed(2).replace('.', ',')}
              </p>
            )}
          </div>
          <Link to={`/product/${id}`}>
            <Button size="icon" variant="default" className="hover-scale">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
