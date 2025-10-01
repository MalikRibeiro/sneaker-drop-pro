import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  product_id: string;
  size: number;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string;
    brand: string;
  };
}

export const useCart = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          product:products(name, price, image_url, brand)
        `)
        .eq("user_id", userId);

      if (error) throw error;
      return data as CartItem[];
    },
    enabled: !!userId,
  });

  const addToCart = useMutation({
    mutationFn: async ({ productId, size }: { productId: string; size: number }) => {
      if (!userId) {
        throw new Error("Você precisa estar logado para adicionar ao carrinho");
      }

      const { data, error } = await supabase
        .from("cart_items")
        .upsert({
          user_id: userId,
          product_id: productId,
          size,
          quantity: 1,
        }, {
          onConflict: "user_id,product_id,size",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast({
        title: "Adicionado ao carrinho!",
        description: "Produto adicionado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível adicionar ao carrinho.",
        variant: "destructive",
      });
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast({
        title: "Removido do carrinho",
      });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (quantity < 1) {
        return removeFromCart.mutateAsync(itemId);
      }

      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    itemCount: cartItems.length,
  };
};
