import { createContext, useContext, useEffect, useState } from 'react';
import { instance } from '../lib/axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [chosenBrand, setChosenBrand] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await instance.get('/he123456');
      const productsData = res.data.sort((a, b) => b.percentOff - a.percentOff);
      setProducts(productsData);
      const brandsData = productsData.map((item) => item.brand);
      setBrands([...new Set(brandsData)]);
    };

    fetchProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        brands,
        setProducts,
        chosenBrand,
        setChosenBrand,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
