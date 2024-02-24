import { useState, useEffect } from 'react';
import PRODUCT from '../services/Product';

const useProductsApi = function(
  pageNumber:number, 
  amountOfPerPage:number
  ) {
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [products, setProducts] = useState<Product[] | null>(null)

  async function fetchProducts(pageNumber: number) {
    setIsLoading(true);

    const {
      total,
      products
    } = await PRODUCT.getAll({ pageNumber, amountOfPerPage })
    const totalPages = Math.ceil(total / amountOfPerPage)

    setProducts(products)
    setTotalPages(totalPages)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchProducts(pageNumber)
  }, [])

  return {
    isLoading,
    totalPages,
    products,
    fetchProducts
  }
}

export default useProductsApi
