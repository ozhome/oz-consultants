import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import IItem from '../DTOS/IItem';

interface CartContextData {
  cart: IItem[];
  amount: number;
  updateCart(item: IItem, insertInput?: boolean): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<IItem[]>([]);
  const [amount, setAmount] = useState(0);

  const updateCart = useCallback((item: IItem, insertInput = false) => {
    setCart(state => {
      const itemIndex = state.findIndex(product => product.id === item.id);
      let { qty_available } = item;
      let quantity = 0;
      let sum = item.quantity;

      if (item.to_weight)
        qty_available = parseFloat(
          `${item.qty_available * 1000}`.replace(/\D/g, ''),
        );

      if (!insertInput) {
        if (itemIndex >= 0) sum = state[itemIndex].quantity + item.quantity;
        else sum = item.quantity;
      }

      if (sum > qty_available) quantity = qty_available;
      else if (sum <= 0) quantity = 0;
      else quantity = sum;

      const items = state;

      if (itemIndex >= 0) items[itemIndex].quantity = quantity;
      else items.push({ ...item, quantity });

      return items.filter(product => product.quantity > 0);
    });
  }, []);

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
        amount,
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
