import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Dinero from 'dinero.js';

import IItem from '../DTOS/IItem';
import IParamsOrder from '../DTOS/IParamsOrder';
import handleItem from '../utils/handleItem';

interface CartContextData {
  cart: IItem[];
  amount: number;
  user: IParamsOrder;
  updateUser(user: IParamsOrder): void;
  updateCart(item: IItem, insertInput?: boolean): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<IItem[]>([]);
  const [user, setUser] = useState<IParamsOrder>({} as IParamsOrder);
  const [amount, setAmount] = useState(0);

  const updateCart = useCallback((item: IItem, insertInput = false) => {
    setCart(state => {
      const itemIndex = state.findIndex(product => product.id === item.id);

      if (itemIndex >= 0) {
        const productUpdated = handleItem(state[itemIndex], item, insertInput);
        return state
          .map(product => {
            if (product.id === productUpdated.id) return productUpdated;
            return product;
          })
          .filter(product => product.quantity);
      }
      const product = handleItem({ ...item, quantity: 0 }, item, insertInput);
      return [...state, product];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  useEffect(() => {
    let price = Dinero({ amount: 0 });

    cart.forEach(value => {
      const itemPrice = parseFloat(value.price.toFixed(2).replace(/\D/g, ''));
      const item = Dinero({
        amount: itemPrice,
      }).multiply(value.to_weight ? value.quantity / 1000 : value.quantity);

      price = price.add(item);
    });

    setAmount(price.getAmount() / 100);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        user,
        updateUser: setUser,
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
