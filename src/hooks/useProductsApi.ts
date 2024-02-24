import { useState, useEffect } from 'react';
import PRODUCT from 'services/Product';

const productCacheMap = new Map()
const useProductsApi = function(
  pageNumber:number, 
  amountOfPerPage:number
  ) {
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [products, setProducts] = useState<Product[] | null>(null)

  async function fetchProducts(pageNumber: number) {
    setIsLoading(true);

    if(productCacheMap.has(pageNumber)) {
      const { totalPages, products } = productCacheMap.get(pageNumber)
      setProducts(products)
      setTotalPages(totalPages)
    } else {
      const {
        total,
        products
      } = await PRODUCT.getAll({ pageNumber, amountOfPerPage })
      const totalPages = Math.ceil(total / amountOfPerPage)

      setTotalPages(totalPages)
      setProducts(products)
      productCacheMap.set(pageNumber, { totalPages, products })
    }

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
