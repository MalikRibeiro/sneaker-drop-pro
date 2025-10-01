import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, isLoading, removeFromCart, updateQuantity, total } = useCart(user?.id);
  
  const shipping = total > 299 ? 0 : 29.90;
  const finalTotal = total + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

          {!user ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <h2 className="text-2xl font-semibold">Faça login para ver seu carrinho</h2>
                <p className="text-muted-foreground">
                  Entre na sua conta para adicionar produtos e finalizar suas compras
                </p>
                <Link to="/auth">
                  <Button size="lg" className="mt-4">
                    Fazer Login
                  </Button>
                </Link>
              </div>
            </Card>
          ) : cartItems.length === 0 ? (
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
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg bg-secondary"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                            <p className="text-sm text-muted-foreground">Tamanho: {item.size}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart.mutate(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity.mutate({
                                  itemId: item.id,
                                  quantity: item.quantity - 1,
                                })
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity.mutate({
                                  itemId: item.id,
                                  quantity: item.quantity + 1,
                                })
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-bold">
                            R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 space-y-4 sticky top-20">
                  <h2 className="text-xl font-semibold">Resumo do Pedido</h2>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <Button size="lg" className="w-full">
                    Finalizar Compra
                  </Button>

                  <Link to="/catalog">
                    <Button size="lg" variant="outline" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>

                  {total < 299 && (
                    <p className="text-xs text-center text-muted-foreground">
                      Falta R$ {(299 - total).toFixed(2).replace('.', ',')} para frete grátis!
                    </p>
                  )}
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
