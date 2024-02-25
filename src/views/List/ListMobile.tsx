import { useCallback, useEffect, useState, useRef } from 'react';
import useProductsApi from 'hooks/useProductsApi';
import CardBase from 'components/Card/CardBase';
import LoadingMask from 'components/LoadingMask';

function ListMobile() {
  const AMOUNT_OF_LOADING_PRODUCTS = 8
  const [skippedProducts, setSkippedProducts] = useState(0)
  const [displayedProducts, setDisplayedProducts] = useState<Product[] | null>(null)
  const {
    products,
    hasMore,
    isLoading,
  } = useProductsApi(skippedProducts, AMOUNT_OF_LOADING_PRODUCTS)

  useEffect(() => {
    setDisplayedProducts(prev => {
      if (prev && products) {
        return [...prev, ...products]
      }

      return products
    })
  }, [products])

  let observer = useRef<IntersectionObserver>()
  const observeProductRef = useCallback((element: HTMLElement | null) => {
    if (isLoading) {
      return
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setSkippedProducts(prev => {
          const newSkippedProducts = prev + AMOUNT_OF_LOADING_PRODUCTS

          return newSkippedProducts
        });
      }
    })

    if (element) {
      observer.current.observe(element)
    }
  }, [isLoading, hasMore])

  return (
    <div className='space-y-3'>
      {
        displayedProducts
          ? <>
            {
              displayedProducts.map((product, index) => (
                <CardBase
                  key={product.id}
                  dataKey={product.id}
                  ref={index + 1 === displayedProducts.length ? observeProductRef : null}
                  data-serial-number={index}
                  title={product.title}
                  description={product.description}
                />
              ))
            }
            {
              isLoading && <div className='flex justify-center'>Loading...</div>
            }
          </>
          : <LoadingMask />
      }
    </div>
  )
}

export default ListMobile
