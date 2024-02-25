import { useState, useEffect, useCallback, useRef } from 'react';
import PRODUCT from 'services/Product';

function checkHasMore({ skip, currentProductAmount, total }: 
  {skip:number, currentProductAmount:number, total:number}) {

    return (skip + currentProductAmount) !== total
}

const useProductsApi = function(
  skip:number, 
  amountOfProducts:number
  ) {
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState<Product[] | null>(null)
  const productCacheMap = useRef(new Map())
  const fetchProductsBySkip = useCallback(async (skip: number) => {
    setIsLoading(true);

    if(productCacheMap.current.has(skip)) {
      const { total, products } = productCacheMap.current.get(skip)
      setProducts(products)
      setTotal(total)
    } else {
      const {
        total,
        products
      } = await PRODUCT.getProductsBySkip({ skip, amountOfProducts })

      setTotal(total)
      setProducts(products)

      productCacheMap.current.set(skip, { total, products })
    }

    setIsLoading(false);
  }, [amountOfProducts])

  useEffect(() => {
    fetchProductsBySkip(skip)
  }, [skip, fetchProductsBySkip])

  return {
    isLoading,
    total,
    products,
    hasMore: checkHasMore({ 
      skip, 
      currentProductAmount: products?.length || 0,
       total 
      }),
    fetchProductsBySkip
  }
}

export default useProductsApi
