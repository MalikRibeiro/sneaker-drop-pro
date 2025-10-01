import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  gender: string;
  brand: string;
  description: string;
  sizes: number[];
  isNew?: boolean;
  colors: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Jordan 1 High Premium White",
    price: 899.99,
    originalPrice: 1299.99,
    image: sneaker1,
    images: [sneaker1, sneaker1, sneaker1],
    category: "Basketball",
    gender: "Unissex",
    brand: "Jordan",
    description: "O icônico Air Jordan 1 em uma versão premium com couro de alta qualidade. Design atemporal que combina estilo e performance. Perfeito para colecionadores e entusiastas de sneakers.",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    isNew: true,
    colors: ["Branco", "Vermelho"]
  },
  {
    id: 2,
    name: "High-Top Streetwear Black Red",
    price: 749.99,
    image: sneaker2,
    images: [sneaker2, sneaker2, sneaker2],
    category: "Streetwear",
    gender: "Masculino",
    brand: "Premium",
    description: "Tênis high-top com design agressivo em preto e vermelho. Ideal para quem busca estilo urbano com conforto. Cabedal em material premium com detalhes contrastantes.",
    sizes: [39, 40, 41, 42, 43, 44],
    isNew: true,
    colors: ["Preto", "Vermelho"]
  },
  {
    id: 3,
    name: "Classic Low-Top Blue White",
    price: 649.99,
    originalPrice: 799.99,
    image: sneaker3,
    images: [sneaker3, sneaker3, sneaker3],
    category: "Casual",
    gender: "Unissex",
    brand: "Classic",
    description: "Design clean e versátil em azul e branco. Perfeito para o dia a dia com muito estilo. Construção durável e acabamento impecável.",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    colors: ["Azul", "Branco"]
  },
  {
    id: 4,
    name: "Running Premium Gray Red",
    price: 799.99,
    image: sneaker4,
    images: [sneaker4, sneaker4, sneaker4],
    category: "Running",
    gender: "Masculino",
    brand: "Sport",
    description: "Tênis esportivo com tecnologia de amortecimento avançada. Design moderno em cinza com detalhes em vermelho. Ideal para performance e estilo.",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    isNew: true,
    colors: ["Cinza", "Vermelho"]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (currentId: number, category: string, limit: number = 4): Product[] => {
  return products
    .filter(product => product.id !== currentId && product.category === category)
    .slice(0, limit);
};
