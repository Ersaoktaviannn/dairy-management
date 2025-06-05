import { useState, useEffect } from 'react';
import { productsAPI } from '../services';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchProducts = async (newFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productsAPI.getAll({ ...filters, ...newFilters });
      
      setProducts(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      await productsAPI.create(productData);
      await fetchProducts(); // Refresh list
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to create product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      await productsAPI.update(id, productData);
      await fetchProducts(); // Refresh list
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to update product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await productsAPI.delete(id);
      await fetchProducts(); // Refresh list
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to delete product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};

export default useProducts;