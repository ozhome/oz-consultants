import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

import ICategory from '../DTOS/ICategory';
import IItem from '../DTOS/IItem';
import handleItem from '../utils/handleItem';

interface InventoryContextData {
  categories: ICategory[];
  selectedCateg: number;
  selectedSub: number;
  products: IItem[];
  getInventory(items: IItem[]): Promise<void>;
  getCategories(): Promise<void>;
  selectedCategory(id: number): void;
  selectedSubcategory(id: number): void;
  updateInventory(item: IItem, insertInput?: boolean): void;
  getExternalConsultant(): Promise<void>;
  clearInventory(): void;
}

const InventoryContext = createContext<InventoryContextData>(
  {} as InventoryContextData,
);

const InventoryProvider: React.FC = ({ children }) => {
  const [selectedCateg, setSelectedCateg] = useState(0);
  const [selectedSub, setSelectedSub] = useState(0);
  const [products, setProducts] = useState<IItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const setIventory = useCallback(
    (data: IItem[], currentCategories: ICategory[], items?: IItem[]) => {
      const categoriesChildren = currentCategories
        .map(category => {
          if (
            data.findIndex(
              (product: IItem) => product.pos_categ_id === category.idOdoo,
            ) === -1
          ) {
            return { ...category, has_product: false };
          }
          return { ...category, has_product: true };
        })
        .map((category, _, self) => {
          const has_children_product = self.find(
            c => c.parent_id === category.idOdoo && c.has_product,
          );

          return { ...category, has_children_product: !!has_children_product };
        });

      const sub = categoriesChildren.find(ct => ct.has_product);
      setSelectedSub(sub?.idOdoo || 0);

      const productsUpdate = data.map((product: IItem) => {
        const item = items?.find(i => i.id === product.id);
        if (item) {
          return item;
        }

        return product as IItem;
      });

      setCategories(categoriesChildren);
      setProducts(productsUpdate);
    },
    [],
  );

  const getCategories = useCallback(async () => {
    const { data } = await api.get('/categories/');

    const productsUpdate: IItem[] = [];
    const categoryForApi: any = [[]];
    let index = 0;

    data.forEach((category: ICategory) => {
      if (categoryForApi[index].length === 10) {
        categoryForApi.push([]);
        index += 1;
      }
      categoryForApi[index].push(category);
    });

    await Promise.all(
      categoryForApi.map(async (categoriesApi: ICategory[]) => {
        try {
          const { data: dataProducts } = await api.post('/products/', {
            categories: categoriesApi.map(c => c.id),
          });

          if (dataProducts) {
            productsUpdate.push(...dataProducts);
          }
        } catch {
          // TODO
        }
        return categoriesApi;
      }),
    );

    setIventory(productsUpdate, data);
  }, [setIventory]);

  const getInventory = useCallback(
    async (items: IItem[]) => {
      const categoriesWithProdu = categories
        .filter(ct => ct.parent_id === selectedCateg)
        .map(ct => ct.id);
      const { data } = await api.post('/products/', {
        categories: categoriesWithProdu,
      });

      setIventory(data, categories, items);
    },
    [categories, selectedCateg, setIventory],
  );

  const selectedSubcategory = useCallback((id: number) => {
    setSelectedSub(id);
  }, []);

  const selectedCategory = useCallback(
    (id: number) => {
      setSelectedCateg(id);
      selectedSubcategory(id);
    },
    [selectedSubcategory],
  );

  const updateInventory = useCallback((item: IItem, insertInput = false) => {
    setProducts(state =>
      state.map(product => {
        if (product.id === item.id) {
          return handleItem(product, item, insertInput);
        }
        return product;
      }),
    );
  }, []);

  const getExternalConsultant = useCallback(async () => {
    const { data } = await api.get('/products/external');
    setCategories(data.categories);
    setIventory(data.products, data.categories);
  }, [setIventory]);

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
        getExternalConsultant,
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
