import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  // Mock empty cart state
  const cartItems = [];
  const subtotal: number = 0;
  const shipping: number = 0;
  const total: number = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <h2 className="text-2xl font-semibold">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground">
                  Adicione produtos incríveis ao seu carrinho e finalize sua compra
                </p>
                <Link to="/catalog">
                  <Button size="lg" className="mt-4">
                    Explorar Produtos
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Cart items would be mapped here */}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 space-y-4 sticky top-20">
                  <h2 className="text-xl font-semibold">Resumo do Pedido</h2>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <Link to="/checkout">
                    <Button size="lg" className="w-full">
                      Finalizar Compra
                    </Button>
                  </Link>

                  <Link to="/catalog">
                    <Button size="lg" variant="outline" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
