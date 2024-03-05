import { useCallback, useEffect, useState, useRef } from 'react';
import { FixedSizeList as List } from "react-window";
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
  const listElement = useRef<HTMLDivElement>(null)
  const listElementWidth = listElement?.current?.clientWidth || 0
  const CARD_HEIGHT = 150
  const CARD_GUTTER = 20
  const CONTAINER_PADDING = 80

  useEffect(() => {
    setDisplayedProducts(prev => {
      if (prev && products) {
        return [...prev, ...products]
      }

      return products
    })
  }, [products])

  // Handle lazy loading
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

  const CardContainer = ({ style, children }: { style: React.CSSProperties, children: React.ReactElement }) => {
    return <div style={{
      ...style,
      top: Number(style.top) + CARD_GUTTER,
      paddingLeft: CONTAINER_PADDING,
      paddingRight: CONTAINER_PADDING
    }}>
      {children}
    </div>
  }

  return (
    <div ref={listElement}>
      {
        displayedProducts
          ? <List
            width={listElementWidth}
            height={window.innerHeight}
            itemCount={displayedProducts.length}
            itemSize={CARD_HEIGHT + CARD_GUTTER}
            itemData={displayedProducts}
          >
            {
              ({ style, index }) => {
                const product = displayedProducts[index]
                if (index === displayedProducts.length - 1) {
                  return (
                    <CardContainer style={style}>
                      <>
                        <CardBase
                          key={product.id}
                          dataKey={product.id}
                          ref={index + 1 === displayedProducts.length ? observeProductRef : null}
                          data-serial-number={index}
                          title={product.title}
                          description={product.description}
                        />
                        {isLoading && <div className='flex justify-center'>Loading...</div>}
                      </>
                    </CardContainer>
                  )
                } else {
                  return (
                    <CardContainer style={style}>
                      <CardBase
                        key={product.id}
                        dataKey={product.id}
                        ref={index + 1 === displayedProducts.length ? observeProductRef : null}
                        data-serial-number={index}
                        title={product.title}
                        description={product.description}
                      />
                    </CardContainer>
                  )
                }
              }
            }
          </List>
          : <LoadingMask />
      }
    </div>
  )
}

export default ListMobile
