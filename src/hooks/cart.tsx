import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Product } from './inventory';

interface IInfo {
  name: string;
  cpf: string;
  email: string;
}

interface CartContextData {
  cart: Product[];
  info: IInfo;
  setInfo(data: IInfo): void;
  amount: number;
  plusCart(item: Product): Product;
  minusCart(item: Product): Product;
  updateCart(item: Product): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [info, setInfo] = useState<IInfo>({
    cpf: '',
    email: '',
    name: '',
  });
  const [amount, setAmount] = useState(0);

  const plusCart = useCallback(
    (item: Product) => {
      const index = cart.findIndex(product => product.id === item.id);

      let products: Product[] = [];
      if (index >= 0) {
        products = cart.map(product => {
          if (product.id === item.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        });
      } else {
        products = [...cart, { ...item, quantity: 1 }];
      }

      setCart(products);
      return { ...item, quantity: item.quantity + 1 };
    },
    [cart],
  );

  const minusCart = useCallback(
    (item: Product) => {
      const index = cart.findIndex(product => product.id === item.id);

      if (index >= 0) {
        const products = cart
          .map(product => {
            if (product.id === item.id) {
              return {
                ...product,
                quantity: product.quantity - 1,
              };
            }
            return product;
          })
          .filter(product => product.quantity > 0);

        setCart(products);
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    },
    [cart],
  );

  const updateCart = useCallback(
    (item: Product) => {
      const index = cart.findIndex(product => product.id === item.id);
      if (index >= 0) {
        setCart(state =>
          state
            .map(i => {
              if (i.id === item.id) {
                return item;
              }
              return i;
            })
            .filter(i => i.quantity > 0),
        );
      } else if (item.quantity > 0) {
        setCart(state => [...state, item]);
      }
    },
    [cart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  useEffect(() => {
    const value = cart.reduce((acc, cur) => {
      if (cur.to_weight) {
        return acc + cur.price * (cur.quantity / 1000);
      }
      return acc + cur.price * cur.quantity;
    }, 0);
    setAmount(parseFloat(value.toFixed(2)));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        info,
        setInfo,
        amount,
        plusCart,
        minusCart,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
}

export { CartProvider, useCart };
