import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

export interface Category {
  id: string;
  idOdoo: number;
  image: string;
  name: string;
  parent_id?: number;
  has_product?: boolean;
}

export interface Product {
  id: string;
  idOdoo: number;
  name: string;
  to_weight: boolean;
  weight: number;
  description_sale: string;
  price: number;
  pos_categ_id: number;
  qty_available: number;
  quantity: number;
  image: string;
  discount?: number;
}

interface InventoryContextData {
  categories: Category[];
  selectedCateg: number;
  selectedSub: number;
  products: Product[];
  getInventory(items: Product[]): Promise<void>;
  getCategories(): Promise<void>;
  selectedCategory(id: number): void;
  selectedSubcategory(id: number): void;
  updateInventory(item: Product): void;
  clearInventory(): void;
}

const InventoryContext = createContext<InventoryContextData>(
  {} as InventoryContextData,
);

const InventoryProvider: React.FC = ({ children }) => {
  const [selectedCateg, setSelectedCateg] = useState(0);
  const [selectedSub, setSelectedSub] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = useCallback(async () => {
    const { data } = await api.get('/categories/');
    setCategories(data);
  }, []);

  const getInventory = useCallback(
    async (items: Product[]) => {
      const categoriesWithProdu = categories
        .filter(ct => ct.parent_id === selectedCateg)
        .map(ct => ct.id);
      const { data } = await api.post('/products/', {
        categories: categoriesWithProdu,
      });

      const categoriesChildren = categories.map(category => {
        if (
          data.findIndex(
            (product: Product) => product.pos_categ_id === category.idOdoo,
          ) === -1
        ) {
          return { ...category, has_product: false };
        }
        return { ...category, has_product: true };
      });

      const sub = categoriesChildren.find(ct => ct.has_product);
      setSelectedSub(sub?.idOdoo || 0);

      const productsUpdate = data.map((product: Product) => {
        const item = items.find(i => i.id === product.id);
        if (item) {
          return item;
        }

        return product as Product;
      });

      setCategories(categoriesChildren);
      setProducts(productsUpdate);
    },
    [categories, selectedCateg],
  );

  const selectedSubcategory = useCallback((id: number) => {
    setSelectedSub(id);
  }, []);

  const selectedCategory = useCallback(
    (id: number) => {
      setSelectedCateg(id);
      const index = categories.findIndex(category => category.parent_id === id);
      if (index === -1) {
        selectedSubcategory(id);
      } else {
        selectedSubcategory(categories[index].idOdoo);
      }
    },
    [categories, selectedSubcategory],
  );

  const updateInventory = useCallback(
    (item: Product) => {
      let check = false;
      const productsUpdate = products.map(product => {
        if (product.id === item.id) {
          check = true;
          return item;
        }
        return product;
      });
      if (check) {
        setProducts(productsUpdate);
      }
    },
    [products],
  );

  const clearInventory = useCallback(() => {
    const productsUpdate = products.map(product => ({
      ...product,
      quantity: 0,
    }));
    setProducts(productsUpdate);
  }, [products]);

  return (
    <InventoryContext.Provider
      value={{
        categories,
        products,
        selectedCateg,
        selectedSub,
        getInventory,
        getCategories,
        selectedCategory,
        selectedSubcategory,
        updateInventory,
        clearInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

function useInventory(): InventoryContextData {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error('useInventory must be used within a InventoryProvider');
  }

  return context;
}

export { useInventory, InventoryProvider };
